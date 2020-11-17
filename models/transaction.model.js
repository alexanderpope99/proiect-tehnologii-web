module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define('transaction', {
    description: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.DOUBLE,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return Transaction;
};
