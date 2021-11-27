import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";


const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, seterror] = useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {

            if (data.error) {
                seterror(data.error)
            }
            else {
                console.log('Data is coming : ', data)
                setProductsBySell(data)
            }
        })
    }


    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                seterror(data.error)
            }
            else {
                // console.log('----------***---data----------------',data)
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
    }, [])

    return (
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">

            <Search />
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row mb-40">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-md-3 mb-3">
                        <Card product={product} ></Card>
                    </div>

                ))}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row mb-40">
                {productsByArrival.map((product, i) => (
                    <div className="col-md-3 mb-3">
                        <Card key={i} product={product}></Card>
                    </div>
                ))}
            </div>
        </Layout>
    )
}
export default Home;