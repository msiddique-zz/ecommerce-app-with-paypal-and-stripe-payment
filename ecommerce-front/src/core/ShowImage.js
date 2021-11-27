import React from 'react'
import { Link } from 'react-router-dom'

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        {/* {console.log('--------------photo-----------',item.name)} */}
        <img
            src={`http://localhost:8000/api/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ height: "300px", width: "300px" }}

        />
    </div>
)

export default ShowImage;