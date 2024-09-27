import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles"; // Cambiado
import { createTheme } from "./create-theme";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const theme = createTheme();

  return (
    <MUIThemeProvider theme={theme}> {/* Cambiado */}
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
