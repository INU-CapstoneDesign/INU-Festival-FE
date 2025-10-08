// eslint-disable-next-line import/no-unresolved
import { Analytics } from "@vercel/analytics/react";
// eslint-disable-next-line import/no-unresolved
import { SpeedInsights } from "@vercel/speed-insights/react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import { Reset } from "styled-reset";

import GlobalStyle from "./styles/GlobalStyle";
import defaultTheme from "./styles/defaultTheme";

import routes from "./routes";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Reset />
      <GlobalStyle />
      <RouterProvider router={router} />
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  );
}
