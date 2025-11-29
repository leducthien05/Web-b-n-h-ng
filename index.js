//Cấu hình file index(đầu dự án)
const express = require('express');
const app = express();
const path = require("path");

//Cấu hình method-override
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

// Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser('Thienle'));

// Session
const session = require('express-session');
app.use(session({
    secret: 'Thienle',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,  // local dùng HTTP nên phải để false
        maxAge: 60000
    }
}));

// Flash
const flash = require('express-flash');
app.use(flash());


//Cấu hình bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Cấu hình env
require("dotenv").config();
const port = process.env.PORT;

//Cài đặt mongoose
const database = require("./config/database");
database.connect();

//Cấu hình Pug vào dự án
app.set("views", "./view");//Đọc file PUG ở thư mục view
app.set("view engine", 'pug');//Khai báo dự án sử dụng template: PUG

//Biến local
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Cấu hình file tĩnh
app.use(express.static(`${__dirname}/public`));

//Cấu hình Router 
const router = require("./router/admin/index.router");
const routerClient = require("./router/client/index.router");

//Gọi hàm sử dụng router
routerClient(app);
router(app);

app.listen(port, () => {
  console.log(`🚀 Server chạy ở http://localhost:${port}`);
});
