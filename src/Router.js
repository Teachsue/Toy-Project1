import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import ProductList from './pages/ProductList/ProductList';
import MyPage from './pages/MyPage/MyPage';
import Cart from './pages/Cart/Cart';
import OrderResult from './pages/OrderResult/OrderResult';
import Order from './pages/Order/Order';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './pages/ProductDetail/ProductDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/goods/category/:sub_category_id"
          element={<ProductList />}
        />
        <Route path="/orders" element={<Order />} />
        <Route path="/goods/name/:name" element={<ProductDetail />} />
        <Route path="/orderResult" element={<OrderResult />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/users/signin" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
