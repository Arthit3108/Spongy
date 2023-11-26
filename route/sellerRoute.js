const express = require('express');
const router = express.Router();
const multer = require('multer');
// Seller
const registerSellerController = require('../controller/Seller/registerSellerController');
const locationSeller = require('../controller/Seller/locationSeller');
const storeSellerController = require('../controller/Seller/storeSellerController');
const loginSellerController = require('../controller/Seller/loginSellerController');
const loginSellerRender = require('../controller/Seller/loginSellerRender');
const homeSellerController = require('../controller/Seller/homeSellerController');
const IsSeller = require('../middleware/IsSeller');
const addProductController = require('../controller/Seller/addProductController');
const uploadimage = require('../middleware/uploadimage');
const storeProductController = require('../controller/Seller/storeProductController');
const listProductController = require('../controller/Seller/listProductController');
const addFoodController = require('../controller/Seller/addFoodController');
const storeFoodController = require('../controller/Seller/storeFoodController');





// Seller
// sign up and login
router.get('/signup', registerSellerController);
router.post('/signup', storeSellerController);
router.get('/login', loginSellerRender);
router.post('/login', loginSellerController);
router.get('/:id', IsSeller, homeSellerController);
router.post('/location', locationSeller);
router.get('/addproduct/:id', IsSeller, addProductController);
router.post('/addproduct/:id', IsSeller, uploadimage, storeProductController);
router.get('/addfood/:id', IsSeller, addFoodController);
router.post('/addfood/:id', IsSeller, uploadimage, storeFoodController);
router.get('/listproduct/:id', IsSeller, listProductController);
router.post('/listproduct/:id', IsSeller, listProductController);
// router.delete('/logout', logoutController);

// UserSeller
// router.get('/:id', homeSellerController);
// router.get('/seller/product', IsSeller);
// router.post('/seller/product', IsSeller);

module.exports = router;