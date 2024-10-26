
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
    username: String,
    phoneno: Number,
    pizzaName: String,
    price: Number,
    address: String,
    orderId: { type: String, default: uuidv4 },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
