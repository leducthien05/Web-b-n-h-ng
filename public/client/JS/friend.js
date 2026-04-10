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

// Kết thúc chức năng yêu cầu kết bạn

// Chức năng hủy lời mời kết bạn
const btnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(btnCancelFriend.length > 0){
    btnCancelFriend.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            const idCancelFriend = btn.getAttribute("btn-cancel-friend");
            console.log(typeof(idCancelFriend));
            const parent = btn.closest(".friend-actions");
            parent.classList.remove("add");
            socket.emit("SEND_CANCEL_FRIEND_REQUEST", idCancelFriend)
        });
    });
} 
// End Chức năng hủy lời mời kết bạn
