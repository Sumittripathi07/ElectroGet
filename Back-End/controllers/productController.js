const Product = require('../models/Product');
const axios = require('axios');

exports.getProducts = async (req, res) => { 
    try {
        const response = await axios.get('https://api.pujakaitem.com/api/products');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching from external API', error: error.message });
    }
};

exports.getProductById = async (req, res) => { /* code */ };

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => { /* code */ };

exports.deleteProduct = async (req, res) => { /* code */ };

