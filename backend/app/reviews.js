const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    const sendReviews = reviews.reverse();
    return res.send(sendReviews)
});

router.post('/', async (req, res) => {
    try {
        const reviews = await Review.findOne({key: req.body.key});
        if (reviews.review === 'No Comment') {
            reviews.review = req.body.review;
            await reviews.save();
            res.send(reviews)
        } else {
            return res.send({error: 'Вы уже оставляли отзыв'})
        }
    } catch (error) {
        return res.status(400).send({error: 'Ключ от продукта не найден'})
    }
});

module.exports = router;