//import required sequlize and models
const sequelize = require('../config/connection');
const { Book, Comment, User } = require('../models');

// import seed data files
const userData = require('./userData.json');
const bookData = require('./bookData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Adding individual hooks so seeded passwords are hashed
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
