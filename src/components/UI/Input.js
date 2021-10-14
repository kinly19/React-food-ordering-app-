import React from 'react';
import classes from './Input.module.css';

//Want to reuse input component 
const Input = React.forwardRef((props, ref) => { //using forwards ref to pass in ref 
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref}{...props.input}/>
    </div>
  );
});

export default Input;