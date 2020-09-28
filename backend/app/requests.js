const express = require('express');
const Request = require('../models/Request');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:completed', [auth, permit('admin', 'operator')], async (req, res) => {
    if (req.params.completed === 'true' || req.params.completed === 'false') {
        const requests = await Request.find({completed: req.params.completed});
        return res.send(requests.reverse());
    } else {
        const requests = await Request.find();
        return res.send(requests.reverse());
    }
});

router.post('/', async (req, res) => {
    try {
        const newRequest = {
            phone: req.body.phone,
            description: req.body.description,
            email: req.body.email
        };
        const request = new Request(newRequest);

        await request.save();
        return res.send(request);
    } catch (error) {
        return res.status(400).send(error);
    }
});


router.put('/:id', [auth, permit('admin', 'operator')], async (req, res) => {
    try {
        const request = await Request.findOne({_id: req.params.id});
        if (!request) {
            res.status(404).send({error: 'Заявка не найдена'})
        }
        request.completed = !request.completed;
        await request.save();
        return res.send(request);
    } catch (error) {
        return res.status(400).send({error: 'Плохой запрос'});
    }
});

module.exports = router;