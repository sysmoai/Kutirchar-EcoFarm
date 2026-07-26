import { useState } from "react";
import { SectionHeader, Card } from "./Section00MasterLogo";

const brandTokensJSON = {
  brand: {
    name_english: "Kutirchar EcoFarm",
    name_bengali: "কুটিরচর ইকোফার্ম",
    owner: "EMON HOSSAIN",
    decision_date: "2026-06-21",
    status: "FINAL / FIXED",
    location: "Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh",
    website: "kutircharecofarm.com",
    email: "info@kutircharecofarm.com",
  },
  taglines: {
    primary: "Smart Cattle & Circular Energy Ecosystem",
    alternative: "Dairy • Biogas • Solar • Silage",
    third: "From Village Farm to Smart Eco-System",
  },
  positioning: "Smart Cattle, Biogas, Solar, Silage and Circular Profit Ecosystem",
  brand_approach: "Evidence-first, bank-ready, government-ready, rural-modern, trustworthy",
  colors: {
    kutirchar_green: "#1F6B3A",
    deep_farm_green: "#0B4F2A",
    field_green: "#4F9A3D",
    field_mist: "#EEF5EA",
    document_ivory: "#FAF7EF",
    charcoal_text: "#1E2420",
    solar_gold: "#F2B544",
    river_blue: "#2E6F8E",
    soil_brown: "#4A2F1B",
    bio_slurry_olive: "#708238",
    bio_olive_deep: "#5E6E30", // WCAG-AA olive for small text on light backgrounds
    verification_yellow: "#F4C430",
    risk_red: "#B42318",
    gov_gray: "#4B5563",
  },
  fonts: {
    brand_serif_english: "Playfair Display",
    ui_sans: "Inter",
    ui_sans_alt: "Manrope",
    bengali_sans: "Noto Sans Bengali",
    bengali_serif: "Noto Serif Bengali",
  },
  sub_brands: [
    "Kutirchar EcoFarm Dairy",
    "Kutirchar EcoFarm Energy",
    "Kutirchar EcoFarm Biogas",
    "Kutirchar EcoFarm Silage",
    "Kutirchar EcoFarm Training",
    "Kutirchar EcoFarm Dashboard",
  ],
  phases: {
    NOW: "Active and operational. Evidence exists. Safe to claim publicly.",
    NEXT: "Planned. Gates must pass before claiming.",
    LATER: "Demand-gated or verification-gated. Do not show as active.",
  },
  forbidden_names: [
    "Kutir Char EcoFarm",
    "Kutirchar Eco Farm",
    "Kutirchar Smart Farm",
    "kutirchar ecofarm",
    "KEF",
    "K-Farm",
  ],
  typography: {
    note: "Mirrored bilingual system. Display/wordmark = serif: Playfair Display (English) + Noto Serif Bengali (Bangla). Body/UI = sans: Inter (English) + Noto Sans Bengali (Bangla). English and Bangla siblings always share the same role and weight.",
    optical_scaling_rule: "CRITICAL: Bengali fonts (Noto Serif Bengali, Noto Sans Bengali) must ALWAYS be sized ~14% larger than their English counterpart to match visual bulk (x-height). E.g., English 28px = Bengali 32px. Never use tracking on Bengali text.",
    scale_english: {
      display:   { font: "Playfair Display", size_px: 48, weight: 700, use: "Cover titles, hero headings" },
      h1:        { font: "Playfair Display", size_px: 32, weight: 600, use: "Report headings, section titles" },
      h2:        { font: "Inter",            size_px: 22, weight: 600, use: "Section sub-headings, UI headings" },
      h3:        { font: "Inter",            size_px: 16, weight: 600, use: "Card headings, list titles" },
      body:      { font: "Inter",            size_px: 14, weight: 400, line_height: 1.65, use: "All body text, paragraphs" },
      small:     { font: "Inter",            size_px: 12, weight: 400, use: "Captions, labels, secondary text" },
      label_caps:{ font: "Inter",            size_px: 11, weight: 700, transform: "uppercase", tracking: "0.08em", use: "Section labels, status chips" },
    },
    scale_bengali: {
      display: { font: "Noto Serif Bengali", size_px: 36, weight: 700, use: "Premium Bengali headings" },
      heading: { font: "Noto Sans Bengali",  size_px: 24, weight: 600, use: "Section headings in Bengali" },
      body:    { font: "Noto Sans Bengali",  size_px: 14, weight: 400, line_height: 1.55, use: "Bengali body text" },
      small:   { font: "Noto Sans Bengali",  size_px: 12, weight: 400, use: "Bengali captions and labels" },
    },
    wordmark: {
      english: { font: "Playfair Display", weight: 600, tracking: "0.02em" },
      bengali: { font: "Noto Serif Bengali", weight: 600, tracking: "0em" },
    },
  },
  logo_sizes: {
    note: "All sizes in pixels. Always use the master PNG at the highest available resolution then downscale.",
    favicon:         { min_px: 16,   max_px: 64,   use: "Browser tab, desktop shortcut" },
    web_nav_icon:    { min_px: 32,   max_px: 64,   use: "Navigation bar icon-only" },
    web_nav_full:    { min_px: 120,  max_px: 200,  use: "Horizontal lockup in nav bar" },
    app_icon:        { min_px: 512,  max_px: 1024, use: "iOS/Android/PWA app icon" },
    social_profile:  { min_px: 400,  max_px: 1080, use: "WhatsApp, Facebook, Instagram, LinkedIn" },
    business_card:   { min_px: 51,   max_px: 80,   use: "18–28mm width at 72dpi" },
    document_header: { min_px: 44,   max_px: 60,   use: "PDF/Word letterhead icon" },
    report_cover:    { min_px: 80,   max_px: 140,  use: "Cover page stacked lockup" },
    seal_document:   { min_px: 85,   max_px: 200,  use: "Official seal on documents" },
    signage:         { min_px: 400,  max_px: null,  use: "Outdoor sign, banner (15cm min width)" },
  },
  social_media_image_sizes: {
    note: "All dimensions in pixels (width × height). Always export at full resolution; platform compresses automatically.",
    youtube: {
      channel_icon:   { w: 800,  h: 800,   shape: "circle",    use: "YouTube channel profile picture" },
      channel_banner: { w: 2560, h: 1440,  safe_zone_w: 1546, safe_zone_h: 423, use: "YouTube channel art" },
      video_thumbnail:{ w: 1280, h: 720,   ratio: "16:9",      use: "Video thumbnail" },
    },
    facebook: {
      profile_photo:  { w: 180,  h: 180,   shape: "circle",    use: "Facebook profile picture" },
      cover_photo:    { w: 851,  h: 315,               use: "Facebook page cover" },
      post_image:     { w: 1200, h: 630,               use: "Facebook post / link preview" },
      story:          { w: 1080, h: 1920,  ratio: "9:16", use: "Facebook story" },
    },
    instagram: {
      profile_photo:  { w: 320,  h: 320,   shape: "circle",    use: "Instagram profile picture" },
      post_square:    { w: 1080, h: 1080,  ratio: "1:1",       use: "Standard feed post" },
      post_portrait:  { w: 1080, h: 1350,  ratio: "4:5",       use: "Portrait feed post" },
      story_reel:     { w: 1080, h: 1920,  ratio: "9:16",      use: "Story / Reel cover" },
    },
    twitter_x: {
      profile_photo:  { w: 400,  h: 400,   shape: "circle",    use: "Twitter/X profile picture" },
      header_banner:  { w: 1500, h: 500,               use: "Twitter/X profile header" },
      post_image:     { w: 1200, h: 675,   ratio: "16:9",      use: "Twitter/X post card" },
    },
    linkedin: {
      company_logo:   { w: 300,  h: 300,               use: "LinkedIn company page logo" },
      profile_photo:  { w: 400,  h: 400,   shape: "circle",    use: "LinkedIn profile picture" },
      background_banner:{ w: 1584,h: 396,              use: "LinkedIn background banner" },
      post_image:     { w: 1200, h: 627,               use: "LinkedIn feed post" },
    },
    whatsapp: {
      profile_photo:  { w: 500,  h: 500,   shape: "circle",    use: "WhatsApp display photo" },
      status:         { w: 1080, h: 1920,  ratio: "9:16",      use: "WhatsApp status" },
    },
    tiktok: {
      profile_photo:  { w: 200,  h: 200,   shape: "circle",    use: "TikTok profile picture" },
    },
    telegram: {
      profile_photo:  { w: 512,  h: 512,   shape: "circle",    use: "Telegram profile picture" },
    },
  },
};

const imagePrompts = [
  {
    title: "Farm Identity Hero",
    prompt:
      "Professional aerial photograph of a circular smart eco-farm in rural Bangladesh. Green paddy fields, tin-shed livestock barn, small biogas dome, solar panels on roof, clean dirt paths. Morning light. Evidence-first, bank-ready documentary style. No cartoon, no luxury resort, no stock photo clichés. Colors: deep forest green, golden morning light, earth brown soil. Photojournalism quality.",
  },
  {
    title: "Logo Background / Brand Pattern",
    prompt:
      "Minimal abstract brand pattern for Kutirchar EcoFarm. Subtle repeating motifs: circular loop suggesting ecosystem, leaf silhouette, solar rays, field wave lines. Colors: #1F6B3A on #FAF7EF ivory background. Flat vector style. No gradient, no 3D, no decorative flourish. Clean and professional.",
  },
  {
    title: "Report / Document Cover",
    prompt:
      "Professional A4 document cover for Kutirchar EcoFarm annual report. Deep green header band (#0B4F2A), white body, Kutirchar EcoFarm logo top-left, circular seal top-right. Document-grade typography. Clean grid layout. Bank-ready formal look. No decorative elements, no photography.",
  },
  {
    title: "Circular Ecosystem Diagram",
    prompt:
      "Clean vector infographic diagram showing the Kutirchar EcoFarm circular ecosystem: Livestock → Manure → Biogas Digester → Cooking Energy + Bio-Slurry → Organic Fertilizer → Fodder/Silage → Livestock feed. Solar panel node feeds farm power. Arrows show circular flow. Colors: greens (#1F6B3A, #4F9A3D), gold (#F2B544), blue (#2E6F8E). Minimal outline icons, 2px stroke, rounded corners. No 3D, no shadows, no gradients.",
  },
  {
    title: "Social Profile Card (1080x1080)",
    prompt:
      "Square social media post for Kutirchar EcoFarm (1080x1080px). Dark green background (#0B4F2A), white circular logo centered, 'Kutirchar EcoFarm' in Playfair Display serif font, Bengali name below in Noto Serif Bengali (matched serif sibling, same size), tagline 'Smart Cattle & Circular Energy Ecosystem' in Inter. Clean, premium, no decorations.",
  },
  {
    title: "Farm Signage Mockup",
    prompt:
      "Outdoor farm entrance signage mockup for Kutirchar EcoFarm. Large horizontal metal board, forest green background, white logo and bilingual name (English + Bengali). Attached to bamboo gate post at a rural Bangladesh farm entrance. Realistic photo-quality mockup. Professional, clean, no rust, no weathering.",
  },
  {
    title: "Business Card Mockup",
    prompt:
      "Professional business card mockup for Kutirchar EcoFarm. White front: Kutirchar EcoFarm logo, Emon Hossain name, Farm Director & Operations Head title, kutircharecofarm.com. Dark green back (#0B4F2A) with white logo. Clean minimal layout, Playfair Display + Inter fonts.",
  },
];

const contentRules = [
  { rule: "Always use the exact name", detail: "Kutirchar EcoFarm (English) / কুটিরচর ইকোফার্ম (Bengali). No variations accepted." },
  { rule: "Phase-gate every claim", detail: "Label all products/services/features as NOW, NEXT, or LATER. Never present future phases as active." },
  { rule: "Auditor tone — no hype", detail: "Write like a due-diligence report, not a startup pitch. Avoid exaggerated claims, luxury-first messaging, and startup clichés." },
  { rule: "Evidence-first anchoring", detail: "Every public claim should map to evidence, a verification status, or a next action step." },
  { rule: "No sensitive identifiers", detail: "Never include NID, PIN, personal legal documents, or confidential personal IDs in any public-facing content." },
  { rule: "Zone B compliance", detail: "Zone B (12 decimal non-private/ejmali land) must only show removable use — fodder, nursery, temporary shade, portable compost. Zero permanent construction claims until legal verification is complete." },
  { rule: "Green is the brand anchor", detail: "All brand visuals must anchor to Kutirchar Green (#1F6B3A). Gold is solar-only. Red is warning-only. Never use gradients in the logo." },
  { rule: "Both languages in official materials", detail: "All bank documents, government submissions, and signage must use both English and Bengali names in the standard bilingual lockup." },
];

export function Section13AIAgentTokens() {
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  function copyJSON() {
    navigator.clipboard.writeText(JSON.stringify(brandTokensJSON, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function copyPrompt(index: number, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPrompt(index);
      setTimeout(() => setCopiedPrompt(null), 2000);
    });
  }

  return (
    <div>
      <SectionHeader
        num="13"
        title="AI Agent Brand Tokens"
        desc="Machine-readable brand reference for AI agents generating images, documents, social content, and branded materials. Copy the JSON token object or individual prompts directly into any AI tool."
      />

      {/* What this section is for */}
      <div className="p-4 rounded-xl mb-6" style={{ background: "#0B4F2A" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "#FAF7EF", marginBottom: 8 }}>
          For AI Agents, Image Generators & Content Tools
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
          This section is the machine-readable single source of truth for the Kutirchar EcoFarm brand. Any AI agent — image generators (Midjourney, DALL-E, Stable Diffusion, Ideogram), language models (Claude, GPT, Gemini), design tools, or automation pipelines — must reference these tokens to produce on-brand content. Copy the JSON object below and include it in your AI system prompt.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Midjourney", "DALL-E", "Stable Diffusion", "Claude", "GPT-4", "Gemini", "Canva AI", "Adobe Firefly", "Ideogram", "Figma AI"].map((tool) => (
            <span key={tool} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 4 }}>{tool}</span>
          ))}
        </div>
      </div>

      {/* JSON Token Block */}
      <Card label="Brand Token JSON — Copy into AI System Prompt" className="mb-6">
        <div style={{ position: "relative" }}>
          <button
            onClick={copyJSON}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: copied ? "#1F6B3A" : "#0B4F2A",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              zIndex: 1,
              transition: "background 0.15s",
            }}
          >
            {copied ? "✓ Copied!" : "Copy JSON"}
          </button>
          <pre
            style={{
              background: "#0d1117",
              color: "#e6edf3",
              padding: "20px 16px",
              borderRadius: 8,
              fontSize: 11,
              fontFamily: "'Inter', 'Fira Code', monospace",
              lineHeight: 1.65,
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: 480,
              whiteSpace: "pre",
            }}
          >
            {JSON.stringify(brandTokensJSON, null, 2)}
          </pre>
        </div>
      </Card>

      {/* Image Prompt Templates */}
      <Card label="AI Image Prompt Templates" className="mb-6">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>
          Ready-to-use prompts for generating on-brand visual content. Copy any prompt directly into Midjourney, DALL-E, Stable Diffusion, Adobe Firefly, or Ideogram.
        </p>
        <div className="space-y-4">
          {imagePrompts.map((item, i) => (
            <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid #e0eed5" }}>
              <div className="flex items-center justify-between px-4 py-2" style={{ background: "#f7fbf8" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#1F6B3A" }}>
                  {String(i + 1).padStart(2, "0")} — {item.title}
                </span>
                <button
                  onClick={() => copyPrompt(i, item.prompt)}
                  style={{
                    background: copiedPrompt === i ? "#1F6B3A" : "transparent",
                    color: copiedPrompt === i ? "white" : "#1F6B3A",
                    border: `1px solid ${copiedPrompt === i ? "#1F6B3A" : "#c0ddc8"}`,
                    borderRadius: 4,
                    padding: "3px 10px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {copiedPrompt === i ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div className="p-4">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#333", lineHeight: 1.65 }}>{item.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Content Rules */}
      <Card label="AI Content Rules — Apply to All Generated Content" className="mb-6">
        <div className="space-y-3">
          {contentRules.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: i % 2 === 0 ? "#f7fbf8" : "white", border: "1px solid #e5eee9" }}>
              <span style={{ fontFamily: "'Inter', monospace", fontSize: 11, color: "#1F6B3A", fontWeight: 800, flexShrink: 0, minWidth: 20, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: "#1E2420", marginBottom: 2 }}>{item.rule}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", lineHeight: 1.55 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* GitHub / Version Control Notes */}
      <Card label="GitHub & Version Control Notes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1F6B3A", marginBottom: 8 }}>What to commit to GitHub</p>
            <ul className="space-y-1.5">
              {[
                "This entire brand guide app (src/)",
                "The master logo image (src/imports/image.png)",
                "All font CSS imports (src/styles/fonts.css)",
                "package.json with all dependencies",
                "README.md with brand overview and setup instructions",
                "AI agent token JSON (exportable from Section 13)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: "#1F6B3A", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#B42318", marginBottom: 8 }}>What NOT to commit</p>
            <ul className="space-y-1.5">
              {[
                "NID / PIN or sensitive personal IDs",
                "Private legal documents or land papers",
                "API keys or secrets (use .env.example only)",
                ".env files with real credentials",
                "node_modules/ folder",
                "Private financial or bank document scans",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: "#B42318", fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg" style={{ background: "#FAF7EF", border: "1px solid #e0eed5" }}>
          <p style={{ fontFamily: "'Inter', monospace", fontSize: 11, color: "#555", lineHeight: 1.7 }}>
            <span style={{ color: "#1F6B3A", fontWeight: 700 }}># Recommended .gitignore entries</span>{"\n"}
            node_modules/{"\n"}
            .env{"\n"}
            .env.local{"\n"}
            dist/{"\n"}
            *.pem{"\n"}
            private-docs/
          </p>
        </div>
      </Card>
    </div>
  );
}
