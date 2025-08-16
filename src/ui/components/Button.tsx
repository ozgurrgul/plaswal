import * as React from "react";
import JoyButton from "@mui/joy/Button";

type Props = React.ComponentProps<typeof JoyButton>;

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <JoyButton {...props}>{children}</JoyButton>;
};
