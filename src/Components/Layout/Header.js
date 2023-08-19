import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useGlobalContext } from '../../context';

import { Link } from "react-router-dom";
export default function Header(props) {
  const { user,logoutUser } = useGlobalContext();

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>Food Order App </div>
        </Link>
        <nav>
          <ul>
          {user && <li>
              <Link to="/">
              <button className={classes.button}>
              Home
              </button>
              </Link>
            </li>}
            {!user && <li>
              <Link to="/login">
              <button className={classes.button}>
              Login
              </button>
              </Link>
            </li>}
            {user && <li>
              <Link to="/profile">
              <button className={classes.button}>
                Profile
              </button>
                </Link>
            </li>}
            {user && <li>
              <Link to="/orders">
              <button className={classes.button}>
                Orders
              </button>
              </Link>
            </li>}
            {user &&user.role ==='admin' && <li>
              <Link to="/create">
              <button className={classes.button}>
              Create
              </button>
              </Link>
            </li>}
            {user && <li>
              <button className={classes.button} onClick={logoutUser}>Logout</button>
            </li>}
            {user && <li>
              <HeaderCartButton onClick={props.onClick} />
            </li>}
          </ul>
        </nav>
      </header>
      {/* <header className={classes.header}>
        <h1>ReactMeals</h1>
      </header> */}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table of delicious food!" />
      </div>
    </>
  );
}
