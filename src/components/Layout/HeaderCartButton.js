import { useContext } from 'react'; //useContext to use data within CartProvider
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext); //just like useState, whenever context changes the HeaderCartButton value will also update

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {/* output total amount of items inside of cart */}
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;