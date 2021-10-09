export default function initUserModel(sequelize, DataTypes) {
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
      underscored: true,
    }
  );
}