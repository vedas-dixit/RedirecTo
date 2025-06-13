import { User as SupabaseUser } from "@supabase/supabase-js";
import { getOrCreateGuestUuid } from "./generateGuestUuid";

export interface PreparedUser {
  is_guest: boolean;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
  provider: string | null;
  provider_id: string | null;
}

export function prepareUserPayload(user: SupabaseUser | null): PreparedUser {
  if (!user) {
    return {
      is_guest: true,
      email: null,
      name: null,
      avatar_url: null,
      provider: null,
      provider_id: getOrCreateGuestUuid(),
    };
  }

  return {
    is_guest: false,
    email: user.email ? user.email : null,
    name: user.user_metadata?.name ?? null,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    provider: user.app_metadata?.provider ?? null,
    provider_id: user.id,
  };
}
