const express = require('express');

const chalk = require('chalk');

const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 3000;

const nav = [{ link: '/flash/submitFeedback', title: 'Flash Card' }];
const searchRoutes = require('./src/routes/searchRoutes')(nav);
const flashCardRoutes = require('./src/routes/flashCardRoutes')(nav);
const indexRoutes = require('./src/routes/indexRoutes')(nav);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('some-secret'));
app.use(session({ session: 'library' }));

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/markdown-it/dist')));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/search', searchRoutes);
app.use('/flash', flashCardRoutes);
app.use('/', indexRoutes);



app.listen(port, () => {
  debug(`Listening at port  ${chalk.green(port)}`);
});
