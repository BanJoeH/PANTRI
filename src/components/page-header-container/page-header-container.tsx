import React, { ReactNode } from "react";

const PageHeaderContainer = ({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}): JSX.Element => {
  return (
    <div className="page-header">
      <h2 className="title">{title}</h2>
      {children}
    </div>
  );
};
export default PageHeaderContainer;
