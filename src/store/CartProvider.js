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
    //check if item already exists
    //findIndex built in js method which finds an index of an item inside of an array
    //if the items id we are looking at is the same as the dispatched action id
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id //return index of that item if it exists
    ); 

    const existingCartItem = state.items[existingCartItemIndex]; //if the item does exist, existingCartItem will be set to that
    let updatedItems;

    if(existingCartItem){ //if the item exist
      const updatedItem = {
        ...existingCartItem, //we spread the existing item
        amount: existingCartItem.amount + action.item.amount //we update and add the amount
      };
      updatedItems = [...state.items]; //updatedItems --> ...existingCartItem + ...state.item 
      updatedItems[existingCartItemIndex] = updatedItem; //
    }else {
      updatedItems = state.items.concat(action.item); //whatever the state was plus action.items
    };

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; //eg action.item.price(5)* action.item.amount(2) + state.totalAmount (5) = 15
     //return a new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex( //find the exisiting item with findIndex
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex]; //points to that item in the array
    const updatedTotalAmount = state.totalAmount - existingItem.price; 
    let updatedItems;

    if (existingItem.amount === 1) {
      // filter method() creates a new array, where the item.id which is equal state.id is not apart of anymore.
      updatedItems = state.items.filter((item) => item.id !== action.id); //all item.id that are not equal to action.id are kept.
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; //spread existing item and change the amount value minus 1
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { //return our new array
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //return default if above does not meet
  return defaultCartState;
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