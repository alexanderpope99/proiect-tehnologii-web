module.exports = (app) => {
  const Transactions = require('../controllers/transaction.controller.js');

  var router = require('express').Router();

  // Create a new Transaction
  router.post('/', Transactions.create);

  // Retrieve all Transactions
  router.get('/', Transactions.findAll);

  // Retrieve all published Transactions
  router.get('/published', Transactions.findAllPublished);

  // Retrieve a single Transaction with id
  router.get('/:id', Transactions.findOne);

  // Update a Transaction with id
  router.put('/:id', Transactions.update);

  // Delete a Transaction with id
  router.delete('/:id', Transactions.delete);

  // Create a new Transaction
  router.delete('/', Transactions.deleteAll);

  app.use('/api/transactions', router);
};
