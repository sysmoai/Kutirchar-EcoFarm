import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LocaleProvider } from "./components/shared/i18n";

export default function App() {
  return (
    React.createElement(LocaleProvider, null,
      React.createElement(RouterProvider, { router: router })
    )
  );
}
import React from "react";
