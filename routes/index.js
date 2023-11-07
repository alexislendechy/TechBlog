const express = require('express');
const router = express.Router();

// Define your homepage route
router.get('/', (req, res) => {
  // Implement logic to display the homepage, including listing existing blog posts
  res.render('home'); // You need to create the 'home' view using Handlebars
});

// Add other default routes as needed
router.get('/about', (req, res) => {
  // Implement logic to display an about page
  res.render('about'); // You need to create the 'about' view using Handlebars
});

module.exports = router;
