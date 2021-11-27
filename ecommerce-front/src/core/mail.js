//var nodemailer = require('nodemailer')
import { isAuthenticated } from "../auth"


const SendMail = (userEmail) =>{
  console.log('I am not hehehe herrree--------------',userEmail)
 // const {user} = isAuthenticated();
  //if(user)
         
    console.log('I am herree too--------------',userEmail)
          return  fetch(`http://localhost:8000/api/send/?userEmail=${userEmail}`,{
            method:"GET",          
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>{ 
                console.log(err)        
        })
      }
 
export default SendMail;