const db = require('../models');
const Expense = db.expenses;
const Category = db.categories;

// Create and Save a new Expense
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.date || !req.body.amount) {
    res.status(400).send({
      message: 'Niciun câmp nu poate fi gol',
    });
    return;
  }

  // Create a Expense
  const expense = {
    name: req.body.name,
    date: req.body.date,
    amount: req.body.amount,
    categoryId: req.body.categoryId,
  };

  // Save Expense in the database
  Expense.create(expense)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare la salvare',
      });
    });
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
  Expense.findAll({
    order: [['date', 'DESC']],
    attributes: { exclude: ['categoryId'] },
    include: [
      {
        model: Category,
        as: 'category',
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare la preluare',
      });
    });
};

// Find a single Expenses with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Expense with id=' + id,
      });
    });
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Expense.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Expense was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Expense with id=' + id,
      });
    });
};

// Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Expense was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Expense with id=' + id,
      });
    });
};

// Delete all Expenses from the database.
exports.deleteAll = (req, res) => {
  Expense.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Expenses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all expenses.',
      });
    });
};

// Find all published Expenses
exports.findAllPublished = (req, res) => {
  Expense.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving expenses.',
      });
    });
};
