const router = require('express').Router();
const { User, Book, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//import pagination npm - https://www.npmjs.com/package/pagination-apis
const pagination = require('pagination-apis');

// Getting all books
router.get('/', withAuth, async (req, res) => {
  const { limit, skip, paginate } = pagination({
    limit: 5,
    page: req.query.page,
  });
  Book.findAll({
    limit,
    offset: skip,
    attributes: [
      'id',
      'title',
      'author',
      'description',
      'pages',
      'user_id',
      'image_path',
    ],
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

// Getting a single book
router.get('/:id', withAuth, async (req, res) => {
  try {
    const verifiedId = req.session.user_id;

    const findBook = await Book.findOne({
      where: {
        id: req.params.id,
      },
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

// Updating comments - FUTURE FEATURE
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

// Deleting comments - FUTURE FEATURE
// router.delete('/:id', withAuth, (req, res) => {
//   Comment.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
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

router.get('/books', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
