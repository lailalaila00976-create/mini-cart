import React, { useState, useRef } from "react";
import { CartProvider } from "./components/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="app">
        <Header
          onCartClick={() => setCartOpen((prev) => !prev)}
          cartOpen={cartOpen}
        />
        <main className="main">
          <Hero onShopClick={scrollToProducts} />
          <div ref={productsRef}>
            <ProductList />
          </div>
        </main>
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="logo-mark">ML</span>
              <span className="logo-text">Store</span>
            </div>
            <p className="footer-copy">© 2025 ML Store. Built for modern shoppers.</p>
          </div>
        </footer>
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;
