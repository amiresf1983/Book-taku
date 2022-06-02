// MOST LIKELY WON'T NEED THIS FILE !!!

const router = require("express").Router();
const {
  User,
  Book,
  Comment
} = require("../../models");
const withAuth = require("../../utils/auth");


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
router.post("/book/:id", withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      book_id: req.body.post_id,
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;