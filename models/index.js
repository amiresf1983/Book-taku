const User = require('./User');
const Comment = require('./Comment');
const Book = require('./Book');

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

User.hasMany(Book, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Book.hasMany(User, {
    foreignKey: 'user_id'
})

Book.hasMany(Comment, {
    foreignKey: 'book_id'
})


module.exports = {
    User,
    Comment,
    Book
};