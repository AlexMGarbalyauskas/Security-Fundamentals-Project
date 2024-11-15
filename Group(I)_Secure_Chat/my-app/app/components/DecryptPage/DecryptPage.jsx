//decryptPage
//made by (Rediet 21238383)




/* 1 */
//shown on the client side
'use client'; 




/* 2 */
//import
import React, { useState } from 'react';
import './DecryptPage.css';
import CryptoJS from 'crypto-js';





/* 3 */
//function to decrypt the encrypted message 
const decryptMessage = (text, secretKey) => {
  try {
    const rawData = CryptoJS.enc.Base64.parse(text);
    const iv = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4));
    const ciphertext = CryptoJS.lib.WordArray.create(rawData.words.slice(4));

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      CryptoJS.enc.Hex.parse(secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      throw new Error('Decryption failed');
    }
    return decryptedText;
  } catch (error) {
    return null; 
    //return null if decryption fails
  }
};





/* 4 */
//decrypt message component
const DecryptMessages = () => {
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error state
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;





/* 5 */
  //decryption
  const handleDecrypt = () => {
    if (encryptedText.trim()) {
      const decryptedText = decryptMessage(encryptedText, secretKey);
      if (decryptedText) {
        setDecryptedMessage(decryptedText);
        setErrorMessage(''); 
      } else {
        setErrorMessage('Sorry, wrong text. Decryption failed.'); 
        //dhow error message
        setDecryptedMessage(''); //clean 
      }
    }
  };





/* 6 */
//main
  return (
    <div className="decrypt-container">
      <h3>Paste your encrypted messages here</h3>
      
      {/* Textarea for pasting encrypted message */}
      <textarea 
        value={encryptedText} 
        onChange={(e) => setEncryptedText(e.target.value)}
        placeholder="Paste encrypted messages"
        rows="6"
        cols="50" 
      />
      
      <div className="decrypt-button">
        <button onClick={handleDecrypt}>Decrypt Message</button>
      </div>
      
      {/* Display decrypted message */}
      {decryptedMessage && (
        <div className="decrypted-output">
          <h4> Decrypted Message: </h4>
          <p> {decryptedMessage} </p>
        </div>
      )}

      {/* Display error message */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};





/* 7 */
//file Encryption Component Page
const FileEncrypt = () => {
  return (
    <div className="background-file">
      <div className="FileEncrypt-container">
        <div className="file-text">
          <h4 className="para">Decrypt messages here</h4>
        </div>
        <DecryptMessages /> {/* decryptMessages component */}
      </div>
    </div>
  );
};




export default FileEncrypt;
