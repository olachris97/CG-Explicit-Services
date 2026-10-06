export const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}

export const apiFetch = (path: string, init: RequestInit = {}) =>
  fetch(apiUrl(path), { ...init, credentials: "include" });
