const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const {nanoid} = require('nanoid');

const router = express.Router();

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    const sendReviews = [];
    reviews.forEach(review => {
        const object = {
            _id: review._id,
            pcName: review.pcName,
            price: review.price,
            review: review.review,
            rebate: review.rebate
        };
        sendReviews.push(object)
    });
    return res.send(sendReviews.reverse());
});

router.get('/keys', [auth, permit('admin')], async (req, res) => {
    const reviews = await Review.find();
    return res.send(reviews.reverse());
});

router.post('/', async (req, res) => {
    try {
        const reviews = await Review.findOne({key: req.body.key});
        if (reviews.review === 'No Comment') {
            reviews.review = req.body.review;
            await reviews.save();
            res.send(reviews)
        } else {
            return res.status(400).send({error: 'Вы уже оставляли отзыв'})
        }
    } catch (error) {
        return res.status(404).send({error: 'Ключ от продукта не найден'})
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const products = await Review.findOne({_id: req.params.id});
        if (!products) {
            return res.status(404).send({error: 'Компьютер не найден'});
        }
        products.review = 'No Comment';
        products.key = nanoid(8);
        await products.save();
        return res.send({message: 'Успешно удалён'})
    } catch (error) {
        return res.status(400).send({error: 'Компьютер не найден'})
    }
});

module.exports = router;