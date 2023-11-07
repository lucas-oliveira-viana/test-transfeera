import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button"; // Adjust the import path as needed

test("renders Button component", () => {
  render(<Button />);
  const buttonElement = screen.getByText("Button");
  expect(buttonElement).toBeTruthy();
});
