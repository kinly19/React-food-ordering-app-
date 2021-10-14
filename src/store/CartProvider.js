//this component will manage the cart context data, and provide the context (data) to all components that want or need access to it.
//this allows us to point to the data we need directly instead of passing data around via prop chain

import { useReducer } from "react";
import CartContext from "./cart-context";

//default state which we will use inside of useReducer()
const defaultCartState = {
  items: [],
  totalAmount: 0
};

// --> points too
//reducer function state --> defaultCartState is the last state snapshot managed by the reducer function. action is dispatched by us. 
const cartReducer = (state, action) => { //'state'--> cartState --> useReducer --> defaultCartState
  if(action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item); //whatever the state was plus action.items
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; //eg action.item.price(5)* action.item.amount(2) + state.totalAmount (5) = 15
     //return a new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  //return default if above does not meet
  return defaultCartState
};

const CartProvider = (props) => {
  //using Reducer function created above
  //first argument (useReducer()) we point at our reducer function, 2nd argument we point at our defaultCartState.
  //useReducer will return an array with exactly two elements, so we can use array destructuring to pull these elements out of array.
  //The first element is our state snapshot, 2nd element is a function that will allow us to dispatch an action to the useReducer 
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  //when this function is called, we take the item and add it to cart, but check if this 'item' we add is already inside the cart
  //we update the existing item otherwise add the new item
  const addItemToCartHandler = (item) => { //totally up to user what the action is, but typically its an object with some property that allows us to identify that action inside of our reducer function
    dispatchCartAction({type:'ADD', item: item}); // --> useReducer --> cartRudcer function
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type:'REMOVE', id: id});
  };

  //use the cartState to construct cartContext object 
  const cartContext = { 
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler, //point to our functions above
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}> {/* value={cartContext} is where we link the data to context */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;