const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
	response.status(200).json({
		message: 'handling GET requests to /products'
	});
});

router.post('/', (request, response, next) => {
	const product = {
		name: request.body.name,
		price: request.body.name
	}
	response.status(200).json({
		message: 'handling POST requests to /products',
		createdProduct: product
	});
});

router.get('/:productId', (request,response, next) => {
	const id = request.params.productId;
	if (id === 'special') {
		response.status(200).json({
			message: 'You discovered special ID',
			id: id
		});
	} else {
		response.status(200).json({
			message: 'You passed an ID'
		});
	}
});

router.patch('/:productId', (request, response, next) => {
	response.status(200).json({
		message: 'entry patched'
	});
});

router.delete('/:productId', (request, response, next) => {
	response.status(200).json({
		message: 'product deleted'
	});
});

module.exports = router;