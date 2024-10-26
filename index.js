require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const authenticateToken = require('./middleware/authMiddleware');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pizzaOrders', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Database connection failure", err));


app.post('/register', authController.register);
app.post('/login', authController.login);


app.get('/orders', authenticateToken, orderController.getOrders);
app.post('/order', authenticateToken, orderController.createOrder);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
