// MOST LIKELY WON'T NEED THIS FILE !!!

const router = require('express').Router();
const {
    User,
    Book,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');


// ALL COMMENTS
router.get("/book/:id", (req, res) => {
    Comment.findAll()
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE COMMENT
router.post('/', withAuth, async (req, res) => {

        try {
            const {comment_text, book_id} = req.body;
            const bookComment = await Comment.create({
                user_id: req.session.user_id,
                comment_text,
                book_id
            });
            res.status(200).json(bookComment);
        } catch (error) {
            res.status(500).json(error);
            console.error(error);
        }
    
            // .then(dbCommentData => res.json(dbCommentData), console.log(dbCommentData))
            // console.log(dbCommentData)
            // .catch(err => {
            //     console.log(err);
            //     res.status(400).json(err);
    //         // });
    // }
});

module.exports = router;