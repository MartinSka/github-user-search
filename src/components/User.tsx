import React from "react";
import { User } from "../models";
import { ReactComponent as UserIcon } from "../assets/icons/user.svg";

const UserComponent: React.FC<User> = ({
  login,
  avatarUrl,
  name,
  followers,
  following,
  url,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded overflow-hidden shadow flex p-2 bg-white flex-shrink-0 w-full"
    >
      <div className="w-16 bg-gray-100 mr-3 h-16">
        <img src={avatarUrl} alt={`${login} avatar`} />
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-base text-gray-900">
          {login}{" "}
          {name && <span className="text-xs text-gray-600">({name})</span>}
        </p>

        {followers && following && (
          <div className="flex text-xs items-center whitespace-no-wrap">
            <UserIcon className="mr-1 w-3 h-3" />
            {`${followers.totalCount} followers · ${following.totalCount} following`}
          </div>
        )}
      </div>
    </a>
  );
};

export default UserComponent;
