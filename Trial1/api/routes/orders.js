const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: "Orders were fetched"
    });
});

router.post('/', (req,res,next) => {
    res.status(201).json({
        message: "Orders are created!"
    });
});

router.get('/:orderId', (req,res,next) => {
    res.status(200).json({
        message: "Order details",
        orderId: req.params.orderId
    });
});


router.delete('/:orderId', (req,res,next) => {
    res.status(200).json({
        message: "Order deleted!",
        orderId: req.params.orderId
    });
});

module.exports = router;

// nodemon to avoid stop and restart of >node server.js
// install nodemon  only for project so we cannot run in terminal hence add it to scripts in package.json which will only run in proj env so >npm start will do the job 