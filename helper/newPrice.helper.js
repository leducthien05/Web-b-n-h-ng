module.exports.newPriceArray = (array)=>{
    const newProduct = array.map(item => {
        item.newPrice =  item.price * (1 - item.discountPercentage/100);
        return item;
    });

    return newProduct;
}

module.exports.newPrice = (record)=>{
    const newPrice =  record.price * (1 - record.discountPercentage/100);
    record.newPrice = newPrice;
    return record;
}
