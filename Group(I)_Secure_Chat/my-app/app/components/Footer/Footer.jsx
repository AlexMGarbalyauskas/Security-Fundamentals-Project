//Footer 
//made by (Alex 22440482)



/* 1 */
//Imports 
import React from 'react';
import './Footer.css';
import { FaGithub } from "react-icons/fa";



/* 2 */
//Footer Component
const Footer = () => {
  return (
    <div>

      <div className='line-cut'></div> {/* Simple seperation line style*/}
      <div className='footer-container'>

        <div className='footer-section'> 
          <p>Footer@</p>
          <p>Security Team Project</p>
        </div>

        <div className='text'>
          <p>Find Project on GitHub</p>
        </div>

        <div className='logo'>
          <ul>
            <li>
              <a href='https://github.com/AlexMGarbalyauskas/Security-Fundamentals-Project'>
                <FaGithub className="icon" />
              </a>
            </li>
          </ul>
        </div>

      </div> {/* Footer container end*/}

    </div>
  );
};


export default Footer;
