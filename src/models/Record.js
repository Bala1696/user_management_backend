module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
    'Record',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      husbandName: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      wifeName: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dynamicData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: 'records',
      timestamps: true,
    },
  )

  return Record
}

