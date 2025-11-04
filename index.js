//Cấu hình file index(đầu dự án)
const express = require('express');
const app = express();
const path = require("path");

//Cấu hình env
require("dotenv").config();
const port = process.env.PORT;

//Cấu hình Pug vào dự án
app.set("views", "./view");//Đọc file PUG ở thư mục view
app.set("view engine", 'pug');//Khai báo dự án sử dụng template: PUG

//Cấu hình Router 
const router = require("./router/admin/index.router");
const routerClient = require("./router/client/index.router");

//Gọi hàm sử dụng router
routerClient(app);

app.listen(port, () => {
  console.log(`🚀 Server chạy ở http://localhost:${port}`);
});
