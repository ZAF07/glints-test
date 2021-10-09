export default function initOpeningHourModel(sequelize, DataTypes) {
  return sequelize.define(
    'openingHour',
    {
      restaurantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
      day: DataTypes.TEXT,
      openHours: DataTypes.TEXT,
      openingTime: DataTypes.TEXT,
      closingTime: DataTypes.TEXT,

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