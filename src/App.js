import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from './context'
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import { useState } from "react";
import { useGlobalContext } from './context';

import {
  Home,
  Error,
  Register,
  Login,
  Profile,
  Verify,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
  Orders,
  CreateNewProduct
} from "./pages";
const showCartHandler = () => {
  return;
};
const App = (props) => {
  const { user } = useGlobalContext();
  const display = user ? <Dashboard/> : <Home/>
  return (
    <Router>
      {!user && <Header onClick={showCartHandler} />}
      <Switch>
        <Route path="/" exact>
          {display}
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/create" exact>
          <CreateNewProduct />
        </ProtectedRoute>
        <ProtectedRoute path="/orders" exact>
          <Orders />
        </ProtectedRoute>
        <Route path="/register" exact>
          <Register />
        </Route>
        <ProtectedRoute path="/dashboard" exact>
          <Dashboard />
        </ProtectedRoute>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/user/verify-email" exact>
          <Verify />
        </Route>
        <Route path="/user/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
