import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

//======================== Notes ========================
//props.onHideCart --> app.js
//=======================================================

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}` //template literal
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1}); //this will run addItemToCartHandler function inside of CartProvider
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  //helper const 
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.onHideCart}> {/* Overlay component used as a wrapper */}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart}/>}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;