export const renderApiDashboard = ({ uptimeSeconds, port, env }) => {
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MKCE Alumni API Server</title>
  <style>
    :root {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --primary: #12355B;
      --accent: #2563eb;
      --border: #e2e8f0;
      --success: #16a34a;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2.5rem;
      max-width: 650px;
      width: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      background: #dcfce7;
      color: #15803d;
      font-weight: 600;
      font-size: 0.75rem;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
    }
    .dot {
      width: 6px;
      height: 6px;
      background: var(--success);
      border-radius: 50%;
    }
    h1 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--primary);
      font-weight: 700;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .stat-card {
      background: #f1f5f9;
      padding: 1rem;
      border-radius: 8px;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .stat-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
    }
    .routes-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 0.75rem;
    }
    .routes-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .route-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 0.8125rem;
    }
    .route-path {
      font-family: monospace;
      color: var(--accent);
      font-weight: 600;
    }
    .footer {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">
        <h1>MKCE Alumni API</h1>
      </div>
      <div class="badge">
        <span class="dot"></span> Online
      </div>
    </div>

    <div class="grid">
      <div class="stat-card">
        <div class="stat-label">Port</div>
        <div class="stat-value">${port}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Environment</div>
        <div class="stat-value">${env}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Uptime</div>
        <div class="stat-value">${uptimeStr}</div>
      </div>
    </div>

    <div class="routes-title">API Endpoints</div>
    <ul class="routes-list">
      <li class="route-item"><span>Authentication</span><span class="route-path">/api/auth</span></li>
      <li class="route-item"><span>Admin Portal</span><span class="route-path">/api/admin</span></li>
      <li class="route-item"><span>Alumni Portal</span><span class="route-path">/api/alumni</span></li>
      <li class="route-item"><span>Student Portal</span><span class="route-path">/api/student</span></li>
      <li class="route-item"><span>Public Data</span><span class="route-path">/api/public</span></li>
    </ul>

    <div class="footer">
      MKCE NextStep Platform Backend Server &bull; Node.js Express API
    </div>
  </div>
</body>
</html>`;
};
