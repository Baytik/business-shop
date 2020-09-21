const express = require('express');
const Analytics = require('../models/Analytics');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', [auth, permit('admin')], async (req, res) => {
    const analytics = await Analytics.find();
    res.send(analytics)
});

module.exports = router;