import React from "react";

export const Button: React.FunctionComponent = props => (
  <button {...props}>{props.children}</button>
);
