module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    'expense',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Expense;
};
