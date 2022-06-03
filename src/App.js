import { useEffect } from "react";
import React from 'react';

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";
let isInit = true;
function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    dispatch(fetchCartData())
  },[dispatch])
  
  useEffect(() => {
    if (isInit) {
      isInit = false;
      return
    }
    if(cart.changed) {
      dispatch(sendCartData(cart));
    }
   
  }, [cart, dispatch]);
  return (
    <React.Fragment>
    {notification && <Notification notification={notification} />}
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
    </React.Fragment>
  );
}

export default App;
