//CLIENT SEND MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    const divBody = document.querySelector(".chat .inner-body");
    formSendData.addEventListener("submit", (e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE", (content));
            e.target.elements.content.value = "";
        }
    });
    // scroll xuống cuối
    divBody.scrollTop = divBody.scrollHeight;
}

//SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data)=>{
    const divBody = document.querySelector(".inner-body");
    const myID = document.querySelector(".chat").getAttribute("my-id");
    const div = document.createElement("div");
    let html = ``;
    if(myID == data.userID){
        div.classList.add("inner-outgoing");
    }else{
        html = `<div class="inner-name">${data.userName}</div>`
        div.classList = "inner-incoming";
    }
    div.innerHTML = `
        ${html}
        <div class="inner-content">${data.content}</div>
    `;
    divBody.appendChild(div);
    // scroll xuống cuối
    divBody.scrollTop = divBody.scrollHeight;
});

//Icon - emoji-picker-element
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

const btnIcon = document.querySelector("[button-icon]");
if(btnIcon){
    const tooltip = document.querySelector(".tooltip");
    Popper.createPopper(btnIcon, tooltip);
    btnIcon.addEventListener("click", () => {
        tooltip.classList.toggle('shown');  
    });
}

// icon message
const picker = document.querySelector("emoji-picker");
if(picker){
    const input = document.querySelector(".chat .inner-form input[name='content']");
    picker.addEventListener("emoji-click", (event)=>{
        const icon = event.detail.unicode;
        input.value = input.value + icon;
    });
    //typing
    input.addEventListener("keyup", ()=>{
        if(input.value.trim() !== ""){
            socket.emit("CLIENT_SEND_TYPING", "shown");
        } 
    });
}

//SERVER_RETURN_TYPING
socket.on("SERVER_RETURN_TYPING", mess =>{
    console.log(mess);
})
