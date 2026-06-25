import React from "react";

const Hero = ({ onShopClick }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="live-dot"></span>
          New arrivals this week
        </div>
        <h1 className="hero-headline">
          Tech that moves
          <br />
          <span className="hero-accent">at your speed.</span>
        </h1>
        <p className="hero-sub">
          Curated gadgets, honest prices — no noise, just the gear you actually need.
        </p>
        <div className="hero-actions">
          <button className="hero-cta" onClick={onShopClick}>
            Shop Now
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <div className="hero-stats">
            <div className="stat">
              <strong>8+</strong>
              <span>Categories</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>₹599</strong>
              <span>Starting at</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>Free</strong>
              <span>Shipping ₹2k+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-ring hero-ring--1"></div>
        <div className="hero-ring hero-ring--2"></div>
        <div className="hero-ring hero-ring--3"></div>
        <div className="hero-glyph">🎧</div>
        <div className="floating-card floating-card--1">
          <span className="fc-emoji">⌚</span>
          <div className="fc-info">
            <strong>Smart Watch</strong>
            <span>₹4,999</span>
          </div>
        </div>
        <div className="floating-card floating-card--2">
          <span>🔥 35% off today</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
