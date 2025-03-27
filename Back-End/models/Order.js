const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    zip: String,
    address: String,
    paid: Boolean,
    total_price: Number,
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
