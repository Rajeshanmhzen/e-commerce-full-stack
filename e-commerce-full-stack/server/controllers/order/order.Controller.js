const orderModel = require('../../models/orderModel')
const orderController = async (request, response) => {
try {
    const currentUserId = request.userId
    const orderList = await orderModel.find({userId : currentUserId}).sort({createdAt: -1})
    response.json({
        data: orderList,
        message: "Order List",
        success: true,
        error : false
    })

} catch(err){
    res.status(400).json({
        message : err.message || err,
        error : true,
        success : false
    })
}
}
module.exports = orderController