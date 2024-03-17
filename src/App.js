import React, { useEffect } from 'react'
import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  Routes, Route } from 'react-router-dom';
import { fakeStoreProduct, fetchProductData } from './redux/thunk';
import Layout from './component/layout'
import Home from './pages/home'
import Products from './pages/products';
import Product from './pages/product-id';
import Cart from './pages/cart';
import Login from './pages/login';
import Owner from './pages/owner';

const App = () => {
  const loading = useSelector((state) => state.productslice.loading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fakeStoreProduct());
  }, []);

  return (
    <Layout>
      {loading ? <LinearProgress color='secondary' /> : 
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/owner' exact element={<Owner />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<Product />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
      }
  </Layout>
  )
}

export default App
