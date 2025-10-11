//Cấu hình file index(đầu dự án)
const express = require('express');
const app = express();
const path = require("path");

//Cấu hình env
require("dotenv").config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🚀 Server chạy ở http://localhost:${port}`);
});
