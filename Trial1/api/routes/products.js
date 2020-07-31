const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const product = require('../models/product');

router.get('/', (req,res, next) => {
    res.status(200).json({
        message: "Handling GET requests to products"
    });
});

router.post('/', (req, res, next) => {
    // using body parser
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    const product = new Product({
        // it automatically creates an id
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message: "Handling POST requests to products",
        createdProduct: product
    });
});

// to get/post individual product use '/:(name or id)'
router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;

    // fetching from db
    product.findById(id).exec()
    .then(doc => {
        console.log("From database",doc);
        res.status(200).json(doc);
    })
    .catch(err => {

     console.log(err);
     res.status(500).json({error: err});
    });

    // initial code
    // if(id === 'special'){
    //     res.status(200).json({
    //         message: "Handling the GET request of special Id",
    //         id : id
    //     });
    // }
    // else {
    //     res.status(200).json({
    //         message: "You passed an Id"
    //     });
    // }
   
});

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "Updated product!"
    });
});

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "Deleted product!"
    });
});

module.exports = router;