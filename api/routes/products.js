const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


//look at app.js for productRoutes and app.use('/products', productRoutes)
//if we do '/products', it'll make the url /products/products
router.get('/', (request, response, next) => {
	response.status(200).json({
		message: 'product details'
	});
});

router.post('/', (request, response, next) => {
	
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: request.body.name,
		price: request.body.price
	});

	product
	.save()
	.then(result => {
		console.log(result);
	})
	.catch(err => console.log(err));

	response.status(201).json({
		message: 'products submitted',
		createdProduct: product
	});
});


router.get('/:productId', (request, response, next) => {
	const id = request.params.productId;
	if(id ==='special'){
		response.status(200).json({
			message: 'special id found'
		});
	} else {
		response.status(200).json({
			message: 'you passed an id',
			id: id
		});
	}
});

router.patch('/:productId', (request, response, next) => {
	response.status(200).json({
		message: 'product edited'
	});
});

router.delete('/:productId', (request, response, next) => {
	response.status(200).json({
		message: 'product deleted'
	});
});

module.exports = router;