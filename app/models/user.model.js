module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true, // Correct usage of isEmail validation
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  return User;
};
