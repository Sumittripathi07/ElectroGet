const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    company: String,
    price: Number,
    colors: [String],
    image: String,
    description: String,
    category: String,
    featured: Boolean,
    shipping: Boolean
});

module.exports = mongoose.model('Product', productSchema);