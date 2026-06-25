import React from "react";
import { useCart } from "./CartContext";

const Header = ({ onCartClick, cartOpen }) => {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-mark">ML</span>
          <span className="logo-text">Store</span>
        </div>

        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#deals">Deals</a>
          <a href="#about">About</a>
        </nav>

        <div className="header-actions">
          <button className="search-btn" aria-label="Search">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button
            className={`cart-btn ${cartOpen ? "cart-btn--active" : ""}`}
            onClick={onCartClick}
            aria-label="Open cart"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems > 99 ? "99+" : totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
