const express = require('express');
const router = express.Router();


router.get('/', (request, response, next) => {
	response.status(200).json({
		message: 'handling GET requests to /orders'
	});
});

router.post('/', (request, response, next) => {
	response.status(201).json({
		message: 'handling POST requests to /orders'
	});
});

router.get('/:orderId', (request, response, next) => {
	response.status(200).json({
		message: 'order details',
		orderId: request.params.orderId
	});
});

router.delete('/:orderId', (request, response, next) => {
	response.status(200).json({
		message: 'order deleted'
	});
});

module.exports = router;