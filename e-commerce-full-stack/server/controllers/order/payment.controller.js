const stripe = require('../../config/stripe')
const userModel = require('../../models/userModels')

const paymentController = async(request, response)=> {
    try {
        const {cardItems} = request.body
        // console.log("carditems", cardItems);
        const user = await userModel.findOne({ _id : request.userId})

        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types: ['card'],
            billing_address_collection : 'auto',
            shipping_options:[
                {
                    shipping_rate:'shr_1PZ0x0C4YqbpJuBldlCsGo3O'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId: request.userId
            },
            line_items : cardItems.map((item, index) => {
                return{
                    price_data : {
                        currency: 'NPR',
                        product_data: {
                            name : item.productId.productName,
                            images : item.productId.productImage,
                            metadata : {
                                productId : item.productId._id
                            }
                        },
                        unit_amount : item.productId.selling_price
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity
                }
                
            }),
            success_url : "http://localhost:5173/success",
            cancel_url : "http://localhost:5173/cancel"

        }
        const session = await stripe.checkout.sessions.create(params)
        response.status(303).json(session)
    }catch(err){
        response.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = paymentController;