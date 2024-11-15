//Middleware
//Added by (Alex 22440482)

import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    //Skips next.js internals and all static files, unless found in search params
    '/((?!_next|static|favicon.ico).*)',
     //Always run for the API routes
    '/(api|trpc)(.*)',
  ],
}