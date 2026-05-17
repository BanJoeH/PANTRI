// Lightweight debug logger, off by default. Enabled via localStorage so you
// can flip it from the browser devtools without redeploying.
//
//   localStorage.setItem("pantri:debug", "*");           // all namespaces
//   localStorage.setItem("pantri:debug", "toggle,sort"); // specific
//   localStorage.removeItem("pantri:debug");             // off
//
// The flag is read on every call (not cached), so toggling takes effect
// immediately — no reload needed.

const isEnabled = (namespace: string): boolean => {
  try {
    if (typeof localStorage === "undefined") return false;
    const raw = localStorage.getItem("pantri:debug");
    if (!raw) return false;
    const namespaces = raw.split(",").map((s) => s.trim());
    return namespaces.includes("*") || namespaces.includes(namespace);
  } catch {
    return false;
  }
};

export type DebugLogger = (...args: unknown[]) => void;

export const debug = (namespace: string): DebugLogger => {
  const tag = `[pantri:${namespace}]`;
  return (...args: unknown[]) => {
    if (isEnabled(namespace)) {
      console.log(tag, ...args);
    }
  };
};
