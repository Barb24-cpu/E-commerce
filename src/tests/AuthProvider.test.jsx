import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import { useAuth } from "../context/AuthContext";

beforeEach(() => { localStorage.clear(); });

function Consumer() {
  const { user, isAuthenticated, login, register, logout, loading } = useAuth();
  return (
    <div>
      <span data-testid="auth">{String(isAuthenticated)}</span>
      <span data-testid="user">{user?.name || "none"}</span>
      <span data-testid="loading">{String(loading)}</span>
      <button onClick={() => login({ email: "t@t.com", password: "pass123" })}>Login</button>
      <button onClick={() => register({ name: "Test", email: "t@t.com", password: "pass123" })}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function renderWithAuth(ui) {
  return render(<MemoryRouter><AuthProvider>{ui}</AuthProvider></MemoryRouter>);
}

describe("AuthProvider", () => {
  it("starts unauthenticated after loading", async () => {
    renderWithAuth(<Consumer />);
    await waitFor(() => expect(screen.getByTestId("loading")).toHaveTextContent("false"));
    expect(screen.getByTestId("auth")).toHaveTextContent("false");
  });

  it("registers a new user via localStorage fallback", async () => {
    renderWithAuth(<Consumer />);
    fireEvent.click(screen.getByText("Register"));
    await waitFor(() => {
      expect(screen.getByTestId("auth")).toHaveTextContent("true");
      expect(screen.getByTestId("user")).toHaveTextContent("Test");
    });
  });

  it("logs in an existing user via localStorage fallback", async () => {
    renderWithAuth(<Consumer />);
    fireEvent.click(screen.getByText("Register"));
    await waitFor(() => expect(screen.getByTestId("auth")).toHaveTextContent("true"));
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => expect(screen.getByTestId("auth")).toHaveTextContent("false"));
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => expect(screen.getByTestId("auth")).toHaveTextContent("true"));
  });

  it("logs out and clears user", async () => {
    renderWithAuth(<Consumer />);
    fireEvent.click(screen.getByText("Register"));
    await waitFor(() => expect(screen.getByTestId("auth")).toHaveTextContent("true"));
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => {
      expect(screen.getByTestId("auth")).toHaveTextContent("false");
      expect(screen.getByTestId("user")).toHaveTextContent("none");
    });
  });

  it("restores user from localStorage on mount", async () => {
    localStorage.setItem("user", JSON.stringify({ name: "Saved", email: "s@s.com" }));
    renderWithAuth(<Consumer />);
    await waitFor(() => {
      expect(screen.getByTestId("auth")).toHaveTextContent("true");
      expect(screen.getByTestId("user")).toHaveTextContent("Saved");
    });
  });
});
