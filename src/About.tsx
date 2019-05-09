import * as React from "react";

interface Props {
  message?: string;
}

function About(props: Props) {
  const { message } = props;
  return (
    <React.Fragment>
      <h3>About {message}</h3>
    </React.Fragment>
  );
}

export default About;
