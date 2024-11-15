//Server JS
//made by (Alex 22440482)



/* 1 */
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');



/* 2 */
//Starting the express 
const app = express();
const server = http.createServer(app);



/* 3 */ 
//Initializing Socket.io alongside cors 
const io = socketIo(server, {
  cors: {
    //allows react app into localhost 3000
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});



/* 4 */ 
//Using cors middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));



/* 5 */
//When a user connects to the server
io.on('connection', (socket) => {
  console.log('A user connected');
  



/* 6 */
//Listen for incoming chat messages and emit them to all clients
socket.on('chatMessage', (msg) => {
  console.log('Message received:', msg); //Logging the messages into the terminal 
  io.emit('chatMessage', msg); //Emiting messages to each connected user client 
});



/* 7 */
//User disconnection 
//dont remove from bracket server
socket.on('disconnect', () => {
  console.log('A user disconnected');
});
});



/* 8 */ 
//the port for the server to listen to
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
