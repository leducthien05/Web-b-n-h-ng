module.exports.chat = async (req, res)=>{
    res.render("client/page/chat/index", {
        titlePage: "Liên hệ"
    })
}