/* 1 */
//Indicator that this component should be shown on the client side 
'use client';  




/* 2 */
//Importing necessary hooks 
import React, { useState, useEffect } from 'react';

//Encryption import from library
import CryptoJS from 'crypto-js';

//Other imports 
import io from 'socket.io-client';
import './Chat.css';
import Footer from '../Footer/Footer.jsx';
import Navbar from '../Navbar/Navbar.jsx';




/* 3 */
//Socket Link with local host 5000 that connects from the chat-server folder
const socket = io('http://localhost:5000'); 




/* 4 */
//made by (Prathibha 22120360)
//Encryption function using AES encryption from Crypto-JS library
const encryptMessage = (text, secretKey) => {
  const iv = CryptoJS.lib.WordArray.random(16); 
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Hex.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7,
  });

  //the iv slongside the ciphertext
  return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
};




/* 5 */
// made by (Idil 22117717)
// Helper function to format timestamp, showcases at what tine the message was sent 
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};




/* 6 */
//Saves the messages, chosen username and has boolean indicator 
const Chat = () => {


  //Chat
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);


  //saves the encryption and processes the secrey key 
  const [isEncrypted, setIsEncrypted] = useState(false);
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;


  //turn encryption on for sending encrypted messages
  const toggleEncryption = () => setIsEncrypted(!isEncrypted);




/* 7 */
  //Hook for message listening 
  useEffect(() => {
    //Listen for incoming messages from the server
    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]); //Add new message to state when received from the server
    });

    return () => {
      socket.off('chatMessage'); //cleans 
    };
  }, []);




/* 8 */
  //Handles sending messages 
  const handleSendMessage = () => {
    if (message.trim() && username) {
      const timestamp = new Date().getTime();  // Get current timestamp
      const textToSend = isEncrypted ? encryptMessage(message, secretKey) : message;
      const newMessage = { 
        user: username, 
        text: textToSend, 
        timestamp,  // Add timestamp to message
        deliveredAt: formatTimestamp(timestamp)  // Format timestamp for display
      };
  
      // Emit the message to the server
      socket.emit('chatMessage', newMessage);
  
      // Clear the input field after sending
      setMessage('');
    }
  };




/* 9 */
  //Handles setting your username 
  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };




/* 10 */
  //Main JSX HTML foundation 
  return (

    //container for all 
    <div>


      {/* Importing Navbar */}
      <Navbar />


      {/* Background */}
      <div className="background">


        {/* Chat container box */}
        <div className="chat-container">


          <div className="nav-bar">
            <h2>Live Chat</h2>
          </div> {/* nav-bar end */}


          {/* username input section */}
          {!isUsernameSet ? (
            <div className="username-prompt">
              <div className="texth3">
                <h3>Enter your name to start chatting</h3>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
              />
              <button onClick={handleSetUsername}>Set Name</button>
            </div> /* usernmar-prompt end*/

          ) : (

            <>

              {/* Messages area */}
              <div className="messages-area">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.user === username ? 'user-message' : 'other-message'}`}
                  >
                    <strong>{msg.user}:</strong> {msg.text}
                    <span className="timestamp">
                      ({msg.deliveredAt} Delivered)
                    </span>

                  </div>
                ))}
              </div> {/* message area end */}


              {/* Sender area */}
              <div className="sender-area">
                <div className="input-place">
                  <input
                    placeholder="Send a message."
                    className="send-input"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button onClick={toggleEncryption}> {isEncrypted ? 'Disable' : 'Encrypt'} </button>
                  <button onClick={handleSendMessage}>Send</button>
                </div>                               
              </div> {/* sender-area end*/}
            </>
          )}
        </div>


      </div> {/* Background end*/}


      {/* Footer import */}
      <Footer /> 


    </div> /* div whole end*/
  );
};




export default Chat;