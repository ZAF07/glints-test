export default function initMenuModel(sequelize, DataTypes) {
  return sequelize.define(
    'menu',
    {
      restaurantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
      dish: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
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
      underscored: true,
    }
  );
}