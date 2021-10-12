import classes from './Input.module.css';

//Want to reuse input component 
const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input}/>
    </div>
  );
};

export default Input;