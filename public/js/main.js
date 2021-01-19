const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');

//user and room entry
const { username, room} = Qs.parse(location.search);
ignoreQueryPrefix: true

console.log(username, room);

const socket = io();

//join chatroom
socket.emit('joinRoom', { username, room });

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll down when message sent
     chatMessage.scrollTop = chatMessage.scrollHeight
});


//sent message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);
   
   
    //clear input
e.target.elements.msg.value = '';
e.target.elements.msg.focus();



    
})



//message output
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
};