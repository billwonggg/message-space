import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ position: "absolute", bottom: "10px" }}>
      <Typography
        fontFamily="monospace"
        fontWeight="600"
        color="white"
        sx={{ fontSize: { xs: "14px", md: "16px" }, textAlign: "center" }}
      >
        &copy; {new Date().getFullYear()} Bill Wong.&nbsp;
        <a
          href="https://github.com/billwonggg/message-space"
          target="_blank"
          rel="noopener noreferrer"
          textAlign="center"
          style={{ color: "white" }}
        >
          GitHub
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
