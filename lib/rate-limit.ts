type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true, retryAfterMs: 0 };
}

// Evict expired entries to prevent unbounded memory growth in long-running containers
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, val] of store) {
        if (now > val.resetAt) store.delete(key);
      }
    },
    30 * 60 * 1000,
  );
}
