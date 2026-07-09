import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { HomePage } from "./components/pages/HomePage";
import { ProjectPage } from "./components/pages/ProjectPage";
import { ProofPage } from "./components/pages/ProofPage";
import { ProductsPage } from "./components/pages/ProductsPage";
import { EcosystemPage } from "./components/pages/EcosystemPage";
import { DigitalPage } from "./components/pages/DigitalPage";
import { UpdatesPage } from "./components/pages/UpdatesPage";
import { ContactPage } from "./components/pages/ContactPage";
import { FaqPage } from "./components/pages/FaqPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { ExecSummaryPage } from "./components/pages/ExecSummaryPage";
import { NotFound } from "./components/pages/NotFound";
import { BrandGuidePage } from "./components/pages/BrandGuidePage";

export const router = createBrowserRouter([
  { path: "/", Component: Root, children: [
    { index: true, Component: HomePage },
    { path: "project", Component: ProjectPage },
    { path: "proof", Component: ProofPage },
    { path: "products", Component: ProductsPage },
    { path: "ecosystem", Component: EcosystemPage },
    { path: "digital", Component: DigitalPage },
    { path: "updates", Component: UpdatesPage },
    { path: "contact", Component: ContactPage },
    { path: "faq", Component: FaqPage },
    { path: "privacy", Component: PrivacyPage },
    { path: "executive-summary", Component: ExecSummaryPage },
    { path: "brand-guide", Component: BrandGuidePage },
    { path: "*", Component: NotFound },
  ]}]);
