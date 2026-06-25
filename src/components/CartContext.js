import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.id);
    case "INCREMENT":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREMENT":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => dispatch({ type: "ADD_TO_CART", product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", id });
  const increment = (id) => dispatch({ type: "INCREMENT", id });
  const decrement = (id) => dispatch({ type: "DECREMENT", id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
