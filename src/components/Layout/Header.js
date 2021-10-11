import React, {Fragment} from 'react';
import classes from './Header.module.css'; //css module
import mealsImage from '../../assets/meals.jpg';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={classes['main-image']}> {/* class names with a dash - have to be wrapped between [] square brackets */}
        <img src={mealsImage} alt="A table full of delicious food!"/>
      </div>
    </Fragment>
  );
};

export default Header;