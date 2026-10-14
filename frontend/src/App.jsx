
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export const API = "http://localhost:3000";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("mern-theme") || "light"
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem("mern-theme", next);
      return next;
    });
  }

  useEffect(() => {
    let active = true;

    fetch(`${API}/api/auth/me`, {
      credentials: "include"
    })
      .then(async (response) => {
        if (!response.ok) return null;

        const data = await response.json();
        return data.user ?? data;
      })
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className={`app-shell ${theme}`}>
        <div className="loading-screen">
          <span className="spinner" />
          <p>Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-shell ${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={user ? "/dashboard" : "/login"}
                replace
              />
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login
                  onLogin={setUser}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              )
            }
          />

          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Signup
                  onSignup={setUser}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard
                  user={user}
                  onLogout={() => setUser(null)}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
