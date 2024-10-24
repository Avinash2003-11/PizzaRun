const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pizzaOrders').then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("database connection failure");
});

// Define the order schema
const orderSchema = new mongoose.Schema({
    username: String,
    phoneno: Number,
    pizzaName: String,
    price: Number,
    address: String,
    orderId: String,  
    orderDate: { type: Date, default: Date.now }
});


const Order = mongoose.model('Order', orderSchema);


app.get('/orders', async (req, res) => {
    const data = await Order.find();
    res.json({ status: true, data });
});


app.post('/order', async (req, res) => {
    const { username, phoneno, pizzaName, price, address } = req.body;

    
    if (!username || !phoneno || !pizzaName || !price || !address) {
        return res.status(400).json({ status: false, message: "All fields are required" });
    }

    
    const newOrder = new Order({
        username,
        phoneno,
        pizzaName,
        price,
        address,
        orderId: uuidv4(),  
    });

    
    const response = await newOrder.save();

    
    res.json({
        status: true,
        message: `Order placed successfully for ${pizzaName}`,  
        orderDetails: {
            pizzaName,
            price,
            address,
            orderId: response.orderId,
            orderDate: response.orderDate,
        }
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
