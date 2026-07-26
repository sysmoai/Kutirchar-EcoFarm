import { RouterProvider } from "react-router";
import { MotionConfig } from "framer-motion";
import { router } from "./app/routes";
import { LocaleProvider } from "./app/components/shared/i18n";

export default function App() {
  return (
    <LocaleProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </LocaleProvider>
  );
}
