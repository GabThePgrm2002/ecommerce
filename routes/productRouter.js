const router = require('express').Router();
const productCtlr = require('../controllers/productCtlr');

router.route('/products')
    .get(productCtlr.getProducts)
    .post(productCtlr.createProduct)

router.route('/products/:id')
    .delete(productCtlr.deleteProduct)
    .put(productCtlr.updateProduct)

module.exports = router;