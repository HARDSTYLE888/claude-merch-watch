# claude-merch-watch

Checks the claude.dev swag status every 5 minutes and sends a phone push through ntfy when it changes.

- `worker/`: Cloudflare Worker on a 5 minute cron (the live one). State lives in KV; secrets: `NTFY_TOPIC`, optional `NTFY_TOKEN`.
- `.github/workflows/`: GitHub Actions version (backup). Needs the repository secret `NTFY_TOPIC`.
