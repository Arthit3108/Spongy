const express = require('express');
const router = express.Router();

// Buyer
const registerBuyerController = require('../controller/Buyer/registerBuyerController');
const storeBuyerController = require('../controller/Buyer/storeBuyerController');
const loginBuyerController = require('../controller/Buyer/loginBuyerController');
const loginBuyerRender = require('../controller/Buyer/loginBuyerRender');
const IsSeller = require('../middleware/IsSeller');

// Buyer
router.get('/signup', registerBuyerController);
router.post('/signup', storeBuyerController);
router.get('/login', loginBuyerRender);
router.post('/login', loginBuyerController);

module.exports = router;