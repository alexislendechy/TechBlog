const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Comment} = require('../models')
const sequelize = require('../config/config');


router.get('/', withAuth, (req, res) =>{
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
    attributes: ['id,', 'tittle', 'comment', 'create_at'],
    order: [['create_at', 'DESC']],
    include: [
      {
        model: Comment, 
        attributes: ['id,', 'comment', 'postId', 'userId', 'create_at'],
        include: {
          mode: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
  .then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    req.render('dashboard', {posts, loggedIn: true, username: req.session.username});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/edit/:id', withAuth, (req, res) => { 
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'tittle', 'content', 'create_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment', 'postId', 'userId', 'create_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
  .then((dbPostData) => {
    if (!dbPostData) {
      res.status(404).json({ messsage: 'This ID has no post.'});
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('edit-post', { post, loggedI:true, username: req.session.username});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {username: req.session.username});
});

module.exports = router;
