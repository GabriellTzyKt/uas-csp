import { NextResponse,type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './lib/supabaseClient'

export async function proxy(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    // TUGAS HANYA SATU: TENDANG KALAU ILEGAL
    if (!user) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         Match all request paths except for the ones starting with:
         - _next/static (static files)
         - _next/image (image optimization files)
         - favicon.ico (favicon file)
         Feel free to modify this pattern to include more paths.
        */
        '/((?!api|signin|signup|_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest|workbox-|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}