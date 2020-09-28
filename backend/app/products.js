const express = require('express');
const router = express.Router();
const config = require('../config');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');
const fs = require('fs');

const Product = require('../models/Product');
const Review = require('../models/Review');
const Analytics = require('../models/Analytics');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const products = await Product.find().sort({price: +1});
    return res.send(products)
});

router.get('/:id', async (req, res) => {
    try {
        const products = await Product.findOne({_id: req.params.id});
        res.send(products)
    } catch (e) {
        return res.status(404).send('Not Found')
    }
});

router.get('/category/:category', async (req, res) => {
    const products = await Product.find({category: req.params.category}).sort({price: +1});
    res.send(products)
});

router.post('/', [upload.single('image'), auth, permit('admin', 'seller')], async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }
    const newProduct = {};
    Object.keys(req.body).forEach(key => {
        newProduct[key] = req.body[key];
    });

    try {
        const product = new Product(newProduct);
        const analytics = await Analytics.findOne();
        analytics.assembly.push(req.body.assembly);

        await analytics.save();
        await product.save();
        return res.send(product);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.put('/:id', [upload.single('image'), auth, permit('admin', 'seller')], async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});

    if (product) {
        fs.readdir('./public/uploads/', function (err, files) {
            const findImage = files.find((image) => image.toString() === req.body.image);
            if (!findImage) {
                fs.unlink('./public/uploads/' + product.image, function (err) {
                    if (err) {
                        return res.status(400).send(err)
                    } else {
                        console.log('OK')
                    }
                });

                if (req.file) {
                    req.body.image = req.file.filename;
                }

                Object.keys(req.body).forEach(key => {
                    product[key] = req.body[key];
                });

                try {
                    product.save();
                    return res.send(product);
                } catch (error) {
                    return res.status(400).send(error);
                }
            } else {
                product.box = req.body.box;
                product.cpu = req.body.cpu;
                product.ram = req.body.ram;
                product.hdd = req.body.hdd;
                product.cooler = req.body.cooler;
                product.power = req.body.power;
                product.motherBoard = req.body.motherBoard;
                product.pcName = req.body.pcName;
                product.gpu = req.body.gpu;
                product.ssd = req.body.ssd;
                product.monitor = req.body.monitor;
                product.category = req.body.category;
                product.price = req.body.price;
                try {
                    product.save();
                    return res.send(product);
                } catch (error) {
                    return res.status(400).send(error);
                }
            }
        });
    }
});

router.put('/review/:id', [auth, permit('admin', 'seller')], async (req, res) => {
    const products = await Product.findOne({_id: req.params.id});
    if (products) {
        fs.unlink('./public/uploads/' + products.image, function (err) {
            if (err) {
                return res.status(400).send(err)
            } else {
                console.log('OK')
            }
        });
    }

    try {
        const analytics = await Analytics.findOne();
        analytics.price.push(products.price);
        analytics.rebate.push(req.body.rebate !== '' ? 0 : req.body.rebate);

        const review = new Review({
            pcName: products.pcName,
            price: products.price,
            key: nanoid(7),
            review: 'No Comment',
            rebate: req.body.rebate === '' ? 0 : req.body.rebate
        });
        await analytics.save();
        await review.save();
        await Product.deleteOne({_id: req.params.id});
        res.send(review)
    } catch (e) {
        return res.status(404).send({error: 'Компьютер не найден'})
    }
});

router.delete('/:id', [auth, permit('admin', 'seller')], async (req, res) => {
    const products = await Product.findOne({_id: req.params.id});
    fs.unlink('./public/uploads/' + products.image, function (err) {
        if (err) {
            return res.status(400).send(err)
        } else {
            console.log('OK')
        }
    });
    await Product.deleteOne({_id: req.params.id});
    try {
        return res.send({message: 'Was deleted'})
    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;