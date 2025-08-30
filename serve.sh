#!/usr/bin/env bash
set -e

# Simple static file server for this folder.
# Usage: ./serve.sh [dir]
# Env:
#   PORT (default 5173)
#   HOST (default 127.0.0.1)
#   AUTO_OPEN=1 to auto-open browser (default 1)
#   NO_OPEN=1 to disable auto-open (overrides AUTO_OPEN)

PORT=${PORT:-5173}
HOST=${HOST:-127.0.0.1}
DIR=${1:-.}

cd "$DIR"

try() { command -v "$1" >/dev/null 2>&1; }

url="http://$HOST:$PORT"
echo "Serving $PWD on $url"

# Build server command
server_cmd=()
if try python3; then
  server_cmd=(python3 -m http.server "$PORT" --bind "$HOST")
elif try python; then
  server_cmd=(python -m http.server "$PORT" --bind "$HOST")
elif try php; then
  server_cmd=(php -S "$HOST:$PORT" -t .)
elif try ruby; then
  server_cmd=(ruby -run -e httpd . -p "$PORT" -b "$HOST")
else
  echo "No suitable server found (python3/python/php/ruby)." >&2
  exit 1
fi

# Start server in background
"${server_cmd[@]}" &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null || true' EXIT INT TERM

# Wait until port responds
wait_for_port() {
  for _ in {1..80}; do
    if try curl; then
      curl -sSfo /dev/null "$url" && return 0 || true
    elif try nc; then
      nc -z "$HOST" "$PORT" && return 0 || true
    else
      (echo >"/dev/tcp/$HOST/$PORT") >/dev/null 2>&1 && return 0 || true
    fi
    sleep 0.15
  done
  return 1
}

open_url() {
  if [[ -n "${NO_OPEN:-}" || "${AUTO_OPEN:-1}" = "0" ]]; then
    echo "Open in browser: $url"
    return 0
  fi
  if try open; then
    open "$url" >/dev/null 2>&1 || true
  elif try xdg-open; then
    xdg-open "$url" >/dev/null 2>&1 || true
  else
    echo "Open in browser: $url"
  fi
}

if wait_for_port; then
  echo "Launching browser..."
  open_url
else
  echo "Server did not respond on $url; continuing without auto-open." >&2
fi

echo "Press Ctrl+C to stop."
wait "$server_pid"
