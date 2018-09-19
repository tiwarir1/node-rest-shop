const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


// mongoose.connect(
// 	'mongodb://user-node:Password01@node-shop-blog-shard-00-00-rwkd4.mongodb.net:27017,node-shop-blog-shard-00-01-rwkd4.mongodb.net:27017,node-shop-blog-shard-00-02-rwkd4.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-blog-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true }
// 	)
//			username is user-node     ' + process.env.MONGO_ATLAS_PW + ' has password to the cluster. it is stored in nodemon.json



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS error handling. CORS errors are security measures enforced by the browser, and we can overwrite them with headers and browser ignores them
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');	//replace * with pages that gets access, like https://my-cool-page.com
	response.header('Access-Control-Allow-Headers', 
		'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(request.method === 'OPTIONS') {
		response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return response.status(200).json({});
	}
	next();
});


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((request, response, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, request, response, next) => {
	response.status(error.status || 500);
	response.json({
		error: {
			message: error.message
		}
	})
})

module.exports= app;