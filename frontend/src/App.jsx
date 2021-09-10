import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import AddToCartScreen from './screens/AddToCartScreen';
import ShippingScreen from './screens/ShippingScreen';

const App = () => (
  <BrowserRouter>
    <Route path="/" component={HomeScreen} exact />
    <Route path="/product/:id" component={ProductScreen} exact />
    <Route path="/login" component={LoginScreen} />
    <Route path="/addtocart/:id" component={AddToCartScreen} exact />
    <Route path="/shipping" component={ShippingScreen} exact />
  </BrowserRouter>
);

export default App;
