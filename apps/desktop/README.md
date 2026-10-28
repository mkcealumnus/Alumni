# @alumnux/desktop

Lightweight desktop client foundation for **Alumnux**, architected for future cross-platform deployment via [Tauri v2](https://v2.tauri.app/).

## Overview

The Alumnux Desktop client provides a high-performance native desktop application wrapper for institutions, administrative trustees, and power alumni.

### Architecture Highlights
- **Zero Heavy Runtimes:** Built on Tauri's lightweight Rust core rather than resource-intensive Chromium shells (Electron).
- **Shared API Client:** Directly consumes `@alumnux/api-client` for HTTPS communication with `services/api`.
- **Shared Contracts:** Consumes `@alumnux/types` for type-safe models and `@alumnux/ui-tokens` for consistent brand styling.
- **Cross-Platform:** Targets Windows, macOS, and Linux from a single codebase.

## Intended Setup for Phase 2

When activating the full Tauri native toolchain in Phase 2:
1. Install Rust toolchain via `rustup`.
2. Add `@tauri-apps/cli` and `@tauri-apps/api`.
3. Initialize the Tauri core via `pnpm tauri init`.
4. Point the Tauri web frontend bundle to the unified web build or dedicated desktop shell.
