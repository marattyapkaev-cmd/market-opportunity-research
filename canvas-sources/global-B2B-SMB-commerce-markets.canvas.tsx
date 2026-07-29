import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
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

type Region = {
  name: string;
  revenue: string;
  maturity: string;
  leaders: string;
  whitespace: string;
};

type Market = {
  id: string;
  name: string;
  short: string;
  current: string;
  tam: number;
  sam: number;
  cagr: number;
  stage: string;
  importScore: number;
  exportScore: number;
  confidence: "Высокая" | "Средняя" | "Низкая";
  thesis: string;
  methodology: string;
  leaders: string[];
  wedge: string;
  barriers: string;
  regions: Region[];
  sourceIds: string[];
  tag: string;
};

const sources = [
  { id: "A1", title: "Grand View Research — North America accounting software, 2024", url: "https://www.grandviewresearch.com/horizon/outlook/accounting-software-market/north-america" },
  { id: "A2", title: "Xero FY25 annual report", url: "https://announcements.asx.com.au/asxpdf/20250515/pdf/06jrf2qltfk4xr.pdf" },
  { id: "A3", title: "Sage FY25 results", url: "https://www.sage.com/investors/investor-downloads/press-releases/2025/11/full-year-2025-results-19-november-2025/" },
  { id: "A4", title: "TAdviser — крупнейшие SaaS-провайдеры России, 2024", url: "https://tadviser.com/index.php/Article:The_largest_SaaS_service_providers_in_Russia" },
  { id: "T1", title: "MarketsandMarkets — tax management, 2024", url: "https://www.marketsandmarkets.com/Market-Reports/tax-management-market-230446693.html" },
  { id: "T2", title: "Billentis / Comarch — e-invoicing & tax compliance 2024", url: "https://www.comarch.com/files-com/file_829/Billentis-Comarch-The-global-e-invoicing-and-tax-compliance-report.pdf" },
  { id: "T3", title: "DataHorizzon — e-invoicing software regional revenue", url: "https://datahorizzonresearch.com/e-invoicing-software-market-43473" },
  { id: "P1", title: "OMR — North America AP automation, 2024", url: "https://www.omrglobal.com/press-release/north-american-account-payable-automation-market-size" },
  { id: "P2", title: "OMR — Europe AP automation, 2024", url: "https://www.omrglobal.com/press-release/european-account-payable-automation-market-size" },
  { id: "P3", title: "BILL FY25 results", url: "https://investor.bill.com/news/news-details/2025/BILL-Reports-Fourth-Quarter-and-Fiscal-Year-2025-Financial-Results-and-Announces-300-Million-Share-Repurchase-Program/default.aspx" },
  { id: "O1", title: "Custom Market Insights — payment orchestration, 2024", url: "https://www.custommarketinsights.com/report/payment-orchestration-platform-market/" },
  { id: "O2", title: "Mordor Intelligence — payment orchestration, 2025", url: "https://www.mordorintelligence.com/industry-reports/payment-orchestration-platform-market" },
  { id: "R1", title: "Polaris — procurement software regional shares, 2025", url: "https://www.polarismarketresearch.com/industry-analysis/procurement-software-market" },
  { id: "R2", title: "TAdviser — цифровизация закупок РФ", url: "https://tadviser.com/index.php/Article:Russian_procurement_digitalization_market._TAdviser_2026_Review" },
  { id: "R3", title: "Data Insight / B2B-Center — закупки РФ, 2024", url: "https://companies.rbc.ru/news/Stew7NIt48/b2b-center---lider-rossijskogo-ryinka-onlajn-zakupok-kommercheskih-kompanij/" },
  { id: "B1", title: "Adyen + BCG — embedded finance for SaaS platforms, 2024", url: "https://www.adyen.com/press-and-media/bcg-embedded-finance-2024" },
  { id: "B2", title: "Smart Ranking — финтех РФ, 2024", url: "https://smartranking.ru/ru/analytics/fintech/god-vyzovov-i-adaptacii-fintech-rynok-vyros-na-14-v-2024-godu-i-voshel-v-zonu-plato/" },
  { id: "E1", title: "Credence — ecommerce software/platform regional revenue, 2024", url: "https://www.credenceresearch.com/report/ecommerce-software-and-platform-market" },
  { id: "E2", title: "Shopify FY25 results (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1594805/000159480526000006/exhibit991pressreleaseq420.htm" },
  { id: "E3", title: "inSales revenue and GMV, 2024", url: "https://oborot.ru/news/za-schet-chego-vyruchka-insales-vyrosla-na-115-za-god-sellery-marketplejsov-i-sluzhby-dostavki-zaplatili-kompanii-707-millionov-i242206.html" },
  { id: "E4", title: "Yakov & Partners — ecommerce РФ, 2024", url: "https://yakovpartners.com/publications/ecom/" },
  { id: "S1", title: "Digital Marketing Club — аналитика маркетплейсов РФ, 2024", url: "https://vc.ru/marketplace/2271883-reyting-servisov-analitiki-marketpleysov-po-vyruchke-2024" },
  { id: "S2", title: "MarketIntelo — seller analytics regional shares, 2025", url: "https://marketintelo.com/report/seller-analytics-platform-market" },
  { id: "M1", title: "Market Research Future — marketing automation, 2024", url: "https://www.marketresearchfuture.com/reports/marketing-automation-software-market-4927" },
  { id: "M2", title: "HubSpot FY24 results", url: "https://ir.hubspot.com/static-files/9bde2e71-0031-4e82-a892-01be4ec5de71" },
  { id: "M3", title: "Klaviyo 2024 10-K", url: "https://www.sec.gov/Archives/edgar/data/1835830/000183583025000014/kvyo-20241231.htm" },
  { id: "M4", title: "TAdviser — рынок CRM РФ, 2024", url: "https://tadviser.com/index.php/Article:CRM_(Russian_market)" },
  { id: "F1", title: "Verdantix — field service software, 2024", url: "https://www.verdantix.com/venture/report/market-size-and-forecast--field-service-management-software-2024-2030-global" },
  { id: "F2", title: "Toast FY24 results (SEC)", url: "https://www.sec.gov/Archives/edgar/data/1650164/000165016425000066/tost-20241231xexhibit991.htm" },
  { id: "N1", title: "Grand View Research — no-code AI platforms, 2024", url: "https://www.grandviewresearch.com/industry-analysis/no-code-ai-platform-market-report" },
  { id: "N2", title: "Albato financials, 2025", url: "https://www.testfirm.ru/result/7731399880_ooo-albato" },
  { id: "L1", title: "Credence — contract management software, 2024", url: "https://www.credenceresearch.com/report/contract-management-software-market" },
  { id: "L2", title: "Congruence — KYB software, 2025", url: "https://www.congruencemarketinsights.com/report/know-your-business-compliance-software-market" },
  { id: "X1", title: "SaaSBoomi — India software opportunity", url: "https://saasboomi.org/wp-content/uploads/2025/03/SaaSBoomi-India-market-opportunity-report.pdf" },
  { id: "X2", title: "Wafeq — MENA SME accounting traction", url: "https://uaefintech.co/wafeq-raises-usd7-5-million-in-series-a-funding-to-accelerate-accounting-digitization-for-mena-smes/" },
  { id: "X3", title: "Nuvemshop — LatAm commerce enablement", url: "https://www.bnamericas.com/en/news/nuvemshop-arrives-in-chile-upon-regional-investment-of-over-us10-million" },
];

const markets: Market[] = [
  {
    id: "accounting",
    name: "SMB accounting & bookkeeping cloud",
    short: "Accounting",
    current: "$18–24B",
    tam: 23.5,
    sam: 2.4,
    cagr: 9.3,
    stage: "Зрелый, миграция в cloud",
    importScore: 3,
    exportScore: 2,
    confidence: "Высокая",
    tag: "finance ops",
    thesis: "Большой рынок, но system-of-record локален. Независимому стартапу лучше продавать слой автоматизации поверх бухгалтерии, а не новый ledger.",
    methodology: "TAM — глобальная выручка accounting/bookkeeping software 2025. SAM — 67% SMB × 75% cloud × ~20% узких workflow без замены главной книги ≈ $2.4B.",
    leaders: ["Intuit — $16.2B total FY25 (шире accounting)", "Sage — £2.51B FY25", "Xero — NZ$2.10B / ~$1.23B FY25"],
    wedge: "AI-close assistant для бухгалтерских бюро: сбор первички, сверка банков, exception queue, explainable audit trail; коннекторы к QuickBooks/Xero/Sage/1C.",
    barriers: "Локальные налоги и chart of accounts; доверие к system-of-record; банковские фиды; высокая цена миграции; санкции и платежи для российского юрлица.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$7.51B (2024)", maturity: "Высокая; QuickBooks-центричная", leaders: "Intuit, Xero, NetSuite, FreshBooks", whitespace: "AI month-end close для micro-SMB и outsourced accountants" },
      { name: "Европа", revenue: "$4.4–6.6B (2025)", maturity: "Фрагментирована по странам", leaders: "Sage, Xero, DATEV, Visma, Exact", whitespace: "Cross-border VAT + e-invoice поверх локальных ledger" },
      { name: "СНГ / РФ", revenue: "~$0.55–0.75B proxy", maturity: "Зрелая РФ, слабее вне РФ", leaders: "1C, Контур, СБИС, Моё дело, МоёСклад", whitespace: "Управленческий cash view и AI-операции между банками/1C/маркетплейсами" },
      { name: "India / MENA", revenue: "India ~$0.6B narrow; MENA н/д", maturity: "Рост через GST/VAT mandates", leaders: "Tally, Zoho; Wafeq, Daftra", whitespace: "Vernacular, mobile-first, bank + invoice compliance" },
    ],
    sourceIds: ["A1", "A2", "A3", "A4", "X1", "X2"],
  },
  {
    id: "tax",
    name: "Indirect tax, e-invoicing & CTC compliance",
    short: "Tax / e-invoice",
    current: "$8.9–12.7B e-invoice",
    tam: 9.1,
    sam: 1.8,
    cagr: 17.1,
    stage: "Регуляторный hypergrowth",
    importScore: 4,
    exportScore: 3,
    confidence: "Средняя",
    tag: "compliance",
    thesis: "Лучший regulatory wedge: мандаты создают обязательный бюджет, но продукт должен быть country-pack engine, а не одноразовый коннектор.",
    methodology: "TAM — глобальная vendor revenue e-invoicing 2024 ($8.9–9.1B; широкий отчёт даёт $12.7B). SAM — Europe + MENA + India SMB/API layer, ~20% TAM; tax filing для физлиц исключён.",
    leaders: ["Avalara — private, revenue не раскрыта", "Vertex — $667M FY24", "Sovos, Pagero/Thomson Reuters, Basware, EDICOM"],
    wedge: "API-first multi-country invoice validation: Peppol/ViDA + UAE PINT-AE + KSA ZATCA; sandbox, schema diff, evidence archive и бухгалтерские плагины.",
    barriers: "Аккредитация и локальное присутствие; liability; постоянные изменения схем; data residency; доверие enterprise; санкционный комплаенс.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$3.2B e-invoice (2024)", maturity: "Tax сложен, e-invoice ранний", leaders: "Avalara, Vertex, Sovos, Thomson Reuters", whitespace: "Mid-market sales-tax + AP evidence automation" },
      { name: "Европа", revenue: "$1.9–2.5B (2024)", maturity: "Ускорение ViDA/нац. мандатов", leaders: "Pagero, Basware, EDICOM, Comarch, Sovos", whitespace: "Один API для десятков country mandates и ERP SMB" },
      { name: "СНГ / РФ", revenue: "~$0.45–0.65B proxy EDO/reporting", maturity: "РФ близка к насыщению", leaders: "Контур.Диадок, СБИС, 1C-ЭДО, Такском", whitespace: "Кросс-border документы ЕАЭС и нейтральный compliance engine" },
      { name: "MENA / India / LatAm", revenue: "Н/д; сильный demand signal", maturity: "Мандаты создают рынок", leaders: "Wafeq, Zoho, Tally, локальные ASP", whitespace: "KSA+UAE пакет; India GST; LatAm CTC translation layer" },
    ],
    sourceIds: ["T1", "T2", "T3", "A4", "X1", "X2"],
  },
  {
    id: "apar",
    name: "AP/AR automation for SMB & mid-market",
    short: "AP / AR",
    current: "$5.5–7.2B",
    tam: 7.23,
    sam: 1.6,
    cagr: 11.3,
    stage: "Scale-up / consolidation",
    importScore: 5,
    exportScore: 3,
    confidence: "Средняя",
    tag: "finance ops",
    thesis: "В РФ автоматизировано создание платежа, но слабее реализованы collections, cash application и supplier onboarding — это доказанный внешний рынок.",
    methodology: "TAM — AP/AR software 2024. SAM — NA+EU SMB/mid-market cloud share × узкие AR/AP workflows ≈ $1.6B; payment principal/TPV исключены.",
    leaders: ["BILL — $1.463B FY25 revenue; core $1.301B", "AvidXchange, Tipalti, HighRadius", "Basware, Medius, Esker"],
    wedge: "AR copilot для B2B SMB: invoice-to-cash, обещания платежа из email/мессенджеров, matching банковских поступлений, локальные dunning playbooks.",
    barriers: "Доступ к bank rails и ERP; fraud/liability; двусторонняя сеть; сложность интеграций; procurement у mid-market.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$1.47B narrow AP (2024)", maturity: "Высокая, рынок масштабирован", leaders: "BILL, AvidXchange, Tipalti, Ramp", whitespace: "AR для service SMB; vertical cash application" },
      { name: "Европа", revenue: "$0.78B narrow AP (2024)", maturity: "Растёт с e-invoicing", leaders: "Basware, Medius, Esker, Pleo", whitespace: "SMB cross-border AR + compliant invoice status" },
      { name: "СНГ / РФ", revenue: "~$0.15–0.25B model", maturity: "Платежи сильны, workflow фрагментирован", leaders: "1C, СБИС, банки, Контур", whitespace: "Collections, remittance matching, supplier portal для среднего бизнеса" },
    ],
    sourceIds: ["P1", "P2", "P3", "A4"],
  },
  {
    id: "orchestration",
    name: "Payment orchestration for digital merchants",
    short: "Pay orchestration",
    current: "$1.5B",
    tam: 1.5,
    sam: 0.48,
    cagr: 24.5,
    stage: "Быстрый рост, medium concentration",
    importScore: 3,
    exportScore: 3,
    confidence: "Средняя",
    tag: "payments",
    thesis: "Рост высокий, но pure-play зажат PSP. Wedge должен давать измеримый lift authorization/cost и не хранить деньги.",
    methodology: "TAM — vendor/platform revenue 2024, не TPV. SAM — multi-PSP merchants в mid-market, ~32% TAM; российский domestic acquiring не считается.",
    leaders: ["Spreedly, Primer, Gr4vy", "IXOPAY, CellPoint Digital, APEXX", "Adyen/Stripe/Checkout как bundled competitors"],
    wedge: "Merchant-side routing control plane для сложных рынков: no-code rules, failover, token portability, reconciliation и A/B approval uplift.",
    barriers: "PCI DSS; network tokens; PSP bundling; длинные enterprise sales; локальные payment methods; санкции делают cross-border acquiring критичным.",
    regions: [
      { name: "США / Сев. Америка", revenue: "~$0.50–0.55B model", maturity: "Крупнейший регион", leaders: "Spreedly, Stripe, Cybersource, Gr4vy", whitespace: "Mid-market observability + portability без PSP lock-in" },
      { name: "Европа", revenue: "~$0.40–0.45B model", maturity: "PSD/SCA, много PSP/APM", leaders: "Primer, IXOPAY, APEXX, CellPoint", whitespace: "Cross-border subscriptions и local APM routing" },
      { name: "СНГ / РФ", revenue: "~$0.04–0.07B model", maturity: "Domestic rails сильны, cross-border разорван", leaders: "ЮKassa, CloudPayments, банки, Corefy вне РФ", whitespace: "Оркестрация СНГ/MENA для нероссийских юрлиц" },
      { name: "SEA / LatAm / MENA", revenue: "Н/д; fastest-growth signal", maturity: "Фрагментированные local methods", leaders: "dLocal, EBANX, Rapyd, regional PSP", whitespace: "Local APM catalog + smart retries + reconciliation" },
    ],
    sourceIds: ["O1", "O2"],
  },
  {
    id: "procurement",
    name: "Lightweight procurement & supplier operations",
    short: "Procurement",
    current: "$9.5B",
    tam: 9.5,
    sam: 1.25,
    cagr: 9.9,
    stage: "Зрелый enterprise, SMB растёт",
    importScore: 4,
    exportScore: 2,
    confidence: "Высокая",
    tag: "spend",
    thesis: "Не идти в full S2P. Whitespace — intake-to-PO для 50–500 сотрудников и supplier evidence, интегрированный с accounting.",
    methodology: "TAM — procurement software 2025. SAM — SME fastest-growing slice (13.85% CAGR), lightweight intake/supplier/PO ≈ 13% TAM.",
    leaders: ["SAP Ariba ~8–11% estimate", "Coupa ~7–10%", "Oracle, Jaggaer, GEP, Ivalua, Basware"],
    wedge: "Slack/Teams/email intake → policy check → 3 quotes → PO → invoice match; старт без supplier network migration.",
    barriers: "ERP integrations; enterprise incumbents; change management; supplier network cold start; РФ 44-ФЗ/223-ФЗ и ЭТП — отдельный мир.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$3.82B (40.2% of 2025)", maturity: "Зрелый enterprise", leaders: "Coupa, Oracle, SAP, Zip, Procurify", whitespace: "SMB intake + spend controls без тяжёлого suite" },
      { name: "Европа", revenue: "$2.73B (28.75%)", maturity: "Зрелый, compliance-heavy", leaders: "SAP, Ivalua, Basware, Jaggaer", whitespace: "Supplier ESG/e-invoice evidence для mid-market" },
      { name: "СНГ / РФ", revenue: "$0.125B automation services 2024", maturity: "ЭТП зрелы, SRM растёт", leaders: "B2B-Center, B2B-RTS, Норбит, Весна, Agora", whitespace: "SMB private procurement и supplier onboarding; не конкурировать с ЭТП" },
    ],
    sourceIds: ["R1", "R2", "R3"],
  },
  {
    id: "banking",
    name: "SMB banking workflows & embedded finance enablement",
    short: "SMB banking",
    current: "$32B captured (NA+EU)",
    tam: 185,
    sam: 3.2,
    cagr: 20,
    stage: "Platform expansion",
    importScore: 3,
    exportScore: 4,
    confidence: "Средняя",
    tag: "embedded finance",
    thesis: "Российские digital banks сильнее многих рынков по UX и workflow. Экспортировать реалистично не банк, а white-label операционный слой.",
    methodology: "TAM $185B — банковский revenue pool, не software spend и не volume; captured ~$32B. SAM $3.2B — аналитическая оценка 10% captured revenue, доступного enablement/platform vendors.",
    leaders: ["Stripe/Adyen, Unit, Treasury Prime", "Qonto, Tide, Revolut Business, Solaris", "Точка, Т-Банк Бизнес, Модульбанк — capability benchmarks"],
    wedge: "White-label finance workspace для банков MENA/SEA: roles/approvals, invoice-to-payment, cash forecast, accountant console, API/webhooks.",
    barriers: "Лицензии и sponsor bank; AML/KYB; data residency; core banking integration; country-specific rails; происхождение IP/санкционные риски.",
    regions: [
      { name: "США / Сев. Америка", revenue: "~$20–22B captured pool model", maturity: "BaaS переоценивает risk", leaders: "Stripe, Unit, Mercury, Ramp, Brex", whitespace: "Workflow layer поверх bank core, не новый BaaS" },
      { name: "Европа", revenue: "~$10–12B captured pool model", maturity: "PSD/open banking зрелее", leaders: "Qonto, Tide, Revolut, Solaris, Adyen", whitespace: "Multi-entity cash ops для micro-groups и accountants" },
      { name: "СНГ / РФ", revenue: "$2.5B total fintech top-100 proxy", maturity: "Очень сильный SMB UX", leaders: "Точка, Т-Банк, Модульбанк, СберБизнес", whitespace: "Экспорт модулей, внутри РФ — multi-bank treasury SMB" },
      { name: "MENA / SEA", revenue: "Н/д; strong opportunity", maturity: "Банки инвестируют, UX uneven", leaders: "Wio, Mashreq NeoBiz, regional banks", whitespace: "Russian-grade accountant/approval workflows локально hosted" },
    ],
    sourceIds: ["B1", "B2"],
  },
  {
    id: "ecommerce",
    name: "SMB commerce enablement & omnichannel OS",
    short: "Commerce OS",
    current: "$24.45–27.4B",
    tam: 24.45,
    sam: 2.9,
    cagr: 12.5,
    stage: "Зрелый core, fintech/logistics expansion",
    importScore: 4,
    exportScore: 4,
    confidence: "Высокая",
    tag: "commerce",
    thesis: "Shop builder коммодитизирован. Возможность — operating layer между D2C, marketplaces, inventory, logistics и margin.",
    methodology: "TAM — global ecommerce software/platform revenue 2024. SAM — SMB omnichannel operations outside core storefront, ~12% TAM. Shopify revenue — net vendor revenue; GMV приводится только отдельно.",
    leaders: ["Shopify — $8.88B FY24; $11.56B FY25", "Wix, Adobe Commerce, WooCommerce ecosystem", "BigCommerce; Nuvemshop in LatAm"],
    wedge: "Omnichannel profit OS: единый SKU/catalog, true contribution margin, inventory allocation и returns across store + marketplaces.",
    barriers: "Platform APIs меняются; incumbents bundle; payment/logistics localization; high SMB churn; CAC через agencies/ecosystems.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$6.36B (26% global, 2024)", maturity: "Высокая", leaders: "Shopify ~29% US installs, Woo, Wix, Adobe", whitespace: "B2B-lite и profit/inventory control для multi-channel brands" },
      { name: "Европа", revenue: "$4.21B (2024)", maturity: "Фрагментирована", leaders: "Shopify, WooCommerce, PrestaShop, Shopware", whitespace: "Cross-border VAT/local payments/marketplace ops" },
      { name: "СНГ / РФ", revenue: "~$0.18–0.25B model", maturity: "Marketplace-first", leaders: "inSales $7.7M rev; 1C-Битрикс, retailCRM, МойСклад", whitespace: "End-to-end stack: сейчас магазину нужно интегрировать 10+ систем" },
      { name: "LatAm", revenue: "Н/д software; ecommerce GMV $194.7B", maturity: "Сильный рост", leaders: "Nuvemshop 120k+ stores, VTEX, Shopify", whitespace: "Localized payments/logistics + seller finance; GMV не revenue" },
    ],
    sourceIds: ["E1", "E2", "E3", "E4", "X3"],
  },
  {
    id: "seller",
    name: "Marketplace seller profit, ads & operations tools",
    short: "Seller tools",
    current: "$2.1–3.2B",
    tam: 3.2,
    sam: 0.72,
    cagr: 14,
    stage: "Growth, platform API dependency",
    importScore: 5,
    exportScore: 5,
    confidence: "Низкая",
    tag: "commerce",
    thesis: "Одна из лучших двусторонних возможностей: Россия доказала спрос и продуктовую компетенцию, а fragmented marketplaces растут в MENA/LatAm/SEA.",
    methodology: "TAM — seller analytics platform 2025 (~$3.2B, software component $2.19B); альтернативный Amazon-tools estimate ~$2.1B. SAM — paid SMB/pro sellers, 22% TAM.",
    leaders: ["Helium 10, Jungle Scout", "Pacvue, Perpetua, Teikametrics", "MPStats, Moneyplace, MarketGuru, Sellematics (РФ)"],
    wedge: "Profit + replenishment + ad anomaly agent для 2–4 marketplaces; объясняет unit economics по SKU и создаёт действия, не просто dashboard.",
    barriers: "API/platform retaliation; data licensing; sellers churn; marketplace-specific models; fake precision; country-by-country connectors.",
    regions: [
      { name: "США / Сев. Америка", revenue: "~$0.90B (28.3% share model)", maturity: "Amazon-centric, competitive", leaders: "Helium 10, Jungle Scout, Pacvue, Perpetua", whitespace: "Cross-market true margin + cash/replenishment for sub-$5M sellers" },
      { name: "Европа", revenue: "~$0.55–0.70B model", maturity: "Multi-country complexity", leaders: "US suites + local agencies/tools", whitespace: "VAT-aware profit and pan-EU inventory" },
      { name: "СНГ / РФ", revenue: "$42M actual analytics revenue 2024", maturity: "Быстрый рост замедлился до 15.5%", leaders: "MPStats, Moneyplace, MarketGuru, Sellematics", whitespace: "Finance/ads/stock action layer; WB/Ozon native analytics давят dashboards" },
      { name: "MENA / SEA / LatAm", revenue: "Н/д; strong opportunity", maturity: "Marketplace fragmentation", leaders: "Regional point tools", whitespace: "Export Russian marketplace ops know-how with local connectors" },
    ],
    sourceIds: ["S1", "S2"],
  },
  {
    id: "marketing",
    name: "SMB lifecycle marketing & customer data automation",
    short: "Marketing automation",
    current: "$5.2–5.6B",
    tam: 5.63,
    sam: 1.3,
    cagr: 10,
    stage: "Зрелый, AI rebundling",
    importScore: 3,
    exportScore: 3,
    confidence: "Высокая",
    tag: "growth",
    thesis: "Горизонтальный email automation насыщен. Wedge — vertical revenue automation с first-party data, где ROI считается в деньгах.",
    methodology: "TAM — global marketing automation software 2024. SAM — ecommerce/local-service SMB in Europe+CIS+MENA, ~23% TAM; ad spend и agency services исключены.",
    leaders: ["HubSpot — $2.63B FY24 total", "Klaviyo — $937.5M FY24", "Adobe, Salesforce, Mailchimp, ActiveCampaign"],
    wedge: "Vertical retention agent: triggers из заказов/записей, next-best-action, WhatsApp/email/SMS, incrementality holdouts и margin-aware offers.",
    barriers: "Crowded; messaging costs; privacy/GDPR; deliverability; platform bundling; доказательство incrementality.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$2.24B (2024)", maturity: "Очень зрелая", leaders: "HubSpot, Salesforce, Adobe, Klaviyo, Mailchimp", whitespace: "Vertical PLG below enterprise CDP complexity" },
      { name: "Европа", revenue: "$1.70B (2024)", maturity: "Зрелая, privacy-sensitive", leaders: "HubSpot, Brevo, ActiveCampaign, Klaviyo", whitespace: "Consent-native omnichannel for local commerce" },
      { name: "СНГ / РФ", revenue: "$0.38B CRM market proxy", maturity: "CRM сильнее lifecycle analytics", leaders: "Битрикс24, amoCRM, Mindbox, retailCRM", whitespace: "Incrementality + AI creative/offer ops для SMB; CRM proxy шире рынка" },
    ],
    sourceIds: ["M1", "M2", "M3", "M4"],
  },
  {
    id: "vertical",
    name: "Vertical SaaS for field & local service SMB",
    short: "Local / FSM",
    current: "$4.7–4.9B FSM",
    tam: 4.7,
    sam: 0.94,
    cagr: 12,
    stage: "Growth; payments expand ARPU",
    importScore: 5,
    exportScore: 3,
    confidence: "Высокая",
    tag: "vertical SaaS",
    thesis: "Доказано Toast/ServiceTitan/Jobber, но в РФ многие ниши остаются 1C+WhatsApp+Excel. Лучший import pattern — узкий workflow + payments позже.",
    methodology: "TAM — global FSM software 2024, а не весь vertical SaaS. SAM — 20% для home/commercial services SMB in target geographies.",
    leaders: ["ServiceTitan — $577M 2023 estimate", "Jobber — $150M 2023 estimate", "Toast — $4.96B FY24 total; SaaS revenue $706M"],
    wedge: "OS для одной ниши (например, HVAC/maintenance/commercial cleaning): quote → schedule → technician → proof → invoice → repeat service.",
    barriers: "Нужна глубокая вертикальная дистрибуция; field onboarding; локальные payments/tax; hardware/telephony; высокая support intensity.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$1.88B (40% FSM spend)", maturity: "Категорийные лидеры масштабны", leaders: "ServiceTitan, Jobber, Housecall Pro, Toast", whitespace: "Micro-verticals и AI dispatch for <20 workers" },
      { name: "Европа", revenue: "~$1.2–1.4B model", maturity: "Фрагментирована по странам", leaders: "Praxedo, BigChange, Simpro, local vendors", whitespace: "Localized trade OS + e-invoice compliance" },
      { name: "СНГ / РФ", revenue: "~$0.06–0.10B model", maturity: "Много point/legacy tools", leaders: "1C verticals, YCLIENTS, отраслевые CRM", whitespace: "B2B maintenance, cleaning, installers, property services" },
    ],
    sourceIds: ["F1", "F2"],
  },
  {
    id: "nocode",
    name: "No-code workflow & AI automation for SMB",
    short: "No-code automation",
    current: "$4.28B no-code AI",
    tam: 4.28,
    sam: 0.86,
    cagr: 30.2,
    stage: "Hypergrowth / agentic reset",
    importScore: 4,
    exportScore: 5,
    confidence: "Средняя",
    tag: "automation",
    thesis: "Экспортно реалистично: российские команды уже умеют integration SaaS. Побеждает не каталог коннекторов, а self-hosted AI workflows с governance.",
    methodology: "TAM — no-code AI platform revenue 2024. SAM — SMB workflow automation + regulated self-hosted slice, ~20% TAM; broad low-code enterprise исключён.",
    leaders: ["Zapier — ~$310M 2024 estimate", "Make, n8n, Workato", "Microsoft Power Platform, Airtable"],
    wedge: "Self-hosted automation for regulated SMB/mid-market: visual workflows + LLM steps + approvals + replay/audit; usage pricing without task tax.",
    barriers: "Connector breadth; open-source n8n; hyperscaler bundling; security; support burden; easy feature imitation.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$1.69B (39.6% of TAM)", maturity: "Зрелый no-code, AI reset", leaders: "Zapier, Airtable, Workato, Microsoft", whitespace: "Governed agent workflows for SMB" },
      { name: "Европа", revenue: "~$1.15B model", maturity: "GDPR/data sovereignty tailwind", leaders: "n8n, Make, Microsoft, UiPath", whitespace: "Self-hosted EU AI Act-ready automations" },
      { name: "СНГ / РФ", revenue: "~$0.04–0.07B model", maturity: "Растущий импортозамещающий", leaders: "Albato ₽164M 2025, ApiX-Drive, low-code vendors", whitespace: "On-prem connectors to 1C/СБИС/банки; экспортный core отделить от RU entity" },
    ],
    sourceIds: ["N1", "N2"],
  },
  {
    id: "legal",
    name: "SMB contracts, KYB & operational compliance",
    short: "Legal / KYB",
    current: "$2.87B CLM; $0.23B KYB",
    tam: 3.1,
    sam: 0.62,
    cagr: 12.1,
    stage: "Growth, AI-native entrants",
    importScore: 5,
    exportScore: 2,
    confidence: "Высокая",
    tag: "compliance",
    thesis: "SMB не купит enterprise CLM, но заплатит за конкретный risk workflow. В РФ слабо реализован continuous vendor compliance.",
    methodology: "TAM — CLM 2024 $2.87B + KYB 2025 $0.23B; broad GRC исключён. SAM — SMB/mid-market vendor contracts + KYB, 20% combined.",
    leaders: ["Icertis, Ironclad, DocuSign CLM", "Juro, Contractbook, Sirion", "Middesk, Dun & Bradstreet, Moody’s, Sumsub in KYB"],
    wedge: "Vendor onboarding passport: registry/UBO checks, sanctions evidence, contract obligations, renewal alerts и continuous monitoring.",
    barriers: "Legal liability; registry/data costs; jurisdiction coverage; explainability; false positives; sanctions make Russian ownership a sales blocker.",
    regions: [
      { name: "США / Сев. Америка", revenue: "$1.23B CLM (2024)", maturity: "Enterprise CLM crowded", leaders: "Ironclad, Icertis, DocuSign, LinkSquares", whitespace: "Vendor risk workflow for 50–500 employee firms" },
      { name: "Европа", revenue: "$0.51B CLM (2024)", maturity: "GDPR/DORA/AML tailwinds", leaders: "Juro, Contractbook, Icertis, local KYB", whitespace: "Multi-registry KYB + obligation evidence for SMB" },
      { name: "СНГ / РФ", revenue: "~$0.10–0.15B model", maturity: "Сильны справочники, слабее workflow", leaders: "Контур.Фокус, СПАРК, Casebook, ПравоТех", whitespace: "Continuous supplier checks + contract obligations inside procurement" },
    ],
    sourceIds: ["L1", "L2", "A4"],
  },
];

const provenAbroad = [
  { idea: "AR collections + cash application для SMB", proof: "BILL/HighRadius/Esker; AP/AR market $7.2B", russia: "Банковские платежи удобны, но обещания платежа, remittance matching и dunning остаются ручными", score: "5/5", first: "1C + 3 банка + email/Telegram; service SMB с 500–5k счетов/мес." },
  { idea: "Vertical OS для field services", proof: "ServiceTitan, Jobber, Toast: workflow → fintech expansion", russia: "Много отраслей живут в 1C + мессенджеры + таблицы", score: "5/5", first: "Одна ниша, 20 design partners, scheduling/proof/invoice; payments позже" },
  { idea: "Continuous vendor KYB + obligations", proof: "Middesk/CLM/KYB double-digit growth", russia: "Есть данные СПАРК/Контур, но мало continuous workflow для SMB/mid-market", score: "5/5", first: "Supplier passport для закупок: UBO/sanctions/contracts/renewals" },
  { idea: "Profit OS для marketplace seller", proof: "Helium 10/Pacvue; paid seller tooling $2B+", russia: "Analytics есть, но native dashboards сжимают value; action layer ещё открыт", score: "5/5", first: "Margin + stock + ad anomaly actions по SKU для WB/Ozon" },
  { idea: "Procurement intake-to-PO для SMB", proof: "Zip/Procurify pattern; SME procurement CAGR ~13.9%", russia: "ЭТП/SRM ориентированы на крупный бизнес", score: "4/5", first: "Email/Bitrix intake, policy, quotes, PO, invoice match" },
];

const exportable = [
  { idea: "Marketplace seller operations", why: "WB/Ozon создали сложную школу unit economics, fulfillment и ads", targets: "KZ/UZ → MENA/SEA/LatAm", score: "5/5", condition: "Локальные API/data partnerships; не переносить российские модели как есть" },
  { idea: "Self-hosted integration / agent automation", why: "Albato/ApiX-Drive и сильная integration engineering база", targets: "EU regulated SMB, MENA banks, CIS", score: "5/5", condition: "Нероссийская структура, clean IP provenance, EU/MENA hosting" },
  { idea: "SMB banking UX modules", why: "Точка/Т-Банк/Модульбанк доказали accountant console, approvals и 24/7 workflows", targets: "MENA/SEA banks and fintechs", score: "4/5", condition: "White-label software, без лицензии/хранения денег; локальный sponsor" },
  { idea: "Omnichannel commerce operations", why: "inSales/retailCRM/МойСклад работают в marketplace-first реальности", targets: "LatAm, MENA, Central Asia", score: "4/5", condition: "Экспортировать catalog/order/margin layer, локализовать payments/logistics" },
  { idea: "E-document workflow engineering", why: "РФ — зрелый EDO/CTC-like рынок", targets: "KSA/UAE/India через local ASP", score: "3/5", condition: "Не продавать российский compliance; использовать competence для country packs" },
];

const priority = [...markets]
  .map((m) => ({ ...m, combined: m.importScore + m.exportScore + (m.cagr >= 15 ? 1 : 0) }))
  .sort((a, b) => b.combined - a.combined);

function Score({ value }: { value: number }) {
  const theme = useHostTheme();
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }} title={`${value} из 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            width: 12,
            height: 5,
            borderRadius: 2,
            background: n <= value ? theme.accent.primary : theme.fill.tertiary,
          }}
        />
      ))}
    </div>
  );
}

function MarketDetail({ market }: { market: Market }) {
  const theme = useHostTheme();
  return (
    <Card collapsible defaultOpen={false}>
      <CardHeader trailing={<Pill size="sm">{market.confidence}</Pill>}>
        {market.name}
      </CardHeader>
      <CardBody>
        <Stack gap={14}>
          <Grid columns="1.2fr 1fr 1fr 1fr" gap={12}>
            <Stat value={market.current} label="Current vendor revenue 2024/25" />
            <Stat value={`$${market.sam}B`} label="Расчётный SAM" />
            <Stat value={`${market.cagr}%`} label="CAGR" tone={market.cagr >= 15 ? "success" : undefined} />
            <Stat value={market.stage} label="Стадия" />
          </Grid>
          <Text>{market.thesis}</Text>
          <Callout tone="info" title="TAM / SAM методика">
            {market.methodology}
          </Callout>
          <Grid columns={2} gap={18}>
            <Stack gap={6}>
              <H3>Лидеры и scale proof</H3>
              {market.leaders.map((leader) => <div key={leader}><Text size="small">• {leader}</Text></div>)}
            </Stack>
            <Stack gap={8}>
              <H3>Конкретный wedge</H3>
              <Text size="small">{market.wedge}</Text>
              <H3>Барьеры</H3>
              <Text size="small" tone="secondary">{market.barriers}</Text>
            </Stack>
          </Grid>
          <Divider />
          <H3>Сравнение регионов — annual vendor/platform revenue, USD</H3>
          <Table
            headers={["Регион", "Revenue 2024/25", "Стадия", "Лидеры", "Whitespace"]}
            rows={market.regions.map((r) => [r.name, r.revenue, r.maturity, r.leaders, r.whitespace])}
            striped
          />
          <Row gap={16} wrap align="center">
            <Text size="small" weight="semibold">Import в РФ</Text><Score value={market.importScore} />
            <Text size="small" weight="semibold">Export из РФ</Text><Score value={market.exportScore} />
            <Text size="small" tone="tertiary">Confidence: {market.confidence}</Text>
          </Row>
          <Text size="small" tone="tertiary">
            Источники: {market.sourceIds.map((id, i) => {
              const s = sources.find((x) => x.id === id)!;
              return <span key={id}>{i > 0 ? " · " : ""}<Link href={s.url}>{id}</Link></span>;
            })}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function GlobalB2BSMBMarkets() {
  const theme = useHostTheme();
  const [view, setView] = useCanvasState("market-view", "overview");
  const [focus, setFocus] = useCanvasState("market-focus", "all");
  const visible = focus === "all" ? markets : markets.filter((m) => m.tag === focus);
  const tags = ["all", "finance ops", "compliance", "commerce", "automation", "vertical SaaS", "embedded finance", "payments", "spend", "growth"];

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1500, margin: "0 auto", background: theme.bg.editor }}>
      <Stack gap={8}>
        <Text size="small" tone="tertiary">INVESTMENT MAP · июль 2026 · данные 2024/2025</Text>
        <H1>Global B2B SMB, commerce & financial operations</H1>
        <Text tone="secondary" style={{ maxWidth: 980 }}>
          12 узких рынков для российского независимого стартапа. Все размеры — annual vendor/platform revenue,
          если явно не указано иное. GMV, TPV и procurement volume не смешиваются с net revenue.
        </Text>
      </Stack>

      <Callout tone="warning" title="Как читать цифры">
        Диапазоны отражают разный scope исследовательских отчётов. «Model/proxy» — авторская оценка на базе региональной
        доли, раскрытий компаний или соседнего рынка; это не опубликованный market size. Для пересчёта РФ использован
        ориентир 92 RUB/USD за 2024 год. TAM/SAM — decision model, не fundraising claim.
      </Callout>

      <Row gap={8} wrap>
        {["overview", "markets", "moves", "sources"].map((tab) => (
          <div key={tab}>
            <Pill active={view === tab} onClick={() => setView(tab)}>
              {tab === "overview" ? "Обзор" : tab === "markets" ? "12 рынков" : tab === "moves" ? "Импорт / экспорт" : "Источники"}
            </Pill>
          </div>
        ))}
      </Row>

      {view === "overview" && (
        <Stack gap={24}>
          <Grid columns={4} gap={16}>
            <Stat value="12" label="узких рынков" />
            <Stat value="3 + selective" label="обязательных региона" />
            <Stat value="6" label="wedge с оценкой 5/5" tone="success" />
            <Stat value="0" label="GMV/TPV в revenue" tone="success" />
          </Grid>

          <Grid columns="1.3fr 1fr" gap={24}>
            <Stack gap={8}>
              <H2>Карта привлекательности</H2>
              <Text size="small" tone="secondary">Ось: сумма import + export score; +1 за CAGR ≥15%. Не заменяет due diligence.</Text>
              <BarChart
                categories={priority.map((m) => m.short)}
                series={[{ name: "Opportunity score", data: priority.map((m) => m.combined), tone: "info" }]}
                horizontal
                height={430}
                yMax={11}
                valueSuffix="/11"
                showValues
              />
              <Text size="small" tone="tertiary">Источник: аналитическая scoring model по данным и барьерам в этом canvas · 2024/2025.</Text>
            </Stack>
            <Stack gap={12}>
              <H2>Лучшие ставки</H2>
              {[
                ["1", "Marketplace seller action OS", "Export 5/5 · import 5/5", "Начать с true margin + stock + ads; KZ/UZ как полигон, затем MENA/SEA."],
                ["2", "Self-hosted AI automation", "Export 5/5 · CAGR 30%", "Clean IP + нейтральная структура; regulated workflows вместо ещё одного Zapier."],
                ["3", "AR collections & matching", "Import 5/5 · revenue market $7.2B", "В РФ banking UX сильный, но invoice-to-cash между системами остаётся ручным."],
                ["4", "Vertical field-service OS", "Import 5/5 · proven abroad", "Одна профессия, один workflow, 20 design partners; fintech после retention."],
                ["5", "Vendor KYB + obligations", "Import 5/5 · recurring compliance", "Не data lookup, а evidence workflow внутри закупок и договоров."],
              ].map(([n, title, meta, body]) => (
                <div key={n} style={{ padding: "10px 0", borderBottom: `1px solid ${theme.stroke.tertiary}` }}>
                  <Row gap={10} align="start">
                    <div style={{ color: theme.accent.primary, fontWeight: 700, minWidth: 18 }}>{n}</div>
                    <Stack gap={3}>
                      <Text weight="semibold">{title}</Text>
                      <Text size="small" tone="tertiary">{meta}</Text>
                      <Text size="small">{body}</Text>
                    </Stack>
                  </Row>
                </div>
              ))}
            </Stack>
          </Grid>

          <H2>Сводная матрица</H2>
          <Table
            headers={["Рынок", "Current revenue", "TAM base", "SAM model", "CAGR", "Import", "Export", "Confidence"]}
            rows={priority.map((m) => [
              m.name,
              m.current,
              `$${m.tam}B`,
              `$${m.sam}B`,
              `${m.cagr}%`,
              `${m.importScore}/5`,
              `${m.exportScore}/5`,
              m.confidence,
            ])}
            columnAlign={["left", "right", "right", "right", "right", "center", "center", "left"]}
            striped
            stickyHeader
          />
        </Stack>
      )}

      {view === "markets" && (
        <Stack gap={16}>
          <Stack gap={8}>
            <H2>Рынки: региональные сравнения и wedges</H2>
            <Row gap={6} wrap>
              {tags.map((tag) => (
                <div key={tag}>
                  <Pill size="sm" active={focus === tag} onClick={() => setFocus(tag)}>
                    {tag === "all" ? "Все" : tag}
                  </Pill>
                </div>
              ))}
            </Row>
          </Stack>
          {visible.map((market) => <div key={market.id}><MarketDetail market={market} /></div>)}
        </Stack>
      )}

      {view === "moves" && (
        <Stack gap={26}>
          <Stack gap={8}>
            <H2>Доказано за рубежом, слабо реализовано в РФ</H2>
            <Text tone="secondary">Приоритет — не копировать suite, а импортировать validated workflow и локализовать data/rails.</Text>
            <Table
              headers={["Идея", "Proof abroad", "Почему gap в РФ", "Score", "Первый wedge"]}
              rows={provenAbroad.map((x) => [x.idea, x.proof, x.russia, x.score, x.first])}
              rowTone={["success", "success", "success", "success", "info"]}
              striped
            />
          </Stack>

          <Stack gap={8}>
            <H2>Что реалистично экспортировать из российской компетенции</H2>
            <Text tone="secondary">Экспортный актив — product/engineering know-how. Российское юрлицо, data plane и IP chain могут быть стоп-фактором.</Text>
            <Table
              headers={["Продукт / competence", "Почему есть edge", "Целевые рынки", "Score", "Условие успеха"]}
              rows={exportable.map((x) => [x.idea, x.why, x.targets, x.score, x.condition])}
              rowTone={["success", "success", "info", "info", "neutral"]}
              striped
            />
          </Stack>

          <Grid columns={2} gap={20}>
            <Stack gap={8}>
              <H3>Go-to-market, который снижает country risk</H3>
              <Text size="small">1. Начинать с non-regulated software layer и не держать деньги.</Text>
              <Text size="small">2. Нейтральная юрисдикция, локальный cloud и документированный clean-room IP transfer.</Text>
              <Text size="small">3. Channel wedge: accountants, ecommerce agencies, banks/PSP, vertical associations.</Text>
              <Text size="small">4. Первые рынки: Казахстан/Узбекистан для connector learning; UAE/KSA или LatAm — только с local partner.</Text>
            </Stack>
            <Callout tone="danger" title="No-go без сильного партнёра">
              Banking-as-a-Service, acquiring, custody, санкционный/KYB data provider, country tax filing system-of-record
              и full procurement suite. Здесь лицензии, доверие и distribution важнее скорости разработки.
            </Callout>
          </Grid>
        </Stack>
      )}

      {view === "sources" && (
        <Stack gap={18}>
          <H2>Источники и provenance</H2>
          <Text tone="secondary">
            Приоритет отдан annual reports/SEC и первичным market pages. Частные vendor revenues и СНГ часто не раскрыты:
            такие значения помечены proxy/model. Дата среза — июль 2026, финансовые годы 2024/2025.
          </Text>
          <Grid columns={2} gap={10}>
            {sources.map((source) => (
              <div key={source.id} style={{ padding: "8px 0", borderBottom: `1px solid ${theme.stroke.tertiary}` }}>
                <Row gap={10} align="start">
                  <span style={{ color: theme.accent.primary, fontWeight: 700, minWidth: 26 }}>{source.id}</span>
                  <Link href={source.url}>{source.title}</Link>
                </Row>
              </div>
            ))}
          </Grid>
          <Divider />
          <H3>Ограничения исследования</H3>
          <Text size="small">
            Commercial market reports используют несовместимые определения: software-only vs software+services, AP-only vs AP/AR,
            tax management с consumer filing vs B2B indirect tax. Поэтому headline TAM не суммируются между строками.
            Доли лидеров приведены только там, где есть reasonably attributable source; revenue многопродуктовых компаний не считается долей узкого рынка.
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
