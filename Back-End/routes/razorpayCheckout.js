const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function POST(req, res) {
  console.log(req.body.total);

  try {
    const order = await razorpay.orders.create({
      amount: req.body.total * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return res.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error in create order: ", error);
    return res.status(500).json({ error: error });
  }
}

module.exports = POST;
