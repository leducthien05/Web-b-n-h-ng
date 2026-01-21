const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");
const Cart = require("../../model/cart.model");

const searchHelper = require("../../helper/search.helper");
const priceHelper = require("../../helper/newPrice.helper");

module.exports.cart = async (req, res) => {
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
    res.render("client/page/cart/index", {
        titlePage: "Giỏ hàng",
        cart: cart
    });
}

module.exports.addPost = async (req, res) => {
    try {
        const idCart = req.cookies.cartID;
        const idProduct = req.params.id;
        const quantityProduct = Number(req.body.quantity);

        const cart = await Cart.findOne({
            deleted: false,
            _id: idCart
        });
        const existProduct = cart.products.find(item => item.product_id == idProduct);

        if(existProduct){
            const quantity = existProduct.quantity + quantityProduct;
            await Cart.updateOne({
                _id: idCart,
                "products.product_id": idProduct
            }, {
                $set: {
                    "products.$.quantity": quantity
                }
            });
            res.redirect(req.get("referer") || "/");

        }else{
            const objectProduct = {
                product_id: idProduct,
                quantity: quantityProduct
            }

            await Cart.updateOne(
                {
                    _id: idCart
                },
                {
                    $push: { products: objectProduct }
                }
            );
            req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");

            res.redirect(req.get("referer") || "/");

        }


    } catch (error) {
        console.log(error);
        res.redirect(req.get("referer") || "/");

    }
}

