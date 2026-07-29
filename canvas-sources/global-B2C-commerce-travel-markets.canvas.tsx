import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Confidence = "Высокая" | "Средняя" | "Низкая";
type Market = {
  id: string;
  name: string;
  thesis: string;
  platformRevenue: string;
  gmv: string;
  tam: string;
  sam: string;
  cagr: string;
  stage: string;
  regions: { region: string; size: string; leaders: string; signal: string }[];
  leaders: string;
  whitespace: string;
  barriers: string;
  wedge: string;
  importScore: number;
  exportScore: number;
  confidence: Confidence;
  sourceIds: string[];
};

type Source = {
  id: string;
  title: string;
  url: string;
  usedFor: string;
  quality: "Первичный" | "Отраслевой" | "Оценочный";
};

const sources: Source[] = [
  { id: "thredup", title: "ThredUp 2025 Resale Report", url: "https://ir.thredup.com/news-releases/news-release-details/thredups-13th-resale-report-shows-online-resale-saw-accelerated", usedFor: "secondhand TAM, 2024–2029 CAGR", quality: "Первичный" },
  { id: "vinted", title: "Vinted 2024 results", url: "https://company.vinted.com/newsroom/Vinted-delivers-strong-profitable-growth-while-investing", usedFor: "выручка Vinted €813,4 млн, +36%", quality: "Первичный" },
  { id: "vestiaire", title: "Vestiaire Collective 2024 economics", url: "https://fashionunited.uk/news/business/vestiaire-collective-eyes-profitability-in-2026-ahead-of-us-expansion-push/2026020586149", usedFor: "€200 млн revenue, GMV около €1 млрд", quality: "Отраслевой" },
  { id: "etsy", title: "Etsy 2024 annual report", url: "https://www.sec.gov/Archives/edgar/data/1370637/000137063725000017/etsy-20241231.htm", usedFor: "$2,81 млрд revenue, $12,59 млрд GMS", quality: "Первичный" },
  { id: "fresha", title: "Fresha scale and economics", url: "https://techfundingnews.com/beauty-techs-quiet-giant-just-became-a-unicorn-fresha-raises-80m-from-kkr-at-1b-valuation/", usedFor: "GMV $15 млрд run-rate, revenue run-rate $140 млн", quality: "Отраслевой" },
  { id: "angi", title: "Angi 2024 10-K", url: "https://www.sec.gov/Archives/edgar/data/1705110/000170511025000018/angi-20241231.htm", usedFor: "$1,185 млрд revenue, 17,2 млн service requests", quality: "Первичный" },
  { id: "homeTam", title: "Online on-demand home services", url: "https://www.grandviewresearch.com/industry-analysis/online-on-demand-home-services-market-report", usedFor: "узкий digital TAM и CAGR 16,7%", quality: "Отраслевой" },
  { id: "match", title: "Match Group FY2024", url: "https://www.sec.gov/Archives/edgar/data/891103/000089110325000018/mtch8-k20250204ex991.htm", usedFor: "$3,48 млрд revenue, payers и география", quality: "Первичный" },
  { id: "datingTam", title: "Online dating market", url: "https://www.mordorintelligence.com/industry-reports/global-online-dating-services-market", usedFor: "глобальный TAM и CAGR", quality: "Отраслевой" },
  { id: "legalzoom", title: "LegalZoom FY2024", url: "https://investors.legalzoom.com/news-releases/news-release-details/legalzoom-reports-fourth-quarter-and-full-year-2024-financial", usedFor: "$681,9 млн revenue, 64% subscriptions", quality: "Первичный" },
  { id: "legalTam", title: "US B2C legal services market", url: "https://www.emergenresearch.com/industry-report/us-b2c-legal-service-market", usedFor: "US TAM $20,5 млрд, CAGR 5,5%", quality: "Отраслевой" },
  { id: "viator", title: "Tripadvisor segment disclosure 2024", url: "https://www.sec.gov/Archives/edgar/data/1526520/000095017025023736/R45.htm", usedFor: "Viator revenue $840 млн", quality: "Первичный" },
  { id: "gyg", title: "GetYourGuide FY2025", url: "https://www.webintravel.com/getyourguide-first-experiences-platform-to-hit-e1b-in-revenue/", usedFor: "€1 млрд net revenue, €4 млрд GMV, experiences TAM", quality: "Отраслевой" },
  { id: "flix", title: "Flix 2023 financial results", url: "https://corporate.flix.com/press_releases/another-record-year-flix-reports-eur-2-billion-total-revenue-in-2023/", usedFor: "€2 млрд revenue, Europe / North America split", quality: "Первичный" },
  { id: "blabla", title: "BlaBlaCar 2024 sustainability report", url: "https://newsroom.blablacar.com/news/sustainability-report-2024", usedFor: "92 млн passengers, geography", quality: "Первичный" },
  { id: "busTam", title: "Online bus ticketing market", url: "https://www.marketreportsworld.com/market-reports/online-bus-ticketing-service-market-14724017", usedFor: "online ticket value and CAGR", quality: "Оценочный" },
  { id: "carvana", title: "Carvana FY2024", url: "https://investors.carvana.com/news-releases/2025/02-19-2025-211012996", usedFor: "$13,67 млрд sales, $2,88 млрд gross profit, units", quality: "Первичный" },
  { id: "boundless", title: "Boundless company estimate", url: "https://growjo.com/company/Boundless_Immigration", usedFor: "частная оценка revenue около $75 млн", quality: "Оценочный" },
  { id: "immigrationTam", title: "Immigration services market", url: "https://datahorizzonresearch.com/global-immigration-service-market-48310", usedFor: "$8,2 млрд 2024 TAM, CAGR 7,5%", quality: "Отраслевой" },
  { id: "care", title: "Care.com 2024 segment disclosure", url: "https://www.sec.gov/Archives/edgar/data/1800227/000180022725000013/R18.htm", usedFor: "$369,6 млн revenue, consumer / enterprise split", quality: "Первичный" },
  { id: "childcare", title: "US childcare market", url: "https://www.grandviewresearch.com/industry-analysis/us-child-care-market", usedFor: "$65,15 млрд US TAM, CAGR 6,0%", quality: "Отраслевой" },
  { id: "rover", title: "Rover public filing", url: "https://www.sec.gov/Archives/edgar/data/1826018/000182601823000053/ex991_20231106.htm", usedFor: "2023 revenue guidance $230–232 млн, bookings", quality: "Первичный" },
  { id: "petTam", title: "Pet services market", url: "https://www.grandviewresearch.com/industry-analysis/pet-services-market-report", usedFor: "$60,08 млрд 2024 TAM, CAGR 8,58%", quality: "Отраслевой" },
  { id: "hellofresh", title: "HelloFresh 2024 annual report", url: "https://ir.hellofreshgroup.com/media/document/29b0f8fe-8de7-4e8b-bc37-b07943f143e3/assets/Annual_Report_2024.pdf?disposition=inline", usedFor: "€7,66 млрд revenue, category mix", quality: "Первичный" },
  { id: "mealTam", title: "Global meal-kit market", url: "https://finance.yahoo.com/news/global-meal-kit-market-analysis-145500720.html", usedFor: "$17,44 млрд 2023, 14,26% CAGR", quality: "Отраслевой" },
  { id: "avito", title: "Avito latest public financial snapshot", url: "https://www.onlinemarketplaces.com/articles/avito-owner-signals-ipo-readiness-as-russian-rate-cuts-reopen-market/", usedFor: "RUB 100 млрд consolidated revenue 2023", quality: "Отраслевой" },
  { id: "yandex", title: "Yandex FY2024 results", url: "https://yastatic.net/s3/ir-docs/docs/2024/q4/cbf2d1c3ff32ff65da6l438h44902945/MKPAO_Q4_2024_press_release_ENG.pdf", usedFor: "e-commerce / mobility GMV и revenue", quality: "Первичный" },
];

const markets: Market[] = [
  {
    id: "resale",
    name: "Managed resale и recommerce",
    thesis: "Аутентификация, managed listing и локальная логистика превращают classifieds в доверенный retail.",
    platformRevenue: "$4,5–6,5 млрд",
    gmv: "$28–40 млрд online; весь secondhand apparel $227 млрд",
    tam: "$227 млрд spend (2024); $367 млрд к 2029",
    sam: "$28–40 млрд online GMV; net revenue pool $4,5–6,5 млрд",
    cagr: "10% весь рынок; 13% online US",
    stage: "Scale-up; Европа впереди США",
    regions: [
      { region: "США", size: "$9–12 млрд online GMV", leaders: "Poshmark, ThredUp, eBay, Depop", signal: "Supply плотный, но managed economics тяжёлые" },
      { region: "Европа", size: "$14–20 млрд online GMV", leaders: "Vinted, Vestiaire, eBay", signal: "Vinted €813 млн revenue; сильная parcel-инфраструктура" },
      { region: "СНГ", size: "$3–5 млрд GMV", leaders: "Avito, Ozon, Kufar, OLX", signal: "Classifieds сильны; аутентификация и managed C2B2C слабы" },
      { region: "MENA / LatAm / India / SEA", size: "$3–6 млрд GMV", leaders: "Carousell, OLX, GoTrendier, Dubizzle", signal: "Mobile-first, но платежи и reverse logistics фрагментированы" },
    ],
    leaders: "Vinted €813 млн revenue (+36%); Vestiaire €200 млн на GMV около €1 млрд; Etsy/Depop внутри $2,81 млрд group revenue.",
    whitespace: "Managed resale вне luxury; trade-in «под ключ» для брендов; B2B tooling для фото, цены, проверки, возвратов.",
    barriers: "Ликвидность по категории/городу, fraud и counterfeit, reverse logistics, стоимость обработки дешёвых SKU.",
    wedge: "Managed marketplace одной категории: детские товары, outdoor или premium electronics; pickup + grading + instant payout.",
    importScore: 4,
    exportScore: 3,
    confidence: "Средняя",
    sourceIds: ["thredup", "vinted", "vestiaire", "etsy", "avito"],
  },
  {
    id: "local",
    name: "Local services: beauty и wellness booking",
    thesis: "Вертикальный merchant OS создаёт supply, затем marketplace и embedded payments монетизируют спрос.",
    platformRevenue: "$1,2–1,9 млрд",
    gmv: "$25–40 млрд appointments / payments",
    tam: "$200–300 млрд consumer spend",
    sam: "$25–40 млрд digitally booked GMV",
    cagr: "12–18% digital booking",
    stage: "Growth; POS/payments consolidation",
    regions: [
      { region: "США", size: "$10–15 млрд digital GMV", leaders: "Mindbody, Vagaro, Booksy, StyleSeat", signal: "Высокий ARPU, но дорогой CAC" },
      { region: "Европа", size: "$8–12 млрд", leaders: "Treatwell, Fresha, Booksy, Planity", signal: "Страна-за-страной; payments дают лучший moat" },
      { region: "СНГ", size: "$2–4 млрд", leaders: "YCLIENTS, DIKIDI, Altegio, Avito", signal: "Сильный B2B SaaS, слабее consumer discovery" },
      { region: "MENA / LatAm / India / SEA", size: "$5–9 млрд", leaders: "Fresha, Urban Company, Singu", signal: "GCC и SEA растут; home beauty добавляет logistics" },
    ],
    leaders: "Fresha: $140 млн revenue run-rate и >$15 млрд annual GMV; Mindbody, Vagaro, Booksy и Treatwell — частные.",
    whitespace: "Не ещё один каталог, а workflow: deposits, no-show insurance, dynamic slots, повторные визиты и financing.",
    barriers: "Локальная плотность, merchant switching costs, платежные лицензии, off-platform leakage.",
    wedge: "Free vertical OS для одной профессии + обязательный deposit + клиентский wallet; marketplace включать после supply density.",
    importScore: 4,
    exportScore: 4,
    confidence: "Средняя",
    sourceIds: ["fresha", "avito"],
  },
  {
    id: "home",
    name: "Home maintenance и verified trades",
    thesis: "Побеждает не lead-gen, а гарантированный результат с диагнозом, фиксированной ценой и warranty.",
    platformRevenue: "$4–6 млрд",
    gmv: "$25–45 млрд platform-mediated jobs",
    tam: "$500–800 млрд home services spend",
    sam: "$80–150 млрд jobs addressable online",
    cagr: "8–17%; digital penetration low",
    stage: "Зрелый lead-gen → managed transition",
    regions: [
      { region: "США", size: "$2,5–3,5 млрд platform revenue", leaders: "Angi, Thumbtack, Taskrabbit, Frontdoor", signal: "Angi $1,185 млрд revenue; dissatisfaction with paid leads" },
      { region: "Европа", size: "$0,9–1,4 млрд", leaders: "MyBuilder, Checkatrade, MyHammer, Taskrabbit", signal: "Фрагментация языков и лицензий" },
      { region: "СНГ", size: "$0,4–0,8 млрд", leaders: "Avito Услуги, Профи, Яндекс Услуги", signal: "Сильные classifieds; мало warranty / fixed-price" },
      { region: "India / SEA / LatAm", size: "$0,8–1,4 млрд", leaders: "Urban Company, GetNinjas, Sejasa", signal: "Managed supply работает лучше в крупных городах" },
    ],
    leaders: "Angi $1,185 млрд revenue и 17,2 млн requests; Taskrabbit — IKEA-driven network; Urban Company — managed workforce.",
    whitespace: "Recurring maintenance plans; remote video triage; parts + labor bundles; homeowner record / digital twin.",
    barriers: "Гиперлокальная supply density, background checks, страховка, лицензии, неоднородное качество и claims.",
    wedge: "Одна повторяемая боль: HVAC/котлы, сантехника или бытовая техника; video diagnosis → fixed quote → parts-ready technician.",
    importScore: 5,
    exportScore: 3,
    confidence: "Средняя",
    sourceIds: ["angi", "homeTam", "avito"],
  },
  {
    id: "dating",
    name: "Intent-led dating и offline outcomes",
    thesis: "Swipe fatigue открывает ниши вокруг verified intent, safety и организованного перехода в офлайн.",
    platformRevenue: "$6,5–7,5 млрд",
    gmv: "Не применимо; revenue = subscriptions/IAP/ads",
    tam: "$7,0 млрд 2025",
    sam: "$4–5 млрд платящие пользователи US+Europe+select APAC",
    cagr: "≈12% forecast; зрелые лидеры 0–5%",
    stage: "Зрелость / продуктовый reset",
    regions: [
      { region: "США", size: "$1,4–1,7 млрд", leaders: "Tinder, Hinge, Bumble, Grindr", signal: "Высокий ARPU, payer fatigue" },
      { region: "Европа", size: "$1,2–1,6 млрд", leaders: "Tinder, Badoo, Hinge, Meetic", signal: "Privacy и локальные языки важнее" },
      { region: "СНГ", size: "$0,25–0,45 млрд", leaders: "VK Знакомства, Twinby, Mamba, Teamo", signal: "Уход западных apps создал окно, но trust низкий" },
      { region: "India / SEA / LatAm / MENA", size: "$2,2–3,0 млрд", leaders: "Tinder, Bumble, Aisle, Tantan, Muzz", signal: "Рост пользователей; ARPU ниже, культурная локализация критична" },
    ],
    leaders: "Match Group $3,48 млрд revenue (US $1,59 млрд); Tinder около $2 млрд; Bumble и Grindr усиливают концентрацию.",
    whitespace: "Women-first safety, serious-intent verification, diaspora / faith, group dating, post-match planning.",
    barriers: "Сильнейший two-sided network, app-store fees, safety/moderation, identity fraud, сезонный CAC.",
    wedge: "Не новый массовый swipe: один high-intent cohort + verified introductions + curated offline events and date planning.",
    importScore: 3,
    exportScore: 2,
    confidence: "Высокая",
    sourceIds: ["match", "datingTam"],
  },
  {
    id: "legal",
    name: "Consumer legal и expert advice",
    thesis: "AI снижает стоимость intake/document prep, но regulated human review остаётся платным trust layer.",
    platformRevenue: "$2–3,5 млрд",
    gmv: "$4–7 млрд consumer payments through digital providers",
    tam: "$45–70 млрд global B2C legal spend",
    sam: "$12–20 млрд standardizable matters",
    cagr: "5–10%",
    stage: "Growth; AI repricing",
    regions: [
      { region: "США", size: "$1,2–1,8 млрд digital revenue", leaders: "LegalZoom, Rocket Lawyer, JustAnswer, Avvo", signal: "US B2C legal TAM $20,5 млрд" },
      { region: "Европа", size: "$0,5–0,9 млрд", leaders: "ARAG, Flightright, RightNow, Qover-adjacent", signal: "Country law prevents one product" },
      { region: "СНГ", size: "$0,15–0,3 млрд", leaders: "Правовед, DestraLegal, банковские legal plans", signal: "Низкий чек; сильный спрос на документы и debt disputes" },
      { region: "India / LatAm / MENA", size: "$0,3–0,6 млрд", leaders: "Vakilsearch, LegalKart, JusBrasil", signal: "Большой access gap, но коллекция платежей сложнее" },
    ],
    leaders: "LegalZoom $681,9 млн revenue, 64% subscriptions; Rocket Lawyer; JustAnswer estimates $65–190 млн.",
    whitespace: "Outcome-specific workflows: divorce, inheritance, consumer debt, landlord/tenant, travel claims, small-claim recovery.",
    barriers: "Unauthorized-practice rules, attorney licensing by jurisdiction, liability, sensitive data, trust and acquisition.",
    wedge: "Software-led case in one repeatable claim; fixed price + success fee where legal; lawyer review only at exception points.",
    importScore: 5,
    exportScore: 3,
    confidence: "Средняя",
    sourceIds: ["legalzoom", "legalTam"],
  },
  {
    id: "experiences",
    name: "Travel experiences и attractions",
    thesis: "Последний крупный travel vertical всё ещё offline: supply OS + distribution побеждает чистый consumer discovery.",
    platformRevenue: "$3,5–5 млрд",
    gmv: "$16–24 млрд OTA-booked; total spend ≈$450–500 млрд",
    tam: "€420 млрд global experiences",
    sam: "$70–100 млрд online-bookable inventory",
    cagr: "9–13%",
    stage: "Scale-up; consolidation not finished",
    regions: [
      { region: "США", size: "$1,0–1,4 млрд platform revenue", leaders: "Viator, GetYourGuide, Airbnb, FareHarbor", signal: "Viator traffic and supply lead" },
      { region: "Европа", size: "$1,2–1,7 млрд", leaders: "GetYourGuide, Viator, Tiqets, Musement", signal: "Attractions digitized; long tail tours not" },
      { region: "СНГ", size: "$0,15–0,3 млрд", leaders: "Sputnik8, Tripster, Яндекс Путешествия, Ostrovok", signal: "Domestic tours fragmented, cross-border payments constrained" },
      { region: "SEA / India / MENA / LatAm", size: "$1,0–1,5 млрд", leaders: "Klook, Headout, Pelago, Civitatis", signal: "Fastest supply growth; mobile and super-app distribution" },
    ],
    leaders: "Viator $840 млн revenue 2024; GetYourGuide >€1 млрд revenue / >€4 млрд GMV 2025; Klook APAC leader.",
    whitespace: "Dynamic small-group inventory; last-minute local supply; accessibility/family filters; operator yield and CRM.",
    barriers: "Fragmented supply, cancellations/weather, channel manager integrations, local permits, refund support.",
    wedge: "Operator OS first for one activity type, then API distribution to hotels, airlines and super-apps; avoid consumer CAC initially.",
    importScore: 5,
    exportScore: 4,
    confidence: "Высокая",
    sourceIds: ["viator", "gyg"],
  },
  {
    id: "intercity",
    name: "Intercity mobility orchestration",
    thesis: "Не владеть автобусами: network planning, ticketing and multimodal aggregation для независимых операторов.",
    platformRevenue: "$4–6 млрд",
    gmv: "$18–30 млрд digitally booked tickets",
    tam: "$95 млрд intercity bus travel (широкая оценка)",
    sam: "$13–20 млрд online ticketing value",
    cagr: "6–17% online",
    stage: "Europe mature; emerging markets digitizing",
    regions: [
      { region: "США", size: "$0,8–1,2 млрд operator/platform revenue", leaders: "Greyhound/Flix, Megabus, Wanderu", signal: "Sparse network, regulatory fragmentation by state" },
      { region: "Европа", size: "$2,0–2,8 млрд", leaders: "Flix, BlaBlaCar Bus, Trainline, Omio", signal: "Flix has largest network and pricing data" },
      { region: "СНГ", size: "$0,5–0,9 млрд", leaders: "Tutu, Яндекс, Avtovokzaly, Atlas", signal: "Много semi-offline operators and station systems" },
      { region: "India / LatAm / MENA / SEA", size: "$1,2–2,0 млрд", leaders: "redBus, Busbud, Flix, ClickBus", signal: "Большой volume, cash/local payments, fragmented fleets" },
    ],
    leaders: "Flix €2 млрд revenue 2023 (Europe €1,186 млрд; North America €615 млн); BlaBlaCar 92 млн passengers in 2024.",
    whitespace: "Rural feeder routes, guaranteed connections, disruption rebooking, white-label inventory and dynamic pricing.",
    barriers: "Route permits, station access, operational reliability, low ticket AOV, payments/refunds, network density.",
    wedge: "B2B operating layer for 20–100 vehicle fleets + pooled inventory marketplace on underserved corridors.",
    importScore: 4,
    exportScore: 5,
    confidence: "Средняя",
    sourceIds: ["flix", "blabla", "busTam", "yandex"],
  },
  {
    id: "auto",
    name: "Auto ownership и service stack",
    thesis: "Value moves from listings to transaction certainty and lifetime ownership: inspect, finance, repair, insure, resell.",
    platformRevenue: "$8–12 млрд net/gross-profit pool",
    gmv: "$180–280 млрд vehicles + $15–25 млрд service orders",
    tam: ">$1 трлн used vehicles + repair spend",
    sam: "$220–350 млрд digitally influenceable transactions",
    cagr: "8–15% digital; cyclical",
    stage: "Scale; capital-heavy models tested",
    regions: [
      { region: "США", size: "$4–6 млрд platform gross-profit/revenue", leaders: "Carvana, CarMax, AutoTrader, RepairPal", signal: "Carvana $2,88 млрд gross profit; logistics moat" },
      { region: "Европа", size: "$2–3 млрд", leaders: "AutoScout24, mobile.de, Motorway, Carwow", signal: "Cross-border inventory meets tax/registration friction" },
      { region: "СНГ", size: "$1–1,8 млрд", leaders: "Avito Auto, Auto.ru, Drom, Fit Service", signal: "Classifieds mature; service history fragmented" },
      { region: "MENA / LatAm / India / SEA", size: "$1–2 млрд", leaders: "Cars24, Kavak, Carro, Dubizzle", signal: "Managed commerce grows, funding and inventory risk high" },
    ],
    leaders: "Carvana $13,67 млрд accounting revenue but $2,88 млрд gross profit; US share ~1%; classifieds leaders monetize dealers.",
    whitespace: "Portable service history, remote diagnosis, parts-price transparency, EV battery health, post-purchase warranty.",
    barriers: "Inventory funding, titles/registration, fraud, inspection accuracy, nationwide logistics, lending regulation.",
    wedge: "Stay asset-light: verified inspection + maintenance passport + repair marketplace for one vehicle cohort; finance via partners.",
    importScore: 5,
    exportScore: 4,
    confidence: "Средняя",
    sourceIds: ["carvana", "avito", "yandex"],
  },
  {
    id: "immigration",
    name: "Relocation и immigration workflows",
    thesis: "A cross-border life event needs one case graph across visa, housing, banking, school, tax and documents.",
    platformRevenue: "$0,8–1,4 млрд digital-first",
    gmv: "$2–4 млрд digitally intermediated fees",
    tam: "$8,2–18 млрд immigration services",
    sam: "$3–6 млрд standardizable consumer / SMB cases",
    cagr: "7–9%",
    stage: "Early growth; regulation-heavy",
    regions: [
      { region: "США", size: "$0,35–0,6 млрд digital revenue", leaders: "Boundless, LegalZoom, Fragomen, Envoy", signal: "High willingness to pay, federal forms standardized" },
      { region: "Европа", size: "$0,25–0,45 млрд", leaders: "Localyze, Jobbatical, Deel Immigration", signal: "Country fragmentation and employer-led distribution" },
      { region: "СНГ", size: "$0,08–0,18 млрд", leaders: "Relocation consultancies, banks, Telegram channels", signal: "Large outbound/inbound need, low trust and sanctions friction" },
      { region: "MENA / LatAm / India / SEA", size: "$0,2–0,4 млрд", leaders: "Y-Axis, VFS ecosystem, local agencies", signal: "India supply and GCC destination create dense corridors" },
    ],
    leaders: "Boundless estimated $42–75 млн revenue; Localyze/Jobbatical/Deel mostly B2B; traditional law and relocation firms dominate.",
    whitespace: "Post-arrival OS, family cases, document translation/provenance, eligibility pre-check, emerging-market corridors.",
    barriers: "Unauthorized legal advice, country-by-country rules, document fraud, sensitive PII, policy volatility, cross-border payments.",
    wedge: "One corridor + one persona: Russian-speaking talent to GCC/Serbia/LatAm or Central Asian workers to Russia; checklist + vetted partners.",
    importScore: 5,
    exportScore: 5,
    confidence: "Средняя",
    sourceIds: ["boundless", "immigrationTam"],
  },
  {
    id: "family",
    name: "Family workflows и care coordination",
    thesis: "Family demand is recurring but fragmented: scheduling, verified care, payments and shared records belong in one household OS.",
    platformRevenue: "$1–1,7 млрд",
    gmv: "$8–15 млрд matched / paid care",
    tam: "$180–300 млрд childcare + eldercare services",
    sam: "$25–45 млрд private, digitally matchable care",
    cagr: "6–12%",
    stage: "Growth; trust infrastructure immature",
    regions: [
      { region: "США", size: "$0,6–0,9 млрд platform revenue", leaders: "Care.com, Bright Horizons, UrbanSitter, Winnie", signal: "Care.com $369,6 млн; employer benefits drive B2B2C" },
      { region: "Европа", size: "$0,25–0,45 млрд", leaders: "Yoopies, Babysits, Bubble, Helpling-adjacent", signal: "Subsidies and labor rules differ by country" },
      { region: "СНГ", size: "$0,08–0,16 млрд", leaders: "Kidsout, Профи, Avito, Помогатель", signal: "High informal share; background checks weak" },
      { region: "India / SEA / LatAm / MENA", size: "$0,15–0,3 млрд", leaders: "Broomees, HelperChoice, local agencies", signal: "Domestic-worker regulation and cash dominate" },
    ],
    leaders: "Care.com $369,6 млн revenue (consumer $191 млн, enterprise $178 млн); regional marketplaces remain fragmented.",
    whitespace: "Backup care, eldercare coordination, special-needs navigation, shared family admin and employer-sponsored access.",
    barriers: "Child safety, background checks, labor classification, insurance, very local matching and incident response.",
    wedge: "Employer-paid backup-care concierge in one metro; begin with vetted supply and guaranteed response, then household workflow.",
    importScore: 5,
    exportScore: 3,
    confidence: "Средняя",
    sourceIds: ["care", "childcare"],
  },
  {
    id: "pet",
    name: "Pet care services marketplace",
    thesis: "Pet humanization creates repeat demand; trust, insurance and health records can keep bookings on-platform.",
    platformRevenue: "$0,7–1,2 млрд",
    gmv: "$3–5 млрд platform bookings",
    tam: "$60 млрд pet services; $2,69 млрд pet sitting",
    sam: "$8–14 млрд digitally bookable sitting/grooming/training",
    cagr: "8,6%; pet sitting 11,8%",
    stage: "Growth; regional winner-take-most",
    regions: [
      { region: "США", size: "$0,35–0,55 млрд revenue", leaders: "Rover, Wag, PetBacker", signal: "Rover 2023 revenue $230–232 млн before take-private" },
      { region: "Европа", size: "$0,18–0,3 млрд", leaders: "Rover, Gudog, Pawshake", signal: "Cross-border brand possible, regulation local" },
      { region: "СНГ", size: "$0,05–0,12 млрд", leaders: "Dogsy, Гульдог, Avito, local hotels", signal: "Fragmented supply, rising pet spend" },
      { region: "SEA / LatAm / India / MENA", size: "$0,12–0,25 млрд", leaders: "PetBacker, Petlove, local apps", signal: "Fast pet adoption; payments and vet integration vary" },
    ],
    leaders: "Rover is the global benchmark; 2023 revenue guidance $230–232 млн and 93 млн services booked cumulatively by Sep-2023.",
    whitespace: "Cat care, medical boarding, subscriptions, vetted groomers, pet passport / records, employer travel benefit.",
    barriers: "Local supply density, animal incidents, insurance, off-platform repeat bookings, seasonal peaks.",
    wedge: "High-trust niche: cats, senior pets or medication needs; recurring subscription + photo proof + vet escalation.",
    importScore: 5,
    exportScore: 4,
    confidence: "Высокая",
    sourceIds: ["rover", "petTam"],
  },
  {
    id: "niche",
    name: "Niche commerce и replenishment subscriptions",
    thesis: "Horizontal commerce is closed; opportunity sits in high-repeat verticals with proprietary assortment and workflow.",
    platformRevenue: "$12–17 млрд",
    gmv: "$35–55 млрд",
    tam: "$100–180 млрд selected vertical spend",
    sam: "$35–55 млрд digitally served spend",
    cagr: "8–14%, but meal kits mature",
    stage: "Mature core; vertical reinvention",
    regions: [
      { region: "США", size: "$6–8 млрд revenue", leaders: "HelloFresh, Chewy Autoship, Thrive, Etsy niches", signal: "High subscription ARPU, high churn/CAC" },
      { region: "Европа", size: "$4–5,5 млрд", leaders: "HelloFresh, Gousto, Zooplus, Etsy", signal: "Dense delivery supports scheduled replenishment" },
      { region: "СНГ", size: "$1–2 млрд", leaders: "Ozon, Яндекс Лавка, Grow Food, niche D2C", signal: "Super-apps compress margins; subscriptions underused" },
      { region: "MENA / India / SEA / LatAm", size: "$1,5–2,5 млрд", leaders: "Curefoods, DailyMealz, Petlove, local D2C", signal: "Growth, but cold chain and affordability constrain" },
    ],
    leaders: "HelloFresh €7,66 млрд revenue in 2024; Etsy $2,81 млрд revenue / $12,59 млрд GMS; HelloFresh meal kits ~50% share in one market estimate.",
    whitespace: "Condition-specific food, pet health, hobby replenishment, refill/repair loops, B2B2C distribution through insurers/employers.",
    barriers: "Inventory and working capital, fulfillment, perishability, churn, promotional CAC, incumbents copying assortment.",
    wedge: "One recurring job-to-be-done with measurable result; pre-order or marketplace supply before owning inventory.",
    importScore: 3,
    exportScore: 3,
    confidence: "Высокая",
    sourceIds: ["hellofresh", "mealTam", "etsy", "yandex"],
  },
];

const topIdeas = [
  { title: "Immigration corridor OS", why: "Сильная российская компетенция в сложных workflow и реальный cross-border pain.", model: "Case fee + partner take rate", score: "Import 5 / Export 5", market: "immigration" },
  { title: "Experiences operator OS", why: "Supply всё ещё offline; можно экспортировать B2B software без глобального consumer CAC.", model: "SaaS + booking fee", score: "Import 5 / Export 4", market: "experiences" },
  { title: "Verified auto ownership passport", why: "Россия имеет плотный auto classifieds рынок, но данные ремонта и состояния разорваны.", model: "Inspection + shop lead + warranty", score: "Import 5 / Export 4", market: "auto" },
  { title: "High-trust pet care niche", why: "Повторяемость и высокий trust позволяют начать с узкого managed supply.", model: "18–25% take + membership", score: "Import 5 / Export 4", market: "pet" },
  { title: "Fixed-outcome home repair", why: "Lead-gen вызывает недоверие; triage и фиксированная цена создают понятную ценность.", model: "Take rate + warranty plan", score: "Import 5 / Export 3", market: "home" },
  { title: "Intercity fleet operating layer", why: "Экспортируемый B2B wedge на фрагментированных маршрутах emerging markets.", model: "SaaS + ticket fee", score: "Import 4 / Export 5", market: "intercity" },
];

function scorePills(score: number) {
  return (
    <Row gap={3}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}><Pill size="sm" tone={n <= score ? "info" : "neutral"}>{n}</Pill></span>
      ))}
    </Row>
  );
}

function MarketDetail({ market }: { market: Market }) {
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  return (
    <Stack gap={12}>
      <Grid columns="1.15fr 0.85fr" gap={12}>
        <Stack gap={8}>
          <Text>{market.thesis}</Text>
          <Grid columns={2} gap={8}>
            <Stat label="Net platform revenue 2024/25" value={market.platformRevenue} />
            <Stat label="GMV / consumer spend" value={market.gmv} />
            <Stat label="TAM" value={market.tam} />
            <Stat label="Practical SAM" value={market.sam} />
          </Grid>
        </Stack>
        <Card>
          <CardHeader>Вердикт</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Row justify="space-between"><Text size="small" tone="secondary">Стадия</Text><Text size="small">{market.stage}</Text></Row>
              <Row justify="space-between"><Text size="small" tone="secondary">CAGR</Text><Text size="small">{market.cagr}</Text></Row>
              <Row justify="space-between"><Text size="small" tone="secondary">Импорт в РФ</Text>{scorePills(market.importScore)}</Row>
              <Row justify="space-between"><Text size="small" tone="secondary">Экспорт из РФ</Text>{scorePills(market.exportScore)}</Row>
              <Row justify="space-between"><Text size="small" tone="secondary">Уверенность</Text><Pill tone={market.confidence === "Высокая" ? "success" : market.confidence === "Средняя" ? "warning" : "neutral"}>{market.confidence}</Pill></Row>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
      <Table
        headers={["Регион", "Размер / proxy", "Лидеры", "Что важно"]}
        rows={market.regions.map((r) => [<Text weight="semibold">{r.region}</Text>, r.size, r.leaders, r.signal])}
        striped
      />
      <Grid columns={2} gap={12}>
        <Stack gap={7}>
          <H3>Лидеры и whitespace</H3>
          <Text><Text weight="semibold">Leaders: </Text>{market.leaders}</Text>
          <Text><Text weight="semibold">Whitespace: </Text>{market.whitespace}</Text>
        </Stack>
        <Stack gap={7}>
          <H3>Барьер и startup wedge</H3>
          <Text><Text weight="semibold">Moat / barrier: </Text>{market.barriers}</Text>
          <Callout tone="info" title="Рекомендуемый wedge">{market.wedge}</Callout>
        </Stack>
      </Grid>
      <Row gap={8} wrap>
        {market.sourceIds.map((id) => {
          const source = sourceMap.get(id);
          return source ? <span key={id}><Link href={source.url}>{source.title}</Link></span> : null;
        })}
      </Row>
    </Stack>
  );
}

function PortfolioView() {
  const [selected, setSelected] = useCanvasState("selected-market", markets[0].id);
  const market = markets.find((item) => item.id === selected) || markets[0];
  return (
    <Stack gap={18}>
      <Grid columns="1.05fr 1.95fr" gap={14}>
        <Card>
          <CardHeader>12 узких рынков</CardHeader>
          <CardBody>
            <Stack gap={6}>
              {markets.map((item) => (
                <div key={item.id}>
                  <Button variant={item.id === market.id ? "primary" : "ghost"} onClick={() => setSelected(item.id)}>
                    {item.name}
                  </Button>
                </div>
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Stack gap={10}>
          <Row justify="space-between" align="center" wrap>
            <H2>{market.name}</H2>
            <Row gap={6}>
              <Pill tone="info">Импорт {market.importScore}/5</Pill>
              <Pill tone="success">Экспорт {market.exportScore}/5</Pill>
            </Row>
          </Row>
          <MarketDetail market={market} />
        </Stack>
      </Grid>
    </Stack>
  );
}

function RankingView() {
  const sorted = [...markets].sort((a, b) => (b.importScore + b.exportScore) - (a.importScore + a.exportScore));
  return (
    <Stack gap={16}>
      <H2>Opportunity ranking</H2>
      <Text tone="secondary">Score оценивает переносимость модели, а не размер рынка. 5 = сильный fit; 1 = структурно закрытый или капиталоёмкий.</Text>
      <Table
        headers={["Рынок", "Net platform revenue", "CAGR / stage", "Импорт в РФ", "Экспорт из РФ", "Confidence"]}
        rows={sorted.map((m) => [
          <Text weight="semibold">{m.name}</Text>,
          m.platformRevenue,
          `${m.cagr} · ${m.stage}`,
          `${m.importScore}/5`,
          `${m.exportScore}/5`,
          m.confidence,
        ])}
        rowTone={sorted.map((m) => m.importScore + m.exportScore >= 9 ? "success" : m.importScore + m.exportScore >= 7 ? "info" : "neutral")}
        striped
        stickyHeader
      />
      <H2>Шесть лучших wedges</H2>
      <Grid columns={3} gap={10}>
        {topIdeas.map((idea, index) => (
          <div key={idea.title}>
            <Card>
              <CardHeader trailing={<Pill tone={index < 2 ? "success" : "info"}>{idea.score}</Pill>}>{idea.title}</CardHeader>
              <CardBody>
                <Stack gap={7}>
                  <Text>{idea.why}</Text>
                  <Text size="small" tone="secondary">{idea.model}</Text>
                </Stack>
              </CardBody>
            </Card>
          </div>
        ))}
      </Grid>
    </Stack>
  );
}

function RegionsView() {
  const regionRows = [
    ["США", "Максимальный ARPU, liability и CAC", "Legal, home, auto, family care", "Лицензии по штатам, insurance, expensive paid acquisition"],
    ["Европа", "Плотная логистика, но country fragmentation", "Resale, experiences, beauty OS, intercity", "Язык, labor law, VAT/payments, local champions"],
    ["СНГ / Россия", "Сильные classifieds и super-apps; мало managed trust layers", "Home outcomes, auto passport, pet care, immigration", "Платежи, санкции, informal supply, platform concentration"],
    ["MENA", "Высокий чек GCC и большой migrant flow", "Relocation, beauty, experiences, auto", "Local sponsorship, licensing, cultural localization"],
    ["LatAm", "Mobile-first и длинные intercity corridors", "Bus OS, resale, relocation, pet care", "Cash, safety, tax and payments fragmentation"],
    ["India", "Огромный volume, низкий ARPU, dense cities", "Home services, immigration, intercity, expert advice", "Price sensitivity, local payments, operational intensity"],
    ["SEA", "Super-app distribution и fast digital adoption", "Experiences, beauty, resale, pet care", "Multi-country localization, islands/logistics, payments"],
  ];
  return (
    <Stack gap={16}>
      <H2>Региональная карта</H2>
      <Table headers={["Регион", "Экономика", "Лучшие категории", "Главный барьер"]} rows={regionRows} striped />
      <Grid columns={2} gap={12}>
        <Callout tone="success" title="Что импортировать в Россию">
          Outcome-managed home repair; operator-first travel experiences; verified pet care; auto maintenance passport; family backup care. Во всех пяти случаях западный интерфейс копировать недостаточно — нужен локальный trust/ops layer.
        </Callout>
        <Callout tone="info" title="Что экспортировать из России">
          Intercity fleet software, corridor-specific immigration workflow, beauty merchant OS и auto-service data layer. Начинать лучше с СНГ, GCC, Serbia, Türkiye, LatAm и India, где российские payments не являются core dependency.
        </Callout>
      </Grid>
      <H2>Где network effects действительно работают</H2>
      <Grid columns={3} gap={10}>
        <Card><CardHeader>Сильный network</CardHeader><CardBody><Text>Dating, resale, home services и pet care требуют local/category liquidity. Cold start — центральный риск.</Text></CardBody></Card>
        <Card><CardHeader>Supply + software moat</CardHeader><CardBody><Text>Experiences, beauty и intercity можно начать как merchant/fleet OS и получить marketplace позже.</Text></CardBody></Card>
        <Card><CardHeader>Workflow moat</CardHeader><CardBody><Text>Legal, immigration, family и auto выигрывают на case graph, verified data и embedded partners, а не на количестве листингов.</Text></CardBody></Card>
      </Grid>
    </Stack>
  );
}

function MethodologyView() {
  return (
    <Stack gap={16}>
      <H2>Методика и оговорки</H2>
      <Callout tone="warning" title="Revenue и GMV не смешаны">
        Net platform revenue — комиссия, subscription, ads, SaaS и payments revenue оператора. Для inventory-led компаний (Carvana, HelloFresh, Flix) accounting revenue несопоставима с marketplace take; поэтому в market pool использован gross-profit / net-revenue proxy, а consumer transaction value показана отдельно как GMV.
      </Callout>
      <Grid columns={3} gap={10}>
        <Stat label="Узких рынков" value="12" />
        <Stat label="Региональных срезов" value="48+" />
        <Stat label="Публичных ссылок" value={`${sources.length}`} />
      </Grid>
      <Stack gap={8}>
        <H3>Как читать диапазоны</H3>
        <Text>2024/25 platform revenue — triangulation публичных лидеров, disclosed regional splits, take rates и частных оценок. TAM — полный consumer spend или отраслевой revenue. SAM — часть, которую реально можно оцифровать и монетизировать платформой в текущем продукте.</Text>
        <Text>Currency conversion округлена: EUR→USD около 1,08 для 2024 и 1,10–1,18 для 2025 disclosures; RUB→USD около 90–95 RUB. Диапазон важнее точечной конверсии.</Text>
        <Text>Рынки с private leaders и СНГ имеют более низкую confidence: компании редко раскрывают take rate, GMV и vertical split. Оценки market-research vendors часто расходятся из-за разных definitions; в canvas выбран консервативный пересекающийся диапазон.</Text>
      </Stack>
      <Divider />
      <H2>Публичные источники</H2>
      <Table
        headers={["Источник", "Что использовано", "Качество"]}
        rows={sources.map((source) => [
          <Link href={source.url}>{source.title}</Link>,
          source.usedFor,
          <Pill tone={source.quality === "Первичный" ? "success" : source.quality === "Отраслевой" ? "info" : "warning"}>{source.quality}</Pill>,
        ])}
        striped
        stickyHeader
      />
    </Stack>
  );
}

export default function GlobalB2CMarketsCanvas() {
  const theme = useHostTheme();
  const [view, setView] = useCanvasState<"portfolio" | "ranking" | "regions" | "method">("main-view", "ranking");
  return (
    <Stack gap={20} style={{ padding: 20, color: theme.text.primary, background: theme.bg.editor }}>
      <Stack gap={8}>
        <Row justify="space-between" align="start" wrap>
          <Stack gap={5}>
            <H1>Global B2C commerce, lifestyle, travel & mobility</H1>
            <Text tone="secondary">12 narrow markets · США, Европа, СНГ · selective MENA, LatAm, India, SEA · 2024/2025 USD</Text>
          </Stack>
          <Pill tone="warning">Research cut: 28 Jul 2026</Pill>
        </Row>
        <Row gap={8} wrap>
          <Button variant={view === "ranking" ? "primary" : "secondary"} onClick={() => setView("ranking")}>Итоги и ranking</Button>
          <Button variant={view === "portfolio" ? "primary" : "secondary"} onClick={() => setView("portfolio")}>Карточки рынков</Button>
          <Button variant={view === "regions" ? "primary" : "secondary"} onClick={() => setView("regions")}>Регионы</Button>
          <Button variant={view === "method" ? "primary" : "secondary"} onClick={() => setView("method")}>Методика и источники</Button>
        </Row>
      </Stack>
      {view === "ranking" ? <RankingView /> : view === "portfolio" ? <PortfolioView /> : view === "regions" ? <RegionsView /> : <MethodologyView />}
      <Divider />
      <Text size="small" tone="tertiary">Directional market map for strategy, not an audited market model or investment advice. Validate unit economics and current regulation before launch.</Text>
    </Stack>
  );
}
