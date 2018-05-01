const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const html = require('html-template-tag');
const { db } = require('./models');
const layout = require('./views/layout');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', require('./routes/user'));
app.use('/wiki', require('./routes/wiki'));

app.get('/', (req, res, next) => {
  res.redirect(`/wiki`);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Error');
});

const syncDB = async () => {
  await db.sync({ force: true });
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log("Server started. WOHOOOOO we're here!!! YAYYYYYY!!!!");
  });
};

syncDB();
