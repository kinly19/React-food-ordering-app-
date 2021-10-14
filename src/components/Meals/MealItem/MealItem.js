import { useContext } from 'react'; //using context
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

import CartContext from '../../../store/cart-context'; //using the context we want to access

const MealItem = (props) => {
  
  const cartCtx = useContext(CartContext); //point to the context we want to use
  const price =  `£${props.price.toFixed(2)}`; //render two deci places

  const addToCartHandler = amount => {
    cartCtx.addItem({ //addItem is a method defined in our context
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;