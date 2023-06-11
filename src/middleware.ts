export { default } from "next-auth/middleware";
//ass url started with UserPost
export const config = {
  matcher: ["/UserPost/:path*"],
};
