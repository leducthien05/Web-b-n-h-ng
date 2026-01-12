const Category= require("../model/category-product.model");

module.exports.getSubCategoryID = async (parentID)=>{
    const getSubCategory = async (parentID)=>{
        const subs = await Category.find({
            deleted: false,
            status: "active",
            parent_ID: parentID
        });

        let allSubs = [...subs];

        for (const item of allSubs) {
            const childs = await getSubCategory(item._id);
            allSubs = allSubs.concat(childs);
        }

        return allSubs;
    }

    const listcategory = await getSubCategory(parentID);
    return listcategory;
}