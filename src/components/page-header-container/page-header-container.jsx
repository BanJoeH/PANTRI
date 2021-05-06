import React from "react";

const PageHeaderContainer = ({ children, title }) => {
  return (
    <div className="page-header">
      <h2 className="title">{title}</h2>
      {children}
    </div>
  );
};
export default PageHeaderContainer;
