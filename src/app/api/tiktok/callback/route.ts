import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isMockTikTok } from "@/lib/tiktok-auth";

const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard/tiktok?error=${encodeURIComponent(error)}`, req.url)
    );
  }

  if (isMockTikTok()) {
    // Mock: create a fake connection so demo flow is visible
    await prisma.tiktokConnection.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        accessToken: "mock_access_token_demo",
        scope: process.env.TIKTOK_SCOPES ?? "user.info.basic,video.list",
        openId: "mock_open_id",
      },
      update: {
        accessToken: "mock_access_token_demo",
        scope: process.env.TIKTOK_SCOPES ?? "user.info.basic,video.list",
        openId: "mock_open_id",
      },
    });
    return NextResponse.redirect(new URL("/dashboard/tiktok?connected=1", req.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/dashboard/tiktok?error=no_code", req.url));
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  if (!clientKey || !clientSecret || !redirectUri) {
    return NextResponse.redirect(new URL("/dashboard/tiktok?error=config", req.url));
  }

  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.redirect(
      new URL(`/dashboard/tiktok?error=${encodeURIComponent(err)}`, req.url)
    );
  }

  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
    open_id?: string;
  };

  const accessToken = data.access_token;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/dashboard/tiktok?error=no_token", req.url));
  }

  const expiresAt = data.expires_in
    ? new Date(Date.now() + data.expires_in * 1000)
    : null;

  await prisma.tiktokConnection.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      accessToken,
      refreshToken: data.refresh_token ?? null,
      expiresAt,
      scope: data.scope ?? null,
      openId: data.open_id ?? null,
    },
    update: {
      accessToken,
      refreshToken: data.refresh_token ?? null,
      expiresAt,
      scope: data.scope ?? null,
      openId: data.open_id ?? null,
    },
  });

  return NextResponse.redirect(new URL("/dashboard/tiktok?connected=1", req.url));
}
