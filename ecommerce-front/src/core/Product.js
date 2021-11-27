import React, { useState, useEffect } from "react";
import Layout from "./layout";
import {read} from "./apiCore"
import Card from "./Card";

const Product = (props) => {

    const [product,setProduct]=useState({})
    const [error,setError] = useState(false)

    const loadingProduct = productId =>{
         console.log('------------yh ha-------------',productId)
        read(productId).then(data=>{
            if(data.error)
            {
                setError(data.error)
            }else{
                setProduct(data)
            }
        })
    }
    useEffect(() => {
        const productId = props.match.params.productId;
        console.log('-----------------read----------------',productId)
        loadingProduct(productId);
    }, []);


    return(
        <Layout title={product && product.name} description={product && product.description} className="container-fluid"> 
            <div className="row">
                {product.name && product.description && 
                    <div className="col-5 mb-3">
                        <Card product={product}  showViewButton={false}/>
                    </div>
                }
            </div>     
       </Layout>

    )
}


export default Product;