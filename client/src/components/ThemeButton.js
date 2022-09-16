import { useContext } from "react";
import { IconButton } from "@mui/material";
import { SelectThemeContext } from "../theme/ThemeContext";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const ThemeButton = (props) => {
  const [darkMode, toggleTheme] = useContext(SelectThemeContext);

  return (
    <IconButton
      onClick={toggleTheme}
      {...props}
      style={{
        transform: darkMode ? "rotate(0deg)" : "rotate(180deg)",
        transition: "all 0.2s linear",
      }}
    >
      {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ThemeButton;
