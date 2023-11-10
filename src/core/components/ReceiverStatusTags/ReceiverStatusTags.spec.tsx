import React from "react";
import {
  ReceiverStatusTagDraft,
  ReceiverStatusTagValidated,
} from "./ReceiverStatusTags";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

describe("Header Component", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <>
        <ReceiverStatusTagDraft />
        <ReceiverStatusTagValidated />
      </>
    );

    const element = container.querySelector("div");

    expect(element).toBeInTheDocument();
  });
});
