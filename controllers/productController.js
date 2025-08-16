const Product = require("../models/Product");

// Farmer adds product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, farmerId } = req.body;

    const newProduct = new Product({ name, price, quantity, description, farmerId });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

// Farmer deletes product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// Consumer views all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmerId", "username email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};
