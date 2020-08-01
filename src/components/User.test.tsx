import React from "react";
import { render, cleanup } from "@testing-library/react";
import User from "./User";

const initialProps = {
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
};

describe("User Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders a user", () => {
    const props = { ...initialProps };
    const { getByText, getByRole } = render(<User {...props} />);

    const userName = getByText(props.login);
    expect(userName).toBeInTheDocument();

    const name = getByText(`(${props.name})`);
    expect(name).toBeInTheDocument();

    const followers = getByText(/followers/i);
    expect(followers).toBeInTheDocument();

    const following = getByText(/following/i);
    expect(following).toBeInTheDocument();

    const avatar = getByRole("img", { name: `${props.login} avatar` });
    expect(avatar).toBeInTheDocument();

    const wrapper = getByRole("link", { name: RegExp(props.login) });
    expect(wrapper).toHaveAttribute("href", props.url);
  });

  test('hide "followers" and "following" section if there are no "followings"', () => {
    const props = {
      ...initialProps,
      following: undefined,
    };
    const { queryByText } = render(<User {...props} />);

    const followers = queryByText(/followers/i);
    expect(followers).not.toBeInTheDocument();

    const following = queryByText(/following/i);
    expect(following).not.toBeInTheDocument();
  });

  test('hide "followers" and "following" section if there are no "followers"', () => {
    const props = {
      ...initialProps,
      followers: undefined,
    };
    const { queryByText } = render(<User {...props} />);

    const followers = queryByText(/followers/i);
    expect(followers).not.toBeInTheDocument();

    const following = queryByText(/following/i);
    expect(following).not.toBeInTheDocument();
  });
});
