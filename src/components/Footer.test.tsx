import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Footer from "./Footer";

const initialProps = {
  query: "",
  loading: false,
  userCount: 0,
  pageInfo: {
    hasNextPage: true,
    hasPreviousPage: false,
  },
  onForward: jest.fn(),
  onBack: jest.fn(),
};

describe("Footer Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("renders the footer", () => {
    const props = { ...initialProps };

    const { getByRole } = render(<Footer {...props} />);

    const buttonNext = getByRole("button", { name: /chevron-right/i });
    const buttonBack = getByRole("button", { name: /chevron-left/i });

    expect(buttonNext).toBeInTheDocument();
    expect(buttonBack).toBeInTheDocument();
  });

  test("onForward must be trigger only if there are next pages", async () => {
    const props = { ...initialProps };

    const { getByRole } = render(<Footer {...props} />);
    const buttonNext = getByRole("button", { name: /chevron-right/i });

    await fireEvent.click(buttonNext);

    expect(props.onForward).toBeCalled();
  });

  test("onForward shouldn't be trigger if there are no more next pages", async () => {
    const props = {
      ...initialProps,
      pageInfo: { ...initialProps.pageInfo, hasNextPage: false },
    };
    const { getByRole } = render(<Footer {...props} />);
    const buttonNext = getByRole("button", { name: /chevron-right/i });

    await fireEvent.click(buttonNext);

    expect(buttonNext).toBeDisabled();
    expect(props.onForward).not.toBeCalled();
  });

  test("onForward button must be disabled if it's loading", async () => {
    const props = {
      ...initialProps,
      loading: true,
    };
    const { getByRole } = render(<Footer {...props} />);
    const buttonNext = getByRole("button", { name: /chevron-right/i });

    await fireEvent.click(buttonNext);

    expect(buttonNext).toBeDisabled();
    expect(props.onForward).not.toBeCalled();
  });

  test("onBack must be trigger if there are previous pages", async () => {
    const props = {
      ...initialProps,
      pageInfo: { ...initialProps.pageInfo, hasPreviousPage: true },
    };
    const { getByText } = render(<Footer {...props} />);

    const chevronLeft = getByText(/chevron-left/i);
    await fireEvent.click(chevronLeft);

    expect(props.onBack).toBeCalled();
  });

  test("onBack shouldn't be trigger if there are no more previous pages", async () => {
    const props = {
      ...initialProps,
    };

    const { getByRole } = render(<Footer {...props} />);
    const buttonBack = getByRole("button", { name: /chevron-left/i });

    await fireEvent.click(buttonBack);

    expect(buttonBack).toBeDisabled();
    expect(props.onBack).not.toBeCalled();
  });

  test("onBack button must be disabled if it's loading", async () => {
    const props = {
      ...initialProps,
      pageInfo: { ...initialProps.pageInfo, hasPreviousPage: true },
      loading: true,
    };

    const { getByRole } = render(<Footer {...props} />);
    const buttonBack = getByRole("button", { name: /chevron-left/i });

    await fireEvent.click(buttonBack);

    expect(buttonBack).toBeDisabled();
    expect(props.onBack).not.toBeCalled();
  });

  test("show total count of search results", async () => {
    const props = {
      ...initialProps,
      userCount: 100,
    };

    const { getByText } = render(<Footer {...props} />);
    const userCount = getByText(/100 results found/i);

    expect(userCount).toBeInTheDocument();
  });

  test("hide total count if there are no search results", async () => {
    const props = {
      ...initialProps,
    };

    const { queryByText } = render(<Footer {...props} />);
    const userCount = queryByText(/results found/i);

    expect(userCount).not.toBeInTheDocument();
  });

  test("show query value", async () => {
    const query = "query value";
    const props = {
      ...initialProps,
      userCount: 100,
      query,
    };

    const { getByText } = render(<Footer {...props} />);
    const userCount = getByText(new RegExp(query));

    expect(userCount).toBeInTheDocument();
  });
});
