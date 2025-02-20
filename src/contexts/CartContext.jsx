import { createContext, useState } from 'react';

// Define the context with an initial value object
export const CartContext = createContext({
    cart: [],
    updateCart: () => {} // Placeholder function, will be overridden by provider value
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Provide an object as the context value
  const contextValue = {
    cart: cart,
    updateCart: setCart // Now updateCart is the setCart function
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};