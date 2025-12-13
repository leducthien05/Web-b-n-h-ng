// ==================================Button Status========================================//
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);
    buttonStatus.forEach(button =>{
        button.addEventListener("click", (e) =>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status");
            }

            //Câu lệnh chuyển hướng sang URL mới
            window.location.href = url.href;
        });
    });
}

// ==================================Form Search========================================//
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
        console.log(e.target.elements.keyword.value);
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }else{
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}

// ==================================Pagination========================================//
const buttonPagation = document.querySelectorAll("[number-page]");
if(buttonPagation.length > 0){
    let url = new URL(window.location.href);
    buttonPagation.forEach(button =>{
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            const currentPage = button.getAttribute("number-page");
            if(currentPage){
                url.searchParams.set("page", currentPage);
            }else{
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    })
}


// ==================================Change Status========================================//

const ChangeStatus = document.querySelectorAll("[change-status]");
if(ChangeStatus.length > 0){
    const formchange = document.querySelector("[form-change-status]");
    const path = formchange.getAttribute("data-path");
    ChangeStatus.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const id = button.getAttribute("id");
            const status = button.getAttribute("status");
            let newStatus = status == "active" ? "inactive" : "active";
            const action = path + `${newStatus}/${id}?_method=PATCH`;
            console.log(action);
            formchange.action = action;
            formchange.submit();
        })
    })
}



// ==================================Change Multi========================================//
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const checkall = checkboxMulti.querySelector("[checkbox-all]");
    const checkbox = checkboxMulti.querySelectorAll("[checkbox-status]");
    checkall.addEventListener("click", ()=>{
        checkbox.forEach(item =>{
            item.checked = checkall.checked;
        });
    });
    checkbox.forEach(item =>{
        item.addEventListener("click", ()=>{
            const countchecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length;
            if(countchecked == checkbox.length){
                checkall.checked = true;
            }else{
                checkall.checked = false;
            }
        });
    });
}

//Form chage multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=>{ 
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputschecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked");
        const typechange = e.target.elements.status.value;//Lấy giá trị của hộp trọn hành động

        //Delete
        if(typechange == "delete-all"){
            const isconfirm = confirm("Bạn có chắc muốn xóa tất cả chứ?");

            if(!isconfirm){
                return;
            }
        }
        //Active and Inactive
        if(inputschecked.length > 0){
            const inputIDs = formChangeMulti.querySelector("input[name = 'ids']");
            let ids = [];
            inputschecked.forEach(item =>{
                const id = item.value;
                if(typechange == "position"){
                    const position = item.closest("tr").querySelector("input[name = 'position']").value;
                    ids.push(`${id}-${position}`);
                }else{
                    ids.push(id);
                }
            });
            inputIDs.value = ids.join(", ");
        }
        formChangeMulti.submit();
    });
}


// ==================================Delete Item========================================//
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
    const formDelete = document.querySelector("[form-delete]");
    const path = formDelete.getAttribute("data-path");
    buttonDelete.forEach(button =>{
        button.addEventListener("click", ()=>{
            const isconfirm = confirm("Bạn có chắc muốn xóa không?");
            if(isconfirm){
                const id = button.getAttribute("id");
                const action = path + `${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
        })
    });
}

// ==================================Show Alert========================================//

const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector(".close-alert");
    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden");
    })
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    }, time);
}

// ==================================Show Image========================================//
const uploadimage = document.querySelector("[upload-image]");
if(uploadimage){
    const uploadImageInput = uploadimage.querySelector("[upload-image-input]");
    const uploadImageImg = uploadimage.querySelector("[upload-image-img]");
    uploadImageInput.addEventListener("change", (e)=>{
        const file = e.target.files[0];
        if(file){
            uploadImageImg.src = URL.createObjectURL(file);
        }
    });
}

// ==================================Sort products========================================//
const selectSort = document.querySelector("[sort-select]");
if(selectSort){
    let url = new URL(window.location.href);
    const buttonClear = document.querySelector("[sort-clear]");
    selectSort.addEventListener("change", ()=>{
        
        const valueOption = selectSort.value;
        const [sortKey, sortValue] = valueOption.split("-");
        if(valueOption){
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
        }
        window.location.href = url.href;
    });
    buttonClear.addEventListener("click", ()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    });

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const string = sortKey + "-" + sortValue;
        const option = selectSort.querySelector(`option[value="${string}"]`);
        option.selected = true;
    }
}
