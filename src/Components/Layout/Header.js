import React from 'react' 
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
export default function Header(props) {
  return (
    <>
    <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick = {props.onClick}/>
    </header>
    <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table of delicious food!"/>
    </div>
    </>
  )
}
