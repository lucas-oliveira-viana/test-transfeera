import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders Button component", () => {
  render(<Button>a</Button>);
  const buttonElement = screen.getByText("Button");
  expect(buttonElement).toBeTruthy();
});
