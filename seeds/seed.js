const sequelize = require('../config/connection');
const { Book, Comment, User } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({force: true })

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();