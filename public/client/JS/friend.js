// Chức năng gửi yêu cầu kết bạn
const btnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(btnAddFriend.length > 0){
    btnAddFriend.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            const idFriend = btn.getAttribute("btn-add-friend");
            const parent = btn.closest(".friend-actions");
            parent.classList.add("add");
            socket.emit("SEND_FRIEND_REQUEST", idFriend)
        });
    });
}

const btnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(btnCancelFriend.length > 0){
    btnCancelFriend.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            console.log("OK");
        });
    });
}
// Kết thúc chức năng yêu cầu kết bạn