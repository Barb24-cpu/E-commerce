import { describe, it, expect, vi } from "vitest";
import { useAuth, AuthContext } from "../context/AuthContext";
import { render, screen } from "@testing-library/react";

function Consumer() {
  const ctx = useAuth();
  return <span data-testid="has-ctx">{ctx ? "yes" : "no"}</span>;
}

describe("AuthContext + useAuth", () => {
  it("useAuth throws outside AuthProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(/useAuth must be used within.*AuthProvider/);
    spy.mockRestore();
  });

  it("useAuth returns context value inside AuthProvider", () => {
    const value = { user: null, loading: false, isAuthenticated: false, login: vi.fn(), register: vi.fn(), logout: vi.fn() };
    render(
      <AuthContext.Provider value={value}>
        <Consumer />
      </AuthContext.Provider>
    );
    expect(screen.getByTestId("has-ctx")).toHaveTextContent("yes");
  });
});
