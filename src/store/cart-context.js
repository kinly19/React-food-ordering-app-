import React from 'react';

const CartContext = React.createContext({
  items: [], //
  totalAmount: 0, //
  addItem: (item) => { //functions to update items context

  },
  removeItem: (id) => { //function to remove items from context

  }

});

export default CartContext;

