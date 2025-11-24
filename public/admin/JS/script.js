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
