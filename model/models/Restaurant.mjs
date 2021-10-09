export default function initRestaurantModel(sequelize, DataTypes) {
  return sequelize.define(
    'restaurant',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.TEXT,
      cashBalance: DataTypes.DECIMAL,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
     },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    }
  );
}