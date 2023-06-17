import React, { useContext, useState } from "react";
import { CartContext } from "../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import  Checkout  from "./Checkout";
export default function Cart(props) {

  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit]= useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemAdd = (item) => {
    cartCtx.addItem({...item,amount:1})
  };
  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const [isCheckout, setCheckout] = useState(false);

  const orderHandler = ()=>{
    setCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://form-react-353d6-default-rtdb.firebaseio.com/orders.json", {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove = {cartItemRemove.bind(null,item.id)}
          onAdd = {cartItemAdd.bind(null,item)}
        />
      ))}
    </ul>
  );

  const modalAction =(
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  )

  const cartModalContent = <>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout &&<Checkout onConfirm = {submitOrderHandler} onCancel = {props.onClick}/>}
    {!isCheckout && modalAction}
  </>

  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = (
    <>
    <p>Successfully placed the order</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClick}>
        Close
      </button>
    </div>
    </>
  )

  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
}
