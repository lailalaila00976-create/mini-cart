import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { products, categories } from "../data/products";

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list.sort(
          (a, b) =>
            (b.originalPrice - b.price) / b.originalPrice -
            (a.originalPrice - a.price) / a.originalPrice
        );
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <section className="products-section" id="products">
      <div className="products-header">
        <div className="products-title-block">
          <h2 className="products-title">Our Products</h2>
          <p className="products-subtitle">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="products-controls">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>×</button>
            )}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "category-tab--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-emoji">🔍</span>
          <h3>No products found</h3>
          <p>Try a different search term or category</p>
          <button
            className="reset-btn"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
