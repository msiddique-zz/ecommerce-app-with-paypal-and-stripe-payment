import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// import Rating from './Rating'
import image1 from "../assets/airpods.jpg"
import ShowImage from './ShowImage'

const Card1 = ({
    product,
    // showViewButton = true,
    // showAddToCartButton = true,
    // cartUpdate = false,
    // removeProductButton = false,
    // setRun = f => f, // default value of function
    // run = undefined // default value of undefined 
}) => {


    const showStockButton = (quantity) => {
        return quantity > 0 ? <span className="badge badge-primary badge-pill mb-4">
            Out of Stock
        </span>
            : <span className="badge badge-primary badge-pill" >In Stock</span>
    }


    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                {/* <Card.Img src={`http://localhost:8000/api/product/photo/${product._id}`} variant='top' style={{ padding: "0px" }} /> */}
                <Card.Img src={`http://localhost:8000/api/product/photo/${product._id}`} variant='top' style={{ padding: "0px" }} />
            </Link>

            <Card.Body>
                {/* <ShowImage item={product} url="product" /> */}

                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                {showStockButton()}

                {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}
                {(product.discountedPrice !== undefined && product.discountedPrice !== '' && product.discountedPrice !== 0)
                    ?
                    <Card.Text className="mt-2">
                        <div className="d-flex">
                            <h4>&#8377;{product.discountedPrice}</h4>
                            <a style={{ textDecoration: "line-through", marginLeft: "4px" }}>  &#8377;{product.price}</a>
                        </div>
                    </Card.Text>
                    :
                    <Card.Text as='h4' className="mt-2">&#8377;{product.price}</Card.Text>
                }
            </Card.Body>
        </Card>
    )
}

export default Card1
