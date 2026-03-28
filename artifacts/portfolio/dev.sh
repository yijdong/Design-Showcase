#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=21113 VITE_PORT=21115 node "$SCRIPT_DIR/proxy.js" &
PORT=21115 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev
