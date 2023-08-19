import React from 'react'

export const CartContext = React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{},
    isLogin: false,
    login: () => {},
    logout: () => {},
    user: {},
})
