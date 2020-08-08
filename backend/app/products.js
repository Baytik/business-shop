const express = require('express');
const router = express.Router();
const config = require('../config');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');

const Product = require('../models/Product');
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
    const products = await Product.find();
    return res.send(products)
});

router.get('/:id', async (req, res) => {
    try {
        const products = await Product.find({_id: req.params.id});
        res.send(products)
    } catch (e) {
        return res.status(404).send('Not Found')
    }
});

router.get('/category/:category', async (req, res) => {
    const products = await Product.find({category: req.params.category});
    res.send(products)
});

router.post('/', [upload.single('image'), auth, permit('admin', 'seller')], async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const newProduct = {
        box: req.body.box,
        cpu: req.body.cpu,
        ram: req.body.ram,
        hdd: req.body.hdd,
        cooler: req.body.cooler,
        power: req.body.power,
        motherBoard: req.body.motherBoard,
        pcName: req.body.pcName,
        image: req.body.image,
        gpu: req.body.gpu,
        ssd: req.body.ssd,
        monitor: req.body.monitor,
        category: req.body.category,
        price: req.body.price,
    };

    const product = new Product(newProduct);

    try {
        await product.save();
        return res.send(product);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;