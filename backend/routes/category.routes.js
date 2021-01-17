module.exports = (app) => {
  const Categories = require('../controllers/category.controller.js');

  var router = require('express').Router();

  // Create a new Category
  router.post('/', Categories.create);

  // Retrieve all Categories
  router.get('/', Categories.findAll);

  // Retrieve a single Category with id
  router.get('/:id', Categories.findOne);

  // Update a Category with id
  router.put('/:id', Categories.update);

  // Delete a Category with id
  router.delete('/:id', Categories.delete);

  // Create a new Category
  router.delete('/', Categories.deleteAll);

  app.use('/api/categories', router);
};
