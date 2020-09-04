const express = require('express');
const Request = require('../models/Request');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', [auth, permit('admin', 'operator')], async (req, res) => {
    const requests = await Request.find();
    return res.send(requests.reverse());
});

router.get('/:complete', [auth, permit('admin', 'operator')], async (req, res) => {
    const requests = await Request.find({completed: req.params.complete});
    return res.send(requests.reverse());
});

router.post('/', async (req, res) => {
    const newRequest = {
        phone: req.body.phone,
        description: req.body.description,
        email: req.body.email
    };

    const request = new Request(newRequest);

    try {
        await request.save();
        return res.send(request);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;