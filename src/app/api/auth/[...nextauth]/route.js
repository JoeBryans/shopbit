import NextAuth from "next-auth/next";
import { authOptions } from "../../../../auth";
const handler = NextAuth(authOptions);

// export const googleHandler =NextAuth(
//   googleProvider
// )
// export { googleHandler as GET, googleHandler as POST}
export { handler as GET, handler as POST };
