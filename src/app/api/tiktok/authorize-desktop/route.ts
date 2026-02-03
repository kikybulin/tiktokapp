import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateCodeVerifier,
  generateCodeChallenge,
  getTikTokAuthorizeUrlDesktop,
} from "@/lib/tiktok-pkce";
import crypto from "node:crypto";

/**
 * Allowed redirect URIs for Login Kit for Desktop (TikTok rules):
 * - http or https, host localhost or 127.0.0.1 only, with port (or default 80/443).
 */
function isAllowedRedirectUri(uri: string): boolean {
  try {
    const u = new URL(uri);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    if (host !== "localhost" && host !== "127.0.0.1") return false;
    if (uri.length >= 512) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * GET /api/tiktok/authorize-desktop?redirect_uri=http://localhost:3455/callback/
 * Returns { url, state } and stores code_verifier for later exchange.
 * Desktop app opens url; after user authorizes, TikTok redirects to redirect_uri with code & state.
 * Desktop then POSTs code+state to /api/tiktok/exchange to get tokens.
 */
export async function GET(req: NextRequest) {
  const redirectUri = req.nextUrl.searchParams.get("redirect_uri");
  if (!redirectUri || !isAllowedRedirectUri(redirectUri)) {
    return NextResponse.json(
      { error: "redirect_uri required; must be http(s)://localhost or http(s)://127.0.0.1, under 512 chars (see /docs)" },
      { status: 400 }
    );
  }

  const state = crypto.randomBytes(24).toString("hex");
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const url = getTikTokAuthorizeUrlDesktop(state, codeChallenge, redirectUri);
  if (!url) {
    return NextResponse.json(
      { error: "TIKTOK_CLIENT_KEY not configured" },
      { status: 500 }
    );
  }

  await prisma.pkceState.create({
    data: { state, codeVerifier },
  });

  return NextResponse.json({ url, state });
}
