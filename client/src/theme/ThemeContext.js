import { createContext, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { themeLight, themeDark } from "./theme";

const SelectThemeContext = createContext({});

const SelectThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const value = useMemo(() => [darkMode, () => setDarkMode(!darkMode)], [darkMode]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = prefersDarkMode || darkMode ? themeDark : themeLight;

  return (
    <SelectThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SelectThemeContext.Provider>
  );
};

export { SelectThemeContext, SelectThemeProvider };
