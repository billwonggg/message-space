const API_PORT = 80;

export const API_URL =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "https://messagespace-server.azurewebsites.net"
    : `http://localhost:${API_PORT}`;
