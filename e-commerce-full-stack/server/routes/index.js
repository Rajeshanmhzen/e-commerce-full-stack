const express = require('express')

const router = express.Router()

const userSignUpController = require("../controllers/user/userSignUp")
const userSignInController = require('../controllers/user/userSignIn')
const authtoken = require('../middleware/authtoken')
const UserController = require('../controllers/user/UserController')
const userLogout = require("../controllers/user/userLogout")
const passwordResetController = require('../controllers/user/passwordResetController')
const allUser = require('../controllers/user/alluser.Controller')
const updateRole = require('../controllers/user/updateRole.Controller')
const UploadProductController = require('../controllers/product/uploadProduct.controller')
const getProductController = require('../controllers/product/getProduct')
const updateProductController = require('../controllers/product/updateProduct.Controller')
const getCategoryProduct = require('../controllers/product/getCategory.Controller')
const updateUserDetail = require('../controllers/user/updateUserDetail')
const getproductDetailContoller = require('../controllers/product/getProductDetail')
const addToCartController = require('../controllers/user/addToCart.Controller')
const countAddToCartProduct = require('../controllers/user/countAddToCartProduct')
const addToCartViewProduct = require('../controllers/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controllers/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controllers/user/deleteAddToCartProduct')
const searchProduct = require('../controllers/product/searchProduct.controller')
const paymentController = require('../controllers/order/payment.controller')
const webhooks = require('../controllers/order/webhook')
const orderController = require('../controllers/order/order.Controller')




router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get('/userLogout', userLogout)
router.get("/user-details",authtoken,UserController)
router.post("/password-reset", passwordResetController)


// user 
router.post('/update-personal-info', updateUserDetail)


// admin panel
router.get('/all-user',authtoken,allUser)
router.post("/update-user",authtoken,updateRole)

// upload product
router.post('/upload-product',authtoken,UploadProductController)
router.get('/get-product',getProductController)
router.post('/update-product',authtoken,updateProductController)
router.get('/get-categoryProduct',getCategoryProduct)
router.post('/product-details', getproductDetailContoller)
router.get('/search', searchProduct)


// user add to cart

router.post('/addtocart',authtoken,addToCartController)
router.get('/countAddToCartProduct',authtoken,countAddToCartProduct)
router.get('/view-cart-product',authtoken,addToCartViewProduct)
router.post("/update-cart-product",authtoken,updateAddToCartProduct)
router.post("/delete-cart-product",authtoken,deleteAddToCartProduct)


// payemnt and order
router.post('/checkout',authtoken,paymentController)
router.post('/webhook', webhooks)
router.get('/order-list',authtoken,orderController)



module.exports = router