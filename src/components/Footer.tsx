import React, { FC } from "react";
import { ReactComponent as ChevronLeftIcon } from "../assets/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "../assets/icons/chevron-right.svg";
import { PageInfo } from "../models";

type Props = {
  query: string;
  loading: boolean;
  userCount: number;
  pageInfo: PageInfo;
  onBack: () => void;
  onForward: () => void;
};

const Footer: FC<Props> = ({
  query,
  onBack,
  loading,
  pageInfo,
  userCount,
  onForward,
}) => (
  <footer className="border-t flex flex-shrink-0 py-2 px-4 justify-between">
    <button
      onClick={onBack}
      disabled={!pageInfo?.hasPreviousPage || loading}
      className="disabled:text-gray-300"
    >
      <ChevronLeftIcon className="w-6 h-6 fill-current" />
    </button>
    {!!userCount && (
      <p className="text-sm">
        {`${userCount} results found for `}
        <span className="italic">"{query}"</span>
      </p>
    )}
    <button
      disabled={!pageInfo?.hasNextPage || loading}
      className="disabled:text-gray-300"
      onClick={onForward}
    >
      <ChevronRightIcon className="w-6 h-6 fill-current" />
    </button>
  </footer>
);

export default Footer;
