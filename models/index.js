const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /[\w\s]+/,
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notContains: ' ',
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate(page => {
  const generateRdmStr = () => {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible[Math.floor(Math.random() * possible.length)];
    }
    return text;
  };

  const makeSlug = title => {
    if (title) {
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      return generateRdmStr();
    }
  };

  page.slug = makeSlug(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = {
  db,
  Page,
  User,
};
