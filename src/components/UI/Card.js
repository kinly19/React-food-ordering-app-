import classes from './Card.module.css';

//Card wrapper component
const Card = (props) => { //for props children
  return (
    <div className={classes.card}>{props.children}</div>
  );
};

export default Card; 