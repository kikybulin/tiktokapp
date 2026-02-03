/** TikTok domain verification – /verify2/anything */
const BODY = "tiktok-developers-site-verification=VPaKtfErufTWFfbHGYworLvhcU9hGKHz";

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
