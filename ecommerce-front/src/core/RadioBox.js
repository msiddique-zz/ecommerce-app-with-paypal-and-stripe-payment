import React,{ Fragment, useState } from 'react'




const RadioBox = ({prices , handleFilters}) =>{
    const [values,setValues]=useState(0)



const handleChange= event =>{
    handleFilters(event.target.value)
    setValues(event.target.value )
}


    return prices.map((p, i) => (
        <li key={i}>
            <input
                type="radio"
                className="form-check-input"
                onChange={handleChange}
                value={`${p._id}`}
                name={p}                
            />
            <label className="form-check-label">{p.name}</label>
        </li>
    )); 
}

export default RadioBox;