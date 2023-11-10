import React from "react";
import Header from "./Header";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Header />);

    const headerElement = container.querySelector("header");

    expect(headerElement).toBeInTheDocument();
  });
});
