const router = require('express').Router();
const withAuth = require('../../utils/auth')
const {User, Post, Comment} = require('../../models')


router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Comment.Post.create({
            ...req.body,
            userId: req.session.userId,
        });
        console.log("This is the new post", newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
}); 


router.put('/:id', withAuth, async (req, res) => {
    try{
        const updatePost = await Post.update({
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    if (!updatePost){
        res.status(404).json({message: 'This ID has no post'});
        return;
    }
    res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {id: req.params.id},
        });

        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if(!postData){
            res.status(404).json({message: `No user ID ${req.session.userId} found with id = ${req.params.id}`,
        });
        return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;