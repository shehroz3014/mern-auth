
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

export default function Signup({
  onSignup,
  theme,
  toggleTheme
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create your account.");
        return;
      }

      onSignup(data.user ?? data);
    } catch {
      setError(
        "Cannot connect to the server. Check that your backend is running."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-layout">
      <header className="topbar">
        <Link to="/signup" className="brand">
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

      <section className="auth-card signup-card">
        <div className="eyebrow">
          <span className="status-dot" />
          START SOMETHING GREAT
        </div>

        <h1>
          Create your <span className="heading-break">account</span>
          <span className="accent">.</span>
        </h1>

        <p className="subtitle">
          Set up your account and get started in minutes.
        </p>

        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>

          <input
            id="name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            minLength={2}
            maxLength={50}
            required
          />

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

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            className="primary-button"
            type="submit"
            disabled={busy}
          >
            {busy ? "Creating account..." : "Create your account"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <div className="security-note">
          <ShieldCheck size={16} />
          Your password is securely handled by the server.
        </div>
      </section>

      <footer className="page-footer">
        © 2026 NovaSpace <span>·</span> Built for your next chapter
      </footer>
    </main>
  );
}
