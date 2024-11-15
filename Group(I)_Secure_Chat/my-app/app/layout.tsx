//Authentication Clerk library component importing and initializing 
//made by (Alex 22440482)



/* 1 */
//Clerk Import from Clerk Auth
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'




/* 2 */
//.env key //secret 
console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  

  
/* 3 */
//Foundation
  return (

    //Reads the .env.local secret key without posting the code 
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body>
          <header>

            {/* Clerk imports*/}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
