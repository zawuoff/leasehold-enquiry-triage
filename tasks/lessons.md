# Lessons

## Confirm the intended process owns the port before trusting an e2e result

**Chunk C.** An end-to-end curl through the Vite proxy returned a 404 for
`/api/triage` even though the route existed and its unit tests passed. Cause: a
stale `runserver` from an earlier step was still holding port 8000 with old
(health-only) code, so the freshly started server hit "port already in use" and
the old process answered.

**Rule:** when a running-server result contradicts passing tests, check for a
leftover process on the port (`fuser`/`pgrep`) before debugging the code. Read
the server log for "That port is already in use".

**Also:** never `pkill -f "vite"` / `pkill -f "runserver"` — the pattern can
match the current shell's own command line and kill it (seen as exit 144). Kill
by captured PID, or free the port with `fuser -k <port>/tcp`.
