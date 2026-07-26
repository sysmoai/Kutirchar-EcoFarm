import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";

// Per-route code-splitting: the data router waits for each chunk before
// rendering, so lazy routes compose cleanly with the route transitions.
export const router = createBrowserRouter([
  { path: "/", Component: Root, children: [
    { index: true,                lazy: async () => ({ Component: (await import("./components/pages/HomePage")).HomePage }) },
    { path: "project",            lazy: async () => ({ Component: (await import("./components/pages/ProjectPage")).ProjectPage }) },
    { path: "proof",              lazy: async () => ({ Component: (await import("./components/pages/ProofPage")).ProofPage }) },
    { path: "products",           lazy: async () => ({ Component: (await import("./components/pages/ProductsPage")).ProductsPage }) },
    { path: "ecosystem",          lazy: async () => ({ Component: (await import("./components/pages/EcosystemPage")).EcosystemPage }) },
    { path: "digital",            lazy: async () => ({ Component: (await import("./components/pages/DigitalPage")).DigitalPage }) },
    { path: "updates",            lazy: async () => ({ Component: (await import("./components/pages/UpdatesPage")).UpdatesPage }) },
    { path: "contact",            lazy: async () => ({ Component: (await import("./components/pages/ContactPage")).ContactPage }) },
    { path: "faq",                lazy: async () => ({ Component: (await import("./components/pages/FaqPage")).FaqPage }) },
    { path: "privacy",            lazy: async () => ({ Component: (await import("./components/pages/PrivacyPage")).PrivacyPage }) },
    { path: "executive-summary",  lazy: async () => ({ Component: (await import("./components/pages/ExecSummaryPage")).ExecSummaryPage }) },
    { path: "brand-guide",        lazy: async () => ({ Component: (await import("./components/pages/BrandGuidePage")).BrandGuidePage }) },
    { path: "*",                  lazy: async () => ({ Component: (await import("./components/pages/NotFound")).NotFound }) },
  ]}]);
