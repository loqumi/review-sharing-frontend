import React from "react";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2"></div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
