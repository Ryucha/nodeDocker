const mongoose = require("mongoose");
const user = require("../mongoose/user");
const router = require("express").Router();
const User = mongoose.model("User");
const Password = require("../utils/password");
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        next(e);
    }
})

router.get("/my", async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user);
        res.send(user);
    } catch (e) {
        next(e);
    }
});

router.get('/logout', async (req, res, next) => {
    try {
        if (req.session.user) {
            req.session.destroy((err) => {
                if (err) throw err;

                console.log("로그아웃 성공~!");
                res.sendStatus(200);
            });
        } else {
            console.log("로그아웃 되어있지 않습니다.");
            res.send("dd");
        }

    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.send(user);
    } catch (e) {
        next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const salt = Password.createSalt();
        body.salt = salt
        console.log(body);
        const hashPassword = Password.encryption(body.password, salt);
        body.password = hashPassword;
        const user = await User.create(body);
        res.send(user);
    } catch (e) {
        next(e);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { password, username } = req.body;
        const user = await User.findOne({ "username": username });
        const salt = user.salt;

        const hashPassword = Password.encryption(password, salt);
        console.log(user);
        console.log(hashPassword);
        if (hashPassword == user.password) {
            console.log("Lgoin");
            req.session.user = user.id;
            res.send(user);
        } else {
            res.send("failed");
        }


    } catch (e) {
        next(e);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const cat = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
        res.send(cat);
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.send(user);
    } catch (e) {
        next(e);
    }
})


module.exports = router;