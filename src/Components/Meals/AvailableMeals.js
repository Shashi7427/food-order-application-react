import React, { useEffect, useState } from "react";
import Cards from "../UI/Cards";
import classes from "./AvailabelMeals.module.css";
import MealItem from "./MealItem/MealItem";
import useLocalState from "../../utils/localState";
import axios from "axios";

export default function AvailableMeals() {
  const { alert, showAlert, loading, hideAlert } = useLocalState();

  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");

  const removeProduct = async (id) => {
    const url = "api/v1/products/" + id;
    console.log(url);
    try {
      const { data } = await axios.delete(url);
      fetchData();
      showAlert({
        text: `Success! Product is deleted`,
        type: "success",
      });
      setTimeout(()=>{
        hideAlert();
      },3000)
      setLoading(false);
    } catch (error) {
      console.log(error);
      showAlert({ text: String(error) });
      setLoading(false);
    }
  };

  const fetchData = () => {
    const loadedMeals = [];
    axios
      .get("/api/v1/products")
      .then((response) => {
        if (response.statusText !== "OK") {
          console.log("wrong", response);
          throw new Error("Something went wrong");
        }
        console.log(response);
        return response.data;
      })
      .then((response) => {
        console.log(response);
        for (const product of response["products"]) {
          loadedMeals.push({
            id: product["_id"],
            name: product.name,
            price: product.price,
            description: product.description,
          });
        }
      })
      .then(() => {
        setMeals(loadedMeals);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchData();
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

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      removeProduct={removeProduct}
    />
  ));
  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      <section className={classes.meals}>
        <Cards>
          <ul>{mealsList}</ul>
        </Cards>
      </section>
    </>
  );
}
