//CLIENT SEND MESSAGE
const divBody = document.querySelector(".chat .inner-body");
const pond = FilePond.create(document.querySelector('.filepond'), {
    allowMultiple: true,
    imagePreviewHeight: 120,
    allowImagePreview: true,
    allowImageExifOrientation: true,
    instantUpload: false
});
setTimeout(() => {
    divBody.scrollTop = divBody.scrollHeight;
}, 0);
//====Clear preview
//====End clear preveiw
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", async (e) => {
        e.preventDefault();
        const files = pond.getFiles();
        const buffers = [];
        for (let item of files) {
            const file = item.file;
            const arrayBuffer = await file.arrayBuffer();
            buffers.push(
                arrayBuffer
            );
        }
        const content = e.target.elements.content.value;
        if (content || buffers.length > 0) {
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                image: buffers
            });
            e.target.elements.content.value = "";
            pond.removeFiles();
            clearPreview();
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    });
}
//Show Typing
let timeout;
const showTyping = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 5000);
}
//End Show Typing

//SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const divBody = document.querySelector(".inner-body");
    const myID = document.querySelector(".chat").getAttribute("my-id");
    const div = document.createElement("div");
    const listTyping = document.querySelector(".chat .inner-body .inner-list-typing");
    let html = "";
    let htmlContent = "";
    let htmlImage = "";

    if (myID == data.userID) {
        div.classList.add("inner-outgoing");
    } else {
        html = `<div class="inner-name">${data.userName}</div>`;
        div.classList.add("inner-incoming");
    }

    if (data.content) {
        htmlContent = `<div class="inner-content">${data.content}</div>`;
    }
    console.log("image:", data.image);
    console.log("isArray:", Array.isArray(data.image));
    if (data.image && data.image.length > 0) {
        htmlImage += `<div class="inner-images">`;

        for (const item of data.image) {
            htmlImage += `<img src="${item}">`;
        }

        htmlImage += `</div>`;
    }

    div.innerHTML = `
        ${html}
        ${htmlContent}
        ${htmlImage}
    `;
    divBody.insertBefore(div, listTyping);
    //Preview full image
    const gallery = new Viewer(div);
    // scroll xuống cuối
    divBody.scrollTop = divBody.scrollHeight;
});

//===============click upload image by lable
const lableUpload = document.querySelector(".chat .inner-foot [lable-upload]");
const input = document.getElementById("upload-filepond");
const preview = document.getElementById("preview-container");
if (lableUpload) {
    lableUpload.addEventListener("click", () => {
        pond.browse();
    });
}
function clearPreview() {
    preview.innerHTML = "";   // xoá toàn bộ ảnh preview
    selectedFiles = [];       // xoá danh sách file
    input.value = "";         // reset input
}
if(input){
// khi chọn ảnh → preview
input.addEventListener("change", (e) => {
    preview.innerHTML = ""; // reset (nếu muốn giữ thì bỏ dòng này)

    const files = e.target.files;

    for (let file of files) {
        if (!file.type.startsWith("image/")) continue;

        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("preview-image");

            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});
}

//=================End click upload image by lable

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

// Preview-full-image
const bodyChatPreviewImage = document.querySelector(".chat .inner-body");
if(bodyChatPreviewImage){
    const gallery = new Viewer(bodyChatPreviewImage);
}