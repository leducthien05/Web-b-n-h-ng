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
// ==================================End Button Status========================================//

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
// ==================================End Form Search========================================//

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
// ==================================End Pagination========================================//


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

// ==================================End Change Status========================================//


// ==================================Change Multi Status========================================//
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
        if(inputschecked.length > 0){
            const inputIDs = formChangeMulti.querySelector("input[name = 'ids']");
            let ids = [];
            inputschecked.forEach(item =>{
                const id = item.value;
                ids.push(id);
            });
            inputIDs.value = ids.join(", ");
        }
        
        formChangeMulti.submit();
    });
}

// ==================================End Change Multi Status========================================//
