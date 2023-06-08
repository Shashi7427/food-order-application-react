import React, { useReducer } from 'react'
import { CartContext } from './cart-context'

const defaultState = {
    items:[],
    totalAmount :0
}
const cartReducer = (state,action)=>{
    if (action.type === "ADD"){
        const existingItemIdx = state.items.findIndex((item)=>item.id === action.item.id);
        let existingItem = state.items[existingItemIdx];
        let updatedState = [...state.items,action.item];
        if (existingItem)
        {
            existingItem = {...existingItem,amount:existingItem.amount + action.item.amount};
            updatedState = [...state.items]
            updatedState[existingItemIdx] = existingItem
        }
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        return {items:updatedState,totalAmount:updatedAmount}

    }
    if (action.type === "REMOVE"){
        const existingItemIdx = state.items.findIndex((item)=>item.id === action.id);
        let existingItem = state.items[existingItemIdx];
        let updatedState = [...state.items];
        if (existingItem.amount > 1)
        {
            existingItem = {...existingItem,amount:existingItem.amount -1};
            updatedState = [...state.items]
            updatedState[existingItemIdx] = existingItem
        }
        else {
            updatedState = updatedState.filter((item)=>item.id !==action.id)
        }
        const updatedAmount = state.totalAmount - existingItem.price;
        return {items:updatedState,totalAmount:updatedAmount}

    }
    return defaultState;
}


export const CartProvider = (props) => {

    const [cartState,changeState] = useReducer(cartReducer,defaultState);

    const addItemHandler = (item)=>{changeState({type:"ADD",item : item})};
    const removeItemHandler = (id)=>{changeState({type:"REMOVE",id:id})};
    
    const cartProvider = {
    items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem:addItemHandler,
    removeItem:removeItemHandler
}
  return (
    <CartContext.Provider value={cartProvider}>
        {props.children}
    </CartContext.Provider>
  )
}
