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