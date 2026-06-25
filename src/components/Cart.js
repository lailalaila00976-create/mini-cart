import React, { useState } from "react";
import { useCart } from "./CartContext";

const CartItem = ({ item }) => {
  const { increment, decrement, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-emoji">{item.image}</div>

      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <span className="cart-item-category">{item.category}</span>
        <div className="cart-item-price-row">
          <span className="cart-item-price">₹{item.price.toLocaleString()}</span>
          <span className="cart-item-original">₹{item.originalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="cart-item-controls">
        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>

        <div className="qty-control">
          <button
            className="qty-btn"
            onClick={() => decrement(item.id)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => increment(item.id)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="cart-item-subtotal">
          ₹{(item.price * item.quantity).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

const Cart = ({ isOpen, onClose }) => {
  const { cart, totalItems, totalPrice, totalSavings, clearCart } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const gst = Math.round(totalPrice * 0.18);
  const shipping = totalPrice > 2000 ? 0 : 99;
  const grandTotal = totalPrice + gst + shipping;

  const handleCheckout = () => {
    setCheckoutDone(true);
    setTimeout(() => {
      clearCart();
      setCheckoutDone(false);
      onClose();
    }, 2200);
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={onClose}
      />
      <aside className={`cart-sidebar ${isOpen ? "cart-sidebar--open" : ""}`}>
        <div className="cart-header">
          <div className="cart-title-block">
            <h2 className="cart-title">Your Cart</h2>
            {totalItems > 0 && (
              <span className="cart-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            )}
          </div>
          <div className="cart-header-actions">
            {cart.length > 0 && (
              <button className="clear-btn" onClick={clearCart}>
                Clear All
              </button>
            )}
            <button className="close-btn" onClick={onClose} aria-label="Close cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {checkoutDone ? (
          <div className="checkout-success">
            <div className="success-circle">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Order Placed!</h3>
            <p>Thank you for shopping with ML Store</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛍️</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <button className="shop-btn" onClick={onClose}>
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-footer">
              {totalSavings > 0 && (
                <div className="savings-bar">
                  <span className="savings-label">🎉 You're saving</span>
                  <span className="savings-amount">₹{totalSavings.toLocaleString()}</span>
                </div>
              )}

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>
                    Shipping
                    {shipping === 0 && (
                      <span className="free-tag"> FREE</span>
                    )}
                  </span>
                  <span>{shipping === 0 ? "₹0" : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="free-shipping-note">
                    Add ₹{(2000 - totalPrice).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>

              <div className="grand-total">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Cart;
