import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
  
  const amountInputRef = useRef();
  const [amountValid, setAmountIsValid] = useState(true);

  const sumbitHandler = (e) => {
    
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      //this will stop the form from doing anything if the enteredAmount is 0 or greater than 5
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={sumbitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id:`amount_${props.id}`,
          type:'Number', //inputs type
          min: '1', //inputs amount has to be more than 1 
          max: '5', //not more than 5
          step: '1', //amount to add on click
          defaultValue:'1' //start value
        }}
      />
      <button>+ Add</button>
      {!amountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;