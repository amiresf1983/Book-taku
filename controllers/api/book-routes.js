const router = require('express').Router();
const { User, Book, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//import pagination npm - https://www.npmjs.com/package/pagination-apis
const pagination = require('pagination-apis');

// Gettting all books
router.get('/', withAuth, async (req, res) => {
  const { limit, skip, paginate } = pagination({
    limit: 5,
    page: req.query.page,
  });
  Book.findAll({
    limit,
    offset: skip,
    attributes: ['id', 'title', 'author', 'description', 'pages', 'user_id'],
    order: [['title', 'ASC']],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'book_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  }).then((getAllBooks) => {
    const book = getAllBooks.map((book) =>
      book.get({
        plain: true,
      })
    );

    return (
      paginate(book),
      res.render('library', {
        book,
        loggedIn: req.session.loggedIn,
      })
    );
  });
  // res.send('GET request for the book page');
});

// router.get('/books', (req, res) => {
//     res.send('GET request for the book page');
//     return
// });

// Getting a single book
router.get('/:id', withAuth, async (req, res) => {
  try {
    const verifiedId = req.session.user_id;

    const findBook = await Book.findOne({
      where: {
        id: req.params.id,
      },
      // attributes: ['id', 'title', 'author', 'description', 'pages', 'user_id'],
    });

    const getBook = await findBook.get({ plain: true });

    if (!findBook) {
      res.status(404).json({
        message: 'No book found with this id',
      });
      return;
    }

    const bookCommentsData = await Comment.findAll({
      where: { book_id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });
    const bookComments = bookCommentsData.map((comments) =>
      comments.get({ plain: true })
    );

    // console.log(bookComments);
    // console.log(req.session);
    // console.log(req.session.user_id);

    res.render('viewbook', {
      getBook,
      bookComments,
      verifiedId,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creating comments
// router.post('/:id', withAuth, async (req, res) => {
//     try {
//         const {comment_text, book_id} = req.body;
//         const bookComment = await Comment.create({
//             user_id: req.session.user_id,
//             comment_text,
//             book_id
//         });
//         res.status(200).json(bookComment);
//         console.log(bookComment);
//     } catch (error) {
//         res.status(500).json(error);
//         console.error(error);
//     }
// });
//     console.log('creating');
//     Comment.create({
//             title: req.body.title,
//             content: req.body.post_content,
//             user_id: req.session.user_id
//         })
//         .then((dbCommentData) => res.json(dbCommentData))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// Updating comments
router.put('/:id', async (req, res) => {
  try {
    // const commentId = req.body.commentIdVal;
    const userId = req.session.user_id;
    // const { comment_text, book_id } = req.body;
    console.log(req.body, 'FOR PUT REQ');
    const updateComment = await Comment.update(
      {
        id: req.body.commentIdVal,
        comment_text: req.body.commentText,
        user_id: userId,
        book_id: req.body.bookId,
      },
      {
        where: {
          id: req.body.commentIdVal,
        },
      }
    );
    console.log(updateComment);
    console.log(req.body.commentIdVal);
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

// router.put('/:id', withAuth, (req, res) => {
//   Comment.update(
//     {
//       title: req.body.title,
//       content: req.body.post_content,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res.status(404).json({
//           message: 'No comment found with this id',
//         });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// Deleting comments
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({
          message: 'No comment found with this id',
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

router.get('/books', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
