import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getBraintreeClientToken, paypalPayment, stripePayment } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'
import { createOrder } from '../core/apiCore'
import { emptyCart } from './cartHelper'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        price: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error })
            } else {
                setData({ ...data, clientToken: data.clientToken })
                console.log('braintree token in data ', data)
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        if (localStorage.getItem('cart')) {
            return products.reduce((currentValue, nextValue) => {
                return currentValue + nextValue.count * nextValue.price;
            }, 0)
        }
        else {
            return 0;
        }
    }
    const handleChange = (event) => {
        setData({ ...data, address: event.target.value })
    }

    const handleClick = event => {


        const createorderData = {

            products: products,
            ammount: `${getTotal()}`,
            address: data.address
        }
        createOrder(userId, createorderData)
            .then(response => {
                emptyCart(() => {

                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                    setRun(!run); // run useEffect in parent Cart
                });
            })
    }

    const handleClick1 = event => {

        const createorderData = {

            products: products,
            ammount: `${getTotal()}`,
            address: data.address,
            status: "Paid"
        }
        console.log('------address------', data.address)
        paypalPayment(userId, token, createorderData)
        createOrder(userId, createorderData)
            .then(response => {
                emptyCart(() => {

                    console.log('payment success and empty cart');
                    // setData({
                    //     loading: false,
                    //     success: true
                    // });
                    setRun(!run); // run useEffect in parent Cart
                });
            })
        // .then(response => {
        //     emptyCart(() => {
        //         console.log('payment success and empty cart');
        //         setData({
        //             loading: false,
        //             success: true
        //         });
        //         setRun(!run); // run useEffect in parent Cart
        //     });
        // })
    }


    const handleClick2 = async (event) => {

        console.log("===================get total=================", getTotal())

        const createorderData = {
            products: products,
            ammount: `${getTotal()}`,
            address: data.address
        }
        paypalPayment(userId, token, createorderData)
        createOrder(userId, createorderData)
            .then(response => {
                emptyCart(() => {

                    console.log('payment success and empty cart==============================');
                    // setData({
                    //     loading: false,
                    //     success: true
                    // });
                    setRun(!run); // run useEffect in parent Cart
                });
            })

    }


    const handleClick3 = event => {

        const createorderData = {

            products: products,
            ammount: `${getTotal()}`,
            address: data.address
        }
        console.log('------address------', data.address)
        stripePayment(userId, token, createorderData)
        // createOrder(userId, createorderData)
        //     .then(response => {
        //         emptyCart(() => {

        //             console.log('payment success and empty cart');
        //             // setData({
        //             //     loading: false,
        //             //     success: true
        //             // });
        //             setRun(!run); // run useEffect in parent Cart
        //         });
        //     })





        // .then(response => {
        //     emptyCart(() => {
        //         console.log('payment success and empty cart');
        //         setData({
        //             loading: false,
        //             success: true
        //         });
        //         setRun(!run); // run useEffect in parent Cart
        //     });
        // })
    }

    const showDropIn = () => {
        console.log('here======================', products.length, data.clientToken)
        return (<div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    {/* <DropIn options={{
                    authorization:data.clientToken
                    
                }}  onInstance={instance=>(data.instance= instance)}/> */}


                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery Address</label>
                        <textarea onChange={handleChange} className="form-control" placeholder="Type your address here"></textarea>
                    </div>
                    {/* 
                    <DropIn
                        options={{ authorization: data.clientToken }}
                        onInstance={(instance) => (data.instance = instance)}
                    /> */}

                    {/* <button className="btn btn-success" onClick={handleClick} >Checkout</button> */}
                    <button className="btn btn-warning" onClick={handleClick1} >Checkout</button>
                    <button className="btn btn-success" onClick={handleClick2} style={{ marginLeft: "10px" }} >Pay with Paypal</button>
                    <button className="btn btn-danger" onClick={handleClick3} style={{ marginLeft: "10px" }} >Pay with Stripe</button>

                </div>) : null}
        </div>)

    }

    const showCheckout = () => {
        console.log('----------------------- iss ', isAuthenticated())
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>) : (
            <Link to="/signin">
                <button className="btn btn-primary">
                    Sign in to Checkout
                </button>
            </Link>
        )
    }

    return (
        <diV>
            <h2>
                Total :${getTotal()}
            </h2>

            {showCheckout()}
        </diV>
    )
}
export default Checkout;