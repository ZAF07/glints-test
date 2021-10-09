export default function initMenuModel(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
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