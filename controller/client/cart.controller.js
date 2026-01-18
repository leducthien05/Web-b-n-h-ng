const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");
const searchHelper = require("../../helper/search.helper");
const Cart = require("../../model/cart.model");


module.exports.cart = async (req, res) => {
    res.send("OK");
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

