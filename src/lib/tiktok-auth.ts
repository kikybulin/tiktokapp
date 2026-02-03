/**
 * Build TikTok OAuth authorize URL.
 * Uses env: TIKTOK_CLIENT_KEY, TIKTOK_REDIRECT_URI, TIKTOK_SCOPES
 */
const TIKTOK_AUTH_BASE = "https://www.tiktok.com/v2/auth/authorize/";

export function getTikTokAuthorizeUrl(state: string): string | null {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  const scopes = process.env.TIKTOK_SCOPES ?? "user.info.basic,video.list";

  if (!clientKey || !redirectUri) return null;

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: scopes,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
  });

  return `${TIKTOK_AUTH_BASE}?${params.toString()}`;
}

export function isMockTikTok(): boolean {
  return process.env.MOCK_TIKTOK === "true";
}
