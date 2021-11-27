import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getCart} from './cartHelper'
import Card from "./Card";
import Layout from "./layout";
import Checkout from "./Checkout";
import axios from "axios"

const Cart = ()  =>{
    const [items,setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(()=>{
        setItems(getCart())
    },[run])

const ShowItems = items =>{
    return(
        <div>
            <h2>Your cart has {`${items.length}`} items</h2>
            <hr/>
            {items.map((product,i)=>(<Card key={i} 
            product={product} 
            showAddToCartButton={false} 
            cartUpdate={true} 
            removeProductButton={true}
            setRun={setRun}
            run={run}
            />))}
        </div>
    )
}

const noItemMessage =() =>{
   return ( <h2>
        Your cart is empty.<br />
        <Link to="/shop">Continue Shopping</Link>
    </h2>
)}

const showCheckout =() =>(
    <div className="row">
            <div className="col-6">
                {items.length> 0 ? ShowItems(items) : noItemMessage()}

            </div> 
            <div className="col-6">
                    <h2>Your Cart Summary</h2>
<Checkout products={items}/>
            </div>

        </div>
)

return (
    <Layout title="Shopping Cart" description="Manage your cart. Add/Remove or checkout or Continue to Shopping" className="container-fluid">
        {showCheckout()}          
    </Layout>
)
}
export default Cart; 