import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input
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
    </form>
  );
};

export default MealItemForm;