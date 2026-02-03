import crypto from "node:crypto";

const UNRESERVED =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

/**
 * Generate PKCE code_verifier (43–128 chars, unreserved set).
 * Login Kit for Desktop requires a new verifier per auth request.
 */
export function generateCodeVerifier(length = 64): string {
  const bytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += UNRESERVED[bytes[i]! % UNRESERVED.length];
  }
  return result;
}

/**
 * Code challenge = base64url(SHA256(code_verifier)), no padding.
 * RFC 7636 / TikTok S256: base64url-encode the raw hash (+ → -, / → _, strip =).
 */
export function generateCodeChallenge(codeVerifier: string): string {
  const hash = crypto.createHash("sha256").update(codeVerifier, "utf8").digest();
  const base64 = hash.toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const TIKTOK_AUTH_BASE = "https://www.tiktok.com/v2/auth/authorize/";

/**
 * Build authorize URL for Login Kit for Desktop (with PKCE).
 * redirect_uri must be localhost or 127.0.0.1 with port (e.g. http://localhost:3455/callback/)
 */
export function getTikTokAuthorizeUrlDesktop(
  state: string,
  codeChallenge: string,
  redirectUri: string
): string | null {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const scopes = process.env.TIKTOK_SCOPES ?? "user.info.basic,video.list";

  if (!clientKey) return null;

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: scopes,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return `${TIKTOK_AUTH_BASE}?${params.toString()}`;
}
