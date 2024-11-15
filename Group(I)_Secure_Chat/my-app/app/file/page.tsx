//Pages are used to help navigate between components 

/* 1 */
//Imports 
import Navbar from '../components/Navbar/Navbar.jsx'
import DecryptPage from '../components/DecryptPage/DecryptPage.jsx'
import Footer from '../components/Footer/Footer.jsx'




/* 2 */
//Title of the browser page 
export const metadata = {
  title: 'Decryption', //title
  icons: {
    icon: '/logo-svg.svg', //logo
  },  
};




/* 3 */
//app/file/page.tsx
export default function file() {
    return (
        <div>
            <Navbar/>
            <DecryptPage/> 
            <Footer/> 
        </div>
    );
}