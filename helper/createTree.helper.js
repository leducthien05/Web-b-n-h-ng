let count = 0;

const createTree = (arr, parent_ID="")=>{
     //Khai báo mảng chứa
    const tree = [];
    //Lặp qua từng phần tử trong mảng để đệ quy
    arr.forEach(item =>{
        //Lấy biến lưu
        const newItem = item;
        //Tìm phần tử cha đầu tiên
        if(item.parent_ID === parent_ID){
            count++;
            newItem.index = count;
            //Đệ quy tìm phần tử con
            const children  = createTree(arr, item.id);
            if(children.length > 0){
                item.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports.tree = (arr, parent_ID = "")=>{
    count = 0;
    const tree = createTree(arr, parent_ID = "");
    return tree;
}