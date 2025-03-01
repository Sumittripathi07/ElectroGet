const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const productRoutes = require("./routes/productRoutes.js");
const razorpayRoutes = require("./routes/razorpayRoutes.js");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using connection.js
connectDB();

app.use("/api/products", productRoutes);
app.use("/api/razorpay", razorpayRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
