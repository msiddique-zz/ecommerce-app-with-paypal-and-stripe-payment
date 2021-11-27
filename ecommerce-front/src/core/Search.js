import { result } from "lodash"
import React, { useEffect, useState } from "react"
import { getCategories } from "../admin/apiAdmin"
import {List} from './apiCore'

const Search = ()=>{


const [data,setData]= useState({
    categories:[],
    category:"",
    search:"",
    results:"",
    searched:""
})

const {categories, category, search, results, searched } = data

const loadCategories = ()=>{
    getCategories().then(
        data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                setData({...data,categories:data})
            }
        }
    )
}

useEffect(()=>{
    loadCategories();
},[])

const handleChange = name=>event=>{
    setData({...data, [name]:event.target.value, searched:false})
}

const searchData =()=>{
    if(search)
    {

        List({search:search || undefined, category:category})
        .then(response=>{
            if(response.error)
            {
               console.log(response.error)
            }
            else{
                setData({...data, results:response,searched:true})
            }
        })
    }

}

const handleSubmit = (e)=>{
    e.preventDefault();
    searchData();
}

const searchForm = ()=>(
    <form onSubmit={handleSubmit}>
    <span className="input-group-text">
         <div className="input-group input-group-lg">
             <div className="input-group-prepend">
             <select className="btn mr-2" onChange={handleChange('category')}>
                     <option value="All">Pick Category</option>
                     {categories.map((c,i)=>(<option key={i} value={c._id}>
                         {c.name}
                     </option>))}   
                 </select>
             </div>

             <input className="form-control col-12" type="search" onChange={handleChange('search')} placeholder="Search by name"></input>
         </div>
         <div className="btn input-group-append" style={{border:"none"}}>
             <buttton className="input-group-text ml-3">Search</buttton>
         </div>
     </span>
 </form>
)


const  searchedproducts = (results=[]) =>{
    return(
            <div className="row">

        </div>
)

}


    return (
        <div className="row">
            <div className="conatainer col-11 mb-3" > {searchForm()} 
                {JSON.stringify(results)}
            </div>
            <div className="conatiner-fluid mb-3">
                {searchedproducts(results)}
            </div>

        </div>
    )
}
export default Search;

