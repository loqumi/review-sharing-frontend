import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import axios from "axios";

axios.defaults.withCredentials = true;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
