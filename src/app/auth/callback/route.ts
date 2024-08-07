import { NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

import path from 'path';
import { writeCache } from '../../../../cache/controller';

const cacheFilePath = path.join('/cache', 'spotify-access-tokens.json');
const cacheFilePath2 = path.join('/cache', 'spotify-refresh-tokens.json');

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/home'

  if (code) {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    if (session?.provider_refresh_token && session?.provider_token) {
      writeCache(session.provider_token, cacheFilePath)
      writeCache(session.provider_refresh_token, cacheFilePath2)
    }
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {

        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host


        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/?message=Could%20not%20login`)
}