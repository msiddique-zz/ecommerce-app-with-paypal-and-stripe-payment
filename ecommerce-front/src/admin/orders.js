import React, { useEffect, useState } from 'react'
import Layout from '../core/layout'
import { isAuthenticated } from '../auth'
import { listOrders } from './apiAdmin'
import moment from 'moment'
import { getStatusValues } from './apiAdmin'

const Orders = () =>{

    const [orders,setOrders]= useState([])
    const {user,token} = isAuthenticated()
    const [StatusValues,setStatusValues] = useState([])
    
    
    const loadOrders = () =>{

        listOrders(user._id,token).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }else{
                setOrders(data)

                }
            }
        )
    }

    const loadStatusValues = () =>{

        getStatusValues(user._id,token).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }else{
                console.log("---------status values----------",data)
                setStatusValues(data) 
            }
        })
    }

    useEffect(()=>{
        loadOrders()
        loadStatusValues()
    },[])

    const ordersLength = () =>{
            if(orders.length>0)
            {
                console.log('------------------length >0------------')
                return (
                    <div>
                        <h1 className="text-danger">Total Orders: {orders.length}</h1>
                        
                    </div>
                )
            }else{
                return (
                 <h1 className="text-danger">No Orders</h1>
                   
                )
            }
    }

    const showInput = (name,value)=>
    (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{name}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly/>
        </div>
    )   

    const handleStatusChange = (e,orderId) =>{
        console.log("update order status")
    }

    const showStatus = (o) =>(

        <div className="form-control">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(event)=>{
                handleStatusChange(event,o._id)
            }}>
                <option>Update Status</option>
                {StatusValues.map((status,index)=>(
                    <option key={index} value={status}>{status}</option>
                ))}
            </select>
        </div>
    )

    return(
        <Layout title="Orders" description={`G'day ${user.name}, you can manage all orders here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                   {ordersLength()}
                   {orders.map((o,oIndex)=>{
                           return (
                                    <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                         <h2 className="mb-5">
                                             <span className="bg-primary">Order ID : {o._id}</span>
                                         </h2>    
                                         <ul className="list-group mb-2">
                                             <li className="list-group-item">
                                                    {showStatus(o)}
                                             </li>
                                             <li className="list-group-item">
                                                    Ordered by: {o.user.name}
                                             </li>
                                             <li className="list-group-item">
                                                    Ordered on: {moment(o.createdAt).fromNow()}
                                             </li>
                                             <li className="list-group-item">
                                                    Delivery Address: {o.address}
                                             </li>
                                         </ul>
                                         <h3>Total Products in the order: {o.products.length}</h3>

                                        {o.products.map((p,pIndex)=>(
                            
                                            <div className="mb-4" key={pIndex} style={{padding:"20px" ,border:"1px solid indigo"}}>
                                                {showInput('Product name',p.name)}
                                                {showInput('Product count',p.count)}
                                                {showInput('Product total',p.count)}
                                                {showInput('Product Id',p._id)}
                                            </div>
                                        ))}

                                </div>
                            )
                        })}
                   {/* {showOrders()} */}
                   {/* {JSON.stringify(orders)}      */}
                </div>
            </div>
        </Layout>
    )
}
export default Orders;