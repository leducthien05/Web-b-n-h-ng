// Chức năng gửi yêu cầu kết bạn
const btnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (btnAddFriend.length > 0) {
    btnAddFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const idFriend = btn.getAttribute("btn-add-friend");
            const parent = btn.closest(".friend-actions");
            parent.classList.add("add");
            socket.emit("SEND_FRIEND_REQUEST", idFriend)
        });
    });
}
socket.on("RETURN_REQUEST_FRIEND", data => {
    const divBody = document.querySelector(".friend-list");
    const div = document.createElement("div");
    let html = `
        <div class="card friend-card mb-3">
            <div class="card-body d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img class="friend-avatar" src=${data.infoUser.image}>
                <div class="ms-3">
                    <h6 class="mb-0">
                        ${data.infoUser.username}
                    </h6>
                </div>
            </div>
            <div class="d-flex gap-2 friend-actions add">
                <button class="btn btn-primary btn-sm btn-add" btn-add-friend=${data.infoUser.id}>
                    Kết bạn
                </button>
                <button class="btn btn-danger btn-sm btn-cancel" btn-cancel-friend=${data.infoUser.id}>
                    Hủy yêu cầu</button>
                </div>
            </div>
        </div>
    `;
    div.innerHTML = html;
    divBody.appendChild(div);
});

// Kết thúc chức năng yêu cầu kết bạn

// Chức năng hủy lời mời kết bạn
const btnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (btnCancelFriend.length > 0) {
    btnCancelFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const idCancelFriend = btn.getAttribute("btn-cancel-friend");
            const parent = btn.closest(".friend-actions");
            parent.classList.remove("add");
            socket.emit("SEND_CANCEL_FRIEND_REQUEST", idCancelFriend);
        });
    });
}
// // chỉ khai báo 1 lần ở ngoài
socket.on("RETURN_CANCEL_FRIEND", listID => {
    // tìm lại đúng button theo id
    const btn = document.querySelector(`[btn-cancel-friend="${listID.IdReq}"]`);
    if (!btn) return;
    const parent = btn.closest(".friend-actions");
    if (parent) {
        parent.classList.remove("add");
    }
});
// End Chức năng hủy lời mời kết bạn

// Chức năng từ chối yêu cầu
const listBtnRefureFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefureFriend.length > 0) {
    listBtnRefureFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const idFriendRefure = btn.getAttribute("btn-refuse-friend");
            const parent = btn.closest(".friend-actions");
            parent.classList.remove("add");
            parent.classList.add("refuse");
            socket.emit("CLIENT_REFUSE_REQUEST", idFriendRefure);
        });
    });
}
// Hết Chức năng từ chối yêu cầu

// Chức năng chấp nhận yêu cầu
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const idFriendAccept = btn.getAttribute("btn-accept-friend");
            const parent = btn.closest(".friend-actions");
            parent.classList.remove("add");
            parent.classList.add("accepted");
            socket.emit("CLIENT_ACCEPT_REQUEST", idFriendAccept);
        });
    });
}
// Hết Chức năng chấp nhận yêu cầu

// RETURN_LENGTH_ACCEPT_FRIEND
const badgeAcceptFriends = document.querySelector("[badge-users-accept]");
if (badgeAcceptFriends) {
    const idUser = badgeAcceptFriends.getAttribute("badge-users-accept");
    socket.on("RETURN_LENGTH_ACCEPT_FRIEND", data => {
        if(idUser == data.IDUser){
            badgeAcceptFriends.innerHTML = data.newLength;
        }
    });
}

// End RETURN_LENGTH_ACCEPT_FRIEND