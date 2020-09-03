import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './cors/Private';
import Admin from './cors/Admin';
import PrivateRoute from './auth/PrivateRoute';
import ProductPrivate from './auth/ProductPrivate';
import AdminRoute from './auth/AdminRoute';
import Forgot from './auth/Forgot';
import  ProductList from './components/ProductList';
import { ProductProvider } from "./context";
 import Layout from './cors/Layout';
import Reset from './auth/Reset';
import Cart from './components/Cart';
import Details from './components/Details';
import Default from './components/Default';

const Routes = () => 
{
    return (
        <ProductProvider>
            <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={App} />
                        <ProductPrivate exact path="/product" component={ProductList}/>
                        <Route path="/signup" exact component={Signup} />
                        <ProductPrivate path="/cart" component={Cart}/>
                        {/* <ProductPrivate path="/details" component={Details}/> */}
                        <Route path="/details" component={Details}/>
                        <Route path="/signin" exact component={Signin} />
                        <Route path="/auth/activate/:token" exact component={Activate} />
                        <PrivateRoute path="/private" exact component={Private}/>
                        <AdminRoute path="/admin" exact component={Admin} />

                        <Route path="/auth/password/forgot" exact component={Forgot} />
                        <Route path="/auth/password/reset/:token" exact component={Reset} />
                        {/* <Route component={Default}/> */}
                    </Switch>
            </BrowserRouter> 
         </ProductProvider>
    );
};

export default Routes;