const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB using connection.js
connectDB();

app.use('/api/products', productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));