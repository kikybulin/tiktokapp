/** TikTok domain verification – /verify3/anything */
const BODY = "tiktok-developers-site-verification=mN4artWeTJIC14VzZqY9K1rR5iFTyIFU";

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
