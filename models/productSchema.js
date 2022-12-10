const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  catagory: {
    type: String,
  }
});

const productModel = mongoose.model("product", schema);

module.exports = productModel;