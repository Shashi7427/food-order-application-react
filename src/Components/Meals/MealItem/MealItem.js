import React, { useContext } from "react";
import { CartContext } from "../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
export default function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const onAddCart = (amount)=>{
    cartCtx.addItem({
      id:props.id,
      name:props.name,
      description:props.description,
      price:props.price,
      amount:amount
    })
    console.log("amount =============", amount)
  }
  const removeProduct = ()=>{
    props.removeProduct(props.id);
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div><MealItemForm onAddCart={onAddCart} showOrders={props.showOrders} amount={props.amount} removeProduct = {removeProduct}/></div>
    </li>   
  );
}
