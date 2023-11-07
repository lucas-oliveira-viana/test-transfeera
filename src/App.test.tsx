import React from "react";
import App from "./App";
import api from "./services/base";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("App tests", () => {
  it("should render the list of receivers", async () => {
    const mockReceivers = [{ id: 1, name: "John Doe" }];

    (useSelector as jest.Mock).mockReturnValue({ receivers: mockReceivers });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());

    jest.spyOn(api, "get").mockResolvedValue({
      data: mockReceivers,
    });

    render(<App />);

    const element = await screen.findByText(
      JSON.stringify({ receivers: mockReceivers })
    );

    expect(element).toBeInTheDocument();
  });
});
