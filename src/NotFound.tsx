import * as React from "react";

interface Props {
  default?: boolean;
}

function NotFound(props: Props) {
  return (
    <React.Fragment>
      <h3>404</h3>
    </React.Fragment>
  );
}
export default NotFound;
