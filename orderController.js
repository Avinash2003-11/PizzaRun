const order = require('../models/orderschema')

exports.getOrders = async (req, res) => {
    const data = await Order.find();
    res.json({ status: true, data });
};

exports.createOrder = async (req, res) => {
    const { username, phoneno, pizzaName, price, address } = req.body;

    if (!username || !phoneno || !pizzaName || !price || !address) {
        return res.status(400).json({ status: false, message: "All fields are required" });
    }

    try {
        const newOrder = new Order({ username, phoneno, pizzaName, price, address });
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
    } catch (error) {
        res.status(500).json({ status: false, message: "Order creation failed. Try again." });
    }
};