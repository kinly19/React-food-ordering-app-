import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

//================================================ Notes ================================================
// Data which comes in from our api request is an object, because we want an array we will transform this
// we push an object with its key pair values inside of an array (array object)
// m1
// description:  "Finest fish and veggies"
// name: "Sushi"
// price: 22.99
// responseData[key].name - we access the nested object in here
// no dependencies are needed for useEffect, because we only want the fetch to happen once after first render
//=======================================================================================================

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);

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
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => ( //const helper to map through our dummy list, we can do it here instead of inside the actually jsx snippet
      <MealItem //return a custom component for each item in our Dummy_meals list.
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