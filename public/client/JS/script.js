const inputQuantity = document.querySelectorAll("[quantity]");
if(inputQuantity){
    inputQuantity.forEach(item =>{
       
        item.addEventListener("change", (e)=>{
            const newQuantity = item.value;
            const productId = item.getAttribute("item_id");

            const location = `/cart/edit/quantity/${productId}/${newQuantity}`;
            setTimeout(()=>{
                window.location.href = location;
            }, 1000);
            
        });
    });
    
}