import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";

//export { default } from 'next-auth/middleware'

export default withAuth(
    async function middleware(req: NextRequest) {
        const token = req.cookies.get('next-auth.session.token')?.value;
        const url = req.nextUrl.clone();
        console.log('TOKEN VAL', token)
        console.log('requisição', req)

        if(!token) {
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }

        const publicRoutes = ['/lggin', 'api/auth'];

        if(publicRoutes.some(publicRoute => req.nextUrl.pathname.startsWith(publicRoute))) {
            return NextResponse.next();
        }

        return NextResponse.next({ request: { headers: req.headers } });
    }
)

export const config = {
    matcher: [
        '/sales/(.*)',
    ]
}