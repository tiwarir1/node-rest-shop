
const express = require('express');
const router = express.Router();

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: 'orders were received'
    });
});

router.get('/:orderId', (request, response, next) => {
    response.status(200).json({
        message: 'Order details',
        orderId: request.params.orderId
    });
});

router.delete('/:orderId', (request, response, next) => {
    response.status(200).json({
        message: 'Order deleted',
        id: request.params.orderId
    });
});

module.exports = router;
