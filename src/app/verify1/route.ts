/** TikTok domain verification – /verify1 (and /verify1/...) */
const BODY = "tiktok-developers-site-verification=XJPIWZEecfGbl6gkwHdHijnUsvC58Mrq";

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
