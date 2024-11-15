//Pages used to navigate between componenets 
//made by (Alex 22440482)


/* 1 */
//Imports 
import { SignedIn } from '@clerk/nextjs';
import Chat from './components/Chat/Chat.jsx'; 




/* 2 */
//Title of the browser page 
export const metadata = {
  title: 'Home Chat', // title
  icons: {
    icon: '/logo-svg.svg', // logo'
  },  
};



/* 3 */
//Main display 
export default function Home() {
  return (
    <div> 
      <div> 
        <SignedIn>
          <Chat />
        </SignedIn>
      </div>
    </div>
  );
}
