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

  if (isNaN(req.body.amount)) {
    res.status(400).send({
      message: 'Suma trebuie să fie număr',
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

// Find a single Expense with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare la preluare',
      });
    });
};

// Update an Expense by the id in the request
exports.update = (req, res) => {
  if (!req.body.name || !req.body.date || !req.body.amount) {
    res.status(400).send({
      message: 'Niciun câmp nu poate fi gol',
    });
    return;
  }
  const id = req.params.id;

  if (isNaN(req.body.amount)) {
    res.status(400).send({
      message: 'Suma trebuie să fie număr',
    });
    return;
  }

  Expense.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Cheltuiala cu id ${id} actualizată cu succes`,
        });
      } else {
        res.status(404).send({
          message: `Nu s-a găsit cheltuiala cu id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Eroare la actualizarea cheltuielii cu id ' + id,
      });
    });
};

// Delete an Expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Cheltuiala cu id ${id} ștearsă cu succes`,
        });
      } else {
        res.status(404).send({
          message: `Nu s-a găsit cheltuiala cu id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Eroare la ștergerea categoriei cu id ' + id,
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
      res.send({ message: `${nums} cheltuieli au fost șterse` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare la ștergerea cheltuielilor',
      });
    });
};
