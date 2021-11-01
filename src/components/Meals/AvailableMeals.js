import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

//================================================ Notes ================================================
// Data which comes in from our api request is an object, because we need an array we will transform this
//  with a for in loop - iterates over all enumerable properties of an object that are keyed by strings
// we push an object with its key pair values inside of an array (array object)
// responseData[key].name - we access the nested object in here (key would be our object name)
// m1
// description:  "Finest fish and veggies"
// name: "Sushi"
// price: 22.99
// no dependencies are needed for useEffect, because we only want the fetch to happen once after first render
//=======================================================================================================

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodorderingapp-fa5c8-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      };
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals();
  }, []);

  //return a loading message if inLoading is true
  if (isLoading){
    return ( 
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  };

  //if isLoading is false then we map and return mealsList 
  const mealsList = meals.map((meal) => ( //const helper to map through our meals list, we can do it here instead of inside the actually jsx snippet
      <MealItem //return a custom component for each item in our meals list.
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
  )); 

  return (
    <section className={classes.meals}>
      <Card> {/* use Card component as a wrapper */}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;