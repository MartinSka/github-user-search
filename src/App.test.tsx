import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";

describe("App Component", () => {
  test("renders the app", () => {
    const { getByText } = render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );

    const header = getByText(/github search/i);
    expect(header).toBeInTheDocument();
  });
});
