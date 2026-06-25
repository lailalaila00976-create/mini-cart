import React, { useState } from "react";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, increment } = useCart();
  const [adding, setAdding] = useState(false);

  const inCart = isInCart(product.id);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    if (inCart) {
      increment(product.id);
    } else {
      addToCart(product);
    }
    setAdding(true);
    setTimeout(() => setAdding(false), 600);
  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(product.rating) ? "star star--filled" : "star"}>
      ★
    </span>
  ));

  return (
    <div className="product-card">
      {product.badge && (
        <span
          className="product-badge"
          style={{ backgroundColor: product.badgeColor }}
        >
          {product.badge}
        </span>
      )}

      <div className="product-image-wrap">
        <div className="product-emoji">{product.image}</div>
        <span className="discount-chip">-{discount}%</span>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-rating">
          <div className="stars">{stars}</div>
          <span className="rating-value">{product.rating}</span>
          <span className="review-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-pricing">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <span className="product-original">₹{product.originalPrice.toLocaleString()}</span>
        </div>

        <button
          className={`add-btn ${inCart ? "add-btn--in-cart" : ""} ${adding ? "add-btn--adding" : ""}`}
          onClick={handleAdd}
        >
          {adding ? (
            <span className="btn-inner">
              <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Added!
            </span>
          ) : inCart ? (
            <span className="btn-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add More
            </span>
          ) : (
            <span className="btn-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
