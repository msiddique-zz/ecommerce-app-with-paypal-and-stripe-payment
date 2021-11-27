const braintree = require('braintree')


var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'brbns2zt5d57sv78',
    publicKey: '4xssn8ybtkrbtg5c',
    privateKey: '7691fcb87cd5eb0968f492e65a5c823d'
});

exports.generateToken = (req, res) => {

    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    })

}


exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let ammountFromTheClient = req.body.ammount


    let newTransaction = gateway.transaction.sale({
        ammount: ammountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result) => {
        if (error) {
            res.status
        }
    })

}