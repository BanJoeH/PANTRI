import React, { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div className="page fade-in">{children}</div>;
};
export default PageContainer;
