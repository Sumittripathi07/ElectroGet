const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/getproducts", getProducts);
router.get("/:id", getProductById);
router.post("/createproduct", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
