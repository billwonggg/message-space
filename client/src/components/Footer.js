import { Box, Typography, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box sx={{ position: "absolute", bottom: "10px" }} color="register.background">
      <Typography
        fontFamily="monospace"
        fontWeight="600"
        sx={{ fontSize: { xs: "14px", md: "16px" }, textAlign: "center" }}
      >
        &copy; {new Date().getFullYear()} Bill Wong.&nbsp;
        <Link
          href="https://github.com/billwonggg/message-space"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
