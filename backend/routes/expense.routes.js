module.exports = (app) => {
  const Expenses = require('../controllers/expense.controller.js');

  var router = require('express').Router();

  // Create a new Expense
  router.post('/', Expenses.create);

  // Retrieve all Expenses
  router.get('/', Expenses.findAll);

  // Retrieve a single Expense with id
  router.get('/:id', Expenses.findOne);

  // Update a Expense with id
  router.put('/:id', Expenses.update);

  // Delete a Expense with id
  router.delete('/:id', Expenses.delete);

  // Create a new Expense
  router.delete('/', Expenses.deleteAll);

  app.use('/api/expenses', router);
};
