import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import { CartContext } from '../store/cart-context'
import classes from './HeaderCartButton.module.css'
export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numOFItems = cartCtx.items.reduce((current,item)=>{
    return current + item.amount
  },0)
  const [buttonBump, setButtonBump] = useState(false)
  const buttonClass = `${classes.button} ${buttonBump ? classes.bump : ''}`

  const {items} = cartCtx;

  useEffect(()=>{
    if (items.length === 0) {
      return;
    }
    setButtonBump(true);

    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClass} onClick = {props.onClick}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numOFItems}</span>
    </button>
  )
}
