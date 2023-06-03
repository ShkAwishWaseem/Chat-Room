const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea =  document.querySelector('.message__area');
const sendBtn = document.querySelector("#sendBtn")
const cookies = document.cookie
.split(";")
.map(cookie => cookie.split("="))
.reduce((acum , [key,value])=> ({...acum , [key.trim()] : decodeURIComponent(value) }), {})
    // console.log(cookies.name)
name = cookies.name
sendBtn.addEventListener('click', ()=>{
    textMessage = textarea.value;
    sendMessage(textMessage);
})
function sendMessage(message){
    let msg = {
        user: name,
        message:message.trim()
    }

    //Append Message
    appendMessage(msg, 'outgoing');
    textarea.value = ' '
    scrollToBottom();


    //Send to Server 
    socket.emit('message', msg)
}


function appendMessage(msg, type)
{
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup ;
    messageArea.appendChild(mainDiv)
}


function scrollToBottom()
{
    messageArea.scrollTop = messageArea.scrollHeight;
}


//Recieve msg
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom()

})

