const mongoose = require('mongoose');

// define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // links the product to the farmer who added it
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
