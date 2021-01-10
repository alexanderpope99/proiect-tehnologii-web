module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define(
    'expense',
    {
      date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      category: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );

  return Expense;
};
