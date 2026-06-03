import { useEffect, useState } from "react";

const ORDER_URL = "https://order.casastegui.com/order";

const imageModules = import.meta.glob("./assets/images/*.{jpg,png}", {
  eager: true,
  import: "default",
});

const images = Object.entries(imageModules).map(([path, src]) => ({
  src,
  name: path.split("/").pop(),
}));

const heroImg = images.find((img) => img.name === "Hero.jpg")?.src;
const featuredImages = ["property11.jpg", "property130.jpg", "property143.jpg", "twilight4.png"]
  .map((fileName) => images.find((img) => img.name === fileName))
  .filter(Boolean);

function MobileHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isHome = window.location.pathname === "/";
    document.body.classList.toggle("casa-mobile-home-active", isHome);

    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      document.body.classList.remove("casa-mobile-home-active");
    };
  }, []);

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="casa-mobile-home" aria-label="Casa Stegui mobile homepage">
      <header className="casa-mobile-topbar">
        <button className="casa-mobile-brand" onClick={() => goTo("/")} aria-label="Casa Stegui home">
          <span>Casa Stegui</span>
          <small>Real Estate Media</small>
        </button>
        <button className="casa-mobile-menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className="casa-mobile-hero" style={{ backgroundImage: heroImg ? `url(${heroImg})` : undefined }}>
        <div className="casa-mobile-hero-overlay" />
        <div className="casa-mobile-hero-content">
          <p className="casa-mobile-eyebrow">Veteran Owned Property Media</p>
          <h1>Real estate photography built to strengthen your listing.</h1>
          <p className="casa-mobile-lead">Photography, video, twilight imagery, virtual staging, and listing media for Realtors across Central Texas.</p>
          <div className="casa-mobile-hero-actions">
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="casa-mobile-primary">Book Your Shoot →</a>
            <button onClick={() => goTo("/portfolio")} className="casa-mobile-secondary">View Portfolio</button>
          </div>
        </div>
      </section>

      <section className="casa-mobile-trustbar">
        {[
          ["▤", "Veteran Owned"],
          ["⌖", "Central Texas"],
          ["▣", "MLS Ready"],
          ["◷", "24–48 Hour Delivery"],
          ["☁", "HDPhotoHub Delivery"],
        ].map(([icon, label]) => (
          <div key={label}>
            <span>{icon}</span>
            <p>{label}</p>
          </div>
        ))}
      </section>

      <section className="casa-mobile-section casa-mobile-featured">
        <p className="casa-mobile-section-label">Featured Listings</p>
        <h2>Recent work for Central Texas Realtors.</h2>
        <div className="casa-mobile-gallery-row">
          {featuredImages.map((image, index) => (
            <button key={image.name} onClick={() => goTo("/portfolio")} className="casa-mobile-thumb" aria-label={`View portfolio image ${index + 1}`}>
              <img src={image.src} alt={`Casa Stegui featured listing ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
        <button onClick={() => goTo("/portfolio")} className="casa-mobile-text-link">View Full Portfolio →</button>
      </section>

      <section className="casa-mobile-section casa-mobile-reviews">
        <p className="casa-mobile-section-label">Google Reviews</p>
        <h2>Trusted by Central Texas Realtors.</h2>
        <div className="casa-mobile-rating">
          <span>★★★★★</span>
          <strong>5.0</strong>
          <p>3 Google reviews</p>
        </div>
        <div className="casa-mobile-review-widget">
          <div className="elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8" data-elfsight-app-lazy></div>
        </div>
      </section>

      <section className="casa-mobile-section casa-mobile-packages">
        <p className="casa-mobile-section-label">Packages</p>
        <h2>Listing media built around presentation.</h2>
        <div className="casa-mobile-package-card">
          <div>
            <small>Most Booked</small>
            <h3>Casa Elevate</h3>
            <p>Photography, twilight imagery, and listing website delivery for stronger listing presentation.</p>
          </div>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">Book Package →</a>
        </div>
      </section>

      <section className="casa-mobile-section casa-mobile-process">
        <p className="casa-mobile-section-label">Process</p>
        <h2>Simple booking for busy agents.</h2>
        <div className="casa-mobile-process-grid">
          {[
            ["01", "Book", "Choose your package and appointment time."],
            ["02", "Capture", "We photograph clean, MLS-ready media."],
            ["03", "Deliver", "Final media arrives in 24–48 hours."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="casa-mobile-section casa-mobile-service">
        <p className="casa-mobile-section-label">Service Area</p>
        <h2>Central Texas listings.</h2>
        <div className="casa-mobile-city-grid">
          {[
            "Temple",
            "Killeen",
            "Copperas Cove",
            "Harker Heights",
            "Belton",
            "Georgetown",
            "Round Rock",
            "Salado",
          ].map((city) => <span key={city}>{city}</span>)}
        </div>
      </section>

      <section className="casa-mobile-section casa-mobile-about">
        <p className="casa-mobile-section-label">About The Studio</p>
        <h2>Veteran-owned. Detail-driven.</h2>
        <p>Casa Stegui is a husband-and-wife property media studio built on precision, communication, and consistent delivery for Central Texas Realtors.</p>
      </section>

      <footer className="casa-mobile-footer">
        <p>Casa Stegui Property Media</p>
        <a href="mailto:casastegui.media@gmail.com">casastegui.media@gmail.com</a>
        <a href="https://www.instagram.com/casastegui.media" target="_blank" rel="noopener noreferrer">@casastegui.media</a>
      </footer>

      <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="casa-mobile-sticky-book">▣ Book Your Shoot →</a>

      {menuOpen && (
        <div className="casa-mobile-menu-panel" role="dialog" aria-modal="true">
          <button className="casa-mobile-menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <nav className="casa-mobile-menu-card">
            <div>
              <p>Casa Stegui</p>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
            </div>
            <button onClick={() => goTo("/")}>Home</button>
            <button onClick={() => goTo("/portfolio")}>Portfolio</button>
            <button onClick={() => goTo("/pricing")}>Pricing</button>
            <button onClick={() => goTo("/about")}>About</button>
            <button onClick={() => goTo("/contact")}>Contact</button>
            <a href="/quote/">Get a Quote</a>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">Book Your Shoot</a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileHome;
