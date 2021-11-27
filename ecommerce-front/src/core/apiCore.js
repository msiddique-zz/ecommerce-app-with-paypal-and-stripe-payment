import queryString from 'query-string'
import axios from 'axios'
import { emptyCart } from './cartHelper'

export const getProducts = (sortBy) => {
    return fetch(`http://localhost:8000/api/products/?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            const arr = response.json()
            // console.log(arr , "---------------Response---------------")
            return arr
        })
        .catch(err => {
            console.log(err)
        })
}
    
export const createOrder = (userId, token, createorderData) => {
    return fetch(`http://localhost:8000/api/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createorderData })
    })
        .then(response => {
            return response.json()

        })
        .catch(err => {
            console.log(err)
        })
}

export const paypalPayment = (userId, token, data) => {

    const headers = {
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`
    };
    axios.post('http://localhost:8000/pay', data, { headers })
        .then(res => {

            if (res.status === 200) {

                console.log(res.data)
                window.location = res.data.forwardLink
                emptyCart()
            } else {
                console.log('sad')
            }
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })

}

export const stripePayment = (userId, token, data) => {

    const headers = {
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`
    };
    axios.post('http://localhost:8000/stripe/createItem', data, { headers })
        .then(res => {

            if (res.status === 200) {

                console.log(res.data)
                window.location = res.data.url
                emptyCart()
            } else {
                console.log('sad')
            }
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })

}

// return  axios.post(`http://localhost:8000/api/paypal/pay/${userId}` ,{

//     headers:{
//         Accept: 'application/json',
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//     },
//     body:JSON.stringify({order: createorderData})
// })
// .then(response=>{
//     return response.json()

// })
// .catch(err=>{ 
//         console.log(err)        
// })



export const getCategories = () => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/categories/`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getBraintreeClientToken = (userId, token) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const read = (productId) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getFilteredProducts = (skip, limit, filters) => {
    const data = {
        skip,
        limit,
        filters
    }
    return fetch(`http://localhost:8000/api/product/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const List = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`http://localhost:8000/api/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
