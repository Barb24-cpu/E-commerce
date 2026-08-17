import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import QuantitySelector from "../components/QuantitySelector";

describe("QuantitySelector", () => {
  it("renders current quantity", () => {
    render(<QuantitySelector quantity={3} setQuantity={vi.fn()} stock={10} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders increase and decrease buttons", () => {
    render(<QuantitySelector quantity={1} setQuantity={vi.fn()} stock={10} />);
    expect(screen.getByText("−")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("calls setQuantity when increase clicked", () => {
    const setQuantity = vi.fn();
    render(<QuantitySelector quantity={1} setQuantity={setQuantity} stock={10} />);
    fireEvent.click(screen.getByText("+"));
    expect(setQuantity).toHaveBeenCalledWith(2);
  });

  it("calls setQuantity when decrease clicked", () => {
    const setQuantity = vi.fn();
    render(<QuantitySelector quantity={3} setQuantity={setQuantity} stock={10} />);
    fireEvent.click(screen.getByText("−"));
    expect(setQuantity).toHaveBeenCalledWith(2);
  });

  it("does not decrease below 1", () => {
    const setQuantity = vi.fn();
    render(<QuantitySelector quantity={1} setQuantity={setQuantity} stock={10} />);
    fireEvent.click(screen.getByText("−"));
    expect(setQuantity).not.toHaveBeenCalled();
  });

  it("does not increase above stock", () => {
    const setQuantity = vi.fn();
    render(<QuantitySelector quantity={5} setQuantity={setQuantity} stock={5} />);
    fireEvent.click(screen.getByText("+"));
    expect(setQuantity).not.toHaveBeenCalled();
  });
});
