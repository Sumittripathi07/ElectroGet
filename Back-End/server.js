require("dotenv").config(); // Ensure this is at the top!
const express = require("express");
const connectDB = require("./db/connection");
const productRoutes = require("./routes/productRoutes.js");
const razorpayRoutes = require("./routes/razorpayRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use("/api/products", productRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
