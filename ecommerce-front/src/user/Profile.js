
import React, { useEffect, useState } from 'react'
import Layout from '../core/layout'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import { readUser, updateUser, updateUserInLocalStorage} from './apiUser'


const Profile = (props) =>{
    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        success:false,
        error:""
    })
    const {token} = isAuthenticated()
    const { name,email,password,success,error} = values
   
    const init=(userId)=>{
        readUser(userId,token).then(data=>{

            if(data.error)
            {
                setValues({...values,error:true})
            }else{
                setValues({...values,name:data.name,email:data.email})
                
            }
        })
    }
   
    useEffect(()=>{
        
        init(props.match.params.userId)
    },[])
   
    const handleChange = name => e =>{
        setValues({...values,error:false, [name]:e.target.value})
    }
    
    const clickSubmit = e =>{
        e.preventDefault();
        updateUser(props.match.params.userId,token,{name,email,password}).then(data=>{
            console.log('----***********data*******--------',data)
            if(data.error){
                console.log(data.error)
            }else{
                updateUserInLocalStorage(data,()=>{
                       
                    setValues({...values,name:data.name,email:data.email,success:true})
                })
            }
        })
    }

    const RedirectUser = (success)=>{
        if(success){
          return <Redirect to="/cart" />
    }
    }

    const profileUpdate = (name,email,password)=>{

        return (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange("name") } value={name} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" onChange={handleChange("email") } value={email} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" onChange={handleChange("password") } value={password} className="form-control"/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
       
       )
    }
   
    return(
    <Layout title="Profile" description="Update your profile" className="container-fluid">
        <h2 className="mb-4">Profile</h2>
        {profileUpdate(name,email,password)}
        {RedirectUser(success)}

    </Layout>
)


}

export default Profile;