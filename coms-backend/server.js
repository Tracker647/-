const express = require("express");
const cors = require("cors");


const app = express();

// 设置前端的服务器URL为同源
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



const initModels = require("./models/init-models");
const { sequelize } = require("./config/sequelize.config");
const db = initModels(sequelize);

db.seqConfig.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");

});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "客户订单管理系统后端待命。" });
});

require('./routes/init-routes')(app);


// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

