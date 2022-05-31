const sequelize = require('../config/connection');
const { Book, Comment, Post, User } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({force: true })

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookData);

  process.exit(0);
};

seedDatabase();