const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const html = require('html-template-tag');
const { db } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ exrended: true }));
app.use(bodyParser.json());
app.use('/user', require('./routes/user'));
app.use('/wiki', require('./routes/wiki'));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const syncDB = async () => {
  await db.sync({ force: true });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log("Server started. WOHOOOOO we're here!!! YAYYYYYY!!!!");
  });
};

syncDB();
