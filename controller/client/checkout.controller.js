const Order = require("../../model/order.model");
const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");

const priceHelper = require("../../helper/newPrice.helper");

module.exports.checkout = async (req, res)=>{
    const cartID = req.cookies.cartID;
    const cart = await Cart.findOne({
        _id: cartID,
    });
    if(cart.products.length > 0){
        for (const item of cart.products) {
            const id = item.product_id;
            const record = await Product.findOne({
                _id: id,
                status: "active",
                deleted: false
            }).select("title image price slug discountPercentage stock");
            const newRecord = priceHelper.newPrice(record);
            item.product = newRecord;
            const sumPrice = item.quantity * item.product.newPrice;
            item.product.sumPrice = sumPrice;
        }
    }
    cart.totalPrice = cart.products.reduce((sum, item) => {return sum + item.product.sumPrice}, 0);
    res.render("client/page/checkout/index", {
        titlePage: "Thanh toán",
        cart: cart
    });
}

module.exports.order = async (req, res)=>{
    const infor = req.body;
    const cartID = req.cookies.cartID;
    const cart = await Cart.findOne({
        _id: cartID
    });
    const arrayProduct = [];
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.product_id
        }).select("price discountPercentage");
        const objectProduct = {
            product_id: item.product_id,
            price: product.price,
            discountPercentage: product.discountPercentage,
            quantity: item.quantity
        }
        arrayProduct.push(objectProduct);

    }


    const record = {
        userInfo: infor,
        product:arrayProduct
    }
    const order = new Order(record);
    await order.save();

    await Cart.updateOne({
        _id: cartID
    }, {
        products: []
    })
    res.redirect(`/checkout/success/${order._id}`);
}

module.exports.checkoutSuccess = async (req, res)=>{
    const orderID = req.params.idOrder;
    const order = await Order.findOne({
        _id: orderID
    });
    for (const item of order.product) {
        const product = await Product.findOne({
            _id: item.product_id
        }).select("title image");
        item.productInfo = product;
        item.priceNew = priceHelper.newPrice(item);
        item.sumPrice = item.price * item.discountPercentage;
    }
    order.totalPrice = order.product.reduce((sum, item) => sum + item.sumPrice, 0);
    res.render("client/page/checkout/success", {
        title: "Đặt hàng thành công",
        order: order
    });
}