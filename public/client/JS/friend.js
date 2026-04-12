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
        if (idUser == data.IDUser) {
            badgeAcceptFriends.innerHTML = data.newLength;
        }
    });
}

// End RETURN_LENGTH_ACCEPT_FRIEND

// RETURN_ACCEPT_FRIEND
const dataUserAccept = document.querySelector("[data-accept-friend]");
if (dataUserAccept) {
    socket.on("RETURN_ACCEPT_FRIEND", data => {
        console.log(data)
        const idUser = dataUserAccept.getAttribute("data-accept-friend");
        if (data.IDUser == idUser) {
            const divBody = document.querySelector(".friend-list");
            const div = document.createElement("div");
            div.setAttribute("user_id", data.infoUser._id);
            let html = `
                <div class="card friend-card mb-3">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <img class="friend-avatar" src=https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg>
                            <div class="ms-3">
                                <h6 class="mb-0">
                                    ${data.infoUser.username}
                                </h6>
                            </div>
                        </div>
                        <div class="d-flex gap-2 friend-actions add">
                            <button class="btn btn-secondary btn-sm btn-deleted">
                                Đã xóa
                            </button>
                            <button class="btn btn-primary btn-sm btn-accept" btn-accept-friend=${data.infoUser._id}>
                                Chấp nhận
                            </button>
                            <button class="btn btn-secondary btn-sm btn-refuse" btn-refuse-friend=${data.infoUser._id}>
                                Xóa
                            </button>
                            <div class="btn btn-info btn-sm btn-accepted">
                                Đã xác nhận
                            </div>
                        </div>
                    </div>
                </div>
            `;
            div.innerHTML = html;
            divBody.appendChild(div);

            // Từ chối lời mời kết bạn
            const btnRefuse = div.querySelector("[btn-refuse-friend]");
            btnRefuse.addEventListener("click", () => {
                const idFriendRefure = btnRefuse.getAttribute("btn-refuse-friend");
                const parent = btnRefuse.closest(".friend-actions");
                parent.classList.remove("add");
                parent.classList.add("refuse");
                socket.emit("CLIENT_REFUSE_REQUEST", idFriendRefure);
            });
            // Hết Từ chối lời mời kết bạn
            // Chấp nhận lời mời kết bạn
            const btnAccept = div.querySelector("[btn-accept-friend]");
            btnAccept.addEventListener("click", () => {
                const idFriendAccept = btnAccept.getAttribute("btn-accept-friend");
                const parent = btnAccept.closest(".friend-actions");
                parent.classList.remove("add");
                parent.classList.add("accepted");
                socket.emit("CLIENT_ACCEPT_REQUEST", idFriendAccept);
            });
            // Hết Chấp nhận lời mời kết bạn

        }

    });
}
// END RETURN_ACCEPT_FRIEND

// RETURN_CANCEL_REQUEST_FRIEND
socket.on("RETURN_CANCEL_REQUEST_FRIEND", data => {
    const idA = data.userIdA;
    const div = document.querySelector(`[user_id="${idA}"]`);
    if (div) {
        const dataUserAccept = document.querySelector("[data-accept-friend]");
        const idB = dataUserAccept.getAttribute("data-accept-friend");
        if (idB == data.userIdB) {
            dataUserAccept.removeChild(div);

        }
    }
});
// END RETURN_CANCEL_REQUEST_FRIEND