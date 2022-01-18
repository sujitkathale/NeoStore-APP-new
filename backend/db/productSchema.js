// const mongoose = require("mongoose");
// const productSchema = new mongoose.Schema({
//   pname: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });
// module.exports = mongoose.model("product", productSchema);

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
  },
  rating: {
    type: Number,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("product", productSchema);
