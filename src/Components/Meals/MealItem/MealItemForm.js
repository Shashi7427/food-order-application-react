import React, { useRef } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
import { useGlobalContext } from '../../../context'
export default function MealItemForm(props) {
  const { user } = useGlobalContext();
  const submitHandler = (event)=>{
    event.preventDefault();
    if (props.showOrders){
      return;
    }
    if (user.role ==='admin'){
      props.removeProduct()
      return;
    }
    const enteredAmount = (amountRef.current.value);
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmount);
    props.onAddCart(enteredAmountNumber);
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  }
  const amountRef = useRef();
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        {!props.showOrders && user.role !=='admin'&& <Input ref = {amountRef} label="Amount" input={{
            id : 'amount',
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}/>}
        {user &&(user.role !=='admin' || props.showOrders)  &&<button disabled={props.showOrders}>{props.showOrders?props.amount:'+ Add'}</button>}
        {user && user.role ==='admin' && !props.showOrders &&<button disabled={props.showOrders}>- Remove</button>}
    </form>
  )
}
