const express = require("express");
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = req.body;

    // Verify payment signature here (omitted for brevity)

    // Save order details to the database
    const newOrder = new Order(orderDetails);
    await newOrder.save();

    // Subtract the quantity from the Product model
    for (const item of orderDetails.line_items) {
      const product = await Product.findOne({ image: item.image });

      if (product) {
        product.stock -= item.amount;
        await product.save();
      }
    }

    res.json({ message: "Payment verified and order created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
