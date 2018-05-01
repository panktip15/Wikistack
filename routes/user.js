const express = require('express');
const router = express.Router();
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views');

const { Page, User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(userList(user));
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    // const pages = await PageTransitionEvent.findAll({
    //   where: {
    //     authorId: req.params.userId,
    //   },
    // });
    const pages = await user.getPages();
    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
