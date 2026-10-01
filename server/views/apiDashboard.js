/**
 * Sowberry API Dashboard HTML Template
 * Features:
 * - Light & Dark Theme modes (persisted in localStorage)
 * - Sidebar & Header navigation with real-time health ping & status indicator
 * - Stats cards for server metrics, uptime, active services & endpoints
 * - Combined Category + Method filtering + Search (Ctrl + K shortcut)
 * - Expandable endpoint details showing Headers, Parameters, Sample Payloads, and Curl commands
 * - Interactive API Test Console / Playground with JWT Bearer Token management, presets, and response inspect
 * - OpenAPI / Postman JSON Collection Exporter
 */

export const renderApiDashboard = ({ uptimeSeconds = 0, port = 5000, env = 'development' }) => {
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  const uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sowberry API — Developer Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet"/>
  
  <style>
    :root {
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Fira Code', 'SF Mono', monospace;
      
      /* Dark Theme (Default) */
      --bg-body: #0b0f19;
      --bg-sidebar: #0f172a;
      --bg-header: rgba(15, 23, 42, 0.9);
      --bg-card: #1e293b;
      --bg-card-hover: #26334d;
      --bg-input: #0f172a;
      --bg-subtle: rgba(255, 255, 255, 0.04);
      --border-color: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(201, 100, 66, 0.4);
      
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      
      --brand-primary: #c96442;
      --brand-gradient: linear-gradient(135deg, #c96442 0%, #e07a5f 50%, #a78058 100%);
      --brand-glow: rgba(201, 100, 66, 0.25);
      
      /* HTTP Method Colors - Dark */
      --method-get-bg: rgba(59, 130, 246, 0.15);
      --method-get-color: #60a5fa;
      --method-get-border: rgba(96, 165, 250, 0.3);
      
      --method-post-bg: rgba(16, 185, 129, 0.15);
      --method-post-color: #34d399;
      --method-post-border: rgba(52, 211, 153, 0.3);
      
      --method-put-bg: rgba(245, 158, 11, 0.15);
      --method-put-color: #fbbf24;
      --method-put-border: rgba(251, 191, 36, 0.3);
      
      --method-delete-bg: rgba(239, 68, 68, 0.15);
      --method-delete-color: #f87171;
      --method-delete-border: rgba(248, 113, 113, 0.3);
      
      --method-crud-bg: rgba(139, 92, 246, 0.15);
      --method-crud-color: #a78bfa;
      --method-crud-border: rgba(167, 139, 250, 0.3);

      --sidebar-width: 270px;
      --header-height: 70px;
    }

    [data-theme="light"] {
      --bg-body: #f8fafc;
      --bg-sidebar: #ffffff;
      --bg-header: rgba(255, 255, 255, 0.92);
      --bg-card: #ffffff;
      --bg-card-hover: #f1f5f9;
      --bg-input: #f1f5f9;
      --bg-subtle: #f8fafc;
      --border-color: #e2e8f0;
      --border-accent: rgba(201, 100, 66, 0.4);
      
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-dim: #64748b;

      /* HTTP Method Colors - Light */
      --method-get-bg: #eff6ff;
      --method-get-color: #1d4ed8;
      --method-get-border: #bfdbfe;
      
      --method-post-bg: #ecfdf5;
      --method-post-color: #047857;
      --method-post-border: #a7f3d0;
      
      --method-put-bg: #fffbeb;
      --method-put-color: #b45309;
      --method-put-border: #fde68a;
      
      --method-delete-bg: #fef2f2;
      --method-delete-color: #b91c1c;
      --method-delete-border: #fecaca;
      
      --method-crud-bg: #f5f3ff;
      --method-crud-color: #6d28d9;
      --method-crud-border: #ddd6fe;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: var(--font-sans);
      background-color: var(--bg-body);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      overflow-x: hidden;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.25); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.45); }

    /* ──────────────── SIDEBAR ──────────────── */
    .sidebar {
      width: var(--sidebar-width);
      height: 100vh;
      background: var(--bg-sidebar);
      border-right: 1px solid var(--border-color);
      position: fixed;
      left: 0; top: 0; z-index: 100;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
    }

    .sidebar-brand {
      padding: 20px 22px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 1px solid var(--border-color);
    }

    .brand-icon {
      width: 42px; height: 42px;
      border-radius: 12px;
      background: var(--brand-gradient);
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 22px;
      box-shadow: 0 4px 14px var(--brand-glow);
    }

    .brand-title {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--text-main);
    }

    .brand-title span {
      background: var(--brand-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }

    .brand-version {
      font-size: 10px;
      font-weight: 600;
      background: rgba(201, 100, 66, 0.15);
      color: var(--brand-primary);
      padding: 2px 7px;
      border-radius: 10px;
      margin-left: auto;
    }

    .sidebar-status {
      padding: 14px 18px;
      margin: 16px 16px 8px;
      background: rgba(34, 197, 94, 0.08);
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: 12px;
      display: flex; align-items: center; justify-content: space-between;
    }

    .status-left {
      display: flex; align-items: center; gap: 10px;
    }

    .pulse-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      background: #22c55e;
      position: relative;
    }

    .pulse-dot::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.4);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }

    .status-text {
      font-size: 12px;
      font-weight: 600;
      color: #22c55e;
    }

    .status-sub {
      font-size: 10px;
      color: var(--text-dim);
    }

    .btn-ping {
      padding: 4px 8px;
      border-radius: 6px;
      background: rgba(34, 197, 94, 0.15);
      border: none;
      color: #22c55e;
      font-size: 11px; font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-ping:hover { background: rgba(34, 197, 94, 0.25); }

    .sidebar-menu {
      padding: 12px 16px;
      flex: 1;
      overflow-y: auto;
    }

    .menu-group-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-dim);
      margin: 16px 12px 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      transition: all 0.2s ease;
      cursor: pointer;
      margin-bottom: 3px;
    }

    .nav-item:hover, .nav-item.active {
      background: rgba(201, 100, 66, 0.12);
      color: var(--brand-primary);
    }

    .nav-item i {
      font-size: 18px;
    }

    .nav-badge {
      margin-left: auto;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      background: var(--bg-card);
      color: var(--text-muted);
      border: 1px solid var(--border-color);
    }

    .sidebar-footer {
      padding: 16px 20px;
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .btn-secondary-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 9px;
      border-radius: 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
    }

    .btn-secondary-link:hover {
      background: var(--bg-card-hover);
      border-color: var(--brand-primary);
      color: var(--brand-primary);
    }

    /* ──────────────── MAIN WRAPPER ──────────────── */
    .main-wrapper {
      margin-left: var(--sidebar-width);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: calc(100% - var(--sidebar-width));
    }

    /* Header */
    .header {
      height: var(--header-height);
      background: var(--bg-header);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0; z-index: 90;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 32px;
    }

    .header-left {
      display: flex; align-items: center; gap: 16px; flex: 1; max-width: 580px;
    }

    .menu-toggle {
      display: none;
      background: none; border: none; color: var(--text-main); font-size: 24px; cursor: pointer;
    }

    .search-bar {
      width: 100%;
      position: relative;
    }

    .search-bar i {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      color: var(--text-dim); font-size: 16px;
    }

    .search-bar input {
      width: 100%;
      padding: 10px 45px 10px 42px;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-main);
      font-size: 13.5px;
      outline: none;
      transition: all 0.2s;
    }

    .search-bar input:focus {
      border-color: var(--brand-primary);
      box-shadow: 0 0 0 3px var(--brand-glow);
    }

    .shortcut-badge {
      position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
      font-size: 10px; font-weight: 600; color: var(--text-dim);
      background: var(--bg-card); border: 1px solid var(--border-color);
      padding: 2px 6px; border-radius: 4px; pointer-events: none;
    }

    .header-actions {
      display: flex; align-items: center; gap: 12px;
    }

    .theme-switch-wrapper {
      display: flex; align-items: center; gap: 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      padding: 4px 8px; border-radius: 10px;
    }

    .theme-switch-btn {
      background: none; border: none;
      color: var(--text-dim); font-size: 14px; font-weight: 600;
      padding: 4px 8px; border-radius: 6px;
      cursor: pointer; display: flex; align-items: center; gap: 5px;
      transition: all 0.2s;
    }

    .theme-switch-btn.active {
      background: var(--brand-primary);
      color: #ffffff;
    }

    .refresh-btn {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; cursor: pointer;
      transition: all 0.2s;
    }

    .refresh-btn:hover {
      background: var(--bg-card-hover);
      border-color: var(--brand-primary);
      color: var(--brand-primary);
    }

    .app-link-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px;
      border-radius: 10px;
      background: var(--brand-gradient);
      color: #fff;
      font-size: 13px; font-weight: 600;
      text-decoration: none;
      box-shadow: 0 4px 12px var(--brand-glow);
      transition: opacity 0.2s;
    }

    .app-link-btn:hover { opacity: 0.9; }

    /* Page Content */
    .content-container {
      padding: 32px;
      flex: 1;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    /* Page Banner */
    .page-banner {
      margin-bottom: 28px;
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
    }

    .page-title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-main);
      display: flex; align-items: center; gap: 12px;
    }

    .page-subtitle {
      font-size: 14px;
      color: var(--text-muted);
      margin-top: 6px;
      line-height: 1.5;
    }

    .banner-actions {
      display: flex; align-items: center; gap: 10px;
    }

    .btn-banner {
      padding: 8px 14px;
      border-radius: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-size: 12.5px; font-weight: 600;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: all 0.2s;
    }
    .btn-banner:hover {
      border-color: var(--brand-primary);
      color: var(--brand-primary);
    }

    /* ──────────────── STATS CARDS GRID ──────────────── */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 22px 24px;
      display: flex;
      align-items: center;
      gap: 18px;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-3px);
      border-color: var(--border-accent);
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.12);
    }

    .stat-icon-wrapper {
      width: 52px; height: 52px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; flex-shrink: 0;
    }

    .stat-icon-green { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
    .stat-icon-orange { background: rgba(201, 100, 66, 0.15); color: #c96442; }
    .stat-icon-blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .stat-icon-purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; }

    .stat-info { display: flex; flex-direction: column; }
    .stat-value { font-size: 22px; font-weight: 800; color: var(--text-main); letter-spacing: -0.3px; }
    .stat-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); margin-top: 2px; }
    .stat-desc { font-size: 11.5px; color: var(--text-muted); margin-top: 4px; }

    /* ──────────────── FILTER TABS & METHOD BAR ──────────────── */
    .filter-section {
      display: flex; flex-direction: column; gap: 14px;
      margin-bottom: 28px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .filter-tabs-row {
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    }

    .filter-tabs {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    }

    .tab-btn {
      padding: 8px 16px;
      border-radius: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 13px; font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      display: flex; align-items: center; gap: 6px;
    }

    .tab-btn:hover {
      background: var(--bg-card-hover);
      color: var(--text-main);
    }

    .tab-btn.active {
      background: var(--brand-gradient);
      color: #ffffff;
      border-color: transparent;
      font-weight: 600;
      box-shadow: 0 4px 12px var(--brand-glow);
    }

    .tab-count {
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 10px;
      background: rgba(0,0,0,0.15);
    }

    .active .tab-count {
      background: rgba(255,255,255,0.25);
    }

    .method-filter-bar {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    }

    .method-filter-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.5px; margin-right: 4px;
    }

    .method-pill-btn {
      font-family: var(--font-mono); font-size: 11px; font-weight: 700;
      padding: 4px 10px; border-radius: 6px;
      border: 1px solid var(--border-color);
      background: var(--bg-card); color: var(--text-muted);
      cursor: pointer; transition: all 0.2s;
    }

    .method-pill-btn.active {
      border-color: var(--brand-primary);
      background: rgba(201, 100, 66, 0.15);
      color: var(--brand-primary);
    }

    /* ──────────────── ENDPOINTS CONTAINER & CARDS ──────────────── */
    .endpoints-container {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .category-section {
      display: flex; flex-direction: column; gap: 14px;
    }

    .category-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 4px 2px;
    }

    .category-title {
      font-size: 17px; font-weight: 700;
      display: flex; align-items: center; gap: 10px;
      color: var(--text-main);
    }

    .category-title i {
      font-size: 20px;
    }

    .category-badge {
      font-size: 12px; font-weight: 600;
      padding: 3px 10px; border-radius: 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
    }

    .endpoint-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 20px 24px;
      display: flex; flex-direction: column; gap: 12px;
      transition: all 0.2s ease;
      position: relative;
    }

    .endpoint-card:hover {
      border-color: var(--border-accent);
      box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.1);
    }

    .ep-top-row {
      display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
    }

    .ep-left-info {
      display: flex; align-items: center; gap: 14px; flex-wrap: wrap; flex: 1;
    }

    .method-badge {
      font-family: var(--font-mono);
      font-size: 12px; font-weight: 700;
      padding: 5px 12px; border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .method-get { background: var(--method-get-bg); color: var(--method-get-color); border: 1px solid var(--method-get-border); }
    .method-post { background: var(--method-post-bg); color: var(--method-post-color); border: 1px solid var(--method-post-border); }
    .method-put { background: var(--method-put-bg); color: var(--method-put-color); border: 1px solid var(--method-put-border); }
    .method-delete { background: var(--method-delete-bg); color: var(--method-delete-color); border: 1px solid var(--method-delete-border); }
    .method-crud { background: var(--method-crud-bg); color: var(--method-crud-color); border: 1px solid var(--method-crud-border); }

    .ep-path {
      font-family: var(--font-mono);
      font-size: 15px; font-weight: 600;
      color: var(--text-main);
      letter-spacing: -0.2px;
    }

    .ep-actions {
      display: flex; align-items: center; gap: 8px;
    }

    .btn-action {
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px; font-weight: 600;
      border: 1px solid var(--border-color);
      background: var(--bg-input);
      color: var(--text-main);
      cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.2s;
    }

    .btn-action:hover {
      background: var(--brand-primary);
      color: #ffffff;
      border-color: var(--brand-primary);
    }

    .btn-copy {
      padding: 6px 10px;
      font-size: 14px;
    }

    .ep-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .ep-tags-row {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px;
    }

    .ep-tag {
      font-size: 11px; font-weight: 500;
      padding: 3px 9px; border-radius: 6px;
      background: var(--bg-input);
      color: var(--text-dim);
      border: 1px solid var(--border-color);
      display: inline-flex; align-items: center; gap: 4px;
    }

    .ep-tag-auth {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.2);
    }

    [data-theme="light"] .ep-tag-auth {
      background: #fef2f2; color: #dc2626; border-color: #fecaca;
    }

    .ep-tag-public {
      background: rgba(34, 197, 94, 0.1);
      color: #4ade80;
      border-color: rgba(34, 197, 94, 0.2);
    }

    [data-theme="light"] .ep-tag-public {
      background: #ecfdf5; color: #059669; border-color: #a7f3d0;
    }

    /* Expandable Details Drawer */
    .ep-details-drawer {
      margin-top: 10px;
      padding-top: 14px;
      border-top: 1px dashed var(--border-color);
      display: none; flex-direction: column; gap: 14px;
      animation: fadeIn 0.2s ease;
    }

    .ep-details-drawer.open { display: flex; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

    .details-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px;
    }

    .details-box {
      background: var(--bg-subtle);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 12px 14px;
    }

    .details-box-title {
      font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.5px; margin-bottom: 8px;
      display: flex; align-items: center; justify-content: space-between;
    }

    .code-block {
      font-family: var(--font-mono); font-size: 12px;
      background: var(--bg-body); color: var(--text-main);
      padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);
      white-space: pre-wrap; word-break: break-all; overflow-x: auto;
    }

    /* ──────────────── API TEST CONSOLE MODAL ──────────────── */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.25s ease;
    }

    .modal-backdrop.open {
      opacity: 1; pointer-events: auto;
    }

    .modal-container {
      background: var(--bg-sidebar);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      width: 100%; max-width: 860px;
      max-height: 90vh;
      box-sizing: border-box;
      display: flex; flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      transform: scale(0.95);
      transition: transform 0.25s ease;
    }

    .modal-backdrop.open .modal-container {
      transform: scale(1);
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
      display: flex; align-items: center; justify-content: space-between;
      box-sizing: border-box;
    }

    .modal-title {
      font-size: 18px; font-weight: 700; color: var(--text-main);
      display: flex; align-items: center; gap: 10px;
    }

    .modal-close {
      background: none; border: none; font-size: 22px; color: var(--text-dim); cursor: pointer;
      transition: color 0.2s;
    }
    .modal-close:hover { color: var(--text-main); }

    .modal-body {
      padding: 24px;
      overflow-y: auto;
      display: flex; flex-direction: column; gap: 18px;
      box-sizing: border-box;
    }

    .token-bar {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 10px 14px;
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
      box-sizing: border-box; width: 100%;
    }

    .token-bar label {
      font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.5px;
    }

    .token-bar input {
      flex: 1; min-width: 200px; max-width: 100%;
      padding: 6px 10px; border-radius: 6px;
      background: var(--bg-body); border: 1px solid var(--border-color);
      color: var(--text-main); font-family: var(--font-mono); font-size: 12px;
      outline: none; box-sizing: border-box;
    }

    .btn-token-preset {
      padding: 5px 10px; border-radius: 6px;
      background: var(--bg-card); border: 1px solid var(--border-color);
      color: var(--text-muted); font-size: 11px; font-weight: 600; cursor: pointer;
      transition: all 0.2s;
    }
    .btn-token-preset:hover { border-color: var(--brand-primary); color: var(--brand-primary); }

    .console-input-group {
      display: flex; gap: 10px; width: 100%; box-sizing: border-box; flex-wrap: wrap;
    }

    .console-select-method {
      padding: 10px 14px;
      border-radius: 10px;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-family: var(--font-mono); font-weight: 700;
      outline: none; box-sizing: border-box;
    }

    .console-input-url {
      flex: 1; min-width: 180px; max-width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-family: var(--font-mono); font-size: 13.5px;
      outline: none; box-sizing: border-box;
    }

    .btn-send {
      padding: 10px 20px;
      border-radius: 10px;
      background: var(--brand-gradient);
      border: none;
      color: #fff; font-weight: 700; font-size: 13.5px;
      cursor: pointer;
      display: inline-flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 14px var(--brand-glow);
    }

    .btn-send:hover { opacity: 0.9; }

    .console-label {
      font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.5px;
    }

    .console-textarea {
      width: 100%; max-width: 100%; min-height: 110px;
      padding: 12px;
      border-radius: 10px;
      background: var(--bg-body);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-family: var(--font-mono); font-size: 13px;
      outline: none; resize: vertical; box-sizing: border-box;
    }

    .response-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: 6px;
    }

    .response-status-badge {
      font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px;
      font-family: var(--font-mono);
    }

    .status-2xx { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
    .status-4xx { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .status-5xx { background: rgba(239, 68, 68, 0.15); color: #f87171; }

    .console-output {
      background: #050811;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 16px;
      font-family: var(--font-mono); font-size: 12.5px;
      color: #38bdf8;
      max-height: 300px; overflow: auto;
      white-space: pre-wrap; word-break: break-all;
    }

    /* Toast Notification */
    .toast {
      position: fixed; bottom: 30px; right: 30px; z-index: 2000;
      background: #10b981; color: #fff;
      padding: 12px 20px; border-radius: 10px;
      font-size: 13px; font-weight: 600;
      display: flex; align-items: center; gap: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      transform: translateY(100px); opacity: 0;
      transition: all 0.3s ease;
    }
    .toast.show { transform: translateY(0); opacity: 1; }

    /* Footer */
    .dashboard-footer {
      padding: 24px 32px;
      border-top: 1px solid var(--border-color);
      text-align: center;
      font-size: 13px; color: var(--text-dim);
      margin-top: auto;
    }

    .dashboard-footer a { color: var(--brand-primary); text-decoration: none; font-weight: 500; }
    .dashboard-footer a:hover { text-decoration: underline; }

    /* Responsive */
    @media (max-width: 900px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.mobile-open { transform: translateX(0); }
      .main-wrapper { margin-left: 0; width: 100%; }
      .menu-toggle { display: block; }
      .content-container { padding: 20px 16px; }
      .header { padding: 0 16px; }
    }
  </style>
</head>
<body>

  <!-- ──────────────── SIDEBAR NAVIGATION ──────────────── -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon"><i class="ri-seedling-fill"></i></div>
      <div>
        <div class="brand-title">Sowberry <span>API</span></div>
      </div>
      <span class="brand-version">v1.0.0</span>
    </div>

    <div class="sidebar-status">
      <div class="status-left">
        <div class="pulse-dot"></div>
        <div>
          <div class="status-text" id="statusTitle">Server Online</div>
          <div class="status-sub" id="statusPingSub">Port ${port} &bull; ${env}</div>
        </div>
      </div>
      <button class="btn-ping" title="Ping Server Health" onclick="pingServer()"><i class="ri-pulse-line"></i> Ping</button>
    </div>

    <div class="sidebar-menu">
      <div class="menu-group-title">Navigation</div>
      
      <a class="nav-item active" onclick="filterCategory('all', this)">
        <i class="ri-dashboard-3-line"></i>
        <span>Overview</span>
        <span class="nav-badge" id="badge-all">All</span>
      </a>

      <a class="nav-item" onclick="filterCategory('auth', this)">
        <i class="ri-shield-keyhole-line"></i>
        <span>Authentication</span>
        <span class="nav-badge">9</span>
      </a>

      <a class="nav-item" onclick="filterCategory('admin', this)">
        <i class="ri-admin-line"></i>
        <span>Admin Panel</span>
        <span class="nav-badge">9</span>
      </a>

      <a class="nav-item" onclick="filterCategory('mentor', this)">
        <i class="ri-user-star-line"></i>
        <span>Mentor Services</span>
        <span class="nav-badge">9</span>
      </a>

      <a class="nav-item" onclick="filterCategory('student', this)">
        <i class="ri-graduation-cap-line"></i>
        <span>Student Portal</span>
        <span class="nav-badge">12</span>
      </a>

      <a class="nav-item" onclick="filterCategory('public', this)">
        <i class="ri-global-line"></i>
        <span>Public APIs</span>
        <span class="nav-badge">5</span>
      </a>

      <a class="nav-item" onclick="filterCategory('system', this)">
        <i class="ri-heart-pulse-line"></i>
        <span>System &amp; Health</span>
        <span class="nav-badge">2</span>
      </a>

      <div class="menu-group-title">Developer Tools</div>
      <a class="nav-item" onclick="openConsole('/api/health', 'GET')">
        <i class="ri-terminal-box-line"></i>
        <span>API Test Console</span>
      </a>
    </div>

    <div class="sidebar-footer">
      <button onclick="exportPostmanCollection()" class="btn-secondary-link">
        <i class="ri-download-2-line"></i> Export JSON Spec
      </button>
      <a href="http://localhost:5173" target="_blank" class="btn-secondary-link">
        <i class="ri-external-link-line"></i> Open Web App (5173)
      </a>
    </div>
  </aside>

  <!-- ──────────────── MAIN WRAPPER ──────────────── -->
  <div class="main-wrapper">
    
    <!-- HEADER -->
    <header class="header">
      <div class="header-left">
        <button class="menu-toggle" onclick="toggleSidebar()"><i class="ri-menu-line"></i></button>
        <div class="search-bar">
          <i class="ri-search-line"></i>
          <input type="text" id="searchInput" placeholder="Search endpoints (e.g. /login, GET, admin, courses)..." oninput="handleSearch()"/>
          <span class="shortcut-badge">Ctrl K</span>
        </div>
      </div>

      <div class="header-actions">
        
        <!-- Light / Dark Theme Switcher -->
        <div class="theme-switch-wrapper">
          <button class="theme-switch-btn" id="themeBtnLight" onclick="setTheme('light')">
            <i class="ri-sun-line"></i> Light
          </button>
          <button class="theme-switch-btn" id="themeBtnDark" onclick="setTheme('dark')">
            <i class="ri-moon-line"></i> Dark
          </button>
        </div>

        <button class="refresh-btn" title="Refresh API Status" onclick="window.location.reload()">
          <i class="ri-refresh-line"></i>
        </button>
        
        <a href="http://localhost:5173" target="_blank" class="app-link-btn">
          <i class="ri-computer-line"></i> Launch App
        </a>
      </div>
    </header>

    <!-- CONTENT -->
    <main class="content-container">
      
      <!-- Page Banner -->
      <div class="page-banner">
        <div>
          <h1 class="page-title">
            <i class="ri-seedling-fill" style="color:#c96442;"></i> Sowberry API Dashboard
          </h1>
          <p class="page-subtitle">
            Interactive API Management Console and Route Specification for Sowberry Academy backend services.
          </p>
        </div>
        <div class="banner-actions">
          <button class="btn-banner" onclick="expandAllDetails()"><i class="ri-expand-height-line"></i> Expand All</button>
          <button class="btn-banner" onclick="collapseAllDetails()"><i class="ri-collapse-height-line"></i> Collapse All</button>
        </div>
      </div>

      <!-- STATS CARDS GRID -->
      <div class="stats-grid">
        
        <div class="stat-card">
          <div class="stat-icon-wrapper stat-icon-green">
            <i class="ri-pulse-line"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value" id="healthStatusText">Operational</div>
            <div class="stat-label">API Health</div>
            <div class="stat-desc">Node.js Express &bull; Port ${port}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper stat-icon-orange">
            <i class="ri-time-line"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value" id="uptimeDisplay">${uptimeFormatted}</div>
            <div class="stat-label">Server Uptime</div>
            <div class="stat-desc">Continuous online status</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper stat-icon-blue">
            <i class="ri-shapes-line"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value">5 Modules</div>
            <div class="stat-label">Service Layer</div>
            <div class="stat-desc">Auth, Admin, Mentor, Student, Public</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper stat-icon-purple">
            <i class="ri-route-line"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value" id="visibleRoutesCount">46 Routes</div>
            <div class="stat-label">Endpoints</div>
            <div class="stat-desc">RESTful JSON architecture</div>
          </div>
        </div>

      </div>

      <!-- FILTER TABS & METHOD BAR -->
      <div class="filter-section">
        <div class="filter-tabs-row">
          <div class="filter-tabs">
            <button class="tab-btn active" data-cat="all" onclick="filterCategory('all', this)">
              All Endpoints <span class="tab-count">46</span>
            </button>
            <button class="tab-btn" data-cat="auth" onclick="filterCategory('auth', this)">
              Authentication <span class="tab-count">9</span>
            </button>
            <button class="tab-btn" data-cat="admin" onclick="filterCategory('admin', this)">
              Admin <span class="tab-count">9</span>
            </button>
            <button class="tab-btn" data-cat="mentor" onclick="filterCategory('mentor', this)">
              Mentor <span class="tab-count">9</span>
            </button>
            <button class="tab-btn" data-cat="student" onclick="filterCategory('student', this)">
              Student <span class="tab-count">12</span>
            </button>
            <button class="tab-btn" data-cat="public" onclick="filterCategory('public', this)">
              Public <span class="tab-count">5</span>
            </button>
            <button class="tab-btn" data-cat="system" onclick="filterCategory('system', this)">
              System <span class="tab-count">2</span>
            </button>
          </div>
        </div>

        <!-- Method Filter Pills -->
        <div class="method-filter-bar">
          <span class="method-filter-label"><i class="ri-filter-3-line"></i> Method:</span>
          <button class="method-pill-btn active" data-method="ALL" onclick="filterMethod('ALL', this)">ALL</button>
          <button class="method-pill-btn" data-method="GET" onclick="filterMethod('GET', this)">GET</button>
          <button class="method-pill-btn" data-method="POST" onclick="filterMethod('POST', this)">POST</button>
          <button class="method-pill-btn" data-method="PUT" onclick="filterMethod('PUT', this)">PUT</button>
          <button class="method-pill-btn" data-method="DELETE" onclick="filterMethod('DELETE', this)">DELETE</button>
          <button class="method-pill-btn" data-method="CRUD" onclick="filterMethod('CRUD', this)">CRUD</button>
        </div>
      </div>

      <!-- ENDPOINTS CONTAINER -->
      <div class="endpoints-container" id="endpointsContainer">

        <!-- 1. AUTHENTICATION MODULE -->
        <div class="category-section" data-category="auth">
          <div class="category-header">
            <div class="category-title" style="color: #e07a5f;">
              <i class="ri-shield-keyhole-line"></i> Authentication Service (/api/auth)
            </div>
            <span class="category-badge">9 Endpoints</span>
          </div>

          <!-- Card 1 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/auth/login user password signin auth">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/auth/login</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/login')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/login', 'POST', '{\n  \"username\": \"student1\",\n  \"password\": \"password123\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Authenticates user credentials (rollNumber/email/username + password) and returns JWT bearer token and user role payload.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { username/rollNumber, password }</span>
              <span class="ep-tag">Returns: JWT Token &amp; User Profile</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-grid">
                <div class="details-box">
                  <div class="details-box-title">Request Schema</div>
                  <div class="code-block">{
  "username": "string (rollNumber or email)",
  "password": "string (min 6 chars)"
}</div>
                </div>
                <div class="details-box">
                  <div class="details-box-title">Example Response (200 OK)</div>
                  <div class="code-block">{
  "success": true,
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": 1,
    "fullName": "John Student",
    "role": "student"
  }
}</div>
                </div>
              </div>
              <div class="details-box">
                <div class="details-box-title">
                  <span>cURL Command</span>
                  <button class="btn-action btn-copy" style="font-size:11px;" onclick="copyText('curl -X POST http://localhost:5000/api/auth/login -H \"Content-Type: application/json\" -d \"{\\\"username\\\":\\\"student1\\\",\\\"password\\\":\\\"password123\\\"}\"')"><i class="ri-file-copy-line"></i> Copy Curl</button>
                </div>
                <div class="code-block">curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student1","password":"password123"}'</div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/auth/register student sign up signup account">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/auth/register</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/register')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/register', 'POST', '{\n  \"fullName\": \"Jane Doe\",\n  \"email\": \"jane@example.com\",\n  \"password\": \"Secret123!\",\n  \"rollNumber\": \"2026CS101\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Registers a new student account with required credentials and academic info.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { fullName, email, password, rollNumber }</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-grid">
                <div class="details-box">
                  <div class="details-box-title">Request Schema</div>
                  <div class="code-block">{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "Secret123!",
  "rollNumber": "2026CS101"
}</div>
                </div>
                <div class="details-box">
                  <div class="details-box-title">Response</div>
                  <div class="code-block">{ "success": true, "message": "User registered successfully!" }</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/auth/me user profile authenticated token">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/auth/me</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/me')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/me', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Fetches current authenticated user details and active session permissions.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-key-fill"></i> Requires JWT</span>
              <span class="ep-tag">Headers: Authorization: Bearer &lt;token&gt;</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Required Headers</div>
                <div class="code-block">Authorization: Bearer &lt;jwt_token&gt;</div>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/auth/upload-profile image avatar picture">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/auth/upload-profile</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/upload-profile')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/upload-profile', 'POST')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Uploads user profile picture avatar image (jpg, png, webp, max 5MB).</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-key-fill"></i> Requires JWT</span>
              <span class="ep-tag">Content-Type: multipart/form-data</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Form Data</div>
                <div class="code-block">profileImage: [File Binary]</div>
              </div>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/auth/forgot-password email otp recovery">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/auth/forgot-password</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/forgot-password')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/forgot-password', 'POST', '{\n  \"email\": \"student@sowberry.edu\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Initiates password recovery process by generating and sending OTP to user's registered email.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { email }</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "email": "student@sowberry.edu" }</div>
              </div>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/auth/verify-otp code email reset">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/auth/verify-otp</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/verify-otp')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/verify-otp', 'POST', '{\n  \"email\": \"student@sowberry.edu\",\n  \"otp\": \"123456\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Verifies 6-digit OTP code submitted for password reset confirmation.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { email, otp }</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "email": "student@sowberry.edu", "otp": "123456" }</div>
              </div>
            </div>
          </div>

          <!-- Card 7 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/auth/reset-password newpassword">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/auth/reset-password</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/reset-password')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/reset-password', 'POST', '{\n  \"email\": \"student@sowberry.edu\",\n  \"token\": \"otp_reset_token\",\n  \"newPassword\": \"NewPassword123!\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Resets password after successful OTP verification token.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { email, token, newPassword }</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "email": "student@sowberry.edu", "token": "...", "newPassword": "..." }</div>
              </div>
            </div>
          </div>

          <!-- Card 8 -->
          <div class="endpoint-card" data-method="PUT" data-search="put /api/auth/profile update edit user">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-put">PUT</span>
                <span class="ep-path">/api/auth/profile</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/profile')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/profile', 'PUT', '{\n  \"fullName\": \"Updated Name\",\n  \"bio\": \"Software Engineering Student\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Updates personal profile information (name, bio, contact details).</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-key-fill"></i> Requires JWT</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "fullName": "Jane Doe", "bio": "Student" }</div>
              </div>
            </div>
          </div>

          <!-- Card 9 -->
          <div class="endpoint-card" data-method="PUT" data-search="put /api/auth/change-password user security">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-put">PUT</span>
                <span class="ep-path">/api/auth/change-password</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/auth/change-password')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/auth/change-password', 'PUT', '{\n  \"oldPassword\": \"CurrentPass123\",\n  \"newPassword\": \"BrandNewPass123!\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Changes user password while logged in requiring current password verification.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-key-fill"></i> Requires JWT</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "oldPassword": "...", "newPassword": "..." }</div>
              </div>
            </div>
          </div>

        </div>

        <!-- 2. ADMIN MODULE -->
        <div class="category-section" data-category="admin">
          <div class="category-header">
            <div class="category-title" style="color: #4b7bec;">
              <i class="ri-admin-line"></i> Administration Service (/api/admin)
            </div>
            <span class="category-badge">9 Endpoints</span>
          </div>

          <!-- Card 1 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/admin/dashboard stats overview summary">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/admin/dashboard</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/dashboard')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/dashboard', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Returns global platform metrics: total students, mentors, active courses, enrollment stats, revenue.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Requires Admin Role</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Authorization</div>
                <div class="code-block">Role required: 'admin'</div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="endpoint-card" data-method="CRUD" data-search="get /api/admin/students users list manage">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/admin/students</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/students')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/students', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Full student management endpoint (Search, Create, View, Update status, Delete student records).</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
              <span class="ep-tag">Supports Pagination &amp; Filter Query</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Query Parameters</div>
                <div class="code-block">?page=1&limit=10&search=John&status=active</div>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="endpoint-card" data-method="CRUD" data-search="get /api/admin/mentors list access assignment">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/admin/mentors</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/mentors')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/mentors', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Manage mentor accounts, assign courses, adjust permissions, view mentor workload.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Methods</div>
                <div class="code-block">GET, POST, PUT, DELETE</div>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/admin/courses catalog approve feature">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/admin/courses</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/courses')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/courses', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Retrieves all academy courses with admin status controls and visibility options.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/admin/analytics revenue metrics growth">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/admin/analytics</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/analytics')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/analytics', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Generates growth analytics, course completion rates, test attempt statistics, and platform engagement.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/admin/reports export csv pdf">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/admin/reports</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/reports')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/reports', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Retrieves summary reports for academic performance, attendance, and fee transactions.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
          </div>

          <!-- Card 7 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/admin/settings system configuration">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/admin/settings</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/settings')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/settings', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">System configuration parameters, academic year settings, and mailer integrations.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
          </div>

          <!-- Card 8 -->
          <div class="endpoint-card" data-method="CRUD" data-search="get /api/admin/notifications send broadcast">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/admin/notifications</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/notifications')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/notifications', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Broadcast notifications to entire academy, specific student batches, or mentors.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
          </div>

          <!-- Card 9 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/admin/contact-messages inquiries leads">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/admin/contact-messages</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/admin/contact-messages')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/admin/contact-messages', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">View and manage contact form submissions submitted via public website.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-shield-user-fill"></i> Admin Only</span>
            </div>
          </div>

        </div>

        <!-- 3. MENTOR MODULE -->
        <div class="category-section" data-category="mentor">
          <div class="category-header">
            <div class="category-title" style="color: #22a355;">
              <i class="ri-user-star-line"></i> Mentor Platform (/api/mentor)
            </div>
            <span class="category-badge">9 Endpoints</span>
          </div>

          <!-- Card 1 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/mentor/dashboard instructor overview">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/mentor/dashboard</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/dashboard')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/dashboard', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Mentor dashboard summary: total assigned courses, pending assignment grading, upcoming live events.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/courses create edit syllabus">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/courses</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/courses')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/courses', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Create, update, publish course curriculum, modules, video lessons, and syllabus documents.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/assignments homework grade evaluate">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/assignments</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/assignments')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/assignments', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Publish assignments, evaluate student submissions, leave feedback comments, and issue marks.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/mentor/students-progress tracking performance">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/mentor/students-progress</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/students-progress')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/students-progress', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Monitor student course completion status, test scores, coding problem submissions, and active streaks.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/problems coding challenges tests">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/problems</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/problems')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/problems', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Create programming problems with test cases, memory limits, starter code templates, and solution keys.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/aptitude-tests quiz assessment">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/aptitude-tests</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/aptitude-tests')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/aptitude-tests', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Build timed aptitude tests, MCQ question banks, section timer rules, and passing score thresholds.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 7 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/events webinars workshops live">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/events</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/events')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/events', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Schedule live interactive webinars, guest lectures, Q&amp;A sessions, and workshop meetings.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 8 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/discussions forum Q&A doubts">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/discussions</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/discussions')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/discussions', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Moderate student discussion threads, resolve technical doubts, and mark verified solutions.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

          <!-- Card 9 -->
          <div class="endpoint-card" data-method="CRUD" data-search="crud /api/mentor/study-materials pdf notes resources">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-crud">CRUD</span>
                <span class="ep-path">/api/mentor/study-materials</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/mentor/study-materials')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/mentor/study-materials', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Upload study guide PDFs, cheat sheets, reference links, and downloadable lab files for students.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-user-star-fill"></i> Mentor Auth</span>
            </div>
          </div>

        </div>

        <!-- 4. STUDENT MODULE -->
        <div class="category-section" data-category="student">
          <div class="category-header">
            <div class="category-title" style="color: #d4a843;">
              <i class="ri-graduation-cap-line"></i> Student Portal (/api/student)
            </div>
            <span class="category-badge">12 Endpoints</span>
          </div>

          <!-- Card 1 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/dashboard overview learning">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/dashboard</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/dashboard')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/dashboard', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Student dashboard personalized state: enrolled course progress, upcoming assignment deadlines, announcements.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/courses enrolled learning path">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/courses</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/courses')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/courses', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Fetches list of active courses student is currently enrolled in with completion percentage.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/student/courses/:id/enroll enroll register">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/student/courses/:id/enroll</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/courses/1/enroll')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/courses/1/enroll', 'POST')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Enrolls logged-in student into a specified course by course ID.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/assignments homework submission">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/assignments</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/assignments')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/assignments', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Lists assigned tasks, submission status (pending, submitted, graded), and due dates.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/grades marks transcript evaluation">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/grades</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/grades')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/grades', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Detailed grade transcript showing scores across assignments, quizzes, and coding exams.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/coding-problems practice code sandbox">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/coding-problems</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/coding-problems')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/coding-problems', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Practice coding problems catalog filtered by difficulty (Easy, Medium, Hard) and topics.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 7 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/student/execute run compile code compiler sandbox">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/student/execute</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/execute')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/execute', 'POST', '{\n  \"language\": \"javascript\",\n  \"code\": \"console.log(\\\"Hello Sowberry!\\\");\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Executes student code snippet in isolated sandbox compiler environment (Supports JS, Python, C++, Java).</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
              <span class="ep-tag">Body: { language, code, input }</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "language": "javascript", "code": "console.log('Hello World')" }</div>
              </div>
            </div>
          </div>

          <!-- Card 8 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/game-challenges gamified quest level">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/game-challenges</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/game-challenges')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/game-challenges', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Gamified learning quests, achievement unlocks, badges, and leaderboard rankings.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 9 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/aptitude-tests exams quizzes mcq">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/aptitude-tests</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/aptitude-tests')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/aptitude-tests', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Available timed aptitude assessments, placement mock tests, and test history.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 10 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/study-materials pdf documents downloads">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/study-materials</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/study-materials')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/study-materials', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Access downloadable PDF lecture notes, slides, and reference materials.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 11 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/notifications alerts feeds inbox">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/notifications</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/notifications')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/notifications', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Personal notification inbox: assignment alerts, event reminders, and system announcements.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

          <!-- Card 12 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/student/subscription-status premium billing plan">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/student/subscription-status</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/student/subscription-status')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/student/subscription-status', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Fetches current subscription tier status, expiry date, and plan entitlements.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-auth"><i class="ri-graduation-cap-fill"></i> Student Auth</span>
            </div>
          </div>

        </div>

        <!-- 5. PUBLIC MODULE -->
        <div class="category-section" data-category="public">
          <div class="category-header">
            <div class="category-title" style="color: #9b59b6;">
              <i class="ri-global-line"></i> Public APIs (/api/public)
            </div>
            <span class="category-badge">5 Endpoints</span>
          </div>

          <!-- Card 1 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/public/courses catalog landing preview">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/public/courses</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/public/courses')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/public/courses', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Public course directory for website visitors and prospective students — no authentication required.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Response Example</div>
                <div class="code-block">[ { "id": 1, "title": "Full Stack Web Dev", "price": 499 } ]</div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/public/pricing-plans membership tiers costs">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/public/pricing-plans</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/public/pricing-plans')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/public/pricing-plans', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Returns list of active membership tiers, pricing options, features breakdown.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/public/contact form message submit lead">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/public/contact</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/public/contact')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/public/contact', 'POST', '{\n  \"name\": \"Alex Mercer\",\n  \"email\": \"alex@example.com\",\n  \"subject\": \"Course Inquiry\",\n  \"message\": \"I would like to inquire about Full Stack Web Dev course details.\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Submits contact inquiry message from website landing page to admin team.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { name, email, subject, message }</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Request Body</div>
                <div class="code-block">{ "name": "Alex", "email": "alex@example.com", "subject": "Inquiry", "message": "Hello!" }</div>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/public/newsletter subscribe email updates">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/public/newsletter</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/public/newsletter')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/public/newsletter', 'POST', '{\n  \"email\": \"developer@example.com\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Subscribes email address to Sowberry Academy monthly newsletter.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Body: { email }</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="endpoint-card" data-method="POST" data-search="post /api/public/colleges/search institutions directory">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-post">POST</span>
                <span class="ep-path">/api/public/colleges/search</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/public/colleges/search')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/public/colleges/search', 'POST', '{\n  \"query\": \"Engineering\"\n}')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Searches partner college and university directory for registration dropdowns.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
            </div>
          </div>

        </div>

        <!-- 6. SYSTEM HEALTH MODULE -->
        <div class="category-section" data-category="system">
          <div class="category-header">
            <div class="category-title" style="color: #0ea5e9;">
              <i class="ri-heart-pulse-line"></i> System &amp; Health (/api/health)
            </div>
            <span class="category-badge">2 Endpoints</span>
          </div>

          <!-- Card 1 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api/health status uptime ping live">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api/health</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api/health')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api/health', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Quick health check probe endpoint verifying server availability, DB connection pulse, and ISO timestamp.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
              <span class="ep-tag">Fast Response (&lt;5ms)</span>
            </div>
            <div class="ep-details-drawer">
              <div class="details-box">
                <div class="details-box-title">Response Schema</div>
                <div class="code-block">{ "success": true, "message": "Sowberry API is running!", "timestamp": "ISO Date" }</div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="endpoint-card" data-method="GET" data-search="get /api json metadata routes endpoints spec">
            <div class="ep-top-row">
              <div class="ep-left-info">
                <span class="method-badge method-get">GET</span>
                <span class="ep-path">/api (Accept: application/json)</span>
              </div>
              <div class="ep-actions">
                <button class="btn-action" onclick="toggleDetails(this)"><i class="ri-code-line"></i> Details</button>
                <button class="btn-action btn-copy" onclick="copyPath('/api')"><i class="ri-file-copy-line"></i></button>
                <button class="btn-action" onclick="openConsole('/api', 'GET')">
                  <i class="ri-terminal-line"></i> Test
                </button>
              </div>
            </div>
            <div class="ep-desc">Returns structured JSON index of all API module endpoints when requested with Accept: application/json header.</div>
            <div class="ep-tags-row">
              <span class="ep-tag ep-tag-public"><i class="ri-lock-unlock-line"></i> Public Route</span>
            </div>
          </div>

        </div>

      </div>
    </main>

    <!-- FOOTER -->
    <footer class="dashboard-footer">
      <p>&copy; ${new Date().getFullYear()} <a href="http://localhost:5173" target="_blank">Sowberry Academy</a> &bull; API v1.0.0 &bull; Express.js Node Environment</p>
    </footer>

  </div>

  <!-- ──────────────── API TEST CONSOLE MODAL ──────────────── -->
  <div class="modal-backdrop" id="consoleModal">
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-title">
          <i class="ri-terminal-box-line" style="color:var(--brand-primary)"></i> API Test Console / Playground
        </div>
        <button class="modal-close" onclick="closeConsole()"><i class="ri-close-line"></i></button>
      </div>
      
      <div class="modal-body">
        
        <!-- Auth Bearer Token Control Bar -->
        <div class="token-bar">
          <label><i class="ri-key-2-line"></i> JWT Bearer Token:</label>
          <input type="text" id="consoleJwtToken" placeholder="Paste Bearer Token for Auth Endpoints..." onchange="saveTokenPreference()"/>
          <button class="btn-token-preset" onclick="setSampleToken('student')">Student Token</button>
          <button class="btn-token-preset" onclick="setSampleToken('admin')">Admin Token</button>
          <button class="btn-token-preset" onclick="clearToken()">Clear</button>
        </div>

        <div class="console-label">HTTP Request</div>
        <div class="console-input-group">
          <select id="consoleMethod" class="console-select-method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="text" id="consoleUrl" class="console-input-url" placeholder="/api/health"/>
          <button class="btn-send" onclick="sendConsoleRequest()"><i class="ri-send-plane-fill"></i> Send Request</button>
        </div>

        <div>
          <div class="console-label" style="margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
            <span>JSON Request Body (POST/PUT)</span>
            <button class="btn-action" style="font-size:10px; padding:3px 8px;" onclick="formatConsoleJson()"><i class="ri-magic-line"></i> Format JSON</button>
          </div>
          <textarea id="consoleBody" class="console-textarea" placeholder="{\n  \"key\": \"value\"\n}"></textarea>
        </div>

        <div>
          <div class="response-header">
            <div class="console-label">Response Inspector</div>
            <div id="responseStatusBadge" class="response-status-badge status-2xx" style="display:none;">200 OK</div>
          </div>
          <pre id="consoleOutput" class="console-output" style="margin-top:8px;">Ready to test. Click "Send Request" to execute HTTP request...</pre>
        </div>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div class="toast" id="toast">
    <i class="ri-checkbox-circle-fill"></i> <span id="toastMsg">Copied to clipboard!</span>
  </div>

  <!-- ──────────────── INTERACTIVE DASHBOARD SCRIPT ──────────────── -->
  <script>
    let currentCategory = 'all';
    let currentMethod = 'ALL';

    // Theme Management with localStorage persistence
    function initTheme() {
      const savedTheme = localStorage.getItem('sowberry_api_theme') || 'dark';
      setTheme(savedTheme, false);
    }

    function setTheme(theme, save = true) {
      document.documentElement.setAttribute('data-theme', theme);
      if (save) localStorage.setItem('sowberry_api_theme', theme);

      const btnLight = document.getElementById('themeBtnLight');
      const btnDark = document.getElementById('themeBtnDark');

      if (theme === 'light') {
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
      } else {
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
      }
    }

    // Live Server Uptime Counter
    let uptimeSeconds = ${uptimeSeconds};
    setInterval(() => {
      uptimeSeconds++;
      const h = Math.floor(uptimeSeconds / 3600);
      const m = Math.floor((uptimeSeconds % 3600) / 60);
      const s = Math.floor(uptimeSeconds % 60);
      document.getElementById('uptimeDisplay').innerText = \`\${h}h \${m}m \${s}s\`;
    }, 1000);

    // Sidebar Mobile Toggle
    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('mobile-open');
    }

    // Ping Server Health
    async function pingServer() {
      const title = document.getElementById('statusTitle');
      const sub = document.getElementById('statusPingSub');
      title.innerText = 'Pinging...';
      const start = performance.now();
      try {
        const res = await fetch('/api/health');
        const ms = Math.round(performance.now() - start);
        if (res.ok) {
          title.innerText = 'Server Online';
          sub.innerText = \`\${ms}ms Latency • Port ${port}\`;
          document.getElementById('healthStatusText').innerText = \`\${ms}ms Ping OK\`;
          showToast(\`Server responsive: \${ms}ms latency!\`);
        }
      } catch (err) {
        title.innerText = 'Offline';
        sub.innerText = 'Server Error';
        showToast('Ping failed: Server unreachable');
      }
    }

    // Category Filter
    function filterCategory(category, element) {
      currentCategory = category;
      
      document.querySelectorAll('.tab-btn, .nav-item').forEach(el => el.classList.remove('active'));
      
      if (element) {
        element.classList.add('active');
      }

      const matchTab = document.querySelector(\`.tab-btn[data-cat="\${category}"]\`);
      if (matchTab) matchTab.classList.add('active');

      applyCombinedFilters();
    }

    // Method Filter
    function filterMethod(method, element) {
      currentMethod = method;
      document.querySelectorAll('.method-pill-btn').forEach(btn => btn.classList.remove('active'));
      if (element) element.classList.add('active');

      applyCombinedFilters();
    }

    // Combined Filter Logic (Category + Method + Search)
    function applyCombinedFilters() {
      const query = document.getElementById('searchInput').value.toLowerCase().trim();
      const sections = document.querySelectorAll('.category-section');
      let visibleRoutes = 0;

      sections.forEach(sec => {
        const secCat = sec.getAttribute('data-category');
        const isCatMatch = (currentCategory === 'all' || secCat === currentCategory);

        if (!isCatMatch) {
          sec.style.display = 'none';
          return;
        }

        let secHasVisibleCard = false;
        const cards = sec.querySelectorAll('.endpoint-card');

        cards.forEach(card => {
          const cardMethod = card.getAttribute('data-method');
          const searchData = (card.getAttribute('data-search') || '') + ' ' + card.innerText.toLowerCase();

          const isMethodMatch = (currentMethod === 'ALL' || cardMethod === currentMethod);
          const isSearchMatch = (!query || searchData.includes(query));

          if (isMethodMatch && isSearchMatch) {
            card.style.display = 'flex';
            secHasVisibleCard = true;
            visibleRoutes++;
          } else {
            card.style.display = 'none';
          }
        });

        sec.style.display = secHasVisibleCard ? 'flex' : 'none';
      });

      document.getElementById('visibleRoutesCount').innerText = \`\${visibleRoutes} Routes\`;
    }

    // Live Search Handler
    function handleSearch() {
      applyCombinedFilters();
    }

    // Toggle Endpoint Details Drawer
    function toggleDetails(btn) {
      const card = btn.closest('.endpoint-card');
      const drawer = card.querySelector('.ep-details-drawer');
      if (drawer) {
        drawer.classList.toggle('open');
        btn.classList.toggle('active');
      }
    }

    function expandAllDetails() {
      document.querySelectorAll('.ep-details-drawer').forEach(d => d.classList.add('open'));
    }

    function collapseAllDetails() {
      document.querySelectorAll('.ep-details-drawer').forEach(d => d.classList.remove('open'));
    }

    // Copy Utilities
    function copyPath(path) {
      const fullUrl = window.location.origin + path;
      copyText(fullUrl, 'URL copied: ' + path);
    }

    function copyText(text, successMsg = 'Copied to clipboard!') {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        showToast('Copied text!');
      });
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toastMsg').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // Bearer Token Management
    function loadSavedToken() {
      const token = localStorage.getItem('sowberry_jwt_token') || '';
      document.getElementById('consoleJwtToken').value = token;
    }

    function saveTokenPreference() {
      const token = document.getElementById('consoleJwtToken').value.trim();
      localStorage.setItem('sowberry_jwt_token', token);
      showToast('JWT Token saved for API requests');
    }

    function setSampleToken(type) {
      const sample = type === 'admin' 
        ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_admin_token'
        : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_student_token';
      document.getElementById('consoleJwtToken').value = sample;
      saveTokenPreference();
    }

    function clearToken() {
      document.getElementById('consoleJwtToken').value = '';
      localStorage.removeItem('sowberry_jwt_token');
      showToast('Token cleared');
    }

    // Format Console JSON Body
    function formatConsoleJson() {
      const textarea = document.getElementById('consoleBody');
      try {
        const obj = JSON.parse(textarea.value);
        textarea.value = JSON.stringify(obj, null, 2);
        showToast('JSON formatted cleanly');
      } catch (err) {
        showToast('Invalid JSON syntax');
      }
    }

    // API Console Modal Functions
    function openConsole(path = '/api/health', method = 'GET', defaultBody = '') {
      document.getElementById('consoleUrl').value = path;
      document.getElementById('consoleMethod').value = method;
      document.getElementById('consoleBody').value = defaultBody;
      document.getElementById('consoleOutput').innerText = 'Ready to test. Click "Send Request" to execute HTTP request...';
      document.getElementById('responseStatusBadge').style.display = 'none';
      
      loadSavedToken();
      document.getElementById('consoleModal').classList.add('open');
    }

    function closeConsole() {
      document.getElementById('consoleModal').classList.remove('open');
    }

    document.getElementById('consoleModal').addEventListener('click', (e) => {
      if (e.target.id === 'consoleModal') closeConsole();
    });

    // Execute Live API Request
    async function sendConsoleRequest() {
      const path = document.getElementById('consoleUrl').value.trim();
      const method = document.getElementById('consoleMethod').value;
      const bodyText = document.getElementById('consoleBody').value.trim();
      const token = document.getElementById('consoleJwtToken').value.trim();
      
      const outputEl = document.getElementById('consoleOutput');
      const badgeEl = document.getElementById('responseStatusBadge');

      outputEl.innerText = 'Executing HTTP Request...';
      badgeEl.style.display = 'none';

      const options = {
        method,
        headers: {
          'Accept': 'application/json'
        }
      };

      if (token) {
        options.headers['Authorization'] = token.startsWith('Bearer ') ? token : \`Bearer \${token}\`;
      }

      if ((method === 'POST' || method === 'PUT') && bodyText) {
        try {
          // validate syntax
          JSON.parse(bodyText);
          options.headers['Content-Type'] = 'application/json';
          options.body = bodyText;
        } catch (e) {
          outputEl.innerText = 'Error: Invalid JSON syntax in request body.';
          return;
        }
      }

      const startTime = performance.now();

      try {
        const response = await fetch(path, options);
        const duration = Math.round(performance.now() - startTime);
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        // Status Badge Styling
        badgeEl.style.display = 'inline-block';
        badgeEl.innerText = \`\${response.status} \${response.statusText || 'OK'} (\${duration}ms)\`;
        
        if (response.ok) {
          badgeEl.className = 'response-status-badge status-2xx';
        } else if (response.status >= 400 && response.status < 500) {
          badgeEl.className = 'response-status-badge status-4xx';
        } else {
          badgeEl.className = 'response-status-badge status-5xx';
        }

        if (typeof data === 'object') {
          outputEl.innerText = JSON.stringify(data, null, 2);
        } else {
          outputEl.innerText = data;
        }

      } catch (err) {
        badgeEl.style.display = 'inline-block';
        badgeEl.className = 'response-status-badge status-5xx';
        badgeEl.innerText = 'Network Error';
        outputEl.innerText = 'Error executing request:\n' + err.message;
      }
    }

    // Export Postman / JSON Spec
    function exportPostmanCollection() {
      const spec = {
        info: {
          name: "Sowberry Academy API",
          schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: [
          { name: "Auth", item: [ { name: "Login", request: { method: "POST", url: "{{baseUrl}}/api/auth/login" } } ] },
          { name: "Admin", item: [ { name: "Dashboard", request: { method: "GET", url: "{{baseUrl}}/api/admin/dashboard" } } ] },
          { name: "Mentor", item: [ { name: "Courses", request: { method: "GET", url: "{{baseUrl}}/api/mentor/courses" } } ] },
          { name: "Student", item: [ { name: "Dashboard", request: { method: "GET", url: "{{baseUrl}}/api/student/dashboard" } } ] },
          { name: "Public", item: [ { name: "Courses", request: { method: "GET", url: "{{baseUrl}}/api/public/courses" } } ] },
          { name: "Health", item: [ { name: "Health Check", request: { method: "GET", url: "{{baseUrl}}/api/health" } } ] }
        ]
      };
      
      const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sowberry-API-Spec.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded Sowberry API JSON Spec');
    }

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl + K or / to focus search
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        document.getElementById('searchInput').focus();
      }
      // Escape to close modal
      if (e.key === 'Escape') {
        closeConsole();
      }
    });

    // Initialize Page
    window.addEventListener('DOMContentLoaded', () => {
      initTheme();
    });
  </script>
</body>
</html>`;
};
