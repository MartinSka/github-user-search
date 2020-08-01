import React, { FC } from "react";
import { User } from "../models";
import Spinner from "./Spinner";
import UserComponent from "./User";
import { ReactComponent as NoFoundIcon } from "../assets/icons/not-found.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/error.svg";
import MessagePage from "./MessagePage";
import { ApolloError } from "@apollo/client";

type Props = {
  query: string;
  loading: boolean;
  users: User[];
  error?: any;
};

const Main: FC<Props> = ({ loading, users, error, query }) => {
  if (loading) {
    return <Spinner />;
  }

  if (users?.length) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users?.map((user: any) => (
          <UserComponent key={user.id} {...user} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <MessagePage Icon={ErrorIcon}>
        {error.graphQLErrors?.length
          ? error.graphQLErrors.map(({ message }: ApolloError, i: number) => (
              <span key={i}>{message}</span>
            ))
          : "Oops something went wrong"}
      </MessagePage>
    );
  }

  if (!query) {
    return (
      <MessagePage Icon={NoFoundIcon}>Please enter a GitHub user</MessagePage>
    );
  }

  return (
    <MessagePage Icon={NoFoundIcon}>
      No Results for <span className="italic">"{query}"</span>
    </MessagePage>
  );
};

export default Main;
