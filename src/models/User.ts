export interface User {
  login: string;
  avatarUrl: string;
  name: string;
  followers?: {
    totalCount: number;
  };
  following?: {
    totalCount: number;
  };
  url: string;
}

export interface UserQuery {
  query?: string;
  first?: number;
  last?: number;
  after?: string;
  before?: string;
}
