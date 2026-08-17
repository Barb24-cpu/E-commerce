import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";

describe("Checkout page", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it("redirects to login when not authenticated", async () => {
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Buyer Login/i })).toBeInTheDocument();
    });
  });

  it("shows empty cart message when authenticated but cart is empty", async () => {
    // Register a demo user and set them as logged in
    const users = [{ name: "Test User", email: "test@test.com", password: "pass123" }];
    localStorage.setItem("sokoplus-users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify({ name: "Test User", email: "test@test.com" }));

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Wait for AuthProvider to load user from localStorage
    // then Checkout should render the EmptyCart component
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Your cart is empty/i })).toBeInTheDocument();
    });
  });
});
