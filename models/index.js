const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

User.hasMany(Book, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Book.belongsTo(User, {
    foreignKey: 'user_id'
})

Book.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Book, {
    foreignKey: 'post_id'
})


module.exports = {
    User,
    Book,
    Comment
};