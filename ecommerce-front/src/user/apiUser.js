
export const readUser = (userId,token)=>{
    return  fetch(`http://localhost:8000/api/user/${userId}` ,{
        method:"GET",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        const arr = response.json()
        return arr
    })
    .catch(err=>{ 
            console.log(err)        
    })        

}


export const getPurchaseHistory = (userId,token)=>{
    return  fetch(`http://localhost:8000/api/orders/by/user/${userId}` ,{
        method:"GET",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{ 
            console.log(err)        
    })        

}


export const updateUser = (userId,token,user)=>{
    console.log('--------------user from front----------',user)
    return  fetch(`http://localhost:8000/api/user/${userId}` ,{
        method:"PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({user})
    })
    .then(response=>{
        console.log('*************response*****************',response)
        return response.json()

    })
    .catch(err=>{ 
            console.log(err)        
    })        
}



export const updateUserInLocalStorage =(user,next)=>{

    if(typeof window!== 'undefined')
    {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}