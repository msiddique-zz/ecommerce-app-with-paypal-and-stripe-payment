import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Card1 from "./Card1";
import Search1 from "./Search1";
import Menu from "./menu"
import BootstrapCarousel from "./bootstrapCarousel";
import Footer from "../core/footer"
import CategoryPanel from "./CategoryPanel"

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [productsByRating, setProductsByRating] = useState([])
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
    const loadProductsByRating = () => {
        getProducts('rating').then(data => {
            if (data.error) {
                seterror(data.error)
            }
            else {
                // console.log('----------***---data----------------',data)
                setProductsByRating(data)
            }
        })
    }

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
        loadProductsByRating()
    }, [])

    return (
        <div>
            <Menu />
            {/* <img src={deals} class="img-fluid mt-5" alt="Responsive image" /> */}
            {/* <Search />                          */}
            <CategoryPanel />
            <Search1 />

            <BootstrapCarousel Sid="1" className=""></BootstrapCarousel>
            <div className="container-fluid">
                <h2 className="mb-4 mt-3">Best Sellers</h2>
                <div className="row mt-2 mb-40">
                    {productsBySell.map((product, i) => (
                        <div key={i} className="col-md-3 col-sm-6 col-xs-6 col-xxs-6 mb-3">
                            <Card1 product={product} ></Card1>
                        </div>
                    ))}
                </div>
                <BootstrapCarousel Sid="2" className="mt-4"></BootstrapCarousel>
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row mb-40">
                    {productsByArrival.map((product, i) => (
                        <div className="col-md-3 col-sm-6 col-xs-6 col-xxs-6 mb-3">
                            <Card1 className="" key={i} product={product}></Card1>
                        </div>
                    ))}
                </div>
                <BootstrapCarousel Sid="3" className="mt-4"></BootstrapCarousel>
                <h2 className="mb-4">Top Rated</h2>
                <div className="row mb-40">
                    {productsByRating.map((product, i) => (
                        <div className="col-md-3 col-sm-6 col-xs-6 col-xxs-6 mb-3">
                            <Card1 key={i} product={product}></Card1>
                        </div>
                    ))}
                </div>
                <BootstrapCarousel Sid="4" className="mt-4"></BootstrapCarousel>
                <h2 className="mb-4 ">Best Deals</h2>
                <div className="row mb-40">
                    {productsByArrival.map((product, i) => (
                        <div className="col-md-3 col-sm-6 col-xs-6 col-xxs-6 mb-3">
                            <Card1 key={i} product={product}></Card1>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home;