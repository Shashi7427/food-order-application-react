import React, { useRef } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
export default function MealItemForm(props) {
  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredAmount = (amountRef.current.value);
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmount);
    props.onAddCart(enteredAmountNumber);
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  }
  const amountRef = useRef();
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input ref = {amountRef} label="Amount" input={{
            id : 'amount',
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}/>
        <button>+ Add</button>
    </form>
  )
}
