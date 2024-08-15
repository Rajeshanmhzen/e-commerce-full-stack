const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderModel');
const addToCartModel = require('../../models/cartProduct')
const endpoint_secret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
    let productItems = []
    if(lineItems?.data?.length) {
        for(const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.userId

            const productData = {
                productId : productId,
                name: product.name,
                price : item.price.unit_amount/100,
                quantity: item.quantity,
                image : product.images
            }
            productItems.push(productData)

            
        }
    }
    return productItems
}

const webhooks = async (request, response) => {
    const sig = request.header['stripe-signature']

    const payloadString = JSON.stringify(request.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpoint_secret,
      });

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpoint_secret)

    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
        return;
        
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // console.log("session", session);
            
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
            console.log("lineItems", lineItems);
            // console.log("Total amount:", session.amount_total);
            const productDetails = await getLineItems(lineItems)

            const orderDetails = {
                productDetails: productDetails,
                email : session.customer_email,
                userId : session.metadata.userId,
                paymentDetails: {
                    paymentId : session.payment_intent,
                    payment_method_type : session.payment_method_types,
                    payment_status : session.payment_status,
                },
                shipping_options : session.shipping_options.map(s => {
                    return {...s, shipping_amount : s.shipping_amount / 100}
                }),
                totalAmount : session.amount_total / 100

            }

            const order = await orderModel(orderDetails)
            const saveOrder = await order.save()


            if(saveOrder?._id) {
                const deleteCartItems = await addToCartModel.deleteMany({ userId: session.metadata.userId })
            }

            break;
    
        default:
            console.log(`unhandled event type ${event.type}`);
            break;
    }

    response.status(200).send()
}
module.exports = webhooks