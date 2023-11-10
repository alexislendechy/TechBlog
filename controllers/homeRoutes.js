const router = require('express').Router();
const { User, Post, Comment} = require('../models')
const sequelize = require('../config/config');


router.get('/', async (req, res) => {
  try{

    const dbPostData = await Post.findAll({
      attributes: ['id,', 'tittle', 'comment', 'create_at'],
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
      order: [['create_at', 'DESC']],
})
const posts = dbPostData.map((post) => post.get({ plain: true }));
console.log(posts)


res.render('homepage',
  { posts,
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    userId: req.session.userId});
} catch(err) {
  res.status(500).json(err);
}
});


router.get('/post/:id', async (req,res) => {
  try{
    const dbPostData = await Post.findOne({
      where: {id: req.param.id},
      attributes: ['id', 'content', 'tittle', 'create_at'],
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
    });
    if (dbPostData){
      const post = dbPostData.get({plain:true });
      console.log(post);
      res.render('single-post', { post,loggedIn: req.session.loggedIn, username: req.session.username})
    } else {
      res.status(404).jsom({ message: 'This ID has no post.'});
      return;
    }
  } catch (err){
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn){
    res.redirect('/');
    return
  }
  res.render('login');
});


router.get('/sigup', async (req, res) => {
  res.render('signup');
})

module.exports = router;