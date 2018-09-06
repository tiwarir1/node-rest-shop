const express = require('express');
const app = express();
const morgan = require('morgan'); 			//logging package
const bodyParser = require('body-parser');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((requset, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Header",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (request.method === 'OPTIONS') {
		response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return response.status(200).json({});
	}
	next();
});


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