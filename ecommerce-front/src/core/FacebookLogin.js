
const facebookLogin = () =>{
  console.log('I am not hehehe herrree--------------')

          return  fetch(`http://localhost:8000/api/auth/facebook/callback`,{
            method:"GET",          
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>{ 
                console.log(err)        
        })
      }

export default facebookLogin;