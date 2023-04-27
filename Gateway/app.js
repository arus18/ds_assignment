const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Config = require("./config");
const axios = require('axios');
// Middleware
app.use(cors());
app.use(bodyParser.json());

const authController = require("./routes/auth");
const itemController = require("./routes/item");
const orderController = require("./routes/order");
const userController = require("./routes/user");
const paymentController = require("./routes/payment");
//const thirdPartyController = require("./routes/thirdParty");
app.use("/auth", authController);
app.use("/items", itemController);
app.use("/orders", orderController);
app.use("/users", userController);
app.use("/payments",paymentController);
app.get("/health", async (req, res) => {
  console.log("/health hit")
  let resp = [
    { service: "auth", message: false, status: "", endpoint: Config.AUTH_SERVICE },
    { service: "order", message: false, status: "", endpoint: Config.ORDER_SERVICE },
    { service: "user", message: false, status: "", endpoint: Config.USER_SERVICE },
    { service: "item", message: false, status: "", endpoint: Config.ITEM_SERVICE },
  ];

  let result = await Promise.allSettled(resp.map(v => v.endpoint));

  let lRres = resp.map((value, index) => {
    value.message = result[index].value;
    value.status = result[index].status;

    return value;
  });

  res.json(lRres);
});
//app.use('/delivery-payment',thirdPartyController);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
