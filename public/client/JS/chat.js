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

