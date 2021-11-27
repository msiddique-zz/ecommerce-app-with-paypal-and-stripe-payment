
import React, { useState, useEffect } from 'react'
import Layout from '../core/layout'
import { isAuthenticated } from '../auth'
import { getProducts, deleteProduct } from './apiAdmin'
import { Link } from 'react-router-dom'

const Manageproducts = () => {

    const [products, setProducts] = useState([])
    const { user, token } = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const destroy = (productId) => {
        deleteProduct(user._id, productId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }



    return (
        <Layout title="Manage Products" description="Perform CRUD operation on products" className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {products.length} products</h2>
                    {/* {JSON.stringify(products)} */}
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li className="list-group-item d-flex  justify-content-between" key={i}>
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`} >
                                    <span className="badge badge-warning badge-pill">Update</span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge badge-warning badge-pill">Delete</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Manageproducts