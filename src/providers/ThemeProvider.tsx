import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import React from "react";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        // Joy UI will automatically use dark theme palette
      },
    },
  },
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark" disableTransitionOnChange>
      {children}
    </CssVarsProvider>
  );
};
