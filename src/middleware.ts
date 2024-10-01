import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'
import { IsAuthorized } from '@/providers/SupaBase-methods/user-action'
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {

  const data = await IsAuthorized()

  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (!user) {

    return NextResponse.redirect(new URL('../', request.url));
  }
  return response;

}
export const config = {
  matcher: [
    '/search(.*)',
    '/settings(.*)',
    '/album(.*)',
    '/artist(.*)',
    '/collection(.*)',
    '/home(.*)',
    '/section(.*)',
    '/track(.*)',
    '/playlist(.*)',
  ],
}