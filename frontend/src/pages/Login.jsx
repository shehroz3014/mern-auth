
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Moon,
  Sun,
  ShieldCheck,
  Layers3
} from "lucide-react";

import { API } from "../App.jsx";

export default function Login({
  onLogin,
  theme,
  toggleTheme
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to sign in. Check your details."
        );
        return;
      }

      onLogin(data.user ?? data);
    } catch {
      setError(
        "Cannot connect to the server. Make sure your backend is running."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-layout">
      <header className="topbar">
        <Link to="/login" className="brand">
          <span className="brand-icon">
            <Layers3 size={19} />
          </span>

          <span>
            Nova<span className="brand-light">Space</span>
          </span>
        </Link>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          type="button"
        >
          {theme === "light" ? (
            <Moon size={16} />
          ) : (
            <Sun size={16} />
          )}

          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </header>

      <section className="auth-card">
        <div className="eyebrow">
          <span className="status-dot" />
          YOUR WORKSPACE, REIMAGINED
        </div>

        <h1>
          Welcome <span className="heading-break">back</span>
          <span className="accent">.</span>
        </h1>

        <p className="subtitle">
          Sign in to pick up right where you left off.
        </p>

        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            maxLength={254}
            required
          />

          <div className="label-row">
            <label htmlFor="password">Password</label>
            <span className="muted-label">
              8+ characters recommended
            </span>
          </div>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            className="primary-button"
            type="submit"
            disabled={busy}
          >
            {busy ? "Signing in..." : "Sign in"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="switch-text">
          New to NovaSpace? <Link to="/signup">Create an account</Link>
        </p>

        <div className="security-note">
          <ShieldCheck size={16} />
          Your account and data stay protected.
        </div>
      </section>

      <footer className="page-footer">
        © 2026 NovaSpace <span>·</span> A little more room to do great things
      </footer>
    </main>
  );
}
