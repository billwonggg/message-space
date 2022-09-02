import { useContext } from "react";
import { IconButton } from "@mui/material";
import { SelectThemeContext } from "../theme/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeButton = (props) => {
  const [darkMode, toggleTheme] = useContext(SelectThemeContext);

  return (
    <IconButton onClick={toggleTheme} {...props}>
      {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeButton;
