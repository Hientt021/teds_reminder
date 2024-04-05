"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { teal, blueGrey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
export interface IThemeProviderProps {
  children: any;
}

export default function CustomTheme(props: IThemeProviderProps) {
  const { children } = props;
  const theme: any = createTheme({
    palette: {
      primary: teal,
    },
    typography: {
      fontFamily: `'__Roboto_54aa2a', '__Roboto_Fallback_54aa2a'`,
      fontWeightLight: 500,
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
