const paypal = require('paypal-rest-sdk')
require('dotenv').config()

const configuration = paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_APP_SECRET,

})

exports.Paypal = (req, res) => {

    const items = req.body
    console.log('------items-----', items)
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": process.env.REDIRECT_URL_SUCCESS,
            "cancel_url": process.env.REDIRECT_URL_CANCEL
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Iphone 14 Pro Max",
                    "sku": "sgh31261247",
                    "price": "450.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "450.00"
            },
            "description": "You've bought Iphone 14 Pro for $500.Lol"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log('-------------payment------------', payment)
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {

                    // res.redirect(payment.links[i].href)
                    res.json({ forwardLink: payment.links[i].href });
                }
            }
        }
    });
}


exports.PaypalExecute = (req, res) => {
    const payer_id = req.query.PayerID
    const paymentId = req.query.paymentId

    var execute_payment_json = {

        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "500.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {


            // const payment_ = {
            //     userName: payment.payer.payer_info.first_name,
            //     price: 500,
            //     status: 'pending',
            //     Tid: payment.id
            // }

            // await payments.create(payment_)

            // console.log(JSON.stringify(payment));
            // res.send(payment)
            res.send('successful')
        }
    });

}