
export const AddTheItem = (item=[],count=0,next = f => f) =>{
    let cart=[]
    console.log('Coming here')
    if(typeof window !=='undefined')
    {   
        if(localStorage.getItem('cart'))
        {
            cart=JSON.parse(localStorage.getItem('cart'))
        }
    }

    cart.push({
        ...item,
        count:1
    })

    // cart = Array.from(new Set(cart.map(((p)=>(p._id))))).map(id=>{
    //     return cart.find(p=>p._id === id)
    // })

    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {    
     return cart.find(p => p._id === id);
    });

    localStorage.setItem('cart',JSON.stringify(cart))
       next();
       console.log('cart : ',cart)
}


export const itemTotal = () =>{
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            return (JSON.parse(localStorage.getItem('cart'))).length
        }
        
    }
    return 0;
}

export const getCart = () =>{
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            return (JSON.parse(localStorage.getItem('cart')))
        }
        
    }
    return 0;
}


export const updateItem = (productId, count) =>{
        let cart=[]
        if(typeof window !== 'undefined')
        {
            if(localStorage.getItem('cart'))
            {
                cart = JSON.parse(localStorage.getItem('cart'))   
            }
        }
        cart.map((product,i)=>{
                if(productId === product._id)
                {
                    cart[i].count = count; 
                }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
}
 
export const removeItem = (productId) =>{
        let cart=[]
        if(typeof window !== 'undefined')
        {
            if(localStorage.getItem('cart'))
            {
                cart = JSON.parse(localStorage.getItem('cart'))   
            }
        
            cart.map((product,i)=>{
                if(productId === product._id)
                {
                    cart.splice(i,1); 
                }
            })
              localStorage.setItem('cart',JSON.stringify(cart))
        }
        return cart;
}

export const emptyCart = next =>{
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            localStorage.removeItem('cart')
        }
     }
     next();
}