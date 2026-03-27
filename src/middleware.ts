import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    // Match all admin routes except the login page
    "/admin/((?!login).*)",
    "/admin", // Also match the base /admin path
    "/api/admin/:path*",
  ],
};
