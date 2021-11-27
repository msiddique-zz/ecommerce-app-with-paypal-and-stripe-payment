import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/signup'
import Signin from './user/signin'
import Home from './core/home'
import Shop from './core/Shop'
import PrivateRoute from "./auth/privateRoute";
import AdminRoute from "./auth/adminRoute";
import dashBoard from "./user/userDashboard";
import adminDashBoard from "./user/adminDashboard";
import AddCategory from './admin/CreateCategory'
import AddProduct from './admin/CreateProduct'
import Product from "./core/Product";
import Cart from "./core/Cart";
import SendMail from './core/mail'
import Orders from './admin/orders'
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from "./admin/UpdateProduct";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/" exact component={Home} />
                <Route path="/send" exact component={SendMail} />
                {/* <Route path="/facebookLogin" exact component={FacebookLogin} /> */}
                <PrivateRoute path="/user/dashboard" exact component={dashBoard} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                {/* <PrivateRoute path="/send" exact component={SendMail} /> */}
                <AdminRoute path="/admin/dashboard" exact component={adminDashBoard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId/" exact component={UpdateProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />

            </Switch>
        </BrowserRouter>
    );
};
export default Routes;