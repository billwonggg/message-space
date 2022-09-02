import { createContext, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themeLight, themeDark } from "./theme";

const SelectThemeContext = createContext({});

const SelectThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const value = useMemo(() => [darkMode, () => setDarkMode(!darkMode)], [darkMode]);

  const theme = darkMode ? themeDark : themeLight;

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
