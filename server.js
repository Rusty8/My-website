

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { emit, disconnect } = require('process');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');
const app = express();
const server = http.createServer(app);

const io = socketio(server);



//set static folder
app.use(express.static(path.join(__dirname, 'public')));
const botname = 'party Bot';
//will run when ip connects
io.on('connection', socket => {
socket.on('joinRoom', ({ username, room }) => {
const user = userJoin(socket.id, username, room);
socket.join(user.room);
    socket.emit('message',formatMessage (botname,'Welcome to the party club'));
    //broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage (botname, `${user.username} has joined the chat`));
    
});
//listen for chat message
socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)
io.to(userRoom)('message',formatMessage('USER', msg));
});
//when a user disconnects
socket.on('disconnect', () => {
    io.to(user.room).emit('message',formatMessage (botname, `${user.username}has left the chat`));
});
    
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

