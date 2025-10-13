import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { randomBytes, randomUUID } from "crypto";

export const authOptions = {
    debug: true,
    session: {
        generateSessionToken: () => randomUUID?.() ?? randomBytes(32).toString('hex'),
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: 'consent',
            //         access_type: 'offline',
            //         response_type: 'code',
            //     }
            // },
            
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
