<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/71a752f1-e08d-40c1-9918-63a77c66de9b

## Run Locally

**Prerequisites:** Node.js (v18+)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment:**
   Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
3. **Run the app:**
   ```bash
   npm run dev
   ```

## Troubleshooting

### Port 3000 Conflict
If you encounter an **Internal Server Error** or a failure to connect on port 3000, it may be due to orphaned background processes. You can resolve this by identifying and terminating the process:

- **Windows (PowerShell):**
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
  ```
- **Linux/macOS:**
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

Once the port is clear, restart the app with `npm run dev`.

