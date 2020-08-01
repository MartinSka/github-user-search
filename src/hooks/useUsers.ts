import { loader } from "graphql.macro";
import { useLazyQuery } from "@apollo/client";
import { UserQuery } from "../models";
import { useEffect } from "react";

const userQuery = loader("../queries/User.gql");
const queryLimit = 30;

export const useUsers = (query: string) => {
  const [getUsers, { data, fetchMore, ...rest }] = useLazyQuery(userQuery, {
    variables: {
      query,
      first: queryLimit,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (query) {
      getUsers();
    }
  }, [query, getUsers]);

  const getMore = (variables: UserQuery) =>
    fetchMore &&
    fetchMore({
      variables: {
        query,
        ...variables,
      },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
    });

  const nextPage = () =>
    getMore({
      first: queryLimit,
      after: data?.search?.pageInfo.endCursor,
    });

  const prevPage = () =>
    getMore({
      last: queryLimit,
      first: undefined,
      before: data?.search?.pageInfo.startCursor,
    });

  return {
    users: data?.search?.nodes,
    nextPage,
    prevPage,
    ...data?.search,
    ...rest,
  };
};
