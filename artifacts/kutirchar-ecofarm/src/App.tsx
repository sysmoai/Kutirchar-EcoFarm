import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { LocaleProvider } from "./app/components/shared/i18n";

export default function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  );
}
