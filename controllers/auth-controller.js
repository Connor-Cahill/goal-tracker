const User = require('../models/user');
const jwt = require('jsonwebtoken');



module.exports = function(app) {

    //GET signup page
    app.get('/signup', (req, res) => {
        res.render('signup.hbs');
    })

    //GET login page
    app.get('/login', (req, res) => {
        res.render('login.hbs');
    })

    //GET logout --- this clears cookies and logs out user
    app.get('/logout', (req, res) => {
        res.clearCookie('Token');
        res.redirect('/');
    })

    //POST signup new user ----> Route should create new user and store in DB
    app.post('/signup', (req, res) => {
        const user = new User(req.body);
        user.password = user.generateHash(req.body.password);

        user.save().then(savedUser => {
            console.log('this is the saved user --> ' + savedUser);
            const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
            res.cookie('Token', token, {maxAge: 90000 , httpOnly: true });
            return res.redirect('/dashboard');
        }).catch(err => {
            console.log(err.message)
            return res.status(400).send({err: err});
        })
    })
//////POST login a user at /login -- should: check username, comparepassword, and return with cookies
///currently logs user out when goal is deleted
    app.post('/login', (req, res) => {
        User.findOne({username: req.body.username}).then((user) => {
            if(!user) {
                console.log('error on username ')
                res.status(401).send('Wrong username or password')
            } else if (!user.comparePassword(req.body.password)) {
                console.log('incorrect password ');
                return res.status(401).send('Wrong username or password')
            } else {
                const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
                res.cookie('Token', token, {maxAge: 90000, httpOnly: true});
                return res.redirect('/dashboard');
            }

        }).catch(err => {
            console.log(err.message);
        })
    })



}
