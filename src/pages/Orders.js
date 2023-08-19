import { Link } from "react-router-dom";
import styled from "styled-components";
import Cart from "./../Components/Cart/Cart";
import Header from "./../Components/Layout/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Components/UI/Cards";
import classes from "../Components/Meals/AvailabelMeals.module.css";
import MealItem from "../Components/Meals/MealItem/MealItem";
import { useGlobalContext } from "../context";

import main from "../assets/main.svg";
import { Redirect } from "react-router-dom";
// import { useGlobalContext } from '../context';
function Home() {
  const { user } = useGlobalContext();

  const [showCart, changeShowCart] = useState(false);
  const showCartHandler = () => {
    changeShowCart(true);
  };
  const hideCartHandler = () => {
    changeShowCart(false);
  };
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");

  useEffect(() => {
    const allOrders = [];
    let url = "";
    if (user.role === "admin") {
      url = "/api/v1/orders/";
    } else {
      url = "/api/v1/orders/showAllMyOrders";
    }
    axios
      .get(url)
      .then((response) => {
        if (response.statusText !== "OK") {
          console.log("wrong", response);
          throw new Error("Something went wrong");
        }
        return response.data;
      })
      .then((response) => {
        for (const order of response["orders"]) {
          const loadedMeals = [];
          for (const item of order["orderedItems"]) {
            console.log(item);
            loadedMeals.push({
              id: item["_id"],
              name: item["name"],
              price: item["price"],
              description: item["description"],
              amount: item["amount"],
            });
          }
          const mealsList = loadedMeals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
              showOrders={true}
              amount={meal.amount}
            />
          ));
          const createdAt = (
            <div>
              <h2>Order Placed : {order["createdAt"]}</h2>
            </div>
          );
          allOrders.push([mealsList, createdAt]);
        }
      })
      .then(() => {
        setOrders(allOrders);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  if (isError.length > 0) {
    return (
      <section className={classes.MealsLoading}>
        <p>{isError}</p>
      </section>
    );
  }
  const mealsList = orders.map((order) => (
    <section className={classes.meals}>
      <div>{order[1]}</div>
      <Cards>
        <ul>{order[0]}</ul>
      </Cards>
    </section>
  ));
  return (
    <>
      {showCart && <Cart onClick={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      {mealsList}
      {mealsList.length === 0 && (
        <div
          style={{
            display: "flex",
            color:"var(--primary-500)",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            <span>
            Sorry No Order History Found
            </span>
            </h2>
        </div>
      )}
    </>
  );
  //   return (
  //     <>
  //       <Wrapper className="page">
  //         <div className="info">
  //           <h2>
  //             <span>Eat What You Cook</span>
  //           </h2>
  //           <p>
  //             <h2>With Us, Together!</h2>
  //           </p>
  //           <p>
  //             I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk
  //             photo booth plaid jianbing actually squid 3 wolf moon lumbersexual.
  //             Hell of humblebrag gluten-free lo-fi man braid leggings.
  //           </p>

  //           <Link to="/login" className="btn">
  //             Login
  //           </Link>
  //           <Link to="/register" className="btn">
  //             Register
  //           </Link>
  //         </div>
  //         <img width="900" src={main} alt="job hunt" className="img main-img" />
  //       </Wrapper>
  //     </>
  //   );
}

const Wrapper = styled.div`
  display: grid;

  h2 {
    font-weight: 800;
  }
  h2 span {
    color: var(--primary-500);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    .main-img {
      display: block;
      width: 700px; /* Set the width to match the desired image size */
    }
  }
  .btn {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

export default Home;
