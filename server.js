const express = require('express');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT;
const goalController = require('./controllers/goal-controller');
const updateController = require('./controllers/updates-controller');
const actionItemController = require('./controllers/action-items-controller');
const authController = require('./controllers/auth-controller');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
mongoose.Promise = global.Promise

///Check Auth(middleware)//
const checkAuth = (req, res, next) => {
    console.log('-checking auth-')
    if (typeof req.cookies.Token === 'undefined' || req.cookies.Token === null) {
        req.user = null;
    } else {
    const token = req.cookies.Token;
    const decodedToken = jwt.decode(token, {complete: true}) || {};
    req.user = decodedToken.payload;
}
    next();
}
///setup app
app.use(checkAuth);
app.use(methodOverride('_method'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dreamboard', {useNewUrlParser: true});
app.engine( 'hbs', exphbs( {
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/////CALL CONTROLLER FUNCTIONS ---> imports controllers
goalController(app);
updateController(app);
actionItemController(app);
authController(app);

app.get('/', (req, res) => {
    res.render('home.hbs');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

module.exports = app;
