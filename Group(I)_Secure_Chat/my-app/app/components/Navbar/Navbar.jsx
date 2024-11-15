/* 1 */
// Imports alongside Link which handles routes between components
import React from 'react';
import Link from 'next/link';
import './Navbar.css';




/* 2 */
// Navbar Component 
const Navbar = () => {
  return (

    <div className='Navbar-container'>

      <div className='title-sect'>
        <h1 className='head1'>Welcome to Secure Chat</h1>
      </div>
      
      <div className='navigation-links'>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/file">Decrypt Messages</Link></li>
        </ul>
      </div>

    </div> /* Navbat container end*/

  );
};




export default Navbar;
