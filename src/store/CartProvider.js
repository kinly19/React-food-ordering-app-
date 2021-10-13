//this component will manage the cart context data, and provide the context (data) to all components that want or need access to it.
//this allow us to point to the data we need directly instead of passing data around via prop chain
import CartContext from "./cart-context";

const CartProvider = (props) => {

  const addItemToCartHandler = (item) => {

  }

  const removeItemFromCartHandler = (id) => {

  }

  const cartContext = { //this is where we will make changes to our context
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler, //point to our functions above (like props.addItem={addItemToCartHandler})
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}> {/* value={cartContext} is where we link the data to context */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;