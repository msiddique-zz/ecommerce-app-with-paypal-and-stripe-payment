const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')
const categoryRoutes = require('./routes/category.js')
const productRoutes = require('./routes/product.js')
const mailRoutes = require('./routes/mail.js')
const orderRoutes = require('./routes/order.js')
const session = require('express-session')
const facebookStrategy = require('passport-facebook').Strategy;
const brainTreeRoutes = require('./routes/braintree.js')
const paypalRoutes = require('./routes/paypal.js')
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
const cors = require('cors')
const paypal = require('paypal-rest-sdk')
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
//const User = require('../models/user');

require('dotenv').config()

//app
const app = express()

//db
mongoose.connect('mongodb://localhost:/ecommerce1', {
    useNewUrlParser: true
    // useCreateIndex: true
}).then(() => {
    console.log('Db Connected!')
})

//temporary
// app.get('/',(req,res)=>{
//     res.render("index.ejs")
// })


const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

//middlewares
//app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator());


app.post('/pay', (req, res) => {
    console.log("In the pay--------------------------------------------------", req.body.ammount)
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
                    "name": "Iphone 13 Pro Max",
                    "sku": "sgh31261247",
                    "price": `${req.body.ammount}`,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": `${req.body.ammount}`
            },
            "description": "You've bought Iphone 13 Pro for $500."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {

            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {

                    // res.redirect(payment.links[i].href)
                    res.json({ forwardLink: payment.links[i].href });
                }
            }
        }
    });
})

app.get('/success', (req, res) => {
    const payer_id = req.query.PayerID
    const paymentId = req.query.paymentId

    var execute_payment_json = {

        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": `${req.body.ammount}`
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {


            const payment_ = {
                userName: payment.payer.payer_info.first_name,
                price: 500,
                status: 'pending',
                Tid: payment.id
            }

            await payments.create(payment_)

            console.log(JSON.stringify(payment));
            res.send(payment)
        }
    });

})



app.get('/cancel', (req, res) => { res.send('cancelled') })


app.post('/notifications', (req, res) => {
    console.log('====req from paypal=====', req.body)
    res.status(200).send(); //very important step
})

//////stripe
app.post('/stripe/createItem', async (req, res) => {
    const { products } = req.body;
    const { ammount } = req.body;

    const product = {
        "name": 'Ecommerce Cart',
        //        "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000",
        "amount": ammount,
        "quantity": 1
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: process.env.REDIRECT_URL_SUCCESS,
        cancel_url: process.env.REDIRECT_URL_CANCEL
    });
    console.log('-------session--------', session)
    const payment_ = {

        userName: "ghassan"
        , price: session.amount_total / 100
        , status: "pending"
        , Tid: session.payment_intent

    }
    // await Payment.create(payment_)
    //res.redirect(session.url)
    res.json({ url: session.url })

})



//routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', brainTreeRoutes)
app.use('/api', mailRoutes)
app.use('/api', orderRoutes)
app.use('/api', paypalRoutes)
//app.set("view engine","ejs")

app.use(passport.initialize())
app.use(passport.session())


passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID: "414276950190373",
    clientSecret: "35b3f99da7558d1d5dfb0895adcc7c35",
    callbackURL: "http://localhost:8000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

},// facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        console.log(profile)
        return done(null, profile)
    }));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email,user_photos' }));


app.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


app.post('/pay', (req, res) => {
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
                    "name": "Iphone 13 Pro Max",
                    "sku": "sgh31261247",
                    "price": "500.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "500.00"
            },
            "description": "You've bought Iphone 13 Pro for $500."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {

            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href)
                }
            }
        }
    });
})



////////////stripe webhook

app.post('/webhooks', express.json({ type: 'application/json' }), (request, response) => {
    const event = request.body;
    // Handle the event


    switch (event.type) {

        case 'checkout.session.completed':
            const checkout = event.data.object
            console.log('------Session completed------', checkout)
            response.status(200).send()
            // const payment = {

            // }
            // Payment.create()
            break;
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount / 100} was successful!`, paymentIntent);

            //   console.log(`Finding Payment for id: --------- ${paymentIntent.id}`);
            // Payment.findOne({ where: { Tid: paymentIntent.id } })
            //   .then(record => {

            //     if (!record) {
            //       throw new Error('No record found')
            //     }

            //     console.log(`retrieved record ${JSON.stringify(record, null, 2)}`)

            //     let values = {
            //       status: 'successful'
            //     }

            //     record.update(values).then(updatedRecord => {
            //       console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
            //       // login into your DB and confirm update
            //     })

            //   })
            //   .catch((error) => {
            //     // do seomthing with the error
            //     throw new Error(error)
            //   })
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        case 'payment_intent.created':
            const paymentMethod1 = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
});





app.get('/profile', (req, res) => {
    res.send('You are registered user')
})

// app.get('/failed',(req,res)=>{
//     res.send('You are not a registered user')
// })

passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    return done(null, id)
});

const port = process.env.PORT || 8000

var listener = app.listen(port, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8000
});

