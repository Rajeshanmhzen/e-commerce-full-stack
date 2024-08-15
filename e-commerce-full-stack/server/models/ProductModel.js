const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    quantity:Number,
    old_price : Number,
    selling_price: Number,
    description: String,
},{
    timestamps : true
})


const productModel =  mongoose.model("product",productSchema)


module.exports = productModel