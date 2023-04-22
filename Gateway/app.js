const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const authController = require('./routes/auth');
const itemController = require('./routes/item');
const orderController = require('./routes/order');
const userController = require('./routes/user');
const thirdPartyController = require('./routes/thirdParty');
app.use('/auth', authController);
app.use('/items', itemController);
app.use('/orders',orderController);
app.use('/users',userController);
app.get("/health", (req, res) => {
    res.json({
        message: "i'm fine. 😊" 
    })
})
//app.use('/delivery-payment',thirdPartyController);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));