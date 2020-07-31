const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes to handle requests
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// set env variable before hosting
 mongoose.connect('mongodb+srv://ArpitaChikkodi:' +
  process.env.MONGO_ATLAS_PWD + 
  '@node-api-trial1.lur48.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true }
// not required in mongoose version>5 
  //   {
//      useMongoClient : true
//   }
 );
// mongoose.connect('mongodb+srv://ArpitaChikkodi:<PASSWORD>@node-api-trial1.lur48.mongodb.net/<dbname>?retryWrites=true&w=majority');


// before productRoutes basic
// app.use((req,res,next) => {
//     res.status(200).json({
//         message: "It works!"
//     });
// });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res, next) => {
    // it does not send res it just adjusts it(handles CORS errors), from all-*
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // to handle OPTIONS method in header
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        // in such a case return empty json
        return res.status(200).json({});
    }
    next();
});

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