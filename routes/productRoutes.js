const express = require("express");
const router = express.Router();
const {
  addProduct,
  removeProduct,
  getAllProducts,
  deleteProduct,
  getProducts
} = require("../controllers/productController");

// add a product (farmer only)
router.post("/add", addProduct);

// remove a product (farmer only)
router.delete("/remove/:id", deleteProduct);

// get all products (consumers + farmers can view)
router.get("/", getProducts);

module.exports = router;
