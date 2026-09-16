import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  "Transfer",
  "Bayar & Isi Ulang",
  "Investasi",
  "Lifestyle",
  "e-Statement",
  "Flazz",
  "Cardless",
  "Produk Perbankan",
  "Proteksi",
  "Semua",
];

const SkeletonLine = ({ className = "" }: { className?: string }) => (
  <span className={`skeleton-line ${className}`} aria-hidden="true" />
);

const navItems = [
  { label: "Beranda", path: "/Feature1_1" },
  { label: "Aktivitas", path: "/Feature1_2" },
  { label: "QRIS", path: "/qris" },
  { label: "Untukmu", path: "/Feature1_3" },
  { label: "Akun Saya", path: "/Feature1_4" },
];

const Feature1_3 = () => {
  const navigate = useNavigate();

  return (
    <main className="mobile-shell">
      <section className="hero-panel">
        <header className="topbar">
          <SkeletonLine className="brand-placeholder" />
          <div className="topbar-actions" aria-hidden="true">
            <span className="action-circle" />
            <span className="action-circle" />
            <span className="action-circle action-circle-large" />
          </div>
        </header>

        <div className="greeting-row">
          <SkeletonLine className="greeting-label" />
          <SkeletonLine className="greeting-name" />
        </div>

        <article className="account-card">
          <div className="account-heading">
            <SkeletonLine className="account-pill" />
            <SkeletonLine className="account-number" />
          </div>
          <div className="balance-copy">
            <SkeletonLine className="balance-label" />
            <SkeletonLine className="balance-amount" />
          </div>
          <div className="account-actions">
            <SkeletonLine className="account-action" />
            <SkeletonLine className="account-action account-action-short" />
          </div>
        </article>
      </section>

      <section className="content-panel">
        <SkeletonLine className="promo-strip" />

        <div className="section-heading">
          <SkeletonLine className="heading-placeholder" />
          <SkeletonLine className="settings-placeholder" />
        </div>

        <div className="menu-grid" aria-label="Main menu loading">
          {menuItems.map((item) => (
            <div className="menu-item" key={item}>
              <SkeletonLine className="menu-icon" />
              <SkeletonLine className="menu-label" />
              {item === "Bayar & Isi Ulang" || item === "Lifestyle" ? (
                <SkeletonLine className="new-badge" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="carousel-dots" aria-hidden="true">
          <span />
          <span className="active" />
          <span />
        </div>

        <SkeletonLine className="feature-card" />
      </section>

      <Link
        className="ai-fab"
        to="/AI_Command_3"
        aria-label="Open AI assistant"
      >
        <span className="ai-fab-orbit" aria-hidden="true" />
        <span className="ai-fab-label">VITO</span>
      </Link>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navItems.map(({ label, path }, index) => (
          <div
            className={`nav-item ${index === 0 ? "selected" : ""}`}
            key={label}
          >
            <SkeletonLine
              className={`nav-icon ${index === 2 ? "qris-icon" : ""}`}
            />
            <SkeletonLine className="nav-label" />
            <button
              className="hidden-nav-button"
              type="button"
              aria-label={`Open ${label}`}
              onClick={() => navigate(path)}
            />
          </div>
        ))}
      </nav>
    </main>
  );
};

export default Feature1_3;
