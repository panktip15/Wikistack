const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

db.authenticate().then(() => {
  console.log('Connected to DB successfully');
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

const makeSlug = title => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
};

Page.beforeValidate(page => {
  if (!page.slug) {
    page.slug = makeSlug(page.title);
  }
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

Page.belongsTo(User, { as: 'author' });
User.hasMany(Page, { foreignKey: 'authorId' });

module.exports = {
  db,
  Page,
  User,
};
