const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Book,
    Comment
} = require('../models');


router.get('/', (req, res) => {
    Book.findAll({
            attributes: [
                'id',
                'title',
                'author',
                'description', 
                'pages',
                'user_id'
            ]
            /*include: [{
                    model: Book,
                    attributes: [],
                    include: {
                        model: Book,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]*/
        })
        .then(dbBookData => {
            const book = dbBookData.map(book => book.get({
                plain: true
            }));

            res.render('homepage', {
                book,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/book/:id', (req, res) => {
    Book.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'author',
                'description', 
                'pages',
                'user_id'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'book_id'],
                    include: {
                        model: Book,
                        attributes: ['user_id']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbBookData => {
            if (!dbBookData) {
                res.status(404).json({
                    message: 'No book found with this id'
                });
                return;
            }

            const book = dbBookData.get({
                plain: true
            });

            res.render('book-name', { ////////////////////////////////////////////////// SINGLE BOOK
                book,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login'); 

    // FOR TESTING -> THIS WORKS 
    //res.send('GET request to the login page'); 
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        
        return;
    }
    res.render('signup');

    // FOR TESTING -> THIS WORKS 
    res.send('GET request to the signup page'); 
});


/*router.get('*', (req, res) => {
    res.status(404).send("You don't have access!");
})*/ 


module.exports = router;