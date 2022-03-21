import * as React from "react";

export interface MaybeProps {
  children: React.ReactElement;
  condition?: boolean;
}

const Maybe: React.FC<MaybeProps> = ({ children, condition }) => {
  return Boolean(condition) ? children : null;
};

export default Maybe;
