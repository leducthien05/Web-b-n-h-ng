//CLIENT SEND MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    const divBody = document.querySelector(".chat .inner-body");
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", (content));
            e.target.elements.content.value = "";
            socket.on("SERVER_RETURN_TYPING", "hidden");
        }
    });
    // scroll xuống cuối
    divBody.scrollTop = divBody.scrollHeight;
}
//Show Typing
let timeout;
const showTyping = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "HIDEN");
    }, 5000);
}
//End Show Typing

//SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const divBody = document.querySelector(".inner-body");
    const myID = document.querySelector(".chat").getAttribute("my-id");
    const div = document.createElement("div");
    const listTyping = document.querySelector(".chat .inner-body .inner-list-typing");
    let html = ``;
    if (myID == data.userID) {
        div.classList.add("inner-outgoing");
    } else {
        html = `<div class="inner-name">${data.userName}</div>`
        div.classList = "inner-incoming";
    }
    div.innerHTML = `
        ${html}
        <div class="inner-content">${data.content}</div>
    `;
    divBody.insertBefore(div, listTyping);
    // scroll xuống cuối
    divBody.scrollTop = divBody.scrollHeight;
});

//Icon - emoji-picker-element
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

const btnIcon = document.querySelector("[button-icon]");
if (btnIcon) {
    const tooltip = document.querySelector(".tooltip");
    Popper.createPopper(btnIcon, tooltip);
    btnIcon.addEventListener("click", () => {
        tooltip.classList.toggle('shown');
    });
}

// icon message
const picker = document.querySelector("emoji-picker");
if (picker) {
    const input = document.querySelector(".chat .inner-form input[name='content']");
    picker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        input.value = input.value + icon;
        const end = input.value.length
        input.focus();
        input.setSelectionRange(end, end);
        showTyping();
        
    });
    //typing
    input.addEventListener("keyup", () => {
        if (input.value.trim() !== "") {
            socket.emit("CLIENT_SEND_TYPING", "show");
        }
        showTyping();
    });
}

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
    const divBody = document.querySelector(".inner-body");
    socket.on("SERVER_RETURN_TYPING", data => {
        if (data.type == "show") {
            const existTyping = elementListTyping.querySelector(`[user-id="${data.userID}"]`);
            if (!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userID);
                boxTyping.innerHTML = `
                    <div class="inner-name">${data.userName}</div>
                    <div class="typing-bubble">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;

                elementListTyping.appendChild(boxTyping);
            }
        } else {
            const elementRemove = elementListTyping.querySelector(`[user-id="${data.userID}"]`);
            if (elementRemove) {
                elementListTyping.removeChild(elementRemove);
            }
        }
        divBody.scrollTop = divBody.scrollHeight;

    });

}
// End SERVER_RETURN_TYPING