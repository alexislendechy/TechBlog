const router = require('express').Router();
const withAuth = require('../../utils/auth')
const {User} = require('../../models')


router.post('/', async (req, res) => {
    try{
        const dbUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedID = true;
            res.status(201).json({message: `Account created for ${dbUserData.username}`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/login', async (req, res) => {
    try{
        const dbUserData = await User.findOne({
            where: {username: req.body.username}
        });
        if (!dbUserData) {
            res.status(400).json({message: `User ID ${req.params.id} is not valid`});
            return;
        }

        const pwValidated = await dbUserData.checkPassword(re.body.params.password)
        if (!pwValidated) {
            res.status(400).json({message: "Your password is incorrect"});
            return;
        }

        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedID = true;

            res.status(201).json({message: "You are logged in!"});
        })
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/', withAuth, async (req, res) => {
    try{
        if (req.session.loggedID) {
            const dbUserData = await req.session.destroy(() =>{
                res.status(204).end();
            });
        } else{
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;
