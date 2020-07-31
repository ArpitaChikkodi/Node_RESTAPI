const express = require('express');
const app = express();

const morgan = require('morgan');

// Routes to handle requests
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// before productRoutes basic
// app.use((req,res,next) => {
//     res.status(200).json({
//         message: "It works!"
//     });
// });

app.use(morgan('dev'));

// directing route
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handling error through middleware that was not handled by above routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// in case of database if we want to handle it differently
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;