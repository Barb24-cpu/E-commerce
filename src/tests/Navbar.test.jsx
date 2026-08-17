import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthProvider";
import { AuthContext } from "../context/AuthContext";
import { CartProvider } from "../context/CartProvider";

function renderNavbar(authValue = null) {
  if (authValue) {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={authValue}>
          <CartProvider>
            <Navbar />
          </CartProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  }
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  it("renders SokoPlus brand", () => {
    renderNavbar();
    expect(screen.getByText("SokoPlus")).toBeInTheDocument();
  });

  it("renders Home and Products nav links", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders Cart link", () => {
    renderNavbar();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it("shows Login link when not authenticated", () => {
    renderNavbar({ user: null, isAuthenticated: false, logout: vi.fn(), login: vi.fn(), register: vi.fn(), loading: false });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows username and Logout when authenticated", () => {
    renderNavbar({ user: { name: "John", email: "j@j.com" }, isAuthenticated: true, logout: vi.fn(), login: vi.fn(), register: vi.fn(), loading: false });
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
