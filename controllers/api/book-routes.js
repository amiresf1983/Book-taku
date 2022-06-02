const router = require('express').Router();
const {
    User,
    Book,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');


// Gettting all books
router.get("/", (req, res) => {
    Book.findAll({
            attributes: ["id", "title", "author", "description", "pages", "user_id"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "book_id"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then(dbBookData => {
            const book = dbBookData.map(book => book.get({
                plain: true
            }));
            

            res.render('library', {
                book,
                loggedIn: req.session.loggedIn
            });
        })
        // res.send('GET request for the book page'); 
});

// router.get('/books', (req, res) => {
//     res.send('GET request for the book page'); 
//     return 
// }); 

// Getting a single book
router.get("/:id", async (req, res) => {
    try {
   const findBook = await Book.findOne({
            where: {
                id: req.params.id,
            },
        });
            if (!findBook) {
                res.status(404).json({
                    message: "No book found with this id"
                });
                return;
            }

            const bookCommentsData = await Comment.findAll({
                where: {book_id: req.params.id},
   include: [{
       model: User,
       attributes:["username"]
   }],

        })
            const bookComments = bookCommentsData.map((comments) => comments.get({plain:true})
    );
const getBook = await findBook.get({plain:true});

// console.log(bookComments)
// console.log(bookComments.user);
            res.render('book-name', {
                getBook,
                bookComments,
                loggedIn: req.session.loggedIn
            });
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

// Creating comments
router.post("/:id", withAuth, (req, res) => {
    console.log("creating");
    Comment.create({
            title: req.body.title,
            content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Updating comments
router.put("/:id", withAuth, (req, res) => {
    Comment.update({
            title: req.body.title,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: "No comment found with this id"
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Deleting comments 
router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: "No comment found with this id"
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;