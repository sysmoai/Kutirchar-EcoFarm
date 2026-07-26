const fs = require("fs");
const bn = JSON.parse(fs.readFileSync("src/i18n/bn.json", "utf8"));
const en = JSON.parse(fs.readFileSync("src/i18n/en.json", "utf8"));

const BD = [
  "০","১","২","৩","৪","৫","৬","৭","৮","৯"
];
function toBn(n) {
  return String(n).split("").map(d => BD[parseInt(d,10)]).join("");
}

// Silage science
bn.ecosystem.silageScience = {
  title: "সাইলেজ কীভাবে কাজ করে (প্রক্রিয়া ও সাইন্স)",
  steps: [
    "ভুট্টা কাছানো → সারাবছর (Wilting) পর্যন্ত ড্রাই মেটার ২৫–৩০% নির্ণয়",
    "ছোট করা (১.৫–২.৫ সেমি) → ব্যাক্টেরিয়াল ফার্মেন্টেশন জরালি",
    "মোলাসিস (২–৪%) মিশ্রন → প্রারম্ভিক ব্যাক্টেরিয়া কলোনি",
    "আরটাইট সাইলো (২১–৩০ দিন) → এনারোবিক ফার্মেন্টেশন",
    "pH ৩.৮–৪.৫ → সারাবছর খাবার; feed খরচ ৬৫–৭৫% কম"
  ],
  source: "BLRI / BARI silage protocol aligned"
};
en.ecosystem.silageScience = {
  title: "How Silage Works (Process & Science)",
  steps: [
    "Fresh maize cut → wilting to DM 25–30% (lactic acid bacteria growth window)",
    "Chop 1.5–2.5 cm → bacterial fermentation surface area",
    "Molasses 2–4% added → jump-starts lactic acid bacteria colony",
    "Airtight silo 21–30 days → anaerobic fermentation under pressure",
    "pH 3.8–4.5 achieved → feed spoilage stops; feed cost drops 65–75% year-round"
  ],
  source: "BLRI / BARI silage protocol aligned"
};

// Biogas science
bn.ecosystem.biogasScience = {
  title: "বায়োগ্যাস প্রক্রিয়া: গোবর → গ্যাস → বায়ো-স্লারি",
  inputs: ["দৈনিক ৬m³ digester ক্যাপাসিটি", "দুগ্ধ কাছ কার্বন", "মানব তাপমাত্রা ৩৫°C বা তার বেশি"],
  process: "Anaerobic digestion → CH₄ (৫৫–৬৫%) + CO₂ → কাঠের গ্যাস / রান্নার গ্যাস",
  outputs: ["দৈনিক রান্নার গ্যাস পরিবার + স্টাফ কিচেন", "বায়ো-স্লারি → জৈব সার ঘাসের ক্ষেতে", "ইনপুট কার্বন ফুটপ্রিন্ট কম"],
  source: "IDCOL biogas program aligned; ৬m³ fixed-dome design"
};
en.ecosystem.biogasScience = {
  title: "Biogas Process: Manure → Gas → Bio-Slurry",
  inputs: ["Daily 6m³ fixed-dome digester capacity", "Dung + crop residue carbon", "Ambient temp ≥35°C (Bangladesh year-round)"],
  process: "Anaerobic digestion → CH₄ (55–65%) + CO₂ → cooking fuel / generator gas",
  outputs: ["Daily cooking gas for family + staff kitchen", "Bio-slurry → organic fertilizer for fodder fields", "Input carbon footprint reduced"],
  source: "IDCOL biogas program aligned; 6m³ fixed-dome design"
};

// Breed science
bn.project.breedScience = {
  title: "AI-ভিত্তিক জাত উন্নয়ন ও সিলেক্টিভ ব্রিডিং",
  process: [
    "দেশি গাভী + BLRI/DLS verified semen (AI)",
    "F1 কাফ → পরবর্তী প্রজন্মে দুধ ও ওজন বৃদ্ধি",
    "রেকর্ড ছক সহ: milk yield, fat %, conception rate, calf weight",
    "পরবর্তী প্রজন্মে নিজ সিন্ড প্রস্তাবেরণ"
  ],
  note: "Genetic engineering / lab gene editing শব্দটি প্রজন্মে শুধু BLRI/DLS institutional partner-সহ ব্যবহার করা হবে",
  orgs: "BLRI (Bangladesh Livestock Research Institute), DLS (Department of Livestock Services)"
};
en.project.breedScience = {
  title: "AI-Based Breed Improvement + Selective Breeding",
  process: [
    "Local breed cow + BLRI/DLS verified semen (Artificial Insemination)",
    "F1 calf → next generation milk + weight gain improvement",
    "Record tracking: milk yield, fat %, conception rate, calf weight",
    "Next-gen sire selection from proven bulls"
  ],
  note: "Genetic engineering / lab gene editing terms are NOT used publicly. Institutional partnership with BLRI/DLS only.",
  orgs: "BLRI (Bangladesh Livestock Research Institute), DLS (Department of Livestock Services)"
};

// Solar science
bn.ecosystem.solarScience = {
  title: "সোলার এনার্জি: স্বয়ং চাহিদা → নেট মিটারিং",
  capacity: "৫–১০ kWp স্বয়ং ব্যবহার (Year 1–২)",
  use: "দুগ্ধ কোল্ড চেইন, বায়োগ্যাস পাম্প, লাইট, ডিজিটাল সার্ভার",
  netMetering: "SREDA net metering রেজিস্ট্রেশন থাকলে এক্সপোর্ট সম্ভব",
  saving: "আনুমানিক মাসিক বিদ্যুৎ ছাড় এবং গ্রিড-এর বিকল্প কম",
  source: "SREDA / IDCOL solar program aligned"
};
en.ecosystem.solarScience = {
  title: "Solar Energy: Self-Use → Net Metering",
  capacity: "5–10 kWp self-use (Year 1–2)",
  use: "Dairy cold chain, biogas pump, lighting, digital server",
  netMetering: "Export to grid possible if SREDA net metering registration obtained",
  saving: "Monthly grid bill reduced significantly; diesel generator backup eliminated",
  source: "SREDA / IDCOL solar program aligned"
};

// Bangladesh context
bn.common.bdContext = {
  region: "সিরাজগঞ্জ জেলা, চরাঞ্চল, ভদ্রঘাট ইউনিয়ন",
  soil: "বার্ষিক জুমি, বন্যা প্রবণ, উর্বর পরিবর্তন জুমি",
  climate: "মৌসুমি এর্দশিত বন্যা, গুলি কাল বন্যার জলমগ্ন ক্ষেত্র",
  grass: "Pakchong-1 Napier, BLRI Napier-3, Maize, Sorghum, Para grass — সিরাজগঞ্জ প্রমাণিত",
  institutions: "DLS, BLRI, BARI, SREDA, IDCOL, PKSF, Milk Vita, কৃষি ব্যাংক refinance",
  market: "হাট, মোকাম, স্থানীয় ভেন্ডার, খুচরা পরিবহন বাস্তবতা"
};
en.common.bdContext = {
  region: "Sirajganj District, char land, Bhadraghat Union",
  soil: "Alluvial silt, flood-prone, fertile post-flood deposit",
  climate: "Monsoon-heavy, winter dry; river erosion risk zone",
  grass: "Pakchong-1 Napier, BLRI Napier-3, Maize, Sorghum, Para grass — Sirajganj-proven",
  institutions: "DLS, BLRI, BARI, SREDA, IDCOL, PKSF, Milk Vita, Krishi Bank refinance",
  market: "Local haat, Mokama wholesale, standard vendor, short transport radius"
};

// 5-year roadmap
bn.project.roadmap5Year = {
  title: "৫-বছর রোডম্যাপ (Year 0 → 5)",
  phases: [
    { year: "Year 0", label: "যাচাই ও ভিত্তি", gates: ["জমি document পর্যালোচনা", "বাধার সার্ভেয়", "soil test", "Zone B এজমালি স্ট্যাটাস চেক"], status: "চলমান" },
    { year: "Year 1", label: "নিউক্লিয়াস ও ফর্মেশন", gates: ["AI জাত উন্নয়ন", "ছাগল nucleus", "ঘাস প্লাট", "সাইলেজ 1st batch", "5 kWp সোলার"], status: "প্ল্যানিং" },
    { year: "Year 2–3", label: "প্রমাণ ও বিস্তার", gates: ["F1 বাছুর ব্রেক সাকসেস", "সাইলেজ full cycle", "6m³ বায়োগ্যাস digester", "সারাবছর গ্যাস চেক"], status: "প্ল্যানিং" },
    { year: "Year 4–5", label: "স্কেল ও রেপ্লিকেশন", gates: ["F2 সিলেকশন", "10 kWp + net metering", "বায়ো-স্লারি fertilizer sales", "digital monitoring live"], status: "লেটার" },
    { year: "Year 5+", label: "গোল্ড স্ট্যান্ডার্ড", gates: ["Govt/bank audit pass", "Milk Vita / processor tie-up", "replication model ready"], status: "লেটার" }
  ]
};
en.project.roadmap5Year = {
  title: "5-Year Roadmap (Year 0 → 5)",
  phases: [
    { year: "Year 0", label: "Verification & Foundation", gates: ["Land document review", "Boundary survey", "Soil test", "Zone B ejmali status check"], status: "In Progress" },
    { year: "Year 1", label: "Nucleus & Formation", gates: ["AI breed improvement", "Goat nucleus", "Fodder plot", "Silage 1st batch", "5 kWp solar"], status: "Planning" },
    { year: "Year 2–3", label: "Proof & Expansion", gates: ["F1 calf break success", "Silage full cycle", "6m³ biogas digester", "Year-round gas check"], status: "Planning" },
    { year: "Year 4–5", label: "Scale & Replication", gates: ["F2 selection", "10 kWp + net metering", "Bio-slurry fertilizer sales", "Digital monitoring live"], status: "Later" },
    { year: "Year 5+", label: "Gold Standard", gates: ["Govt/bank audit pass", "Milk Vita / processor tie-up", "Replication model ready"], status: "Later" }
  ]
};

fs.writeFileSync("src/i18n/bn.json", JSON.stringify(bn, null, 2));
fs.writeFileSync("src/i18n/en.json", JSON.stringify(en, null, 2));
console.log("P5 enrichment complete");
