import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Register from "../pages/Register";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";

function renderRegister() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <Register />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Register page", () => {
  it("renders the create account heading", () => {
    renderRegister();
    expect(screen.getByRole("heading", { name: /Create Account/i })).toBeInTheDocument();
  });

  it("renders name input", () => {
    renderRegister();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
  });

  it("renders email input", () => {
    renderRegister();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
  });

  it("renders password input", () => {
    renderRegister();
    expect(screen.getByPlaceholderText(/At least 6 characters/i)).toBeInTheDocument();
  });

  it("renders create account button", () => {
    renderRegister();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  it("renders login link", () => {
    renderRegister();
    expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();
  });
});
