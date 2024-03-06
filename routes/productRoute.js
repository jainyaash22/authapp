// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/productSchema');
const User = require('../models/userSchema');

// GET all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product
router.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/users/addbookmark', async (req, res) => {
  const userId = req.body.userId; // Assuming you're using authentication middleware to populate req.user with the authenticated user
  const productId = req.body.productId;

  try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      // Check if the product is already bookmarked by the user
      if (user.bookmarks.includes(productId)) {
          return res.status(400).json({ error: 'Product already bookmarked' });
      }

      // Add the product to the user's bookmarks
      user.bookmarks.push(productId);
      await user.save();

      res.status(201).json({ message: 'Bookmark added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users/getbookmarks', async (req, res) => {
  const userId = req.body.userId; 

  try {
      // Find the user
      const user = await User.findById(userId).populate('bookmarks');
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Extract bookmarks from the user object
      const bookmarks = user.bookmarks;

      // const bookmarkedProducts = await Product.find({ _id: { $in: Product._id } });

      // Respond with the bookmarked products
      res.status(200).json(bookmarks);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;