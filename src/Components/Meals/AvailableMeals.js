import React, { useEffect, useState } from "react";
import Cards from "../UI/Cards";
import classes from "./AvailabelMeals.module.css";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const [meals,setMeals] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [isError,setError] = useState("");

  useEffect(()=>{
    const loadedMeals = [];
    fetch('https://form-react-353d6-default-rtdb.firebaseio.com/meals.json').then((response)=>{
    if (!response.ok){
      console.log("wrong")
      throw new Error('Something went wrong');
    }
    return response.json()
    }).then((response)=>{
      console.log(response)
      for (const key in response)
      {
        console.log(key,response[key].description)
        loadedMeals.push({
          id:key,
          name:response[key].name,
          price:response[key].price,
          description:response[key].description
        })
      }
    }).then(()=>{
      setMeals(loadedMeals)
      setLoading(false);
    }
      ).catch((error)=>{
        setLoading(false);
        setError(error.message)
      });
    
  },[])

  if (isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading....</p>
    </section>
  }
  if (isError.length >0){
    return <section className={classes.MealsLoading}>
      <p>{isError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Cards>
        <ul>{mealsList}</ul>
      </Cards>
    </section>
  );
}
