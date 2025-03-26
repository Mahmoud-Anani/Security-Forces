import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import Navbar from "./components/layout/Navbar";
import { RecoilRoot } from "recoil";
import Sidebar from "./components/layout/sidebar";
import { StyledEngineProvider } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router";

import "react-datepicker/dist/react-datepicker.css";
import Copyright from "./components/layout/copyright.tsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="hhttps://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        />
        <link
          crossOrigin="anonymous"
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          crossOrigin="anonymous"
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
      </head>
      <body>
        <BrowserRouter>
          <RecoilRoot>
            <StyledEngineProvider injectFirst>
              <Navbar />
              <Sidebar />
              <App />
              <Copyright />
            </StyledEngineProvider>
          </RecoilRoot>
        </BrowserRouter>
      </body>
    </html>
  </StrictMode>
);
