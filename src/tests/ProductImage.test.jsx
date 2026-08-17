import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductImage from "../components/ProductImage";

const product = { id: 1, name: "Test", image: "test.jpg" };

describe("ProductImage", () => {
  it("renders an image with product src and alt", () => {
    render(<ProductImage product={product} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Test");
  });
});
