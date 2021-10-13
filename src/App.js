import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [isCartOpen, setIsCartOpen] = useState (false);

  const showCartHandler = () => { //passed down to Header component
    setIsCartOpen(true);
  };

  const hideCartHandler = () => { //passed down to Cart component
    setIsCartOpen(false);
  }

  return (
    <CartProvider> {/* provide... CartProvider around components that will use its data */}
      {isCartOpen && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main> {/* html 5 tag */}
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
