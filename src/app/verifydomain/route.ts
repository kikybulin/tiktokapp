/**
 * TikTok domain verification – serve verification string at /verifydomain/
 * See: TikTok for Developers → App → Website configuration
 */
const VERIFICATION = "tiktok-developers-site-verification=UXBo5IWk9SPPpcmWnWhaI4PKYlNqsBvE";

export function GET() {
  return new Response(VERIFICATION, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
