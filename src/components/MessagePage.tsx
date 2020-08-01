import React, { FC, ReactNode } from "react";

type Props = {
  Icon: React.FunctionComponent<React.SVGProps<any>>;
  children: ReactNode;
};

const MessagePage: FC<Props> = ({ Icon, children }) => (
  <div className="flex items-center flex-grow justify-center">
    <div className="flex flex-col items-center max-w-md text-center text-gray-700">
      <Icon className="w-20 h-20 mb-2 fill-current" />
      <p className="text-sm">{children}</p>
    </div>
  </div>
);

export default MessagePage;
