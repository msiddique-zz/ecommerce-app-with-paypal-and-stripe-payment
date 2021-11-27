import React, { useState } from "react";
import {Redirect} from 'react-router-dom'
import Layout from "../core/layout";
import {authenticate, signin, isAuthenticated} from'../auth/index'
import cookie from 'js-cookie';
import '../bootstrap-social.css'
import Facebook from "../core/facebook";

const Signin = ({ history })=>{
    const [values, setValues]= useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer: false, 
    })
    const {email,password,loading,error,redirectToReferrer} = values

    const {user} = isAuthenticated()

    const handleChange = name =>event=>{ 
        setValues({
            ...values,error:false,[name]:event.target.value
         })
    }


    const getCookie = key => {
        if (window !== 'undefined') {
            return cookie.get(key);
        }
    };
    
    const isAuth = () => {
        if (window !== 'undefined') {
            const cookieChecked = getCookie('token');
            if (cookieChecked) {
                if (localStorage.getItem('user')) {
                    return JSON.parse(localStorage.getItem('user'));
                } else {
                    return false;
                }
            }
        }
    }

    const clickSubmit= (event)=>{
        event.preventDefault();
        setValues({...values,error:false, loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error, laoding:false})
            }else{
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        redirectToReferrer:true
                    })
    
                })
            }
        })
    }

    // const informParent = response => {
    //     authenticate(response, () => {
    //         isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
    //     });
    // };

    const signInForm = () =>(
        
        <form>
            <div className='form-group'>
                <label className="text-muted">Email</label>
                <input value={email} onChange={handleChange('email')} type="email" className="form-control"/>
            </div>           
            <div className='form-group'>
                <label className="text-muted">Password</label>
                <input value={password} onChange={handleChange('password')} type="password" className="form-control"/>
            </div>           
            <div>
            <button onClick={clickSubmit} className="btn btn-primary btn-md mt-2">Signin</button>   
            
            </div>           

            {/* <div class="card social-block mt-4">
                <div class="card-body">
                    <a class="btn btn-block btn-social btn-facebook mt-4 col-sm-4" onClick={fbLogin()} Content="Command" role="button">
                        <i class="fab fa-facebook"></i>
                        Signin with facebook
                    </a>

                </div>
            </div> */}

          
            <Facebook 
            // informParent={informParent}
             />

        </form>
 
    )

    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error?"":"none"}}>
            {error}
        </div>
    )

    const showLoading = ()=>{
        
        if(loading)
        {
            return <div className='alert alert-info'>
                    <h2>Loading...</h2>
            </div>
        }
    }

    const redirectUser =()=>{
        if(redirectToReferrer)
        {
            if(user&& user.role ===1)
            {
                return <Redirect to="/admin/dashboard " />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    return (
        <Layout title="Signin Page" description="Signin to Node React E-commerce App" className="container col-md-8 offset-md-2"> 
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
        </Layout>
    );

}
export default Signin; 