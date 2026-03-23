import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-strip">
      <div className="fs-col">
        <div className="fs-label">// How It Works</div>
        <div className="fs-text">
          The AI classifier uses <span className="highlight">TF-IDF vectorization</span> to convert raw email text into numerical feature vectors, then <span className="highlight">Naive Bayes</span> calculates the probability of phishing.
        </div>
      </div>
      <div className="fs-col">
        <div className="fs-label">// URL Detection</div>
        <div className="fs-text">
          <span className="highlight">Shannon entropy</span> measures how random a domain name looks. <span className="highlight">Random Forest</span> votes across 100 decision trees using 15 engineered URL features.
        </div>
      </div>
      <div className="fs-col">
        <div className="fs-label">// Architecture</div>
        <div className="fs-text">
          <span className="highlight">FastAPI</span> backend with SQLAlchemy ORM, <span className="highlight">SQLite</span> audit database, scikit-learn models, and this React frontend.
        </div>
      </div>
    </div>
  );
}