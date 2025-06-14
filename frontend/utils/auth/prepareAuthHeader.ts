export function prepareAuthHeader(token: string | null): string {
  return `Bearer ${token}`;
}
