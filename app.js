const express = require('express');
const app = express();
const morgan = require('morgan'); 			//logging package

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


app.use(morgan('dev'));

//routes which handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

 app.use((request, response, next) => {
 	const error = new Error('Not found');
 	error.status = 404;
 	next(error);
 });

 app.use((error, request, response, next) => {
 	response.status(error.status || 500);
 	response.json({
 		error: {
 			message: error.message
 		}
 	});
 });

module.exports = app;