export function getOrCreateGuestUuid(): string {
  if (typeof window === "undefined") return ""; // SSR guard

  const GUEST_UUID_KEY = "redirecto_guest_id";
  const existing = localStorage.getItem(GUEST_UUID_KEY);
  if (existing) return existing;

  const newUuid = crypto.randomUUID();
  localStorage.setItem(GUEST_UUID_KEY, newUuid);
  return newUuid;
}
