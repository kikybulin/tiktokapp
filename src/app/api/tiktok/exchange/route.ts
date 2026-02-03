import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

/**
 * POST /api/tiktok/exchange
 * Body: { code, state, redirect_uri }
 * Used by Login Kit for Desktop: after user is redirected to localhost with code & state,
 * desktop app sends code+state here; we look up code_verifier and exchange for tokens.
 */
export async function POST(req: NextRequest) {
  let body: { code?: string; state?: string; redirect_uri?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { code, state, redirect_uri } = body;
  if (!code || !state || !redirect_uri) {
    return NextResponse.json(
      { error: "code, state, and redirect_uri are required" },
      { status: 400 }
    );
  }

  const row = await prisma.pkceState.findUnique({
    where: { state },
  });
  if (!row) {
    return NextResponse.json({ error: "Invalid or expired state" }, { status: 400 });
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  if (!clientKey || !clientSecret) {
    return NextResponse.json({ error: "Server not configured for TikTok" }, { status: 500 });
  }

  const params = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri,
    code_verifier: row.codeVerifier,
  });

  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  // Delete state so it can't be reused
  await prisma.pkceState.delete({ where: { id: row.id } }).catch(() => {});

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { error: "Token exchange failed", details: err },
      { status: 400 }
    );
  }

  const data = (await res.json()) as Record<string, unknown>;
  return NextResponse.json(data);
}
