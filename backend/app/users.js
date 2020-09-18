const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', [auth, permit('admin')],  async (req, res) => {
    const users = await User.find();
    const usersFilter = users.filter((user) => user._id.toString() !== req.user._id.toString());
    return res.send(usersFilter)
});

router.post('/', [auth, permit('admin')],  async (req, res) => {

    const newUser = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        role: req.body.role
    };
    const user = new User(newUser);
    try {
        user.generateToken();
        await user.save();
        return res.send(user)
    } catch (error) {
        return res.status(400).send(error._message);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Неверный логин или пароль!'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Неверный логин или пароль!'})
    }
    user.generateToken();
    await user.save();
    return res.send(user)
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};
    try {
        const token = req.get('Authorization');
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);
        user.generateToken();
        await user.save();
        return res.send(success)
    } catch (e) {
        return res.send(success)
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await User.deleteOne({_id: req.params.id});
        return res.send({message: 'Was deleted'})
    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;