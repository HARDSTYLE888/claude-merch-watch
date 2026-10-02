export default {
  async scheduled(event, env) {
    const res = await fetch("https://claude.dev/terminal/swag-status.json", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return;
    const now = await res.text();
    const last = await env.STATE.get("swag");
    if (last === now) return;
    if (last !== null) {
      const push = await fetch(`https://ntfy.sh/${env.NTFY_TOPIC.trim()}`, {
        method: "POST",
        body: `Swag status changed: ${now}. Go claim it.`,
        headers: {
          Title: "CLAUDE MERCH",
          Priority: "urgent",
          Click: "https://claude.dev/terminal/",
          ...(env.NTFY_TOKEN && { Authorization: `Bearer ${env.NTFY_TOKEN.trim()}` }),
        },
      });
      console.log("ntfy", push.status, await push.text());
      if (!push.ok) return;
    }
    await env.STATE.put("swag", now);
  },
};
