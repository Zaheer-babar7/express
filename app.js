const express = require('express');
const mongoose = require('mongoose');
const productModel = require('./models/productSchema');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const BASE_URI = `mongodb+srv://admin:admin@learning.xfskidi.mongodb.net/products`;

mongoose
  .connect(BASE_URI)
  .then((res) => console.log('mongoDb Connect'))
  .catch((err) => console.log(err, 'error'));

app.use(express.json());
app.use(cors());

app.post('/product', (req, res) => {
  productModel.create(req.body, (error, data) => {
    if (error) {
      res.send('error', error);
    } else {
      res.json({
        message: 'product successfully created',
        data,
      });
    }
  });
});

app.get('/allproduct', (req, res) => {
  productModel.find({}, (err, data) => {
    if (err) {
      res.json({
        message: err,
      });
    } else {
      res.json({
        message: 'all products',
        data,
      });
    }
  });
});

app.put('/product', (req, res) => {
  const { id, title, description, price, catagory } = req.body;
  productModel.findByIdAndUpdate(
    id,
    { title, description, price, catagory },
    { new: true },
    (err, data) => {
      if (err) {
        res.json({
          message: `error : ${err}`,
        });
      } else {
        res.json({
          message: 'product updated',
          data: data,
        });
      }
    }
  );
});

app.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  const _id = id;
  productModel.findByIdAndDelete(_id, (err, data) => {
    if (err) {
      res.json({
        message: `error : ${err}`,
      });
    } else {
      res.json({
        message: 'delete product success',
        data: data
      });
    }
  });
});

app.listen(PORT, () =>
  console.log(`server  running on http://localhost:${PORT}`)
);
