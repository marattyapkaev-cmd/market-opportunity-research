import {
  Button,
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
  Select,
  Stack,
  Stat,
  Table,
  Text,
  TextInput,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Confidence = "Высокая" | "Средняя" | "Низкая";
type Evidence = "reported" | "estimate" | "proxy";
type Strategy = "Import → РФ" | "Export → world" | "Обе";
type RegionName = "США" | "Европа" | "СНГ" | "MENA" | "LatAm" | "India" | "SEA";

type RegionView = {
  name: RegionName;
  revenue: string;
  evidence: Evidence;
  stage: string;
  whitespace: string;
  barriers: string;
};

type Market = {
  id: string;
  name: string;
  category: string;
  current: number;
  currentLabel: string;
  evidence: Evidence;
  tam: number;
  sam: number;
  cagr: number;
  stage: string;
  leaders: string;
  whitespace: string;
  wedge: string;
  barriers: string;
  importScore: number;
  exportScore: number;
  confidence: Confidence;
  strategy: Strategy;
  regions: RegionView[];
  sourceIds: string[];
};

type MarketRu = {
  name: string;
  essence: string;
  stage: string;
  whitespace: string;
  wedge: string;
  barriers: string;
};

const sources: Record<string, { label: string; url: string; note: string }> = {
  crm: { label: "Metrigy — CRM 2025", url: "https://www.metrigy.com/product/crm-quarterly-market-share-forecast-report-2025-4q25/", note: "$83B; Salesforce 25.8%." },
  hr: { label: "Fortune BI — HR software", url: "https://www.fortunebusinessinsights.com/hr-software-market-116228", note: "$23.32B; regional shares." },
  work: { label: "Insight Partners — project software", url: "https://www.theinsightpartners.com/reports/project-management-software-market", note: "$10.03B; 9.26% CAGR." },
  itsm: { label: "Fortune BI — ITSM", url: "https://www.fortunebusinessinsights.com/itsm-market-109485", note: "$13.58B; 15.3% CAGR." },
  cyber: { label: "DataIntelo — cyber software tools", url: "https://dataintelo.com/report/cyber-security-software-tool-market", note: "$42.8B software-tool proxy." },
  bi: { label: "Grand View — BI software", url: "https://www.grandviewresearch.com/industry-analysis/business-intelligence-software-market", note: "$40.1B; NA 37%." },
  finops: { label: "Mordor — Cloud FinOps", url: "https://www.mordorintelligence.com/industry-reports/cloud-finops-market", note: "$14.39B software + services." },
  genai: { label: "Grand View — enterprise GenAI", url: "https://www.grandviewresearch.com/industry-analysis/enterprise-generative-ai-market-report", note: "$2.94B 2024; 38.4% CAGR." },
  clm: { label: "MRFR — CLM", url: "https://www.marketresearchfuture.com/reports/contract-lifecycle-management-software-market-11659", note: "$1.78B narrow CLM." },
  kyb: { label: "Congruence — KYB software", url: "https://www.congruencemarketinsights.com/report/know-your-business-compliance-software-market", note: "$0.23B KYB estimate." },
  support: { label: "MRFR — help desk software", url: "https://www.marketresearchfuture.com/reports/help-desk-software-market-31814", note: "$12.02B; NA 45%." },
  search: { label: "Precedence — enterprise search", url: "https://www.precedenceresearch.com/enterprise-search-market", note: "$5.34B; NA $2.08B." },
  accounting: { label: "Grand View — NA accounting", url: "https://www.grandviewresearch.com/horizon/outlook/accounting-software-market/north-america", note: "NA $7.51B 2024." },
  tax: { label: "Billentis/Comarch — e-invoicing", url: "https://www.comarch.com/files-com/file_829/Billentis-Comarch-The-global-e-invoicing-and-tax-compliance-report.pdf", note: "Mandates and category scope." },
  apar: { label: "OMR — North America AP automation", url: "https://www.omrglobal.com/press-release/north-american-account-payable-automation-market-size", note: "NA narrow AP $1.47B." },
  bill: { label: "BILL FY25 results", url: "https://investor.bill.com/news/news-details/2025/BILL-Reports-Fourth-Quarter-and-Fiscal-Year-2025-Financial-Results-and-Announces-300-Million-Share-Repurchase-Program/default.aspx", note: "$1.463B vendor revenue." },
  orchestration: { label: "Mordor — payment orchestration", url: "https://www.mordorintelligence.com/industry-reports/payment-orchestration-platform-market", note: "$1.5B platform revenue." },
  procurement: { label: "Polaris — procurement software", url: "https://www.polarismarketresearch.com/industry-analysis/procurement-software-market", note: "$9.5B; NA 40.2%." },
  banking: { label: "Adyen/BCG — embedded finance", url: "https://www.adyen.com/press-and-media/bcg-embedded-finance-2024", note: "Captured revenue pool; not software TAM." },
  commerce: { label: "Credence — ecommerce platforms", url: "https://www.credenceresearch.com/report/ecommerce-software-and-platform-market", note: "$24.45B platform revenue." },
  seller: { label: "MarketIntelo — seller analytics", url: "https://marketintelo.com/report/seller-analytics-platform-market", note: "$3.2B broad / $2.19B software." },
  marketing: { label: "MRFR — marketing automation", url: "https://www.marketresearchfuture.com/reports/marketing-automation-software-market-4927", note: "$5.6B software." },
  nocode: { label: "Grand View — no-code AI", url: "https://www.grandviewresearch.com/industry-analysis/no-code-ai-platform-market-report", note: "$4.28B; 30.2% CAGR." },
  ehr: { label: "Grand View — US EHR", url: "https://www.grandviewresearch.com/industry-analysis/us-electronic-health-records-market-report", note: "US EHR $12.87B 2024." },
  dental: { label: "Fortune BI — dental PMS", url: "https://www.fortunebusinessinsights.com/dental-practice-management-software-market-106841", note: "Dental PMS global/regional triangulation." },
  construction: { label: "Apps Run The World — construction software", url: "https://www.appsruntheworld.com/top-10-construction-software-vendors-market-size-and-market-forecast/", note: "$14.7B; top-10 46.5%." },
  property: { label: "Global Market Monitor — property management", url: "https://www.globalmarketmonitor.com/report_blog/1861821.html", note: "$3.895B; top-3 45.1%." },
  fleet: { label: "Berg Insight — fleet systems", url: "https://media.berginsight.com/2024/12/03204201/bi-fmam14-ps.pdf", note: "Installed base and vendor concentration." },
  lastmile: { label: "Growth Market Reports — last-mile software", url: "https://growthmarketreports.com/report/last-mile-delivery-software-market", note: "Europe $620M 2024." },
  hotel: { label: "Mordor — hotel PMS", url: "https://www.mordorintelligence.com/industry-reports/hospitality-property-management-software-market", note: "Top-5 ≈45%." },
  restaurant: { label: "Houlihan Lokey — restaurant software", url: "https://cdn.hl.com/pdf/2024/restaurant-technology-market-update-hl-2024.pdf", note: "Global software ≈$6.6B." },
  fsm: { label: "Verdantix — FSM software", url: "https://www.verdantix.com/venture/report/market-size-and-forecast--field-service-management-software-2024-2030-global", note: "$4.7B; NA 40%." },
  mes: { label: "MarketsandMarkets — Europe MES", url: "https://www.marketsandmarkets.com/Market-Reports/europe-manufacturing-execution-system-mes-market-258685760.html", note: "Europe $3.56B." },
  farm: { label: "MarketsandMarkets — farm software", url: "https://www.marketsandmarkets.com/Market-Reports/farm-management-software-market-217016636.html", note: "$3.4B 2024." },
  legal: { label: "ResearchAndMarkets — legal practice management", url: "https://www.globenewswire.com/news-release/2024/06/25/2903904/28124/en/Legal-Practice-Management-Software-LPMS-Market-Report-2024-2030-Growing-Usage-of-Legal-Billing-Software-Across-Solo-Practitioners-and-Small-to-Mid-Size-Firms.html", note: "$2.06B 2024." },
  ruSaas: { label: "TAdviser — Russia SaaS", url: "https://tadviser.com/index.php/Article:SaaS_(Russian_market)", note: "₽200.9B 2024; basis for RU proxies." },
  euAi: { label: "European Commission — AI Act", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", note: "EU AI risk obligations." },
  gdpr: { label: "European Commission — GDPR", url: "https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en", note: "EU data baseline." },
};

const R = (
  name: RegionName,
  revenue: string,
  evidence: Evidence,
  stage: string,
  whitespace: string,
  barriers: string,
): RegionView => ({ name, revenue, evidence, stage, whitespace, barriers });

const markets: Market[] = [
  {
    id: "crm", name: "CRM & sales execution", category: "Horizontal", current: 83, currentLabel: "$83B reported, 2025", evidence: "reported", tam: 83, sam: 2.2, cagr: 1.6, stage: "Зрелый / консолидация",
    leaders: "Salesforce 25.8% (≈$21.4B category revenue); Microsoft, Adobe, Oracle; HubSpot fastest among scaled challengers.",
    whitespace: "Generic CRM занята; локальные каналы, data residency, прогнозирование и миграция без SI остаются плохо закрыты.",
    wedge: "Compliance-first sales cockpit поверх существующей CRM: локальная телефония/messengers, meeting evidence и explainable forecast.",
    barriers: "Incumbent bundling, SOC 2/GDPR/152-ФЗ, channel integrations, high CAC.",
    importScore: 4, exportScore: 2, confidence: "Высокая", strategy: "Import → РФ",
    regions: [R("США", "$32.7B report", "reported", "Насыщен", "Micro-vertical field/service sales", "SOC 2; Salesforce/Microsoft lock-in"), R("Европа", "$19.5B report", "reported", "DACH fragmented", "Sovereign CRM overlay", "GDPR; residency; languages"), R("СНГ", "≈$0.53B report РФ", "reported", "+25%, local leaders", "AI QA/forecast layer", "152-ФЗ; Bitrix24/amoCRM")], sourceIds: ["crm"],
  },
  {
    id: "hr", name: "Recruiting & talent operations", category: "Horizontal", current: 23.3, currentLabel: "$23.3B reported, 2025", evidence: "reported", tam: 23.3, sam: 3.0, cagr: 12.4, stage: "Scale / suite bundling",
    leaders: "SAP ≈14%, Workday ≈11% broad HR software; UKG, Oracle, ADP strong in suites.",
    whitespace: "Hiring evidence, consent and local job-board/messenger workflows remain outside the core HCM record.",
    wedge: "Auditable interview operations: structured evidence, consent, skills extraction, no black-box ranking; Workday/1C/job-board connectors.",
    barriers: "EU AI Act high-risk rules, EEOC/AEDT audits, labor law, sensitive personal data.",
    importScore: 5, exportScore: 3, confidence: "Средняя", strategy: "Import → РФ",
    regions: [R("США", "≈$8.9B derived", "estimate", "Mature; AI reset", "Non-ranking interview evidence", "EEOC; local AI audits"), R("Европа", "≈$6.3B derived", "estimate", "Regulated growth", "EU-hosted hiring copilot", "AI Act; GDPR; works councils"), R("СНГ", "≈$0.23B proxy РФ", "proxy", "Fragmented", "Mass hiring + Telegram + 1C", "152-ФЗ; local labor forms"), R("India", "Not isolated", "proxy", "High-volume growth", "Per-completed-hire QA", "Low ARPU; DPDP; languages")], sourceIds: ["hr", "euAi"],
  },
  {
    id: "work", name: "Project & work management", category: "Horizontal", current: 10, currentLabel: "$10.0B reported, 2025", evidence: "reported", tam: 10, sam: 1.3, cagr: 9.3, stage: "Зрелый / AI rebundling",
    leaders: "Microsoft, Atlassian, Monday, Asana, Smartsheet, ClickUp; suite distribution dominates.",
    whitespace: "Gap между commodity task boards и heavyweight PPM: capacity, margin and evidence for client delivery.",
    wedge: "Delivery cockpit for agencies/engineering consultancies: plan-vs-actual from Git/docs, capacity and margin risk.",
    barriers: "Microsoft/Atlassian bundling, SSO/audit expectations, low switching appetite.",
    importScore: 3, exportScore: 3, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "≈$3.6B derived", "estimate", "Near saturation", "Vertical PPM overlay", "Bundling; CAC"), R("Европа", "≈$2.8B proxy", "proxy", "DACH industrial demand", "Regulated delivery evidence", "GDPR; German support"), R("СНГ", "≈$0.10–0.18B proxy", "proxy", "Import substitution", "Services margin layer", "Low ARPU; on-prem")], sourceIds: ["work"],
  },
  {
    id: "itsm", name: "Mid-market ITSM / ESM", category: "IT & data", current: 13.6, currentLabel: "$13.6B reported, 2025", evidence: "reported", tam: 13.6, sam: 1.8, cagr: 15.3, stage: "Scale / platform expansion",
    leaders: "ServiceNow, BMC, Atlassian, Ivanti, Freshworks, ManageEngine; ServiceNow total revenue is broader than ITSM.",
    whitespace: "ServiceNow is too heavy for mid-market; simpler tools lack migration automation, reliable CMDB and non-IT workflows.",
    wedge: "Deploy-in-a-week sovereign ESM: asset discovery, generated catalog, evidence-ready approvals and private AI triage.",
    barriers: "ITIL procurement, NIS2, on-prem/private cloud, deep connectors and incumbent ecosystem.",
    importScore: 5, exportScore: 4, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "≈$5.9B derived", "estimate", "Mature expansion", "Predictable mid-market deployment", "ServiceNow ecosystem"), R("Европа", "≈$3.7B proxy", "proxy", "Hybrid persists", "Sovereign ESM", "NIS2; GDPR; residency"), R("СНГ", "$0.11–0.38B report range", "reported", "15–20% growth", "Legacy migration + ESM", "On-prem; Russian stack"), R("MENA", "Not isolated", "proxy", "Government-led", "Arabic sovereign ESM", "Partner sales; hosting")], sourceIds: ["itsm"],
  },
  {
    id: "cyber", name: "Cloud security posture & evidence", category: "IT & data", current: 42.8, currentLabel: "$42.8B software-tools proxy", evidence: "proxy", tam: 42.8, sam: 1.6, cagr: 11.8, stage: "Growth / consolidation",
    leaders: "Palo Alto, Microsoft, CrowdStrike, Wiz, Check Point, Fortinet; company revenues span multiple categories.",
    whitespace: "SMB tools stop at alerts; local clouds, sovereignty and remediation ownership fragment the market.",
    wedge: "Autofix-ready compliance graph for 50–2,000 employees, safe IaC pull requests and MSP distribution.",
    barriers: "Security trust, liability, SOC 2, certifications, local cloud APIs, sanctions/export controls.",
    importScore: 4, exportScore: 5, confidence: "Средняя", strategy: "Export → world",
    regions: [R("США", "≈$16–18B derived", "estimate", "Crowded", "MSP-led remediation", "Trust; platform consolidation"), R("Европа", "≈$11.8B derived", "estimate", "NIS2 tailwind", "EU evidence automation", "NIS2; CRA; residency"), R("СНГ", "Cloud slice ≈$54M report 2023", "reported", "Fast growth", "Local-cloud CSPM", "FSTEC/FSS; trust"), R("MENA", "Not isolated", "proxy", "Sovereign cloud growth", "Regional MSSP channel", "Residency; procurement")], sourceIds: ["cyber"],
  },
  {
    id: "bi", name: "Embedded BI & governed metrics", category: "IT & data", current: 40.1, currentLabel: "$40.1B reported, 2025", evidence: "reported", tam: 40.1, sam: 1.5, cagr: 9.3, stage: "Mature / GenAI transition",
    leaders: "Microsoft Power BI, Tableau, Qlik, SAP, Looker; suites own distribution.",
    whitespace: "Dashboard authoring is commodity; governed metrics, tenant permissions and explainable customer-facing analytics are not.",
    wedge: "Headless metric layer + conversational embedded analytics priced per tenant, with on-prem/EU hosting.",
    barriers: "Power BI price anchor, connector depth, permissions correctness, data lineage.",
    importScore: 4, exportScore: 4, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "$14.8B derived", "estimate", "Mature", "Tenant-priced embedding", "Microsoft bundling"), R("Европа", "$9.5–11B report range", "reported", "Sovereign demand", "Multilingual governed metrics", "GDPR; residency"), R("СНГ", "≈$0.18–0.35B proxy", "proxy", "Migration demand", "Russian data-stack BI", "On-prem; low ARPU")], sourceIds: ["bi"],
  },
  {
    id: "finops", name: "FinOps for AI & Kubernetes", category: "IT & data", current: 14.4, currentLabel: "$14.4B software+services report", evidence: "reported", tam: 14.4, sam: 1.0, cagr: 9.6, stage: "Growth / platform formation",
    leaders: "IBM Apptio/Cloudability, Broadcom CloudHealth, Flexera/Spot, Harness, CloudZero; hyperscalers bundle native tools.",
    whitespace: "AI token/GPU unit economics and local-cloud billing remain immature; enterprise suites are reporting-heavy.",
    wedge: "Cost per customer/workflow, GPU/token commitments, anomaly guardrails and chargeback across cloud, K8s and AI vendors.",
    barriers: "Billing-data trust, fast-changing APIs, native tools, enterprise connectors.",
    importScore: 4, exportScore: 5, confidence: "Средняя", strategy: "Export → world",
    regions: [R("США", "$5.4B derived", "estimate", "AI reopens market", "AI unit economics", "Native cloud tools"), R("Европа", "≈$3.4–4.0B proxy", "proxy", "GreenOps/sovereignty", "Cost + carbon policies", "Cloud contracts; reporting"), R("СНГ", "$30–80M proxy", "proxy", "Early", "Regional-cloud allocation", "Nonstandard billing APIs"), R("MENA", "Not isolated", "proxy", "Enterprise cloud programs", "Managed FinOps cockpit", "Partner-led procurement")], sourceIds: ["finops"],
  },
  {
    id: "genai", name: "Enterprise agent governance", category: "AI & automation", current: 4.1, currentLabel: "≈$4.1B derived, 2025", evidence: "estimate", tam: 4.1, sam: 1.2, cagr: 38.4, stage: "Emerging / hypergrowth",
    leaders: "Microsoft, Google, AWS, OpenAI, Anthropic, Salesforce, ServiceNow; shares are not reliably disclosed.",
    whitespace: "Cross-vendor permissions, evals, action controls, replay and cost attribution are weak while models commoditize.",
    wedge: "Vendor-neutral agent control plane: policy-as-code, evals, approvals, replay and cost per successful task.",
    barriers: "Rapid obsolescence, model bundling, AI Act, enterprise trust and liability.",
    importScore: 5, exportScore: 5, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "≈$1.67B derived", "estimate", "Hypergrowth", "Cross-vendor reliability", "Platform bundling"), R("Европа", "≈$0.9–1.1B proxy", "proxy", "Regulated growth", "EU-hosted control plane", "AI Act; GDPR"), R("СНГ", "≈$0.10–0.25B proxy", "proxy", "Fast pilots", "Private local-model governance", "Compute; localization"), R("MENA", "Not isolated", "proxy", "Sovereign AI", "Arabic eval layer", "Residency; procurement")], sourceIds: ["genai", "euAi"],
  },
  {
    id: "clm", name: "Contract obligations & vendor KYB", category: "Finance & compliance", current: 2.0, currentLabel: "≈$2.0B CLM+KYB normalized", evidence: "estimate", tam: 2.0, sam: 0.75, cagr: 12.8, stage: "Growth / AI expansion",
    leaders: "Icertis, Ironclad, Conga, Sirion, Agiloft; DocuSign total revenue is mostly e-sign, not CLM; Middesk and D&B in KYB.",
    whitespace: "Enterprise CLM is implementation-heavy; SMB e-sign ends at signature, while obligations and vendor evidence remain manual.",
    wedge: "Vendor passport + post-sign autopilot: UBO/sanctions evidence, owners, renewals, SLA/pricing sync to CRM/ERP.",
    barriers: "Legal liability, registry costs, eIDAS/63-ФЗ, local contract language, false positives.",
    importScore: 5, exportScore: 4, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "≈$0.9B derived", "estimate", "CLM mature", "Mid-market obligations/KYB", "State law; trust"), R("Европа", "≈$0.9B report", "reported", "eIDAS-driven", "Multi-registry evidence", "eIDAS; GDPR; DORA"), R("СНГ", "$0.10–0.20B proxy", "proxy", "EDO strong, intelligence weak", "Диадок/СБИС/1C layer", "63-ФЗ; registry access")], sourceIds: ["clm", "kyb"],
  },
  {
    id: "support", name: "Customer support automation", category: "Horizontal", current: 12, currentLabel: "$12.0B reported, 2025", evidence: "reported", tam: 12, sam: 1.4, cagr: 7, stage: "Mature core / AI disruption",
    leaders: "Zendesk, Salesforce, ServiceNow, Intercom, Freshworks, Zoho; AI resolution shares are unclear.",
    whitespace: "Safe action-taking, transparent QA and long-tail languages lag ticketing incumbents.",
    wedge: "Resolution QA + deterministic action agent for regulated support, with multilingual evals and per-resolution audit.",
    barriers: "Accuracy liability, HIPAA/PCI/GDPR, channel APIs, incumbent outcome pricing.",
    importScore: 4, exportScore: 4, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$5.4B derived", "estimate", "Outcome pricing", "Vertical action agents", "Incumbent distribution"), R("Европа", "≈$3.0–3.5B proxy", "proxy", "Multilingual", "EU-hosted QA", "GDPR; recording consent"), R("СНГ", "$0.12–0.25B proxy", "proxy", "Voice/messenger-heavy", "Russian QA layer", "152-ФЗ; speech quality"), R("LatAm", "Not isolated", "proxy", "BPO scale", "WhatsApp agent assist", "Low price; language variants")], sourceIds: ["support"],
  },
  {
    id: "search", name: "Enterprise search reliability", category: "AI & automation", current: 5.34, currentLabel: "$5.34B reported, 2025", evidence: "reported", tam: 5.34, sam: 1.1, cagr: 9.1, stage: "Growth / GenAI reset",
    leaders: "Microsoft, Google, Elastic, OpenText, Coveo, Sinequa, Lucidworks; Glean valuation is not revenue.",
    whitespace: "Permissions drift, provenance, stale knowledge, non-English corpora and on-prem silos remain hard.",
    wedge: "Reliability layer over Copilot/Glean/RAG: permission diff, stale-answer detection, citation evals and owner workflows.",
    barriers: "Connector breadth, access-control correctness, residency and on-prem archives.",
    importScore: 5, exportScore: 5, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "$2.08B reported", "reported", "Fast GenAI adoption", "Independent answer QA", "Microsoft/Glean pressure"), R("Европа", "$1.4–1.6B proxy", "proxy", "Sovereign demand", "Multilingual reliability", "GDPR; works councils"), R("СНГ", "$50–120M proxy", "proxy", "Private RAG demand", "1C/Directum permissions", "Air-gap; morphology"), R("MENA", "Not isolated", "proxy", "Arabic gap", "Arabic provenance", "OCR; residency")], sourceIds: ["search"],
  },
  {
    id: "accounting", name: "SMB accounting workflow automation", category: "Finance & compliance", current: 23.5, currentLabel: "$18–24B report range", evidence: "reported", tam: 23.5, sam: 2.4, cagr: 9.3, stage: "Mature / cloud migration",
    leaders: "Intuit $16.2B total FY25, Sage £2.51B, Xero ≈$1.23B; totals are broader than the narrow workflow.",
    whitespace: "Ledger is local and entrenched; exception handling, close and cross-system evidence are still manual.",
    wedge: "AI-close assistant for accounting firms: document collection, bank reconciliation, exceptions and explainable audit trail.",
    barriers: "Tax/chart-of-accounts localization, bank feeds, system-of-record trust, sanctions/payments.",
    importScore: 3, exportScore: 2, confidence: "Высокая", strategy: "Import → РФ",
    regions: [R("США", "$7.51B reported 2024", "reported", "QuickBooks-centric", "Micro-SMB close automation", "Bank feeds; trust"), R("Европа", "$4.4–6.6B estimate", "estimate", "Country-fragmented", "VAT/e-invoice overlay", "Country tax; DATEV/Sage"), R("СНГ", "$0.55–0.75B proxy", "proxy", "Mature core", "Cash view across 1C/banks", "1C; fiscal rules"), R("MENA", "Not isolated", "proxy", "VAT digitization", "Mobile accounting layer", "Arabic; tax mandates")], sourceIds: ["accounting", "ruSaas"],
  },
  {
    id: "tax", name: "Indirect tax & e-invoice compliance", category: "Finance & compliance", current: 9.1, currentLabel: "$8.9–12.7B report range", evidence: "reported", tam: 9.1, sam: 1.8, cagr: 17.1, stage: "Regulatory hypergrowth",
    leaders: "Avalara, Vertex ($667M FY24), Sovos, Pagero/Thomson Reuters, Basware, EDICOM.",
    whitespace: "Mandates create spend but schemas and accreditations fragment each country; SMB ERP connectors lag.",
    wedge: "Country-pack API for Peppol/ViDA, UAE PINT-AE and KSA ZATCA: validation, schema diff, sandbox and evidence archive.",
    barriers: "Accreditation, local presence, liability, changing schemas, residency and sanctions compliance.",
    importScore: 4, exportScore: 3, confidence: "Средняя", strategy: "Import → РФ",
    regions: [R("США", "$3.2B e-invoice 2024", "reported", "Tax mature; e-invoice early", "Sales-tax/AP evidence", "State-by-state rules"), R("Европа", "$1.9–2.5B report", "reported", "ViDA acceleration", "One API for mandates", "Accreditations; languages"), R("СНГ", "$0.45–0.65B proxy", "proxy", "EDO saturated РФ", "EAEU cross-border docs", "Local operators"), R("MENA", "Not isolated", "proxy", "Mandate-created", "KSA+UAE pack", "ZATCA/PINT; local entity"), R("India", "Not isolated", "proxy", "GST mature", "ERP validation API", "ASP/GSP ecosystem")], sourceIds: ["tax"],
  },
  {
    id: "apar", name: "AP/AR automation", category: "Finance & compliance", current: 7.2, currentLabel: "$5.5–7.2B report range", evidence: "reported", tam: 7.2, sam: 1.6, cagr: 11.3, stage: "Scale / consolidation",
    leaders: "BILL $1.463B FY25; AvidXchange, Tipalti, HighRadius, Basware, Medius, Esker.",
    whitespace: "Russian payments are convenient, but collections, remittance matching and supplier onboarding are fragmented.",
    wedge: "AR copilot: promises-to-pay from email/messengers, bank matching and local dunning playbooks.",
    barriers: "Bank/ERP access, fraud liability, two-sided networks and integration-heavy onboarding.",
    importScore: 5, exportScore: 3, confidence: "Средняя", strategy: "Import → РФ",
    regions: [R("США", "$1.47B narrow AP report", "reported", "Scaled", "Service-SMB AR", "BILL/Ramp distribution"), R("Европа", "$0.78B narrow AP report", "reported", "E-invoice tailwind", "Cross-border AR", "VAT; banking APIs"), R("СНГ", "$0.15–0.25B proxy", "proxy", "Payments strong", "Collections/matching", "1C; bank connectors")], sourceIds: ["apar", "bill"],
  },
  {
    id: "orchestration", name: "Payment orchestration", category: "Commerce & fintech", current: 1.5, currentLabel: "$1.5B reported, 2024/25", evidence: "reported", tam: 1.5, sam: 0.48, cagr: 24.5, stage: "Fast growth / medium concentration",
    leaders: "Spreedly, Primer, Gr4vy, IXOPAY, CellPoint, APEXX; Stripe/Adyen/Checkout compete by bundling.",
    whitespace: "Multi-PSP merchants need portability, retries, reconciliation and measurable authorization lift.",
    wedge: "Merchant-side routing control plane that never holds funds: rules, failover, token portability and uplift tests.",
    barriers: "PCI DSS, network tokens, PSP bundling, enterprise sales and local payment methods.",
    importScore: 3, exportScore: 3, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$0.50–0.55B model", "proxy", "Largest", "Mid-market observability", "Stripe/Cybersource"), R("Европа", "$0.40–0.45B model", "proxy", "Fragmented PSP/APM", "Subscription routing", "PSD/SCA"), R("СНГ", "$0.04–0.07B model", "proxy", "Domestic strong", "CIS/MENA routing", "Cross-border sanctions"), R("LatAm", "Not isolated", "proxy", "Fast growth", "Local APM control", "Country methods")], sourceIds: ["orchestration"],
  },
  {
    id: "procurement", name: "Lightweight procurement & supplier ops", category: "Finance & compliance", current: 9.5, currentLabel: "$9.5B reported, 2025", evidence: "reported", tam: 9.5, sam: 1.25, cagr: 9.9, stage: "Enterprise mature / SMB growth",
    leaders: "SAP Ariba ≈8–11%, Coupa ≈7–10%, Oracle, Jaggaer, GEP, Ivalua, Basware.",
    whitespace: "50–500 employee firms are too small for S2P suites; supplier evidence and intake stay in email.",
    wedge: "Email/Teams intake → policy → quotes → PO → invoice match, without supplier-network migration.",
    barriers: "ERP integration, change management, supplier cold start, РФ public-procurement rules.",
    importScore: 4, exportScore: 2, confidence: "Высокая", strategy: "Import → РФ",
    regions: [R("США", "$3.82B reported", "reported", "Enterprise mature", "SMB intake controls", "Coupa/Zip"), R("Европа", "$2.73B reported", "reported", "Compliance-heavy", "Supplier ESG/e-invoice", "Country rules"), R("СНГ", "$0.125B automation services", "reported", "ETP mature", "Private SMB procurement", "44-ФЗ/223-ФЗ")], sourceIds: ["procurement"],
  },
  {
    id: "banking", name: "SMB banking workflow enablement", category: "Commerce & fintech", current: 3.2, currentLabel: "≈$3.2B software SAM proxy", evidence: "proxy", tam: 32, sam: 3.2, cagr: 20, stage: "Platform expansion",
    leaders: "Stripe/Adyen, Unit, Treasury Prime; Qonto, Tide, Revolut Business; Точка/Т-Банк are capability benchmarks.",
    whitespace: "Russian digital-bank UX is exportable as white-label workflow, not as a licensed bank or headline $185B revenue pool.",
    wedge: "White-label finance workspace for MENA/SEA banks: roles, approvals, invoice-to-payment, cash forecast and accountant console.",
    barriers: "Licensing/sponsor bank, AML/KYB, core integration, data residency and Russian-origin IP risk.",
    importScore: 3, exportScore: 4, confidence: "Средняя", strategy: "Export → world",
    regions: [R("США", "$20–22B captured pool model", "proxy", "BaaS risk reset", "Workflow over bank core", "Regulatory scrutiny"), R("Европа", "$10–12B captured pool model", "proxy", "Open banking mature", "Multi-entity cash ops", "PSD; licenses"), R("СНГ", "$2.5B broad fintech proxy", "proxy", "Strong UX", "Multi-bank treasury", "Sanctions; payments"), R("MENA", "Not isolated", "proxy", "Banks investing", "White-label accountant UX", "Local sponsor; hosting"), R("SEA", "Not isolated", "proxy", "Uneven bank UX", "Approvals/workflow module", "Country rails")], sourceIds: ["banking"],
  },
  {
    id: "commerce", name: "SMB omnichannel commerce OS", category: "Commerce & fintech", current: 24.5, currentLabel: "$24.45–27.4B report range", evidence: "reported", tam: 24.5, sam: 2.9, cagr: 12.5, stage: "Mature core / ops expansion",
    leaders: "Shopify $11.56B FY25 total; Wix, Adobe Commerce, Woo ecosystem, BigCommerce, Nuvemshop.",
    whitespace: "Storefront is commodity; catalog, true margin, inventory allocation and returns across channels are fragmented.",
    wedge: "Omnichannel profit OS across store + marketplaces: SKU truth, contribution margin, allocation and returns.",
    barriers: "Platform APIs, bundling, payments/logistics localization, SMB churn and agency distribution.",
    importScore: 4, exportScore: 4, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "$6.36B report", "reported", "Mature", "Multi-channel profit control", "Shopify ecosystem"), R("Европа", "$4.21B report", "reported", "Country-fragmented", "VAT/payment ops", "Tax; languages"), R("СНГ", "$0.18–0.25B model", "proxy", "Marketplace-first", "10-system integration layer", "WB/Ozon APIs"), R("LatAm", "Software not isolated", "proxy", "Fast commerce growth", "Payments/logistics layer", "Country operations")], sourceIds: ["commerce"],
  },
  {
    id: "seller", name: "Marketplace seller action OS", category: "Commerce & fintech", current: 2.2, currentLabel: "$2.19B software proxy, 2025", evidence: "proxy", tam: 3.2, sam: 0.72, cagr: 14, stage: "Growth / platform-dependent",
    leaders: "Helium 10, Jungle Scout, Pacvue, Perpetua, Teikametrics; MPStats, Moneyplace, MarketGuru in РФ.",
    whitespace: "Native dashboards compress analytics value; cross-market true margin, cash, replenishment and action automation remain open.",
    wedge: "Profit + stock + ad anomaly agent for 2–4 marketplaces, explaining unit economics and creating actions.",
    barriers: "API retaliation, data licensing, seller churn, connector-by-country and false precision.",
    importScore: 5, exportScore: 5, confidence: "Низкая", strategy: "Обе",
    regions: [R("США", "≈$0.9B model", "proxy", "Amazon-centric", "Sub-$5M seller action layer", "Crowded tools"), R("Европа", "$0.55–0.70B model", "proxy", "Multi-country", "VAT-aware margin", "Pan-EU inventory"), R("СНГ", "$42M actual analytics РФ", "reported", "Growth slowing", "Finance/ads/stock actions", "Native platform pressure"), R("MENA", "Not isolated", "proxy", "Fragmented", "Export Russian ops know-how", "Local APIs"), R("SEA", "Not isolated", "proxy", "Fragmented", "Multi-market seller ops", "Low ARPU")], sourceIds: ["seller"],
  },
  {
    id: "marketing", name: "Lifecycle marketing automation", category: "Commerce & fintech", current: 5.6, currentLabel: "$5.2–5.6B reported", evidence: "reported", tam: 5.6, sam: 1.3, cagr: 10, stage: "Mature / AI rebundling",
    leaders: "HubSpot $2.63B FY24 total, Klaviyo $937.5M FY24, Adobe, Salesforce, Mailchimp, ActiveCampaign.",
    whitespace: "Horizontal email is saturated; vertical first-party workflows with measurable incrementality are not.",
    wedge: "Vertical retention agent using order/booking data, margin-aware offers and holdout-based incrementality.",
    barriers: "Deliverability, privacy/consent, messaging costs, bundling and proof of uplift.",
    importScore: 3, exportScore: 3, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "$2.24B report", "reported", "Very mature", "Vertical PLG", "HubSpot/Klaviyo"), R("Европа", "$1.70B report", "reported", "Privacy-sensitive", "Consent-native automation", "GDPR; channels"), R("СНГ", "$0.38B CRM proxy", "proxy", "CRM stronger than analytics", "Incrementality layer", "Low ARPU")], sourceIds: ["marketing"],
  },
  {
    id: "nocode", name: "Self-hosted AI workflow automation", category: "AI & automation", current: 4.28, currentLabel: "$4.28B reported, 2024", evidence: "reported", tam: 4.28, sam: 0.86, cagr: 30.2, stage: "Hypergrowth / agentic reset",
    leaders: "Zapier ≈$310M estimate, Make, n8n, Workato, Microsoft Power Platform, Airtable.",
    whitespace: "Connector count is not enough; regulated SMB needs self-hosting, approvals, replay and predictable usage economics.",
    wedge: "Visual agent workflows with approvals, audit/replay and private deployment; price without per-task tax.",
    barriers: "n8n/open source, connector burden, hyperscaler bundling, security and support.",
    importScore: 4, exportScore: 5, confidence: "Средняя", strategy: "Export → world",
    regions: [R("США", "$1.69B derived", "estimate", "AI reset", "Governed SMB agents", "Zapier/Microsoft"), R("Европа", "$1.15B model", "proxy", "Sovereignty tailwind", "Self-hosted automation", "AI Act; GDPR"), R("СНГ", "$0.04–0.07B model", "proxy", "Import substitution", "1C/СБИС connectors", "Entity/IP risk"), R("MENA", "Not isolated", "proxy", "Regulated enterprise", "Private bank workflows", "Hosting; partners")], sourceIds: ["nocode", "euAi"],
  },
  {
    id: "clinic", name: "Specialty clinic operations", category: "Vertical SaaS", current: 11, currentLabel: "≈$11B software proxy, 2024", evidence: "proxy", tam: 27, sam: 3.9, cagr: 8, stage: "Mature US/EU; growth CIS",
    leaders: "Epic 42.3% and Oracle 22.9% acute-care; ambulatory segment is more fragmented: athenahealth, eClinicalWorks, ModMed.",
    whitespace: "Specialty RCM, prior auth, referral/fax intake and private-clinic unit economics sit around entrenched EHR.",
    wedge: "Prior authorization + intake + coding QA for one specialty; start as EHR overlay, not medical record.",
    barriers: "HIPAA/EHDS/152-ФЗ, ONC and payer integrations, medical-device rules and trust.",
    importScore: 5, exportScore: 2, confidence: "Низкая", strategy: "Import → РФ",
    regions: [R("США", "$6.2B ambulatory estimate", "estimate", "Legacy replacement", "Specialty admin overlay", "HIPAA; payer APIs"), R("Европа", "$4.4B estimate", "estimate", "Country-fragmented", "Private-clinic workflow", "EHDS; reimbursement"), R("СНГ", "$0.24B proxy", "proxy", "16% growth", "Private-clinic economics", "152-ФЗ; national registries")], sourceIds: ["ehr", "ruSaas"],
  },
  {
    id: "dental", name: "Dental practice OS", category: "Vertical SaaS", current: 2.4, currentLabel: "≈$2.4B triangulated, 2024", evidence: "estimate", tam: 5.3, sam: 1.2, cagr: 10, stage: "Cloud transition / DSO consolidation",
    leaders: "Dentrix, Eaglesoft, Open Dental, Curve, CompuGroup; cross-region product-line revenues are not disclosed.",
    whitespace: "Eligibility, claims follow-up, treatment acceptance, recall and multi-location procurement remain stitched together.",
    wedge: "Treatment-plan acceptance + claims QA for 3–30 chair groups, integrated with existing PMS and imaging.",
    barriers: "HIPAA/GDPR/152-ФЗ, payer EDI, imaging APIs, reimbursement and medical data.",
    importScore: 5, exportScore: 3, confidence: "Низкая", strategy: "Import → РФ",
    regions: [R("США", "$1.45B estimate", "estimate", "DSO consolidation", "Claims/case acceptance", "HIPAA; payer EDI"), R("Европа", "$0.82B estimate", "estimate", "Country-fragmented", "Chain workflows", "Reimbursement; MDR"), R("СНГ", "$0.10B proxy", "proxy", "Early cloud", "Recall/stock/owner view", "Localization; low ARPU")], sourceIds: ["dental"],
  },
  {
    id: "construction", name: "Construction field & subcontractor ops", category: "Vertical SaaS", current: 14.7, currentLabel: "$14.7B reported, 2024", evidence: "reported", tam: 18.9, sam: 3.9, cagr: 11, stage: "Scale / fragmented field layer",
    leaders: "Autodesk, Oracle, Bentley, Trimble, Procore ($1.152B FY24); top-10 hold 46.5%.",
    whitespace: "Specialty subcontractor evidence, material certificates, closeout and owner handover remain email-heavy.",
    wedge: "Document/compliance OS for one trade: daily logs, photo evidence, certificates and handover pack.",
    barriers: "Building codes, OSHA/GOST, BIM/public procurement, e-signatures and local channel CAC.",
    importScore: 5, exportScore: 5, confidence: "Высокая", strategy: "Обе",
    regions: [R("США", "$5.3B estimate", "estimate", "Consolidating", "Specialty contractor closeout", "Lien/OSHA/insurance"), R("Европа", "$2.90B reported", "reported", "Fragmented", "Product passports", "Codes; languages"), R("СНГ", "$0.29B proxy", "proxy", "19% growth", "Исполнительная документация", "GOST; 1C; on-prem"), R("MENA", "$0.75B proxy", "proxy", "Megaproject growth", "Arabic field evidence", "Local sponsor; hosting")], sourceIds: ["construction"],
  },
  {
    id: "property", name: "Residential property operations", category: "Vertical SaaS", current: 3.9, currentLabel: "$3.9B reported, 2024", evidence: "reported", tam: 7.4, sam: 1.6, cagr: 11, stage: "Mature core / fragmented services",
    leaders: "Yardi ≈18%, AppFolio ≈17%, RealPage ≈11% in one estimate; AppFolio $794M FY24.",
    whitespace: "Maintenance coordination, vendor SLA, inspections and developer-to-manager handover stay fragmented.",
    wedge: "Maintenance + vendor SLA + inspection evidence overlay for 300–5,000 unit managers.",
    barriers: "Tenant law, Fair Housing/rent control, payments/KYC, GIS ЖКХ and local accounting.",
    importScore: 5, exportScore: 4, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$1.45B estimate", "estimate", "Consolidating", "Mid-manager maintenance", "State tenant law"), R("Европа", "$1.19B derived", "estimate", "Fragmented growth", "Energy/ESG + service ops", "Rent control; GDPR"), R("СНГ", "$0.16B proxy", "proxy", "Early", "Handover/SLA/debt", "GIS ЖКХ; fiscalization")], sourceIds: ["property"],
  },
  {
    id: "fleet", name: "Fleet maintenance & compliance software", category: "Vertical SaaS", current: 6.2, currentLabel: "≈$6.2B software-only proxy", evidence: "proxy", tam: 16, sam: 3.0, cagr: 12, stage: "Scaled growth",
    leaders: "Geotab >3M NA subscribers, Verizon Connect, Samsara ($1.25B FY25 broad connected ops), Webfleet, Wialon.",
    whitespace: "Tracking is commodity; mixed hardware, maintenance, tire/fuel anomaly and compliance evidence remain open.",
    wedge: "Hardware-agnostic maintenance + tire/fuel anomaly + compliance for 50–500 vehicle fleets.",
    barriers: "ELD/tachograph/GLONASS, worker privacy, OEM APIs, hardware channels and 24/7 reliability.",
    importScore: 5, exportScore: 5, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$3.0B estimate", "estimate", "Scaled", "Mixed-fleet operations", "FMCSA; OEM APIs"), R("Европа", "$2.25B estimate", "estimate", "Fragmented", "Tachograph/EV reconciliation", "Mobility Package; GDPR"), R("СНГ", "$0.31B proxy", "proxy", "Tracking mature", "Fuel/tire/workflow", "GLONASS; low ARPU"), R("LatAm", "$0.65B estimate", "estimate", "15% growth", "Theft/offline/maintenance", "Hardware financing; LGPD")], sourceIds: ["fleet"],
  },
  {
    id: "lastmile", name: "Last-mile delivery orchestration", category: "Vertical SaaS", current: 2.9, currentLabel: "≈$2.9B triangulated, 2024", evidence: "estimate", tam: 8.5, sam: 2.1, cagr: 13, stage: "Growth / regional fragmentation",
    leaders: "Bringg, Onfleet, Descartes, FarEye, DispatchTrack, Locus, Shipsy; pure category revenue is not disclosed.",
    whitespace: "Local addresses, COD, failed delivery and vertical distributor fleets resist generic enterprise routing.",
    wedge: "Failed-delivery + COD reconciliation for pharmacy/FMCG distributors in one city/vertical.",
    barriers: "Maps, driver classification/privacy, e-way bills/eCMR, local payments and offline mobile.",
    importScore: 5, exportScore: 4, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$0.92B estimate", "estimate", "Crowded", "Healthcare/bulky delivery", "Labor; integrations"), R("Европа", "$0.62B reported", "reported", "Sustainability-led", "Low-emission routing", "GDPR; eFTI"), R("СНГ", "$0.13B proxy", "proxy", "17% growth", "Distributor COD/returns", "Maps; fiscal receipts"), R("India", "$0.48B estimate", "estimate", "Fast growth", "Tier-2/3 COD", "DPDP; price"), R("SEA", "$0.34B proxy", "proxy", "Fragmented", "Inter-island handoffs", "Languages; country laws")], sourceIds: ["lastmile"],
  },
  {
    id: "hotel", name: "Independent hotel operations", category: "Vertical SaaS", current: 3.4, currentLabel: "≈$3.4B narrow PMS estimate", evidence: "estimate", tam: 7.6, sam: 1.3, cagr: 10, stage: "Cloud transition",
    leaders: "Oracle, Agilysys, Infor, Mews, Cloudbeds, Protel; top-5 ≈45%.",
    whitespace: "Housekeeping, maintenance, local guest registration and independent multi-property operations remain fragmented.",
    wedge: "Housekeeping/maintenance + WhatsApp guest workflow for 20–150 rooms, integrated with PMS/channel managers.",
    barriers: "PCI, OTA certification, fiscal/ID registration, city taxes, 24/7 support and migration.",
    importScore: 5, exportScore: 4, confidence: "Низкая", strategy: "Обе",
    regions: [R("США", "$1.10B estimate", "estimate", "Mature migration", "Labor ops", "OTA/PCI"), R("Европа", "$0.88B estimate", "estimate", "Fragmented", "Fiscal/ID workflows", "GDPR; city tax"), R("СНГ", "$0.075B proxy", "proxy", "16% growth", "Regional mini-hotels", "Guest reporting"), R("MENA", "$0.23B proxy", "proxy", "Supply growth", "Arabic serviced-apartment ops", "Tourism authority")], sourceIds: ["hotel"],
  },
  {
    id: "restaurant", name: "Restaurant back-office OS", category: "Vertical SaaS", current: 6.6, currentLabel: "≈$6.6B reported, 2024", evidence: "reported", tam: 11.7, sam: 2.0, cagr: 14, stage: "Scaled growth / consolidation",
    leaders: "Toast ($706M subscription; $4.96B total), NCR, Oracle MICROS, Square, Lightspeed, iiko ₽4.2B HoReCa IT.",
    whitespace: "Payments inflate vendor headlines; food cost, invoice/AP, supplier ordering and franchise QA remain fragmented.",
    wedge: "Invoice capture + recipe/food-cost variance + supplier ordering for 3–50 locations, over incumbent POS.",
    barriers: "Fiscalization, labor/tip rules, food traceability, POS integrations, peak-time support and payments bundling.",
    importScore: 5, exportScore: 5, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$3.0B estimate", "estimate", "Scaled", "Food-cost/AP overlay", "POS bundling"), R("Европа", "$1.25B estimate", "estimate", "Fragmented", "E-invoice/allergen ops", "Fiscal rules"), R("СНГ", "$0.11B estimate", "estimate", "Strong incumbents", "Supplier/food-cost layer", "ЕГАИС/Меркурий"), R("MENA", "$0.32B proxy", "proxy", "18% growth", "Arabic procurement/recipe", "ZATCA; local acquiring")], sourceIds: ["restaurant"],
  },
  {
    id: "fsm", name: "Field service for regulated trades", category: "Vertical SaaS", current: 4.7, currentLabel: "$4.7–4.9B reported, 2024", evidence: "reported", tam: 9.6, sam: 2.0, cagr: 12, stage: "Growth / verticalization",
    leaders: "ServiceTitan, Salesforce, IFS, ServiceNow, Jobber, Praxedo, BigChange; exact narrow revenues mostly undisclosed.",
    whitespace: "Inspection-heavy trades, small commercial contractors and compliance evidence fall below enterprise-suite economics.",
    wedge: "One trade: fire-safety or refrigeration maintenance; offline work order, certificate, parts and recurring inspection.",
    barriers: "Trade licenses/certificates, labor rules, e-invoicing, 1C/ERP, mobile offline and field onboarding.",
    importScore: 5, exportScore: 5, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$1.85B derived", "estimate", "Scaled", "Commercial regulated trades", "Licensing; payroll"), R("Европа", "$1.18B derived", "estimate", "Fragmented", "Heat-pump/fire/lift compliance", "Worker privacy; certificates"), R("СНГ", "$0.15B proxy", "proxy", "18% growth", "Offline evidence/parts", "1C; local forms"), R("MENA", "$0.26B proxy", "proxy", "16% growth", "HVAC/FM SLA evidence", "Arabic; partner sales")], sourceIds: ["fsm"],
  },
  {
    id: "mes", name: "Light MES / QMS", category: "Vertical SaaS", current: 11, currentLabel: "≈$11B regional triangulation", evidence: "estimate", tam: 18.8, sam: 3.1, cagr: 10, stage: "Modernization / import substitution",
    leaders: "Rockwell/Plex, Siemens, Honeywell, Emerson, Dassault, SAP, Schneider; SI work blurs product revenue.",
    whitespace: "50–500 employee plants need traceability and digital work instructions without monolithic MES.",
    wedge: "Cloud/edge QMS + genealogy for one regulated niche: food co-packers, cosmetics or medical suppliers.",
    barriers: "OT cybersecurity, validation, ISA-95, uptime, brownfield protocols and long implementation.",
    importScore: 5, exportScore: 3, confidence: "Средняя", strategy: "Import → РФ",
    regions: [R("США", "$3.55B estimate", "estimate", "Mature modernization", "Mid-market supplier quality", "FDA/GxP; OT"), R("Европа", "$3.56B reported", "reported", "Industry 4.0", "Energy/traceability", "NIS2; works councils"), R("СНГ", "$0.42B proxy", "proxy", "22% growth", "Light MES/offline edge", "Air-gap; GOST"), R("India", "$0.55B proxy", "proxy", "15% growth", "Affordable supplier traceability", "Integration; price")], sourceIds: ["mes", "ruSaas"],
  },
  {
    id: "farm", name: "Farm management & traceability", category: "Vertical SaaS", current: 3.4, currentLabel: "$3.4B reported, 2024", evidence: "reported", tam: 8.2, sam: 1.8, cagr: 11, stage: "Growth / fragmented",
    leaders: "Trimble, Climate FieldView, Conservis, AGRIVI, xFarm, eAgronom, Cropin; often bundled with inputs/equipment.",
    whitespace: "Specialty crops, buyer-led traceability, offline records and cooperative workflows resist horizontal tools.",
    wedge: "Offline field records + input/harvest traceability for one crop chain, sold through buyer/cooperative.",
    barriers: "Seasonality, connectivity, agronomy, cadastral/subsidy data, languages and weak direct farmer WTP.",
    importScore: 5, exportScore: 5, confidence: "Средняя", strategy: "Обе",
    regions: [R("США", "$1.35B estimate", "estimate", "Ecosystem consolidation", "Specialty crop traceability", "Equipment channels"), R("Европа", "$0.82B estimate", "estimate", "Compliance-driven", "CAP/export evidence", "Pesticide/CAP rules"), R("СНГ", "$0.13B proxy", "proxy", "17% growth", "Offline work/input records", "1C; seasonality"), R("LatAm", "$0.40B estimate", "estimate", "17% growth", "Exporter crop chains", "Spanish/Portuguese"), R("India", "$0.28B proxy", "proxy", "18% growth", "Buyer-led smallholder records", "Vernacular; B2B2F")], sourceIds: ["farm"],
  },
  {
    id: "legal", name: "Legal practice management", category: "Vertical SaaS", current: 2.06, currentLabel: "$2.06B reported, 2024", evidence: "reported", tam: 4.5, sam: 1.1, cagr: 15, stage: "Growth / jurisdiction-fragmented",
    leaders: "Clio ≈18%; top-5 ≈42%; MyCase, Filevine, PracticePanther, Thomson Reuters and local products.",
    whitespace: "Practice-specific intake, deadlines, settlement/debt workflows and secure document AI remain jurisdictional.",
    wedge: "One deadline-heavy practice: insolvency, debt collection or immigration; overlay intake/document automation first.",
    barriers: "Professional secrecy, trust accounting, court e-filing, local law corpus and malpractice risk.",
    importScore: 5, exportScore: 3, confidence: "Низкая", strategy: "Import → РФ",
    regions: [R("США", "$1.12B estimate", "estimate", "Scaled growth", "Practice-specific workflow", "State ethics/courts"), R("Европа", "$0.50B estimate", "estimate", "Country-fragmented", "Local deadline/e-invoice", "GDPR; bar rules"), R("СНГ", "$0.085B proxy", "proxy", "Early cloud", "Court/debt workflow", "Court APIs; secrecy")], sourceIds: ["legal"],
  },
];

const marketRu: Record<string, MarketRu> = {
  crm: {
    name: "CRM и управление продажами",
    essence: "Системы, в которых компании ведут клиентов и управляют работой отдела продаж. Возможность — не заменять CRM, а улучшить локальные коммуникации, контроль качества и прогноз выручки.",
    stage: "Зрелый рынок, идёт консолидация",
    whitespace: "Универсальные CRM уже заняты, но локальные каналы связи, хранение данных в стране, понятное прогнозирование и миграция без системного интегратора закрыты слабо.",
    wedge: "Надстройка для продаж поверх существующей CRM: локальная телефония и мессенджеры, подтверждения из встреч и объяснимый прогноз.",
    barriers: "Пакетные предложения крупных игроков, требования SOC 2, GDPR и 152-ФЗ, интеграции с каналами и высокая стоимость привлечения клиента (CAC).",
  },
  hr: {
    name: "Подбор персонала и управление талантами",
    essence: "Инструменты для найма, интервью и кадровых процессов. Узкая возможность — сделать решения о найме доказуемыми и безопасными, не превращаясь в непрозрачный алгоритм оценки кандидатов.",
    stage: "Масштабирование и объединение функций в крупные пакеты",
    whitespace: "Доказательства по итогам интервью, согласия кандидатов и локальные сценарии с job boards и мессенджерами часто остаются вне основной HCM-системы.",
    wedge: "Проверяемый процесс интервью: структурированные факты, согласия, извлечение навыков и интеграции с Workday, 1C и площадками вакансий — без непрозрачного ранжирования.",
    barriers: "Правила EU AI Act для систем высокого риска, аудиты EEOC/AEDT, трудовое право и чувствительные персональные данные.",
  },
  work: {
    name: "Управление проектами и работой",
    essence: "ПО для задач, проектов, загрузки команд и клиентской поставки. Возможность находится между простыми досками задач и тяжёлыми системами управления портфелем проектов (PPM).",
    stage: "Зрелый рынок, функции заново объединяются вокруг AI",
    whitespace: "Между массовыми task boards и тяжёлыми PPM не хватает удобного контроля загрузки, маржи и подтверждений выполнения клиентских проектов.",
    wedge: "Панель управления поставкой для агентств и инженерного консалтинга: план-факт из Git и документов, загрузка команды и риск снижения маржи.",
    barriers: "Пакетные предложения Microsoft и Atlassian, требования к SSO и аудиту, низкая готовность клиентов менять систему.",
  },
  itsm: {
    name: "ITSM / ESM для среднего бизнеса",
    essence: "Управление IT-услугами (ITSM) и внутренними сервисами компании (ESM). Возможность — дать среднему бизнесу быстрый и суверенный продукт без сложности ServiceNow.",
    stage: "Масштабирование и расширение платформ",
    whitespace: "ServiceNow слишком тяжёл для среднего бизнеса, а простым продуктам не хватает автоматической миграции, надёжной CMDB и процессов за пределами IT.",
    wedge: "Суверенная ESM, запускаемая за неделю: обнаружение активов, автоматически созданный каталог, доказуемые согласования и приватная AI-сортировка обращений.",
    barriers: "Закупки по ITIL, NIS2, требования on-prem/private cloud, глубокие интеграции и экосистема действующих поставщиков.",
  },
  cyber: {
    name: "Контроль безопасности облака и доказательства соответствия",
    essence: "ПО, которое ищет неверные настройки облака и помогает подтвердить соблюдение требований. Возможность — не просто показывать тревоги, а назначать владельца и безопасно исправлять проблему.",
    stage: "Рост с одновременной консолидацией",
    whitespace: "SMB-инструменты часто заканчиваются на уведомлениях; локальные облака, суверенность данных и ответственность за исправления дробят рынок.",
    wedge: "Граф соответствия с готовыми безопасными исправлениями для компаний на 50–2 000 сотрудников, pull request для IaC и продажи через MSP.",
    barriers: "Доверие к продукту безопасности, ответственность за ошибки, SOC 2, сертификации, API локальных облаков и экспортные ограничения.",
  },
  bi: {
    name: "Встраиваемая BI-аналитика и управляемые метрики",
    essence: "Аналитика, которую SaaS-компания встраивает в свой продукт для клиентов. Возможность — единые проверенные метрики, корректные права и понятные ответы, а не ещё один конструктор дашбордов.",
    stage: "Зрелый рынок в переходе к генеративному AI",
    whitespace: "Создание дашбордов стало массовой функцией, но единые управляемые метрики, права разных клиентов и объяснимая внешняя аналитика всё ещё сложны.",
    wedge: "Независимый слой метрик и диалоговая встраиваемая аналитика с оплатой за клиента, поддержкой on-prem и хостингом в ЕС.",
    barriers: "Низкий ценовой ориентир Power BI, глубина коннекторов, безошибочные права доступа и происхождение данных (data lineage).",
  },
  finops: {
    name: "FinOps для AI и Kubernetes",
    essence: "Управление затратами на облака, GPU, AI-модели и Kubernetes. Возможность — связать технические расходы с конкретным клиентом или бизнес-процессом и предотвратить перерасход.",
    stage: "Рост и формирование платформ",
    whitespace: "Экономика токенов и GPU, а также биллинг локальных облаков ещё незрелы; корпоративные системы перегружены отчётами и слабы в действиях.",
    wedge: "Расчёт стоимости клиента или процесса, обязательства по GPU и токенам, ограничения аномалий и распределение расходов между облаками, K8s и AI-поставщиками.",
    barriers: "Доверие к данным счетов, быстро меняющиеся API, встроенные инструменты облаков и сложные корпоративные интеграции.",
  },
  genai: {
    name: "Управление корпоративными AI-агентами",
    essence: "Независимый контроль над AI-агентами разных поставщиков: права, тесты, согласования, повтор действий и стоимость. Это слой управления (control plane), а не новая AI-модель.",
    stage: "Ранний рынок с очень быстрым ростом",
    whitespace: "Права между поставщиками, оценки качества, контроль действий, воспроизведение и распределение затрат слабы, пока сами модели становятся взаимозаменяемыми.",
    wedge: "Независимый от поставщика control plane: политики как код, тесты (evals), согласования, replay и стоимость успешно выполненной задачи.",
    barriers: "Быстрое устаревание, включение функций в платформы моделей, AI Act, корпоративное доверие и ответственность.",
  },
  clm: {
    name: "Обязательства по договорам и проверка поставщиков (KYB)",
    essence: "Контроль обязательств после подписания договора и проверка юридических лиц (KYB). Возможность — связать договор, владельца обязательства, санкционные проверки и продление.",
    stage: "Рост и расширение за счёт AI",
    whitespace: "Корпоративный CLM требует тяжёлого внедрения, а SMB-продукты электронной подписи заканчиваются на подписи; обязательства и доказательства по поставщику ведутся вручную.",
    wedge: "Паспорт поставщика и автопилот после подписания: сведения о бенефициарах, санкционные доказательства, ответственные, продления и синхронизация SLA и цен с CRM/ERP.",
    barriers: "Юридическая ответственность, стоимость реестров, eIDAS и 63-ФЗ, локальный язык договоров и ложные срабатывания.",
  },
  support: {
    name: "Автоматизация клиентской поддержки",
    essence: "Системы, которые помогают отвечать клиентам и выполнять действия по обращениям. Возможность — безопасная автоматизация с прозрачной проверкой качества, особенно в регулируемых отраслях и редких языках.",
    stage: "Зрелое ядро рынка, нарушаемое AI",
    whitespace: "Безопасное выполнение действий, прозрачный контроль качества и языки длинного хвоста отстают от классических ticketing-систем.",
    wedge: "Контроль качества решения и детерминированный агент действий для регулируемой поддержки, с многоязычными тестами и аудитом каждого решения.",
    barriers: "Ответственность за точность, HIPAA, PCI и GDPR, API каналов и оплата крупных поставщиков за результат.",
  },
  search: {
    name: "Надёжность корпоративного поиска",
    essence: "Проверка качества ответов корпоративного поиска и RAG: доступы, свежесть, источники и владельцы знаний. Продукт работает как независимая надстройка над Copilot, Glean или частным RAG.",
    stage: "Рост и перезапуск рынка из-за генеративного AI",
    whitespace: "Расхождение прав, происхождение ответа, устаревшие знания, неанглийские данные и изолированные on-prem архивы остаются сложными.",
    wedge: "Слой надёжности над Copilot, Glean и RAG: сравнение прав, поиск устаревших ответов, тестирование цитат и процессы для владельцев знаний.",
    barriers: "Ширина коннекторов, точность контроля доступа, требования к размещению данных и on-prem архивы.",
  },
  accounting: {
    name: "Автоматизация бухгалтерских процессов SMB",
    essence: "Автоматизация сбора документов, сверки банков, закрытия периода и исключений для малого бизнеса и бухгалтерских фирм. Не замена учётной системы, а рабочая надстройка.",
    stage: "Зрелый рынок, продолжается переход в облако",
    whitespace: "Главная книга локальна и глубоко встроена, но обработка исключений, закрытие периода и доказательства между системами всё ещё ручные.",
    wedge: "AI-помощник закрытия для бухгалтерских фирм: сбор документов, банковская сверка, исключения и объяснимый аудиторский след.",
    barriers: "Локализация налогов и плана счетов, банковские каналы, доверие к системе учёта (system of record), санкции и платежи.",
  },
  tax: {
    name: "Косвенные налоги и электронные счета",
    essence: "ПО для соблюдения требований НДС, e-invoicing и обязательной отчётности в разных странах. Возможность создают новые мандаты, но продукт должен быстро поддерживать локальные схемы.",
    stage: "Очень быстрый рост, вызванный регулированием",
    whitespace: "Обязательные правила создают спрос, но схемы данных и аккредитации различаются по странам, а коннекторы SMB ERP запаздывают.",
    wedge: "API с пакетами стран для Peppol/ViDA, UAE PINT-AE и KSA ZATCA: проверка, сравнение схем, sandbox и архив доказательств.",
    barriers: "Аккредитация, локальное присутствие, ответственность, меняющиеся схемы, размещение данных и санкционный комплаенс.",
  },
  apar: {
    name: "Автоматизация кредиторской и дебиторской задолженности (AP/AR)",
    essence: "Автоматизация счетов к оплате и к получению (AP/AR), сверки платежей и взыскания. Для РФ особенно интересен AR-слой, который не хранит и не переводит деньги.",
    stage: "Масштабирование и консолидация",
    whitespace: "Платежи в РФ удобны, но взыскание, сопоставление назначений и подключение поставщиков остаются разрозненными.",
    wedge: "AR-помощник: обещания оплаты из почты и мессенджеров, сопоставление с банком и локальные сценарии напоминаний о долге.",
    barriers: "Доступ к банкам и ERP, ответственность за мошенничество, двусторонние сети и тяжёлое интеграционное подключение.",
  },
  orchestration: {
    name: "Оркестрация платежей",
    essence: "Маршрутизация платежей между несколькими провайдерами, повтор неуспешных операций и сверка. Возможность — независимый контроль без хранения денег.",
    stage: "Быстрый рост при средней концентрации",
    whitespace: "Продавцам с несколькими PSP нужны переносимость, повторные попытки, сверка и измеримый рост доли успешных авторизаций.",
    wedge: "Merchant-side control plane, который не хранит деньги: правила маршрутизации, failover, переносимость токенов и тесты роста авторизаций.",
    barriers: "PCI DSS, сетевые токены, пакетные предложения PSP, корпоративные продажи и локальные способы оплаты.",
  },
  procurement: {
    name: "Лёгкие закупки и работа с поставщиками",
    essence: "Упрощённый цикл заявки, выбора предложения, заказа и сверки счёта для компаний, которым слишком тяжёл полный S2P-пакет. Фокус — сотрудники и поставщики в привычных каналах.",
    stage: "Зрелый корпоративный рынок, рост в SMB",
    whitespace: "Компании на 50–500 сотрудников слишком малы для S2P-пакетов; заявки и доказательства по поставщикам остаются в почте.",
    wedge: "Заявка из email или Teams → политика → предложения → заказ (PO) → сверка счёта, без миграции сети поставщиков.",
    barriers: "Интеграция с ERP, изменение привычек, холодный старт поставщиков и правила государственных закупок РФ.",
  },
  banking: {
    name: "Рабочие процессы SMB-банкинга",
    essence: "White-label рабочее пространство поверх банковского ядра: роли, согласования, счета, платежи и прогноз денег. Экспортируется UX и workflow, а не банковская лицензия.",
    stage: "Расширение платформ",
    whitespace: "Российский UX цифровых банков можно экспортировать как white-label процесс, но не как лицензированный банк и не как обещание всего пула выручки $185B.",
    wedge: "White-label финансовое рабочее пространство для банков MENA и SEA: роли, согласования, invoice-to-payment, прогноз денег и кабинет бухгалтера.",
    barriers: "Лицензия или банк-спонсор, AML/KYB, интеграция с ядром, размещение данных и риск российского происхождения IP.",
  },
  commerce: {
    name: "Омниканальная операционная система для SMB-торговли",
    essence: "Единое управление каталогом, остатками, маржой и возвратами между магазином и маркетплейсами. Витрина уже стала стандартной функцией; ценность смещается в операции.",
    stage: "Зрелое ядро, расширение в операционные процессы",
    whitespace: "Витрина стала массовой функцией, но каталог, реальная маржа, распределение запасов и возвраты между каналами разрознены.",
    wedge: "ОС прибыли для магазина и маркетплейсов: единые SKU, маржинальный доход, распределение запасов и возвраты.",
    barriers: "API платформ, пакетные предложения, локализация платежей и логистики, отток SMB и продажи через агентства.",
  },
  seller: {
    name: "ОС действий для продавцов маркетплейсов",
    essence: "Не просто аналитика, а система, которая находит проблему в прибыли, рекламе или запасах и предлагает действие. Особенно ценна единая экономика нескольких маркетплейсов.",
    stage: "Рост с сильной зависимостью от платформ",
    whitespace: "Встроенные дашборды снижают ценность аналитики, но реальная маржа, деньги, пополнение и автоматизация действий между площадками остаются открытыми.",
    wedge: "Агент прибыли, запасов и рекламных аномалий для 2–4 маркетплейсов: объясняет unit economics и создаёт действия.",
    barriers: "Ограничения API со стороны платформ, лицензирование данных, отток продавцов, отдельные коннекторы по странам и ложная точность.",
  },
  marketing: {
    name: "Автоматизация маркетинга по жизненному циклу",
    essence: "Удержание клиентов на основе заказов, бронирований и собственной клиентской базы. Возможность — отраслевой агент, который доказывает дополнительный эффект, а не просто отправляет письма.",
    stage: "Зрелый рынок, функции заново объединяются вокруг AI",
    whitespace: "Горизонтальный email-маркетинг насыщен, но отраслевые процессы на first-party данных с измеримой инкрементальностью — нет.",
    wedge: "Отраслевой агент удержания на данных заказов или бронирований: предложения с учётом маржи и измерение эффекта через контрольную группу.",
    barriers: "Доставляемость сообщений, приватность и согласия, стоимость каналов, пакетные предложения и доказательство прироста.",
  },
  nocode: {
    name: "Self-hosted автоматизация AI-процессов",
    essence: "Визуальная сборка AI-процессов, которые можно развернуть в своей инфраструктуре. Ценность для регулируемого SMB — согласования, аудит, повтор и предсказуемая цена.",
    stage: "Очень быстрый рост и переход к агентным процессам",
    whitespace: "Количество коннекторов недостаточно: регулируемому SMB нужны self-hosting, согласования, replay и предсказуемая экономика использования.",
    wedge: "Визуальные агентные процессы с согласованиями, аудитом, повтором и приватным развёртыванием; цена без налога за каждую задачу.",
    barriers: "n8n и open source, нагрузка по коннекторам, пакетные предложения hyperscaler-платформ, безопасность и поддержка.",
  },
  clinic: {
    name: "Операции специализированных клиник",
    essence: "Административные процессы частной клиники вокруг существующей медицинской системы: запись, согласование оплаты, кодирование и экономика. Начинать нужно как надстройка, не как медицинская карта.",
    stage: "Зрелость в США/ЕС, рост в СНГ",
    whitespace: "Отраслевые расчёты, предварительное согласование, приём направлений и факсов и экономика частной клиники остаются вокруг устоявшейся EHR.",
    wedge: "Предварительное согласование, intake и контроль кодирования для одной специальности; сначала EHR-overlay, а не медицинская запись.",
    barriers: "HIPAA, EHDS и 152-ФЗ, интеграции ONC и страховщиков, правила медизделий и доверие.",
  },
  dental: {
    name: "Операционная система стоматологии",
    essence: "Рабочие процессы стоматологии и сетей: планы лечения, страховые требования, возврат пациентов и закупки. Возможность — надстройка над действующей PMS и снимками.",
    stage: "Переход в облако и консолидация DSO-сетей",
    whitespace: "Проверка страхового покрытия, сопровождение требований, принятие плана лечения, recall и закупки сети остаются сшиты вручную.",
    wedge: "Принятие плана лечения и контроль страховых требований для групп на 3–30 кресел с интеграцией в PMS и системы снимков.",
    barriers: "HIPAA, GDPR и 152-ФЗ, страховой EDI, API изображений, возмещение и медицинские данные.",
  },
  construction: {
    name: "Полевые операции и субподрядчики в строительстве",
    essence: "Сбор доказательств работ, сертификатов и исполнительной документации на площадке. Возможность — узкий продукт для одной специальности, ускоряющий сдачу и оплату.",
    stage: "Масштабирование при раздробленном полевом слое",
    whitespace: "Доказательства специализированных субподрядчиков, сертификаты материалов, закрытие и передача заказчику по-прежнему зависят от email.",
    wedge: "Документальная и compliance-ОС для одной специальности: дневные отчёты, фото, сертификаты и пакет передачи.",
    barriers: "Строительные нормы, OSHA и ГОСТ, BIM и госзакупки, электронные подписи и стоимость локального канала продаж.",
  },
  property: {
    name: "Управление жилой недвижимостью",
    essence: "Операции управляющих компаний: заявки, подрядчики, осмотры, SLA и передача объекта. Возможность — лёгкая надстройка для среднего портфеля объектов.",
    stage: "Зрелое ядро и раздробленные сервисные процессы",
    whitespace: "Координация ремонта, SLA подрядчиков, осмотры и передача от застройщика управляющей компании остаются разрозненными.",
    wedge: "Надстройка обслуживания, SLA поставщиков и доказательств осмотра для управляющих на 300–5 000 объектов.",
    barriers: "Права арендаторов, Fair Housing и контроль аренды, платежи/KYC, ГИС ЖКХ и локальный учёт.",
  },
  fleet: {
    name: "Обслуживание автопарка и соответствие требованиям",
    essence: "Управление ремонтом, топливом, шинами и обязательными доказательствами поверх существующих трекеров. Ценность — единый процесс для смешанного оборудования.",
    stage: "Масштабированный растущий рынок",
    whitespace: "Отслеживание стало массовой функцией; смешанное оборудование, ремонт, аномалии шин и топлива и доказательства соответствия остаются открытыми.",
    wedge: "Независимые от оборудования ремонт, контроль шин и топлива и compliance для парков на 50–500 машин.",
    barriers: "ELD, тахограф и ГЛОНАСС, приватность работников, API производителей, аппаратные каналы и надёжность 24/7.",
  },
  lastmile: {
    name: "Оркестрация последней мили",
    essence: "Маршрутизация и контроль доставки до получателя, включая наложенный платёж и неуспешную доставку. Узкий вход — конкретная отрасль и один город.",
    stage: "Рост при региональной раздробленности",
    whitespace: "Локальные адреса, COD, неуспешные доставки и парки отраслевых дистрибьюторов плохо подходят универсальной корпоративной маршрутизации.",
    wedge: "Неуспешная доставка и сверка COD для дистрибьюторов фармы или FMCG в одном городе и отрасли.",
    barriers: "Карты, статус и приватность водителей, e-way bills/eCMR, локальные платежи и офлайн-мобильное приложение.",
  },
  hotel: {
    name: "Операции независимых отелей",
    essence: "Уборка, обслуживание, общение с гостями и обязательная регистрация вокруг гостиничной PMS. Возможность — независимые отели на 20–150 номеров.",
    stage: "Переход в облако",
    whitespace: "Уборка, обслуживание, локальная регистрация гостей и управление несколькими независимыми объектами остаются разрозненными.",
    wedge: "Уборка и обслуживание плюс WhatsApp-процесс гостя для 20–150 номеров с интеграцией PMS и channel manager.",
    barriers: "PCI, сертификация OTA, фискальная и ID-регистрация, городские налоги, поддержка 24/7 и миграция.",
  },
  restaurant: {
    name: "Операционная система бэк-офиса ресторана",
    essence: "Контроль закупок, счетов, себестоимости рецептов и качества сети поверх действующей POS. Ценность — быстрое снижение food cost без замены кассовой системы.",
    stage: "Масштабированный рост и консолидация",
    whitespace: "Платежи завышают headline выручку поставщиков; себестоимость еды, счета/AP, заказы поставщикам и контроль франшизы разрознены.",
    wedge: "Распознавание счетов, отклонения рецептурной себестоимости и заказы поставщикам для 3–50 точек поверх действующей POS.",
    barriers: "Фискализация, правила труда и чаевых, прослеживаемость продуктов, интеграции POS, поддержка в пиковое время и пакетные платежи.",
  },
  fsm: {
    name: "Выездной сервис для регулируемых специальностей (FSM)",
    essence: "Управление заявками, техниками, запчастями и сертификатами в полевых работах. Лучший вход — одна специальность с повторными обязательными осмотрами.",
    stage: "Рост и специализация по вертикалям",
    whitespace: "Профессии с большим числом инспекций, малые коммерческие подрядчики и compliance-доказательства не окупаются в корпоративных пакетах.",
    wedge: "Одна специальность — пожарная безопасность или холодильное оборудование: offline-наряд, сертификат, детали и повторный осмотр.",
    barriers: "Лицензии и сертификаты, трудовые правила, e-invoicing, 1C/ERP, offline mobile и обучение полевых сотрудников.",
  },
  mes: {
    name: "Лёгкие MES / QMS для производства",
    essence: "Исполнение производства (MES) и управление качеством (QMS) для заводов среднего размера. Возможность — прослеживаемость без многолетнего внедрения монолитной MES.",
    stage: "Модернизация и импортозамещение",
    whitespace: "Заводам на 50–500 сотрудников нужны прослеживаемость и цифровые инструкции без монолитной MES.",
    wedge: "Облачная или edge QMS плюс генеалогия продукта для одной регулируемой ниши: контрактное пищевое производство, косметика или медпоставщики.",
    barriers: "OT-кибербезопасность, валидация, ISA-95, непрерывность работы, старые промышленные протоколы и долгое внедрение.",
  },
  farm: {
    name: "Управление фермой и прослеживаемость",
    essence: "Полевые записи, материалы и путь урожая от хозяйства до покупателя. Устойчивый вход — одна культура и продажа через экспортёра или кооператив.",
    stage: "Рост на раздробленном рынке",
    whitespace: "Специальные культуры, прослеживаемость по требованию покупателя, offline-записи и процессы кооперативов плохо подходят горизонтальным продуктам.",
    wedge: "Offline-полевые записи и прослеживаемость материалов и урожая для одной культуры, продажа через покупателя или кооператив.",
    barriers: "Сезонность, связь, агрономия, кадастр и субсидии, языки и низкая готовность фермера платить напрямую.",
  },
  legal: {
    name: "Управление юридической практикой",
    essence: "Дела, сроки, документы, биллинг и клиентский intake для юридических фирм. Возможность — одна практика с большим числом обязательных сроков.",
    stage: "Рост при раздробленности по юрисдикциям",
    whitespace: "Отраслевой приём дел, сроки, урегулирование и взыскание и безопасный AI для документов зависят от юрисдикции.",
    wedge: "Одна практика со множеством сроков: банкротство, взыскание или иммиграция; сначала надстройка intake и автоматизации документов.",
    barriers: "Профессиональная тайна, доверительный учёт, электронная подача в суд, локальная база права и риск профессиональной ошибки.",
  },
};

const theses = [
  { productRu: "Контур надёжности AI-агентов", product: "Agent reliability control plane", icp: "Регулируемые компании с 500–10 000 сотрудников и тремя или более стеками LLM/AI-агентов", geo: "Великобритания / DACH", money: "$30–100k годовой регулярной выручки (ARR) + плата за использование", proof: "Клиенты платят за тесты качества (evals), согласование действий и повтор (replay). Продукт контролирует модели, а не конкурирует с ними." },
  { productRu: "ОС действий для прибыли продавца", product: "Seller profit action OS", icp: "Бренды и продавцы с оборотом (GMV) $0.5–5M на 2–4 маркетплейсах", geo: "Казахстан / Узбекистан → ОАЭ", money: "$300–1,500 в месяц + платное подключение", proof: "Российская компетенция в операциях WB/Ozon переносима после создания локальных коннекторов." },
  { productRu: "ОС регулируемого выездного сервиса", product: "Regulated field-service OS", icp: "Подрядчики по пожарной безопасности или холодильному оборудованию, 10–100 техников", geo: "РФ → Центральная и Восточная Европа / ОАЭ", money: "$20–50 за техника в месяц + внедрение", proof: "Регулярные обязательные инспекции повышают удержание и создают защиту продукта через compliance." },
  { productRu: "Доказательства закрытия строительных работ", product: "Construction closeout evidence", icp: "Субподрядчики по инженерным системам (MEP) и огнезащите на 5–30 одновременных объектах", geo: "Саудовская Аравия / ОАЭ", money: "$500–3,000 за проект в месяц", proof: "Сертификаты на арабском и английском и готовый пакет передачи напрямую ускоряют оплату и дают понятный ROI." },
  { productRu: "AI-помощник по взысканию дебиторской задолженности", product: "AR collections copilot", icp: "Сервисный SMB с 500–5 000 счетов в месяц, 1C и тремя или более банками", geo: "РФ", money: "₽50–250k в месяц или за сопоставленный счёт", proof: "Локализует доказанный процесс BILL/HighRadius, не принимая и не переводя деньги." },
  { productRu: "Слой надёжности корпоративных знаний", product: "Knowledge reliability layer", icp: "Компании с Copilot, Glean или частным RAG и чувствительными правами доступа", geo: "Центральная и Восточная Европа / DACH", money: "$25–80k годовой регулярной выручки (ARR)", proof: "Независимый контроль качества (QA) сохраняет ценность при смене моделей и поставщиков поиска." },
  { productRu: "Слой аномалий обслуживания автопарка", product: "Fleet maintenance anomaly layer", icp: "Смешанные парки из 50–500 машин с уже установленными трекерами", geo: "Казахстан → Бразилия / Мексика", money: "$4–12 за автомобиль в месяц", proof: "Независимая от оборудования надстройка (overlay) использует сильную компетенцию СНГ в телематике." },
  { productRu: "Прослеживаемость одной сельхозкультуры", product: "Farm traceability for one crop", icp: "Экспортёры и кооперативы, управляющие 50–500 хозяйствами", geo: "Центральная и Восточная Европа → Латинская Америка", money: "$10–40k в год за программу покупателя", proof: "Модель B2B2F, оплачиваемая покупателем, обходит низкую готовность фермеров платить напрямую." },
  { productRu: "Автопилот себестоимости ресторана", product: "Restaurant food-cost autopilot", icp: "Сети из 3–50 точек на существующей кассовой системе (POS)", geo: "РФ → ОАЭ / Саудовская Аравия", money: "$80–250 за точку в месяц", proof: "Распознавание счетов (OCR) и отклонения рецептурной себестоимости дают ROI без замены POS." },
  { productRu: "Суверенная ESM для среднего бизнеса", product: "Sovereign mid-market ESM", icp: "Производство и финансовые услуги, 500–5 000 сотрудников", geo: "DACH / Центральная и Восточная Европа", money: "$20–60k годовой регулярной выручки (ARR) + настройка партнёром", proof: "Миграция за неделю, приватный AI и доказательства NIS2 выигрывают у тяжёлых комплексных систем." },
];

const methodology = [
  ["Текущая выручка (Current revenue)", "Годовая чистая выручка поставщиков или платформ за 2024/2025 годы. GMV, TPV, объём закупок, оборудование и услуги исключены там, где их можно отделить."],
  ["Общий рынок (TAM)", "Нормализованные расходы на ПО в категории. Пересекающиеся рынки нельзя складывать; диапазон отчёта сохранён, чтобы не создавать ложную точность."],
  ["Достижимый рынок (SAM)", "Узкий процесс, достижимый за 3–5 лет: целевые регионы × число компаний идеального профиля (ICP) × реалистичный средний контракт (ACV), с проверкой по выручке категории."],
  ["Тип доказательства (Evidence)", "reported — напрямую опубликованная цифра рынка или компании; estimate — расчётное распределение совместимой цифры; proxy — модель снизу вверх или по смежному рынку."],
  ["Оценки (Scores)", "Import учитывает незакрытую потребность РФ, локальные интеграции, выручку на клиента (ARPU) и регулирование. Export — переносимость компетенции, независимый выход на рынок (GTM), доверие/санкции и объём локализации."],
  ["Уверенность (Confidence)", "Высокая требует прямых данных по категории или региону; средняя использует совместимое распределение; низкая заметно опирается на расчётные proxy-модели."],
];

const glossary = [
  ["ICP", "Идеальный профиль клиента: тип компании, для которого проблема особенно остра и продукт лучше всего подходит."],
  ["Beachhead", "Первый узкий рынок или регион, где проще доказать ценность и получить опорных клиентов."],
  ["ARR", "Годовая регулярная выручка по подпискам (Annual Recurring Revenue)."],
  ["TAM / SAM", "TAM — весь теоретический рынок; SAM — его реально достижимая часть для выбранного продукта и географии."],
  ["System of record", "Основная доверенная система, где хранится официальный набор данных, например CRM, ERP или EHR."],
  ["Overlay", "Надстройка над существующей системой: добавляет ценность без дорогой полной замены."],
  ["Control plane", "Единый слой управления политиками, правами, действиями и наблюдаемостью других систем."],
  ["CRM", "Система учёта клиентов и управления продажами."],
  ["ITSM / ESM", "Управление IT-услугами / всеми внутренними сервисами предприятия."],
  ["FinOps", "Практика управления и распределения затрат на облака, инфраструктуру и AI."],
  ["RAG", "Генерация ответа AI с поиском фактов в подключённой базе знаний."],
  ["KYB", "Проверка юридического лица, его владельцев и рисков (Know Your Business)."],
  ["AP / AR", "Кредиторская задолженность к оплате / дебиторская задолженность к получению."],
  ["MES / QMS", "Управление исполнением производства / управление качеством."],
  ["FSM", "Управление выездным сервисом: заявки, техники, запчасти и подтверждения работ."],
  ["Whitespace", "Конкретная плохо закрытая потребность внутри рынка; не означает отсутствие конкурентов."],
];

const regionOptions = ["Все", "США", "Европа", "СНГ", "MENA", "LatAm", "India", "SEA"];
const categoryOptions = ["Все", ...Array.from(new Set(markets.map((m) => m.category)))];
const strategyOptions = ["Все", "Import → РФ", "Export → world", "Обе"];
const categoryRu: Record<string, string> = {
  Horizontal: "Горизонтальное ПО",
  "IT & data": "IT и данные",
  "AI & automation": "AI и автоматизация",
  "Finance & compliance": "Финансы и соответствие",
  "Commerce & fintech": "Торговля и финтех",
  "Vertical SaaS": "Отраслевой SaaS",
};

function money(value: number) {
  return value < 1 ? `$${Math.round(value * 1000)}M` : `$${value.toFixed(value >= 10 ? 1 : 2)}B`;
}

function evidenceLabel(value: Evidence) {
  return value === "reported" ? "опубликовано (reported)" : value === "estimate" ? "оценка (estimate)" : "модель-аналог (proxy)";
}

const regionPhraseRu: Array<[string, string]> = [
  ["Not isolated", "отдельная оценка не выделена"],
  ["Software not isolated", "выручка ПО отдельно не выделена"],
  ["captured pool model", "модель доступного пула выручки"],
  ["report range", "диапазон отчёта"],
  ["derived", "расчёт из базовых данных"],
  ["estimate", "оценка"],
  ["proxy", "модель-аналог"],
  ["reported", "опубликованные данные"],
  ["Mature modernization", "зрелый рынок модернизации"],
  ["Mature expansion", "зрелый рынок с расширением функций"],
  ["Mature migration", "зрелый рынок миграции"],
  ["Mature core", "зрелое ядро"],
  ["Near saturation", "рынок близок к насыщению"],
  ["Very mature", "очень зрелый рынок"],
  ["Mature", "зрелый рынок"],
  ["Hypergrowth", "сверхбыстрый рост"],
  ["Fast growth", "быстрый рост"],
  ["Scaled growth", "масштабированный рост"],
  ["Regulated growth", "рост под влиянием регулирования"],
  ["Fragmented growth", "рост на раздробленном рынке"],
  ["Supply growth", "рост предложения"],
  ["Growth slowing", "рост замедляется"],
  ["Growth", "рост"],
  ["Crowded", "высокая конкуренция"],
  ["Consolidating", "идёт консолидация"],
  ["Consolidation", "консолидация"],
  ["Fragmented", "раздробленный рынок"],
  ["Country-fragmented", "рынок раздроблен по странам"],
  ["Early cloud", "ранний переход в облако"],
  ["Early", "ранняя стадия"],
  ["Scaled", "рынок масштабирован"],
  ["Largest", "крупнейший рынок"],
  ["Import substitution", "импортозамещение"],
  ["Sovereign demand", "спрос на суверенные решения"],
  ["Sovereignty tailwind", "рост спроса на суверенность"],
  ["Government-led", "спрос ведёт государство"],
  ["Mandate-created", "рынок создан обязательными требованиями"],
  ["Compliance-driven", "спрос создаёт compliance"],
  ["Sustainability-led", "спрос ведут требования устойчивости"],
  ["AI reset", "перезапуск из-за AI"],
  ["AI reopens market", "AI заново открывает рынок"],
  ["Fast GenAI adoption", "быстрое внедрение генеративного AI"],
  ["High-volume growth", "рост массовых процессов"],
  ["Marketplace-first", "маркетплейсы — основной канал"],
  ["Multi-country", "работа в нескольких странах"],
  ["Multi-channel", "работа в нескольких каналах"],
  ["Strong incumbents", "сильные действующие игроки"],
  ["local leaders", "локальные лидеры"],
  ["Local-cloud", "локальное облако"],
  ["Local cloud", "локальное облако"],
  ["Local APIs", "локальные API"],
  ["Local operators", "локальные операторы"],
  ["Local sponsor", "локальный партнёр"],
  ["local entity", "локальное юридическое лицо"],
  ["local forms", "локальные формы"],
  ["local labor forms", "локальные трудовые формы"],
  ["local payment methods", "локальные способы оплаты"],
  ["local AI audits", "локальные аудиты AI"],
  ["local-model", "локальных моделей"],
  ["local law corpus", "локальная база права"],
  ["local accounting", "локальный учёт"],
  ["local tax", "локальные налоги"],
  ["local support", "локальная поддержка"],
  ["local acquiring", "локальный эквайринг"],
  ["local channels", "локальные каналы"],
  ["localization", "локализация"],
  ["languages", "языки"],
  ["language variants", "языковые варианты"],
  ["residency", "размещение данных"],
  ["hosting", "хостинг"],
  ["procurement", "закупки"],
  ["partner sales", "партнёрские продажи"],
  ["partner-led", "продажи через партнёров"],
  ["trust", "доверие"],
  ["liability", "ответственность"],
  ["privacy", "приватность"],
  ["permissions", "права доступа"],
  ["security", "безопасность"],
  ["reporting", "отчётность"],
  ["certificates", "сертификаты"],
  ["accreditations", "аккредитации"],
  ["integration", "интеграция"],
  ["integrations", "интеграции"],
  ["connectors", "коннекторы"],
  ["APIs", "API"],
  ["price", "цена"],
  ["low ARPU", "низкая выручка на клиента (ARPU)"],
  ["Low ARPU", "низкая выручка на клиента (ARPU)"],
  ["Low price", "низкая цена"],
  ["Bundling", "пакетные предложения"],
  ["bundling", "пакетные предложения"],
  ["Platform bundling", "включение функции в платформу"],
  ["Native cloud tools", "встроенные инструменты облаков"],
  ["Native platform pressure", "давление встроенных функций платформ"],
  ["Crowded tools", "много конкурирующих инструментов"],
  ["ecosystem", "экосистема"],
  ["worker", "работников"],
  ["labor", "трудовые правила"],
  ["Labor", "трудовые правила"],
  ["Country rules", "правила отдельных стран"],
  ["Country methods", "локальные способы по странам"],
  ["State-by-state rules", "правила отдельных штатов"],
  ["State tenant law", "законы штатов об арендаторах"],
  ["State ethics/courts", "этика и суды отдельных штатов"],
  ["Country tax", "налоги отдельных стран"],
  ["Cross-border sanctions", "трансграничные санкционные ограничения"],
  ["sanctions", "санкции"],
  ["Sanctions", "санкции"],
  ["payments", "платежи"],
  ["Payments", "платежи"],
  ["banking APIs", "банковские API"],
  ["bank feeds", "банковские каналы данных"],
  ["Bank feeds", "банковские каналы данных"],
  ["tax mandates", "обязательные налоговые требования"],
  ["fiscal rules", "фискальные правила"],
  ["Fiscal rules", "фискальные правила"],
  ["fiscalization", "фискализация"],
  ["reimbursement", "возмещение"],
  ["Reimbursement", "возмещение"],
  ["payer APIs", "API страховщиков"],
  ["payer EDI", "EDI страховщиков"],
  ["medical data", "медицинские данные"],
  ["support", "поддержка"],
  ["migration", "миграция"],
  ["on-prem", "в своей инфраструктуре (on-prem)"],
  ["On-prem", "в своей инфраструктуре (on-prem)"],
  ["Air-gap", "изолированный контур (air-gap)"],
  ["offline", "офлайн"],
  ["Offline", "офлайн"],
  ["channels", "каналы"],
  ["Channel", "канал"],
  ["hardware", "оборудование"],
  ["Hardware", "оборудование"],
  ["financing", "финансирование"],
  ["Maps", "карты"],
  ["OCR", "распознавание документов (OCR)"],
  ["Arabic", "арабский язык"],
  ["German", "немецкий язык"],
  ["Russian", "российский"],
  ["Multilingual", "многоязычный"],
  ["Micro-vertical", "узкая отраслевая ниша"],
  ["Vertical", "отраслевой"],
  ["workflow", "рабочий процесс"],
  ["operations", "операции"],
  ["ops", "операции"],
  ["evidence", "доказательства"],
  ["reliability", "надёжность"],
  ["observability", "наблюдаемость"],
  ["quality", "качество"],
  ["routing", "маршрутизация"],
  ["maintenance", "обслуживание"],
  ["traceability", "прослеживаемость"],
  ["closeout", "закрытие работ"],
  ["handover", "передача результата"],
  ["margin", "маржа"],
  ["Cost", "затраты"],
  ["carbon", "углеродный след"],
  ["Unit economics", "юнит-экономика"],
  ["unit economics", "юнит-экономика"],
  ["action layer", "слой действий"],
  ["control", "контроль"],
  ["layer", "слой"],
  ["overlay", "надстройка"],
];

function regionRussian(value: string, kind: "stage" | "whitespace" | "barrier", market?: Market) {
  let translated = value;
  regionPhraseRu.forEach(([from, to]) => {
    translated = translated.split(from).join(to);
  });
  if (!market || kind === "stage") return translated;
  const ru = marketRu[market.id];
  return kind === "whitespace"
    ? `${ru.wedge} Локальный акцент: ${translated}.`
    : `${ru.barriers} Региональный акцент: ${translated}.`;
}

function scoreTone(value: number) {
  if (value >= 5) return "success" as const;
  if (value >= 4) return "info" as const;
  if (value <= 2) return "danger" as const;
  return "warning" as const;
}

function Score({ value, label }: { value: number; label: string }) {
  return <Stat value={`${value}/5`} label={label} tone={scoreTone(value)} />;
}

export default function GlobalB2BEntryOpportunities() {
  const theme = useHostTheme();
  const [view, setView] = useCanvasState("entry-view", "map");
  const [query, setQuery] = useCanvasState("entry-query", "");
  const [region, setRegion] = useCanvasState("entry-region", "Все");
  const [category, setCategory] = useCanvasState("entry-category", "Все");
  const [strategy, setStrategy] = useCanvasState("entry-strategy", "Все");
  const [selectedId, setSelectedId] = useCanvasState("entry-selected", "construction");
  const [sort, setSort] = useCanvasState("entry-sort", "opportunity");

  const filtered = markets
    .filter((m) => {
      const ru = marketRu[m.id];
      const regionalText = m.regions.map((r) => `${r.name} ${r.stage} ${r.whitespace} ${r.barriers} ${regionRussian(r.stage, "stage")} ${regionRussian(r.whitespace, "whitespace")} ${regionRussian(r.barriers, "barrier")}`).join(" ");
      const text = `${m.name} ${ru.name} ${ru.essence} ${m.category} ${m.wedge} ${ru.wedge} ${m.whitespace} ${ru.whitespace} ${m.barriers} ${ru.barriers} ${m.leaders} ${regionalText}`.toLowerCase();
      const strategyMatch =
        strategy === "Все" ||
        m.strategy === strategy ||
        (strategy === "Import → РФ" && m.importScore >= 4) ||
        (strategy === "Export → world" && m.exportScore >= 4);
      return (
        text.includes(query.toLowerCase()) &&
        (category === "Все" || m.category === category) &&
        (region === "Все" || m.regions.some((r) => r.name === region)) &&
        strategyMatch
      );
    })
    .sort((a, b) => {
      if (sort === "revenue") return b.current - a.current;
      if (sort === "growth") return b.cagr - a.cagr;
      if (sort === "import") return b.importScore - a.importScore || b.sam - a.sam;
      if (sort === "export") return b.exportScore - a.exportScore || b.sam - a.sam;
      return (b.importScore + b.exportScore + Math.min(b.cagr / 20, 1)) - (a.importScore + a.exportScore + Math.min(a.cagr / 20, 1));
    });

  const selected = markets.find((m) => m.id === selectedId) ?? filtered[0] ?? markets[0];
  const selectedRu = marketRu[selected.id];
  const selectedRegions = selected.regions.filter((r) => region === "Все" || r.name === region);
  const importTop = [...markets].sort((a, b) => b.importScore - a.importScore || b.sam - a.sam).slice(0, 10);
  const exportTop = [...markets].sort((a, b) => b.exportScore - a.exportScore || b.sam - a.sam).slice(0, 10);
  const dualHigh = markets.filter((m) => m.importScore >= 4 && m.exportScore >= 4).length;

  return (
    <Stack gap={22} style={{ padding: 24, maxWidth: 1580, margin: "0 auto", background: theme.bg.editor, color: theme.text.primary }}>
      <Stack gap={7}>
        <Text size="small" tone="tertiary">GLOBAL B2B ENTRY MAP · JULY 2026 · 2024/2025 DATA</Text>
        <H1>Где локализовать зарубежную идею — и что экспортировать из РФ</H1>
        <Text tone="secondary" style={{ maxWidth: 1050 }}>
          33 уникальных рынка B2B-ПО после устранения дублей. Фокус — достижимый стартовый клин (startup wedge), а не максимальный заявленный TAM.
          Все денежные значения — годовая чистая выручка поставщиков или платформ в USD; оценка (estimate) и модель-аналог (proxy) отмечены прямо.
        </Text>
      </Stack>

      <Grid columns={4} gap={14}>
        <Stat value="33" label="уникальных рынков" />
        <Stat value={dualHigh} label="обе оценки ≥4 / 5" tone="success" />
        <Stat value="7" label="регионов в сравнении" />
        <Stat value="10" label="конкретных продуктовых гипотез" tone="info" />
      </Grid>

      <Callout tone="warning" title="Не складывайте строки">
        Категории пересекаются, а коммерческие отчёты используют разные границы. Reported — опубликованная цифра;
        estimate — расчёт из совместимой базы; proxy — модель снизу вверх или смежного рынка. SAM — модель для решения, не заявление для фандрайзинга.
        Для РФ в исходных моделях использован ориентир 92–92.6 RUB/USD.
      </Callout>

      <Row gap={7} wrap>
        {[
          ["map", "Карта 33 рынков"],
          ["rankings", "Два топ-10"],
          ["products", "Какой продукт строить"],
          ["method", "Методика и источники"],
        ].map(([id, label]) => (
          <div key={id}><Pill active={view === id} onClick={() => setView(id)}>{label}</Pill></div>
        ))}
      </Row>

      {view === "map" && (
        <Stack gap={18}>
          <Grid columns="1.4fr 0.8fr 0.9fr 0.9fr 0.9fr" gap={10}>
            <TextInput value={query} onChange={setQuery} placeholder="Поиск по русскому или английскому тексту…" />
            <Select value={region} onChange={setRegion} options={regionOptions.map((x) => ({ value: x, label: `Регион: ${x}` }))} />
            <Select value={category} onChange={setCategory} options={categoryOptions.map((x) => ({ value: x, label: `Категория: ${categoryRu[x] ?? x}` }))} />
            <Select value={strategy} onChange={setStrategy} options={strategyOptions.map((x) => ({ value: x, label: `Стратегия: ${x}` }))} />
            <Select
              value={sort}
              onChange={setSort}
              options={[
                { value: "opportunity", label: "Сортировка: возможность" },
                { value: "revenue", label: "Текущая выручка" },
                { value: "growth", label: "Темп роста (CAGR)" },
                { value: "import", label: "Оценка импорта" },
                { value: "export", label: "Оценка экспорта" },
              ]}
            />
          </Grid>

          <Table
            stickyHeader
            striped
            headers={["Рынок", "Категория", "Текущая выручка", "TAM / SAM", "Рост / стадия", "Импорт", "Экспорт", "Уверенность", ""]}
            rows={filtered.map((m) => [
              <Stack gap={2}><Text weight="semibold">{marketRu[m.id].name}</Text><Text size="small" tone="tertiary">{m.name}</Text></Stack>,
              <Stack gap={2}><Text>{categoryRu[m.category] ?? m.category}</Text><Text size="small" tone="tertiary">{m.category}</Text></Stack>,
              <Stack gap={2}><Text>{m.currentLabel}</Text><Text size="small" tone="tertiary">{evidenceLabel(m.evidence)}</Text></Stack>,
              `${money(m.tam)} / ${money(m.sam)}`,
              <Stack gap={2}><Text>{m.cagr}% · {marketRu[m.id].stage}</Text><Text size="small" tone="tertiary">{m.stage}</Text></Stack>,
              `${m.importScore}/5`,
              `${m.exportScore}/5`,
              m.confidence,
              <Button variant={selected.id === m.id ? "primary" : "secondary"} onClick={() => setSelectedId(m.id)}>Разбор</Button>,
            ])}
            columnAlign={["left", "left", "right", "right", "left", "center", "center", "left", "right"]}
            rowTone={filtered.map((m) => m.importScore >= 5 && m.exportScore >= 5 ? "success" : m.exportScore >= 5 ? "info" : undefined)}
            style={{ maxHeight: 610 }}
          />

          <Divider />
          <Row justify="space-between" align="center" wrap gap={12}>
            <Stack gap={3}>
              <Text size="small" tone="tertiary">{categoryRu[selected.category] ?? selected.category} ({selected.category}) · {selected.strategy}</Text>
              <H2>{selectedRu.name}</H2>
              <Text tone="secondary">{selected.name}</Text>
              <Text style={{ maxWidth: 980 }}>{selectedRu.essence}</Text>
            </Stack>
            <Row gap={8}>
              <Pill active>{evidenceLabel(selected.evidence)}</Pill>
              <Pill>Уверенность: {selected.confidence}</Pill>
            </Row>
          </Row>

          <Grid columns="1.25fr 0.85fr" gap={18}>
            <Stack gap={14}>
              <Stack gap={5}>
                <H3>Лидеры / доля / выручка</H3>
                <Text>{selected.leaders}</Text>
              </Stack>
              <Stack gap={5}>
                <H3>Почему остаётся незакрытая потребность (whitespace)</H3>
                <Text>{selectedRu.whitespace}</Text>
              </Stack>
              <Stack gap={5}>
                <H3>Регуляторные и локализационные барьеры</H3>
                <Text tone="secondary">{selectedRu.barriers}</Text>
              </Stack>
            </Stack>
            <Card size="lg">
              <CardHeader trailing={<Pill size="sm">{selectedRu.stage}</Pill>}>Стартовый клин (startup wedge)</CardHeader>
              <CardBody>
                <Stack gap={14}>
                  <Text weight="semibold" style={{ color: theme.accent.primary }}>{selectedRu.wedge}</Text>
                  <Grid columns={2} gap={10}>
                    <Score value={selected.importScore} label="Import → РФ" />
                    <Score value={selected.exportScore} label="Export → world" />
                  </Grid>
                  <Grid columns={3} gap={10}>
                    <Stat value={selected.currentLabel.split(" ")[0]} label="текущая выручка" />
                    <Stat value={money(selected.sam)} label="практический SAM" />
                    <Stat value={`${selected.cagr}%`} label="среднегодовой рост (CAGR)" />
                  </Grid>
                  <Card collapsible>
                    <CardHeader>Оригинальная формулировка (EN)</CardHeader>
                    <CardBody>
                      <Stack gap={6}>
                        <Text><Text as="span" weight="semibold">Stage:</Text> {selected.stage}</Text>
                        <Text><Text as="span" weight="semibold">Whitespace:</Text> {selected.whitespace}</Text>
                        <Text><Text as="span" weight="semibold">Startup wedge:</Text> {selected.wedge}</Text>
                        <Text><Text as="span" weight="semibold">Barriers:</Text> {selected.barriers}</Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Stack>
              </CardBody>
            </Card>
          </Grid>

          <H3>США / Европа / СНГ и отдельные регионы роста</H3>
          <Grid columns={selectedRegions.length > 3 ? 2 : selectedRegions.length} gap={12}>
            {selectedRegions.map((r) => (
              <div key={`${selected.id}-${r.name}`}>
                <Card collapsible defaultOpen>
                  <CardHeader trailing={<Pill size="sm">{evidenceLabel(r.evidence)}</Pill>}>{r.name} · {r.revenue}</CardHeader>
                  <CardBody>
                    <Stack gap={7}>
                      <Text><Text as="span" weight="semibold">Стадия:</Text> {regionRussian(r.stage, "stage", selected)}</Text>
                      <Text><Text as="span" weight="semibold">Незакрытая возможность:</Text> {regionRussian(r.whitespace, "whitespace", selected)}</Text>
                      <Text tone="secondary"><Text as="span" weight="semibold">Барьеры:</Text> {regionRussian(r.barriers, "barrier", selected)}</Text>
                      <Text size="small" tone="tertiary">Оригинал (EN): Stage — {r.stage}; Whitespace — {r.whitespace}; Barrier — {r.barriers}.</Text>
                    </Stack>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Grid>

          <H3>Источники выбранного рынка</H3>
          <Table
            striped
            headers={["Источник", "Что подтверждает"]}
            rows={selected.sourceIds.map((id) => [<Link href={sources[id].url}>{sources[id].label}</Link>, sources[id].note])}
          />
        </Stack>
      )}

      {view === "rankings" && (
        <Stack gap={22}>
          <Callout tone="info" title="Как ранжировано">
            Сначала оценка (score), затем практический SAM. Это намеренно поднимает узкие достижимые клинья выше гигантских, но закрытых рынков.
            Равная оценка не означает одинаковый риск: уверенность (confidence) и барьеры остаются обязательной частью решения.
          </Callout>
          <Grid columns={2} gap={18}>
            <Stack gap={8}>
              <H2>Топ-10 для импорта → РФ</H2>
              <Text tone="secondary">Доказанный зарубежный рабочий процесс (workflow), который можно локализовать вокруг 1C, ЭДО, банков, локальных данных и отраслевых правил.</Text>
              <Table
                striped
                headers={["#", "Рынок", "Оценка", "SAM", "Конкретный стартовый клин"]}
                rows={importTop.map((m, i) => [i + 1, <Stack gap={2}><Text>{marketRu[m.id].name}</Text><Text size="small" tone="tertiary">{m.name}</Text></Stack>, `${m.importScore}/5`, money(m.sam), marketRu[m.id].wedge])}
                rowTone={importTop.map((_, i) => i < 3 ? "success" : i < 6 ? "info" : undefined)}
              />
            </Stack>
            <Stack gap={8}>
              <H2>Топ-10 для экспорта → мировой рынок</H2>
              <Text tone="secondary">Переносимая продуктовая и инженерная компетенция, где можно продавать слой ПО без лицензии и хранения денег.</Text>
              <Table
                striped
                headers={["#", "Рынок", "Оценка", "SAM", "Конкретный стартовый клин"]}
                rows={exportTop.map((m, i) => [i + 1, <Stack gap={2}><Text>{marketRu[m.id].name}</Text><Text size="small" tone="tertiary">{m.name}</Text></Stack>, `${m.exportScore}/5`, money(m.sam), marketRu[m.id].wedge])}
                rowTone={exportTop.map((_, i) => i < 3 ? "success" : i < 6 ? "info" : undefined)}
              />
            </Stack>
          </Grid>
          <Grid columns={3} gap={14}>
            <Card><CardHeader>Лучший кластер двойного применения</CardHeader><CardBody><Text>Выездной сервис, автопарки, строительство, фермы, рестораны и операции продавцов: сложные локальные процессы уже знакомы российским продуктовым командам.</Text></CardBody></Card>
            <Card><CardHeader>Лучший полностью цифровой экспорт</CardHeader><CardBody><Text>Управление агентами, надёжность знаний, FinOps для AI и self-hosted автоматизация: меньше процессов, специфичных для страны, но выше требования к доверию и безопасности.</Text></CardBody></Card>
            <Card><CardHeader>Не начинать с этого</CardHeader><CardBody><Text>Новые основные CRM, бухгалтерская система или EHR, BaaS/эквайринг, полный S2P и монолитная MES: дистрибуция, лицензии или внедрение важнее скорости разработки.</Text></CardBody></Card>
          </Grid>
        </Stack>
      )}

      {view === "products" && (
        <Stack gap={18}>
          <Stack gap={5}>
            <H2>Какой продукт строить: 10 проверяемых гипотез</H2>
            <Text tone="secondary">
              Каждая гипотеза задаёт узкий идеальный профиль клиента (ICP), первый опорный рынок (beachhead) и монетизацию. Следующий шаг — 15–20 интервью и 3 платных дизайн-партнёра, а не широкий MVP.
            </Text>
          </Stack>
          <Table
            stickyHeader
            striped
            headers={["#", "Продуктовая гипотеза", "Идеальный клиент (ICP)", "Первый рынок (beachhead)", "Монетизация", "Обоснование / доказательство"]}
            rows={theses.map((t, i) => [i + 1, <Stack gap={2}><Text weight="semibold">{t.productRu}</Text><Text size="small" tone="tertiary">{t.product}</Text></Stack>, t.icp, t.geo, t.money, t.proof])}
            rowTone={theses.map((_, i) => i < 3 ? "success" : i < 7 ? "info" : undefined)}
          />
          <Grid columns="1.2fr 1fr" gap={18}>
            <Callout tone="success" title="Правило продукта">
              Начинать как надстройка (overlay) к существующей основной системе (system of record). ROI должен быть виден за 30–90 дней:
              возвращённые деньги, меньше неуспешных доставок, более быстрое закрытие работ, ниже затраты на еду/топливо или готовые доказательства для аудита.
            </Callout>
            <Callout tone="warning" title="Готовность к экспорту">
              Для ЕС/MENA заранее нужны нейтральное юридическое лицо и хостинг, прозрачное происхождение IP, санкционная проверка, аудит безопасности,
              локальная поддержка и партнёр там, где закупки строятся на отношениях.
            </Callout>
          </Grid>
        </Stack>
      )}

      {view === "method" && (
        <Stack gap={20}>
          <H2>Методика, ограничения и происхождение данных</H2>
          <Table striped headers={["Термин", "Как применён"]} rows={methodology} />

          <Card collapsible>
            <CardHeader>Словарь терминов</CardHeader>
            <CardBody>
              <Table striped headers={["Термин", "Простое определение"]} rows={glossary} />
            </CardBody>
          </Card>

          <Grid columns={3} gap={14}>
            <Stack gap={5}>
              <H3>Устранённые дубли</H3>
              <Text tone="secondary">SaaS для локального и выездного сервиса SMB объединён с детальным FSM; обязательства CLM и операционный KYB объединены в один процесс риска поставщика и договора. Управление юридической практикой оставлено отдельно.</Text>
            </Stack>
            <Stack gap={5}>
              <H3>Региональные ограничения</H3>
              <Text tone="secondary">«Европа» — навигационная группа, не единый SAM. Великобритания, DACH, CEE и Южная Европа требуют отдельных цен, каналов и пакетов соответствия. MENA, Латинская Америка, Индия и SEA включены только при явном стартовом клине.</Text>
            </Stack>
            <Stack gap={5}>
              <H3>Чего цифры не доказывают</H3>
              <Text tone="secondary">Размер рынка не доказывает готовность сменить продукт. Выручка компании не считается долей категории, если поставщик многопродуктовый. Whitespace — пробел в рабочем процессе, а не свободная выручка.</Text>
            </Stack>
          </Grid>

          <Divider />
          <H3>Исходные публичные ссылки</H3>
          <Grid columns={2} gap={8}>
            {Object.entries(sources).map(([id, source]) => (
              <div key={id} style={{ padding: "8px 0", borderBottom: `1px solid ${theme.stroke.tertiary}` }}>
                <Row gap={10} align="start">
                  <Pill size="sm">{id}</Pill>
                  <Stack gap={2}>
                    <Link href={source.url}>{source.label}</Link>
                    <Text size="small" tone="tertiary">{source.note}</Text>
                  </Stack>
                </Row>
              </div>
            ))}
          </Grid>
          <Text size="small" tone="tertiary">
            Дата охвата (Scope date): публичные фактические данные 2024 года и оценки 2025 года; собрано в июле 2026 года из трёх исходных canvas.
            Коммерческие отчёты могут пересматривать исторические значения. Используйте отчёт для первичного отбора и приоритизации интервью, а не для оценки компании или заявлений при привлечении инвестиций.
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
