const db = require('../models');
const Sequelize = require('sequelize');
const Category = db.categories;
const Expense = db.expenses;

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.color) {
    res.status(400).send({
      message: 'Numele sau culoarea nu pot fi goale!',
    });
    return;
  }

  if (req.body.name === '-') {
    res.status(400).send({
      message: 'Numele nu poate fi "-"!',
    });
    return;
  }

  // Create a Category
  const category = {
    name: req.body.name,
    color: req.body.color,
  };

  // Save Category in the database
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare.',
      });
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  Category.findAll({
    order: [['id', 'ASC']],
    attributes: {
      include: [[Sequelize.fn('SUM', Sequelize.col('expenses.amount')), 'expensesSum']],
    },
    include: [
      {
        model: Expense,
        as: 'expenses',
        attributes: [],
      },
    ],
    group: ['category.id'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare.',
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Eroare la preluarea categoriei cu id' + id,
      });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  if (!req.body.name || !req.body.color) {
    res.status(400).send({
      message: 'Numele sau culoarea nu pot fi goale!',
    });
    return;
  }
  if (req.body.name === '-') {
    res.status(500).send({
      message: 'Numele nu poate fi "-"!',
    });
    return;
  }
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Categoria cu id ${id} actualizată cu succes`,
        });
      } else {
        res.status(404).send({
          message: `Nu s-a găsit categoria cu id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Eroare la actualizarea categoriei cu id ' + id,
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Categoria cu id ${id} ștearsă cu succes`,
        });
      } else {
        res.send({
          message: `Nu s-a găsit categoria cu id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Eroare la ștergerea categoriei cu id ' + id,
      });
    });
};

// Delete all Catgories from the database.
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} categorii au fost șterse` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'A apărut o eroare la ștergerea categoriilor',
      });
    });
};
