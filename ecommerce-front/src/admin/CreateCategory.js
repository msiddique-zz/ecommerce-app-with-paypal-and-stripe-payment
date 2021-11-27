import React, { useState } from 'react'
import Layout from '../core/layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'

const AddCategory = ()=>{
    const [name,setName]= useState('')
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
console.log('Sucess is  :'+success)

    const {user,token} = isAuthenticated()

const handleChange = (e)=>{
    setError('')
    setSuccess(false)
    setName(e.target.value)
}

const handleSubmit = (e)=>{
    e.preventDefault()
    setError('')
    setSuccess(false)

    //create api request for creating category
    createCategory(user._id,token,{name})
    .then(data=>{
        if(data.error)
        {
            setError(true)
        }else{
            setError('')
            setSuccess(true)
        }
    })

}

const newCategoryForm = ()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type ="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <div>
            <button className=" mb-50 btn btn-outline-primary">Create Category</button>
            </div>
        </form>
        
    )

const showSuccess = ()=>{
    if(success)
    {
        return <h3 className="text-success">{name} is created</h3>
    }
}

const showError = ()=>{
    if(error)
    {
        return <h3 className="text-danger">Category should be unique</h3>
    }
}
return (
    <Layout title="Create Category" description={`Good day ${isAuthenticated().user.name} ,Ready to add a new Category`} >
         
        <div className="row">

            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
            </div>
        </div>

    </Layout>
)

}
export default AddCategory
