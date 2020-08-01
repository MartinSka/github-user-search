import React from "react";
import { render, cleanup } from "@testing-library/react";
import Main from "./Main";

const mockUsers = [
  {
    id: "1",
    login: "Username",
    avatarUrl: "avatarUrl",
    name: "Jon Doe",
    followers: {
      totalCount: 0,
    },
    following: {
      totalCount: 0,
    },
    url: "Url",
  },
];

const initialProps = {
  query: "",
  loading: false,
  users: [],
};

describe("Main Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders the main section", () => {
    const props = { ...initialProps };
    const { getByText } = render(<Main {...props} />);
    const initialMsg = getByText(/Please enter a GitHub user/i);

    expect(initialMsg).toBeInTheDocument();
  });

  test("renders the spinner on loading", () => {
    const props = { ...initialProps, loading: true };
    const { getByText } = render(<Main {...props} />);

    const spinner = getByText(/loading/i);

    expect(spinner).toBeInTheDocument();
  });

  test("renders a list of users", () => {
    const props = { ...initialProps, users: mockUsers };
    const { getByRole } = render(<Main {...props} />);

    const users = getByRole("img", { name: /avatar/i });

    expect(users).toBeInTheDocument();
  });

  test("renders generic error message", () => {
    const props = { ...initialProps, error: {} };
    const { getByText } = render(<Main {...props} />);

    const errorMsg = getByText(/oops/i);

    expect(errorMsg).toBeInTheDocument();
  });

  test("renders a list of errors", () => {
    const message = "error message";
    const props = {
      ...initialProps,
      error: {
        graphQLErrors: [{ message }],
      },
    };
    const { getByText } = render(<Main {...props} />);

    const errorMsg = getByText(message);

    expect(errorMsg).toBeInTheDocument();
  });

  test("renders no result message", () => {
    const query = "query with not result";
    const props = {
      ...initialProps,
      query,
      users: [],
    };
    const { getByText } = render(<Main {...props} />);

    const noResultMsg = getByText(/no results for/i);
    expect(noResultMsg).toBeInTheDocument();
  });
});
