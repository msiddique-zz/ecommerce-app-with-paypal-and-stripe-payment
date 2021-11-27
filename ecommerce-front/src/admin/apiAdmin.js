export const createCategory = (userId, token, category) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const createProduct = (userId, token, product) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const listOrders = (userId, token) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/orders/list/${userId}`, {
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

export const getStatusValues = (userId, token) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
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

export const getCategories = () => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/categories/`, {
        method: "GET"
    })
        .then(response => {
            // console.log('AAGyaaaaaaaaa')
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const getProducts = () => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/products/?limit=100`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProduct = (productId) => {
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

export const updateProduct = (userId, productId, token, product) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const deleteProduct = (userId, productId, token) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
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
