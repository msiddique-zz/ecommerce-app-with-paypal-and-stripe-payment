import React,{ useState } from 'react'


 const CheckBox=({categories,handleFilters})=>{
     const [checked,setChecked]=useState([])

    const handleToggle = c =>()=>{
        
        const foundIndex = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        console.log(foundIndex)
        if(foundIndex===-1)
        {
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(foundIndex,1)
        }
//        console.log('handle',newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    
return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
        <input
            type="checkbox"
            className="form-check-input"
            onChange={handleToggle(c._id)}
            value={checked.indexOf(c._id===-1)}
            
        />
        <label className="form-check-label">{c.name}</label>
    </li>
));
};

export default CheckBox;
