import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const API_URL = "https://backed-tty7.onrender.com/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Prijava nije uspjela.");

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }

  async function register(username, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registracija nije uspjela.");

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}