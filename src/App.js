import React  from 'react'
import Cart from './Components/Cart/Cart'
import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import { useState } from 'react'
import { CartProvider } from './Components/store/CartProvider'
const App = props => {
  const [showCart,changeShowCart] = useState(false);
  const showCartHandler = ()=>{
    changeShowCart(true);
  }
  const hideCartHandler = ()=>{
    changeShowCart(false);
  }
  return (
    <CartProvider>
    {showCart && <Cart onClick = {hideCartHandler}/>}
    <Header onClick = {showCartHandler}/>
    <main>
      <Meals/>
    </main>
    </CartProvider>
  )
}
export default App