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

type Region = {
  name: string;
  revenue: string;
  status: "reported" | "derived" | "proxy";
  dynamics: string;
  barriers: string;
  opportunity: string;
};

type Source = { label: string; url: string; note: string };

type Market = {
  id: string;
  name: string;
  boundary: string;
  excludes: string;
  revenue2025: number;
  revenueLabel: string;
  cagr: number;
  stage: string;
  tam: string;
  sam: string;
  method: string;
  leaders: string;
  whitespace: string;
  wedge: string;
  importScore: number;
  exportScore: number;
  confidence: "Высокая" | "Средняя" | "Низкая";
  regions: Region[];
  sources: Source[];
};

const FX_NOTE =
  "Конвертация РФ: 92,6 RUB/USD для факта 2024; округление до двух значащих цифр. CIS-прокси = РФ + доступные открытые данные Казахстана/прочих стран; это не скрытая региональная статистика.";

const markets: Market[] = [
  {
    id: "crm",
    name: "Vertical-light CRM & sales execution",
    boundary:
      "CRM для SMB/mid-market: pipeline, activities, forecasting, sales engagement и минимальная RevOps-аналитика.",
    excludes: "Не включает marketing automation, contact-center seats, CPQ и ERP.",
    revenue2025: 83,
    revenueLabel: "$83,0B global platform revenue (2025)",
    cagr: 1.6,
    stage: "Зрелый / консолидация",
    tam:
      "$83B — фактический глобальный platform revenue 2025. Региональные независимые отчёты дают NA $32,7B и Europe $19,5B, но их таксономии шире; поэтому они показаны как отдельные ориентиры, а не сложены.",
    sam:
      "$1,5–3,0B: сервисные SMB 20–500 сотрудников в DACH/CEE/MENA с регулируемыми коммуникациями и локальными каналами.",
    method:
      "TAM = наблюдаемый vendor revenue; SAM bottom-up sanity check: 1,0–1,5 млн целевых фирм × $1–2k ARR, скорректировано на достижимую цифровую зрелость.",
    leaders:
      "Salesforce 25,8% CRM revenue 2025 (≈$21,4B по Metrigy); далее Microsoft, Adobe, Oracle. HubSpot и Pega — наиболее быстрый рост среди крупных.",
    whitespace:
      "Горизонтальная CRM занята, но лидеры оптимизируют крупные ACV. Не закрыты локальные messengers/telephony, explainable forecasting, data residency и простая миграция без SI.",
    wedge:
      "«Compliance-first sales cockpit»: WhatsApp/Telegram/телефония + авто-сводка встреч + прогноз, с EU/RU data residency и миграцией за 48 часов. Не строить ещё одну generic CRM.",
    importScore: 4,
    exportScore: 2,
    confidence: "Высокая",
    regions: [
      { name: "США / North America", revenue: "$32,7B (2025 report)", status: "reported", dynamics: "71,6% компаний используют CRM; зрелость, низкий CAGR core.", barriers: "SOC 2, HIPAA/FINRA по вертикалям; дорогой CAC и ecosystem lock-in.", opportunity: "Micro-vertical sales execution для field/service SMB." },
      { name: "Europe: UK / DACH / CEE", revenue: "$19,5B Europe (2025 report)", status: "reported", dynamics: "UK быстрее (14,2% forecast в одном широком отчёте); DACH требует локализации; CEE price-sensitive.", barriers: "GDPR, Schrems II, EU data residency; немецкий язык и works councils.", opportunity: "Sovereign CRM layer поверх почты/телефонии; DACH-first." },
      { name: "СНГ", revenue: "РФ ≈$0,53B (₽44,1B, 2025)", status: "reported", dynamics: "+25% г/г; >90% локальных решений, импортозамещение в основном завершено.", barriers: "152-ФЗ, локальное хостинг/телефония, платежи; Bitrix24/amoCRM distribution.", opportunity: "AI sales quality/forecasting как add-on, не новая система записей." },
      { name: "MENA", revenue: "Не публикуется надёжно; SAM proxy", status: "proxy", dynamics: "CRM ещё растёт вместе с digital government и WhatsApp commerce.", barriers: "Arabic RTL, UAE/KSA residency, local reseller motion.", opportunity: "Arabic/English WhatsApp-first CRM для сервисных SMB." },
    ],
    sources: [
      { label: "Metrigy CRM 2025", url: "https://www.metrigy.com/product/crm-quarterly-market-share-forecast-report-2025-4q25/", note: "$83B, CAGR 1.6%, Salesforce 25.8%." },
      { label: "North America CRM", url: "https://www.researchandmarkets.com/reports/6096355/north-america-customer-relationship-management", note: "$32.67B regional estimate." },
      { label: "Europe CRM", url: "https://www.expertmarketresearch.com/reports/europe-customer-relationship-management-market", note: "$19.48B Europe estimate." },
      { label: "TAdviser Russia CRM", url: "https://tadviser.com/index.php/Article:CRM_(Russian_market)", note: "₽44.1B in 2025." },
    ],
  },
  {
    id: "hr",
    name: "Recruiting & talent operations",
    boundary:
      "ATS, recruiting CRM, interview workflow, skills/talent intelligence и onboarding; core payroll только как интеграция.",
    excludes: "Не включает payroll processing volume, benefits brokerage и staffing agency revenue.",
    revenue2025: 23.3,
    revenueLabel: "$23,3B global HR software (2025)",
    cagr: 12.4,
    stage: "Scale-up / suite bundling",
    tam:
      "$23,3B global HR software 2025 (шире wedge); narrower recruiting/talent SAM выведен bottom-up.",
    sam:
      "$2,0–4,5B: mid-market hiring teams, staffing firms и distributed employers с 20+ hires/year; $4–15k ARR × 0,4M reachable accounts.",
    method:
      "TAM top-down по vendor revenue; SAM исключает payroll/benefits и применяет account × ARR с 35–55% digital-readiness.",
    leaders:
      "SAP ≈14% и Workday ≈11% широкого HR software по F.B.I.; Workday company revenue не равно HCM share. UKG/Oracle/ADP сильны в suites.",
    whitespace:
      "Suite leaders продают систему записи; кандидаты и hiring managers всё ещё живут в email/messengers. Локальные трудовые правила и языки делают глобальный one-size-fits-all дорогим.",
    wedge:
      "AI interview operations: structured evidence, consent, skills extraction и audit trail; локальные job boards + Telegram/WhatsApp; human-in-the-loop без black-box ranking.",
    importScore: 5,
    exportScore: 3,
    confidence: "Средняя",
    regions: [
      { name: "США / North America", revenue: "≈$8,9B (38% × global)", status: "derived", dynamics: "Зрелый HCM, но AI recruiting быстро растёт.", barriers: "EEOC, NYC AEDT/local bias audits, state privacy; integrations with Workday/ADP.", opportunity: "Auditable interview evidence layer for mid-market." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$6,3B (27% × global)", status: "derived", dynamics: "UK легче для SaaS; DACH сложнее из-за works councils; CEE — multilingual shared services.", barriers: "GDPR special-category data, EU AI Act high-risk employment use, labor law localization.", opportunity: "EU-hosted, non-ranking copilot with consent and explainability." },
      { name: "СНГ", revenue: "РФ ≈$0,23B proxy (₽21B, 2024)", status: "proxy", dynamics: "15–25% growth; fragmented ATS/WFM/job-board ecosystem.", barriers: "152-ФЗ, кадровый ЭДО, локальные job boards, labor forms.", opportunity: "Mass-hiring operations + Telegram + 1C/ZUP integration." },
      { name: "India / SEA", revenue: "Не выделено; strong opportunity", status: "proxy", dynamics: "Large hiring volumes, BPO/IT services and mobile-first workflows.", barriers: "Very low ARPU, local payroll, languages; DPDP in India.", opportunity: "High-volume multilingual interview QA sold per completed hire." },
    ],
    sources: [
      { label: "Fortune BI HR software", url: "https://www.fortunebusinessinsights.com/hr-software-market-116228", note: "$23.32B, regional shares, leaders." },
      { label: "Grand View HRM", url: "https://www.grandviewresearch.com/industry-analysis/human-resource-management-hrm-market", note: "Cross-check: $27.51B 2024; NA 36.21%." },
      { label: "EU AI Act employment", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", note: "Employment AI may be high-risk." },
      { label: "TAdviser SaaS Russia", url: "https://tadviser.com/index.php/Article:Features_of_the_development_of_the_Russian_SaaS_market", note: "Context for Russian SaaS range." },
    ],
  },
  {
    id: "work",
    name: "Project & work management",
    boundary:
      "Collaborative task/project/portfolio planning and resource visibility; async workflow included.",
    excludes: "Не включает video conferencing, email, office suites и developer issue tracking sold as DevOps.",
    revenue2025: 10,
    revenueLabel: "$10,0B global project-management software (2025)",
    cagr: 9.3,
    stage: "Зрелый / AI rebundling",
    tam: "$10,03B observed annual vendor revenue 2025.",
    sam:
      "$0,8–1,8B for regulated/industrial mid-market portfolio execution in DACH/CEE/CIS: 100–250k accounts × $5–8k ARR.",
    method:
      "TAM report value; SAM bottom-up and excludes general collaboration seats bundled free with Microsoft/Google.",
    leaders:
      "Microsoft ecosystem, Atlassian/Jira/Trello, Monday, Asana, Smartsheet, ClickUp. Asana Q4 FY25 $188M; Monday ≈$900M ARR cited for FY25.",
    whitespace:
      "Generic kanban is commodity and Microsoft bundles aggressively. Gap remains between easy task tools and heavyweight PPM, especially where work evidence, capacity and auditability matter.",
    wedge:
      "Evidence-based delivery cockpit for agencies/engineering consultancies: plan-vs-actual from Git/email/docs, capacity and margin risk; integrate with existing Jira/Teams.",
    importScore: 3,
    exportScore: 3,
    confidence: "Средняя",
    regions: [
      { name: "США / North America", revenue: "≈$3,6B (36,1% × global)", status: "derived", dynamics: "Near saturation; AI assistants replace incremental seat growth.", barriers: "Microsoft/Atlassian bundling, SOC 2, high CAC.", opportunity: "Vertical PPM overlay with measurable margin ROI." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$2,7–2,9B proxy", status: "proxy", dynamics: "UK SaaS-friendly; DACH industrial demand; CEE delivery centers.", barriers: "GDPR, data residency, German support; procurement expects SSO/audit.", opportunity: "EU-hosted client-delivery evidence and resource planning." },
      { name: "СНГ", revenue: "≈$0,10–0,18B proxy", status: "proxy", dynamics: "Import substitution and bundled Bitrix24/Yandex/VK tools compress price.", barriers: "Low ARPU, local integrations, on-prem demand.", opportunity: "Professional-services margin/capacity layer over existing tools." },
    ],
    sources: [
      { label: "Project software 2025", url: "https://www.theinsightpartners.com/reports/project-management-software-market", note: "$10.03B and 9.26% CAGR." },
      { label: "Mordor project systems", url: "https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market", note: "NA 36.12%; vendor datapoints." },
      { label: "EU cloud adoption", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Cloud_computing_-_statistics_on_the_use_by_enterprises", note: "Regional adoption context." },
    ],
  },
  {
    id: "itsm",
    name: "Mid-market ITSM / enterprise service management",
    boundary:
      "Incident/request/change, service catalog, asset/CMDB-lite and employee service workflows.",
    excludes: "Не включает observability/APM, MSP labor и broad CRM support desks.",
    revenue2025: 13.6,
    revenueLabel: "$13,6B global ITSM (2025)",
    cagr: 15.3,
    stage: "Scale / platform expansion",
    tam: "$13.58B vendor + platform revenue 2025; cross-check cloud ITSM $11.09B.",
    sam:
      "$1,2–2,4B: 500–5,000 employee organizations underserved between Freshservice/Jira and ServiceNow; 40–80k accounts × $20–30k ARR.",
    method:
      "TAM uses broad ITSM report; SAM excludes services and top enterprise accounts, then account × ACV.",
    leaders:
      "ServiceNow, BMC, Atlassian, Ivanti, Freshworks/ManageEngine. ServiceNow FY24 total revenue >$10B, but not all is ITSM; do not treat company revenue as category share.",
    whitespace:
      "ServiceNow overkill for mid-market; simpler desks lack process mining, reliable CMDB and cross-department workflows. Implementation cost is often larger than license.",
    wedge:
      "Deploy-in-a-week ESM for regulated mid-market: discover assets/connectors, generate service catalog, evidence-ready approvals, AI triage with on-prem/private inference.",
    importScore: 5,
    exportScore: 4,
    confidence: "Высокая",
    regions: [
      { name: "США / North America", revenue: "≈$5,9B (43,2% × global)", status: "derived", dynamics: "Mature ITIL; ESM and AI virtual agents drive expansion.", barriers: "ServiceNow ecosystem, FedRAMP/HIPAA in verticals, integration depth.", opportunity: "Mid-market deployment automation and predictable pricing." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$3,7B proxy (27%)", status: "proxy", dynamics: "DACH ≈22% of Europe in one estimate; hybrid/on-prem persists.", barriers: "GDPR, NIS2, residency, works councils, ITIL procurement.", opportunity: "Sovereign ESM for manufacturers and regulated services." },
      { name: "СНГ", revenue: "РФ ≈$0,11–0,38B (₽10–35B)", status: "reported", dynamics: "15–20% in 2025; Naumen leads disclosed ranking.", barriers: "On-prem, Russian stack/CMDB, procurement certification; wide estimate range.", opportunity: "AI-assisted migration from legacy desks + non-IT service catalog." },
      { name: "MENA", revenue: "Not reliable; attractive enterprise pocket", status: "proxy", dynamics: "Government and large groups modernize shared services.", barriers: "Arabic, local hosting, partner-led sales, long procurement.", opportunity: "Arabic/English sovereign ESM via local integrators." },
    ],
    sources: [
      { label: "Fortune BI ITSM", url: "https://www.fortunebusinessinsights.com/itsm-market-109485", note: "$13.58B 2025, 15.3%, NA share." },
      { label: "Cloud ITSM", url: "https://www.marketsandmarkets.com/Market-Reports/cloud-based-itsm-market-261087410.html", note: "$11.09B 2025 cross-check." },
      { label: "TAdviser Russia ITSM", url: "https://tadviser.com/index.php/Article:Russian_ITSM_Systems_Market", note: "₽10–35B range; vendor ranking." },
    ],
  },
  {
    id: "cyber",
    name: "Cloud security posture for mid-market",
    boundary:
      "Software-led CSPM/CIEM, SaaS posture and continuous compliance evidence for multi-cloud/Kubernetes.",
    excludes: "Не включает hardware, consumer security, SOC labor, broad MSSP and endpoint suites.",
    revenue2025: 42.8,
    revenueLabel: "$42,8B cyber security software tools (2025)",
    cagr: 11.8,
    stage: "Growth / consolidation",
    tam:
      "$42.8B narrow software-tool proxy. Broad cybersecurity is $219–262B and is deliberately not used as product TAM.",
    sam:
      "$1,0–2,2B: cloud-active companies with 50–2,000 employees outside Fortune 2000; 100–180k accounts × $10–15k ARR.",
    method:
      "TAM narrows to software tools; SAM requires public cloud + compliance trigger and excludes enterprise accounts targeted by Palo Alto/Wiz.",
    leaders:
      "Palo Alto, Microsoft, CrowdStrike, Wiz, Check Point, Fortinet, Cloudflare. Company revenues span categories; CrowdStrike FY25 $3.95B and PANW FY25 $9.22B are scale anchors, not CSPM shares.",
    whitespace:
      "Platforms consolidate for large enterprises; SMB tools produce alerts without remediation ownership. Sovereignty and local cloud connectors fragment Europe/CIS/MENA.",
    wedge:
      "Autofix-ready cloud compliance for 50–2,000 employees: evidence graph + safe IaC pull requests + local cloud support; sell to MSP/MSSP rather than direct-only.",
    importScore: 4,
    exportScore: 5,
    confidence: "Средняя",
    regions: [
      { name: "США / North America", revenue: "≈$16–18B narrow software proxy", status: "derived", dynamics: "Largest, crowded and consolidating; strong compliance spend.", barriers: "SOC 2 credibility, security trust, liability, incumbent platforms.", opportunity: "MSP-distributed remediation, not another alert dashboard." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$11,8B (27,6% × narrow proxy)", status: "derived", dynamics: "NIS2/CRA create mandatory spend; DACH prefers EU hosting.", barriers: "NIS2, GDPR, EU Cybersecurity Act, data localization and national procurement.", opportunity: "EU sovereign continuous evidence + local cloud/K8s." },
      { name: "СНГ", revenue: "РФ broad ≈$3,4B (₽314B, 2024)", status: "reported", dynamics: "Broad market +26%; cloud security smaller, ≈₽5B in 2023 growing toward ₽32B by 2028.", barriers: "FSTEC/FSS, sanctions/export controls, trust and certification.", opportunity: "Local-cloud CSPM + evidence automation; channel through integrators." },
      { name: "MENA", revenue: "No robust narrow figure; high-value pocket", status: "proxy", dynamics: "KSA/UAE cloud and regulatory spend rising.", barriers: "Residency, Arabic, government procurement and local partner.", opportunity: "Sovereign cloud posture sold with regional MSSPs." },
    ],
    sources: [
      { label: "Cyber software tools", url: "https://dataintelo.com/report/cyber-security-software-tool-market", note: "$42.8B narrow proxy; Europe 27.6%." },
      { label: "Broad cyber cross-check", url: "https://www.fortunebusinessinsights.com/industry-reports/cyber-security-market-101165", note: "$218.98B including broader scope." },
      { label: "Russia cyber forecast", url: "https://www.csr.ru/upload/iblock/233/lio2l8p775bu8lhddpaja8f6fto01x8s.pdf", note: "₽314B broad market, +26.3%." },
      { label: "Russia cloud security", url: "https://www.cnews.ru/news/line/2024-12-03_sk_capital_i_kod_bezopasnosti", note: "₽5B 2023 to ₽32B 2028." },
    ],
  },
  {
    id: "bi",
    name: "Embedded BI & governed metrics",
    boundary:
      "BI software, semantic metrics, dashboards and embedded analytics used by business teams.",
    excludes: "Не включает data warehouse consumption, ETL, consulting and data-science labor.",
    revenue2025: 40.1,
    revenueLabel: "$40,1B global BI software (2025)",
    cagr: 9.3,
    stage: "Mature / GenAI transition",
    tam: "$40.1B observed BI software revenue 2025.",
    sam:
      "$1,0–2,0B: B2B SaaS vendors and mid-market firms needing customer-facing analytics/metric governance; 80–150k accounts × $8–15k ARR.",
    method:
      "Top-down BI revenue; SAM excludes lakehouse/warehouse and requires embedded or governed-metric use case.",
    leaders:
      "Microsoft Power BI, Salesforce Tableau, Qlik, SAP, Google Looker; together with suites they own distribution. Snowflake/Databricks attack from data layer but their revenue is not BI revenue.",
    whitespace:
      "Dashboard authoring is commoditized. Persistent gaps: trusted metric definitions, row-level permissions, white-label embedding and explainable natural-language answers.",
    wedge:
      "Headless metric layer + conversational analysis for B2B SaaS: generates governed customer-facing dashboards and audit trail from dbt/SQL, with EU/on-prem option.",
    importScore: 4,
    exportScore: 4,
    confidence: "Высокая",
    regions: [
      { name: "США / North America", revenue: "$14,8B (37% × global)", status: "derived", dynamics: "Large but Power BI price anchor is severe.", barriers: "Microsoft bundling, SOC 2, deep data connectors.", opportunity: "Embedded analytics priced by tenant, not viewer." },
      { name: "Europe: UK / DACH / CEE", revenue: "$9,5–11B (sources differ)", status: "reported", dynamics: "UK financial analytics; DACH SAP base; CEE engineering talent.", barriers: "GDPR, data lineage, residency, EU AI Act for generated explanations.", opportunity: "EU-hosted governed metrics and multilingual NLQ." },
      { name: "СНГ", revenue: "≈$0,18–0,35B proxy", status: "proxy", dynamics: "Western BI exits create migration demand; local vendors improving.", barriers: "On-prem, ClickHouse/1C/Postgres connectors, low seat ARPU.", opportunity: "Embedded BI/semantic layer over Russian data stack." },
      { name: "India / SEA", revenue: "Not isolated; fastest-growth pocket", status: "proxy", dynamics: "India analytics demand ≈15% growth in one broad source.", barriers: "Price sensitivity, local clouds, fragmented procurement.", opportunity: "OEM embedded analytics for regional SaaS vendors." },
    ],
    sources: [
      { label: "Grand View BI", url: "https://www.grandviewresearch.com/industry-analysis/business-intelligence-software-market", note: "$40.1B, 9.3%, NA 37%." },
      { label: "BI regional cross-check", url: "https://pmarketresearch.com/worldwide-business-intelligence-market-research/", note: "NA $14.37B, Europe $9.46B." },
      { label: "EU GDPR", url: "https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en", note: "Data governance baseline." },
    ],
  },
  {
    id: "finops",
    name: "FinOps for AI, Kubernetes & local clouds",
    boundary:
      "Software that allocates, forecasts and governs cloud/AI/Kubernetes spend across engineering and finance.",
    excludes: "Не включает cloud infrastructure revenue, reseller gross billings or generic ITAM services.",
    revenue2025: 14.4,
    revenueLabel: "$14,4B cloud FinOps software+services (2025)",
    cagr: 9.6,
    stage: "Growth / platform formation",
    tam:
      "$14.39B report total includes software and services; pure software is lower. Range across reports $9.4–15.6B signals taxonomy uncertainty.",
    sam:
      "$0,6–1,4B: firms spending $0.5–20M/year on cloud/AI outside top enterprise; 30–60k accounts × $20–25k ARR.",
    method:
      "TAM report range; SAM bottom-up requires meaningful variable cloud bill and excludes managed-service labor.",
    leaders:
      "IBM Apptio/Cloudability, Broadcom CloudHealth, Flexera/Spot, Harness, CloudZero; hyperscalers provide free native tools.",
    whitespace:
      "Native tools are single-cloud; enterprise suites are expensive and reporting-heavy. AI token economics, unit cost and local cloud billing are immature.",
    wedge:
      "FinOps for AI products: cost per customer/workflow, GPU/token commitments, anomaly guardrails and chargeback; connectors for regional clouds and ClickHouse/K8s.",
    importScore: 4,
    exportScore: 5,
    confidence: "Средняя",
    regions: [
      { name: "США / North America", revenue: "$5,4B (37,45% × global)", status: "derived", dynamics: "Mature FinOps teams; AI spend reopens category.", barriers: "AWS/Azure/GCP native tools, trust in billing data, enterprise integrations.", opportunity: "AI unit economics for $0.5–20M cloud spend." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$3,4–4,0B proxy", status: "proxy", dynamics: "GreenOps and sovereignty add requirements.", barriers: "GDPR, EU cloud contracts, sustainability reporting; fragmented resellers.", opportunity: "Cost + carbon + residency policy engine." },
      { name: "СНГ", revenue: "≈$30–80M software proxy", status: "proxy", dynamics: "Early market; rising local-cloud bills and weak tooling.", barriers: "Billing APIs differ, market education, low ACV, on-prem private cloud.", opportunity: "Multi-cloud cost allocation for Yandex/VK/Selectel/MTS + K8s." },
      { name: "MENA", revenue: "Not isolated; strong enterprise pocket", status: "proxy", dynamics: "Large cloud programs create governance need.", barriers: "Partner sales, sovereign cloud, procurement.", opportunity: "FinOps managed cockpit localized for KSA/UAE groups." },
    ],
    sources: [
      { label: "Mordor Cloud FinOps", url: "https://www.mordorintelligence.com/industry-reports/cloud-finops-market", note: "$14.39B 2025, NA 37.45%." },
      { label: "Fact.MR definition", url: "https://www.factmr.com/report/cloud-finops-market", note: "Explicit software/services/API scope and methodology." },
      { label: "FinOps Foundation", url: "https://www.finops.org/framework/", note: "Category framework." },
    ],
  },
  {
    id: "genai",
    name: "Enterprise GenAI agents & governance",
    boundary:
      "Enterprise software for building, operating and governing text/code/workflow agents; orchestration, evaluation, permissions and audit.",
    excludes: "Не включает GPU/cloud infrastructure, consumer subscriptions, foundation-model training and consulting-heavy transformation.",
    revenue2025: 4.1,
    revenueLabel: "≈$4,1B derived global enterprise GenAI (2025)",
    cagr: 38.4,
    stage: "Emerging / hypergrowth",
    tam:
      "2024 global $2.94B; 2025 ≈$4.07B by applying 38.4% CAGR. This is derived, not a reported 2025 point.",
    sam:
      "$0,7–1,8B: regulated mid-market/enterprise agent governance and evaluation, excluding model/API spend; 10–30k accounts × $50–60k ARR.",
    method:
      "TAM forward-calculated one year from reported 2024. SAM isolates control-plane software and excludes tokens/cloud/services.",
    leaders:
      "Microsoft, Google, AWS, OpenAI, Anthropic, Salesforce, ServiceNow plus LangChain/LangSmith, Glean, Dataiku. Shares are not reliably disclosed; bundling is accelerating.",
    whitespace:
      "Models and orchestration commoditize quickly, but enterprises lack permission-aware action controls, repeatable evals, cost attribution and incident replay across vendors.",
    wedge:
      "Vendor-neutral agent control plane: policy-as-code, red-team/evals, action approval, replay and cost per successful task; private deployment and open-model support.",
    importScore: 5,
    exportScore: 5,
    confidence: "Средняя",
    regions: [
      { name: "США / North America", revenue: "≈$1,67B (41% × derived global)", status: "derived", dynamics: "Hypergrowth and brutal platform competition.", barriers: "Trust, model-vendor bundling, SOC 2, rapid obsolescence.", opportunity: "Cross-vendor agent reliability and action governance." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$0,9–1,1B proxy", status: "proxy", dynamics: "≈37% CAGR; Germany led 2023 Europe in cited report.", barriers: "EU AI Act, GDPR, copyright, works councils, model/data residency.", opportunity: "EU-hosted eval/governance for internal agents." },
      { name: "СНГ", revenue: "≈$0,10–0,25B proxy", status: "proxy", dynamics: "Fast pilots, constrained model/payment access; strong local LLM demand.", barriers: "Data localization, sanctions, compute, Russian-language quality.", opportunity: "Private agent runtime/governance over GigaChat/Yandex/open models." },
      { name: "MENA", revenue: "Not isolated; strong sovereign-AI pocket", status: "proxy", dynamics: "UAE/KSA invest in sovereign AI and Arabic.", barriers: "Arabic evaluation, residency, government procurement.", opportunity: "Arabic agent eval + policy control plane." },
    ],
    sources: [
      { label: "Enterprise GenAI global", url: "https://www.grandviewresearch.com/industry-analysis/enterprise-generative-ai-market-report", note: "$2.941B 2024, 38.4%, NA 41%." },
      { label: "NA agentic AI", url: "https://www.grandviewresearch.com/horizon/outlook/enterprise-agentic-ai-market/north-america", note: "$1.039B 2024, 44.2% CAGR." },
      { label: "Europe enterprise GenAI", url: "https://www.giiresearch.com/report/kbv1661711-europe-enterprise-generative-ai-market-size-share.html", note: "37.2% CAGR; country differences." },
      { label: "EU AI Act", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", note: "Risk and transparency obligations." },
    ],
  },
  {
    id: "clm",
    name: "CLM, e-sign & obligation workflow",
    boundary:
      "Contract request, drafting, approvals, repository, e-sign integration, obligation/risk extraction.",
    excludes: "Не включает legal services, generic ECM, notary fees and transaction value.",
    revenue2025: 1.78,
    revenueLabel: "$1,78B global CLM software (2025)",
    cagr: 12.8,
    stage: "Growth / AI expansion",
    tam:
      "$1.78B narrow CLM software 2025. E-signature platforms are adjacent ($7.04B 2025) and not added to avoid overlap.",
    sam:
      "$0,45–0,9B: sales/procurement contracting in 200–5,000 employee firms, 30–60k accounts × $12–18k ARR.",
    method:
      "TAM uses narrow CLM report; adjacent e-sign disclosed separately. SAM excludes global enterprise and legal services.",
    leaders:
      "DocuSign (company FY25 $2.98B, mostly e-sign), Icertis, Ironclad, Conga, Sirion, Agiloft, SAP Ariba/Coupa. Company revenue cannot be mapped 1:1 to CLM.",
    whitespace:
      "Top CLM implementations are expensive and legal-led; SMB e-sign stops at signature. Post-sign obligations and revenue/procurement handoff remain manual.",
    wedge:
      "Post-sign obligation autopilot: ingest signed contracts, assign owners, sync renewals/SLA/pricing to CRM/ERP, evidence every extraction; local legal templates.",
    importScore: 5,
    exportScore: 4,
    confidence: "Высокая",
    regions: [
      { name: "США / North America", revenue: "≈$0,78B (44% × global)", status: "derived", dynamics: "Largest CLM pool; legal-tech mature.", barriers: "DocuSign/Ironclad distribution, SOC 2, state contract law.", opportunity: "Post-sign obligations for mid-market RevOps/procurement." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$0,87B Europe in one report", status: "reported", dynamics: "12.9% Europe CAGR; UK legal SaaS easier, DACH signature rigor higher.", barriers: "eIDAS 2.0, GDPR, qualified signatures, local contract language.", opportunity: "eIDAS-aware obligation layer, not signature commodity." },
      { name: "СНГ", revenue: "≈$0,10–0,20B proxy", status: "proxy", dynamics: "ЭДО/e-sign strong, CLM intelligence less mature.", barriers: "63-ФЗ, qualified signatures, operator integrations, local legal forms.", opportunity: "Obligation extraction connected to Диадок/СБИС/1C." },
      { name: "India / SEA", revenue: "Strong adjacent e-sign growth", status: "proxy", dynamics: "Aadhaar/e-KYC and mobile workflows accelerate adoption.", barriers: "National identity/signature rules and low ARPU.", opportunity: "Mobile-first contract operations for distributed sales." },
    ],
    sources: [
      { label: "MRFR CLM", url: "https://www.marketresearchfuture.com/reports/contract-lifecycle-management-software-market-11659", note: "$1.781B, 12.8%, regional data." },
      { label: "Grand View CLM", url: "https://www.grandviewresearch.com/industry-analysis/contract-lifecycle-management-software-market-report", note: "NA 37.1%; Europe CAGR 12.9%." },
      { label: "Mordor e-sign", url: "https://www.mordorintelligence.com/industry-reports/global-e-signature-platform-market", note: "Adjacent $7.04B, NA 37.2%." },
      { label: "EU eIDAS", url: "https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation", note: "European trust-services baseline." },
    ],
  },
  {
    id: "support",
    name: "Customer support automation",
    boundary:
      "External customer help desk, omnichannel case management, knowledge suggestions and AI resolution.",
    excludes: "Не включает internal ITSM, BPO labor, telephony carrier revenue and full CCaaS infrastructure.",
    revenue2025: 12,
    revenueLabel: "$12,0B global help-desk software (2025)",
    cagr: 7,
    stage: "Mature core / AI disruption",
    tam:
      "$12.02B help-desk software 2025. GenAI support automation is a smaller adjacent layer and not added.",
    sam:
      "$0,9–2,0B: multilingual B2B/B2C support teams with 10–300 agents; 30–70k accounts × $25–30k ARR.",
    method:
      "TAM category report; SAM excludes internal service desks and CCaaS, requires sufficient ticket volume for ROI.",
    leaders:
      "Zendesk, Salesforce, ServiceNow, Intercom, Freshworks, Zoho. AI vendors include Forethought, Cresta, Kore.ai; platform shares are not cleanly disclosed.",
    whitespace:
      "Ticketing is crowded, but resolution quality, safe action-taking and long-tail languages lag. Incumbent AI pricing often charges per resolution without transparent QA.",
    wedge:
      "Resolution QA + action agent for regulated support: policy-grounded answers, deterministic back-office actions, multilingual eval set and per-resolution audit.",
    importScore: 4,
    exportScore: 4,
    confidence: "Средняя",
    regions: [
      { name: "США / North America", revenue: "$5,4B (45% × global)", status: "derived", dynamics: "Mature seats; AI resolution shifts pricing to outcomes.", barriers: "Incumbent distribution, SOC 2/HIPAA/PCI, model accuracy liability.", opportunity: "Vertical action agents with measurable containment and QA." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$3,0–3,5B proxy", status: "proxy", dynamics: "Multilingual complexity raises automation value.", barriers: "GDPR, recording consent, EU AI Act transparency, works councils.", opportunity: "EU-hosted multilingual QA and agent assist." },
      { name: "СНГ", revenue: "≈$0,12–0,25B proxy", status: "proxy", dynamics: "Telegram/VK/voice-heavy; local suites and contact centers.", barriers: "152-ФЗ, Russian speech quality, channel APIs, low ARPU.", opportunity: "Russian-language QA and safe action agent over existing desks." },
      { name: "LatAm / India / SEA", revenue: "No clean narrow figure; strong opportunity", status: "proxy", dynamics: "Large outsourced support workforce and multilingual digital commerce.", barriers: "Price, local messaging, labor economics, language variants.", opportunity: "Agent assist sold through BPOs; WhatsApp-first resolution." },
    ],
    sources: [
      { label: "MRFR Help Desk", url: "https://www.marketresearchfuture.com/reports/help-desk-software-market-31814", note: "$12.02B, 6.97%, NA 45%." },
      { label: "GenAI support automation", url: "https://www.mordorintelligence.com/industry-reports/generative-ai-in-customer-support-automation-and-conversational-agents-market", note: "NA 39.61%, APAC fastest." },
      { label: "Service desk cross-check", url: "https://www.theinsightpartners.com/reports/service-desk-software-market", note: "Narrower $6.47B taxonomy." },
    ],
  },
  {
    id: "search",
    name: "Enterprise search & knowledge agents",
    boundary:
      "Permission-aware search/RAG across workplace systems, knowledge curation and answer quality/governance.",
    excludes: "Не включает public web search ads, ECM storage, intranet implementation labor and model API spend.",
    revenue2025: 5.34,
    revenueLabel: "$5,34B global enterprise search (2025)",
    cagr: 9.1,
    stage: "Growth / GenAI reset",
    tam:
      "$5.34B narrow enterprise search. Broader knowledge-management software is $13.7B; not summed because of overlap.",
    sam:
      "$0,7–1,5B: 500–10k employee organizations with fragmented SaaS/on-prem knowledge; 10–25k accounts × $50–60k ARR.",
    method:
      "TAM narrow report; SAM account × ACV and excludes Microsoft/Google bundled basic search and services.",
    leaders:
      "Microsoft, Google, Elastic, OpenText, Coveo, Sinequa, Lucidworks; Glean reached $7.2B valuation in 2025, but valuation is not revenue.",
    whitespace:
      "Connector breadth is becoming table stakes. Hard problems remain permissions drift, answer provenance, stale knowledge, non-English corpora and on-prem silos.",
    wedge:
      "Knowledge reliability layer: permission diff, stale-answer detection, citation evals and owner workflows across existing Copilot/Glean/RAG deployments; sell governance, not another chat box.",
    importScore: 5,
    exportScore: 5,
    confidence: "Высокая",
    regions: [
      { name: "США / North America", revenue: "$2,08B (reported 2025)", status: "reported", dynamics: "Fast GenAI adoption; strong Glean/Microsoft pressure.", barriers: "Connector ecosystem, SOC 2, permissions correctness, suite bundling.", opportunity: "Independent answer reliability and permission governance." },
      { name: "Europe: UK / DACH / CEE", revenue: "≈$1,4–1,6B proxy", status: "proxy", dynamics: "GDPR and multilingual archives increase value; on-prem common in DACH.", barriers: "GDPR, data residency, works councils, language and access-control models.", opportunity: "EU-hosted multilingual reliability layer." },
      { name: "СНГ", revenue: "≈$50–120M proxy", status: "proxy", dynamics: "Large on-prem archives and Russian-language RAG demand.", barriers: "Russian morphology, air-gapped deployment, 152-ФЗ, legacy ECM.", opportunity: "Private RAG evaluation + permissions for 1C/Directum/Bitrix/docs." },
      { name: "MENA", revenue: "Not isolated; attractive sovereign pocket", status: "proxy", dynamics: "Arabic enterprise knowledge and government digitization underserved.", barriers: "Arabic dialects, OCR, residency and procurement.", opportunity: "Arabic/English knowledge quality and provenance." },
    ],
    sources: [
      { label: "Enterprise Search 2025", url: "https://www.precedenceresearch.com/enterprise-search-market", note: "$5.34B; NA $2.08B; 9.05%." },
      { label: "Knowledge management", url: "https://www.mordorintelligence.com/industry-reports/knowledge-management-software-market", note: "Broader $13.7B; NA 38.08%." },
      { label: "Glean funding context", url: "https://www.glean.com/blog/series-f", note: "Valuation context, not revenue." },
    ],
  },
];

const bestImport = [
  "HR recruiting ops — локальные job boards/Telegram/1C + auditable AI",
  "Mid-market ITSM/ESM — быстрый запуск, private AI, миграция",
  "CLM obligations — слой над Диадок/СБИС/1C",
  "Enterprise knowledge reliability — private RAG для русских архивов",
  "Agent governance — контроль локальных и open-source моделей",
];

const bestExport = [
  "FinOps for AI — unit economics токенов/GPU, vendor-neutral",
  "Cloud posture autofix — MSP-led, regional clouds, evidence graph",
  "Agent control plane — eval/replay/policy across model vendors",
  "Knowledge reliability — permissions, provenance, stale-answer detection",
  "Sovereign mid-market ITSM — DACH/MENA через интеграторов",
];

function Score({ value }: { value: number }) {
  return <Text as="span" weight="semibold">{value}/5</Text>;
}

function StatusPill({ status }: { status: Region["status"] }) {
  const label = status === "reported" ? "факт/отчёт" : status === "derived" ? "расчёт" : "proxy";
  return <Pill size="sm">{label}</Pill>;
}

export default function GlobalB2BHorizontalMarkets() {
  const theme = useHostTheme();
  const [query, setQuery] = useCanvasState("market-query", "");
  const [strategy, setStrategy] = useCanvasState("strategy-filter", "all");
  const [selectedId, setSelectedId] = useCanvasState("selected-market", "itsm");
  const [sort, setSort] = useCanvasState("sort", "opportunity");

  const filtered = markets
    .filter((m) => {
      const match = `${m.name} ${m.boundary} ${m.wedge}`.toLowerCase().includes(query.toLowerCase());
      const scoreMatch =
        strategy === "all" ||
        (strategy === "import" && m.importScore >= 4) ||
        (strategy === "export" && m.exportScore >= 4);
      return match && scoreMatch;
    })
    .sort((a, b) => {
      if (sort === "revenue") return b.revenue2025 - a.revenue2025;
      if (sort === "growth") return b.cagr - a.cagr;
      if (sort === "import") return b.importScore - a.importScore;
      if (sort === "export") return b.exportScore - a.exportScore;
      return b.importScore + b.exportScore - (a.importScore + a.exportScore);
    });

  const selected = markets.find((m) => m.id === selectedId) || filtered[0] || markets[0];
  const highExport = markets.filter((m) => m.exportScore >= 4).length;
  const highImport = markets.filter((m) => m.importScore >= 4).length;

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1500, margin: "0 auto" }}>
      <Stack gap={8}>
        <H1>Global B2B horizontal markets — 2025 decision map</H1>
        <Text tone="secondary">
          11 узких рынков для независимого российского стартапа. Денежные значения — annual vendor/platform
          revenue, не GMV. США, Europe и СНГ разобраны раздельно; дополнительные регионы включены только при
          выраженном wedge.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="11" label="рынков" />
        <Stat value={highImport} label="import_to_Russia ≥4" tone="info" />
        <Stat value={highExport} label="export_from_Russia ≥4" tone="success" />
        <Stat value="$1,8–83B" label="диапазон category revenue" />
      </Grid>

      <Callout tone="warning" title="Как читать цифры">
        <Text>
          Regional report — прямая оценка источника; расчёт — доля региона × глобальная выручка в той же
          таксономии; proxy — явная модель при отсутствии публичного ряда. TAM не складывает пересекающиеся
          категории. {FX_NOTE}
        </Text>
      </Callout>

      <H2>Приоритеты</H2>
      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader trailing={<Pill size="sm">Import → Russia</Pill>}>Лучшие локализационные идеи</CardHeader>
          <CardBody>
            <Stack gap={8}>
              {bestImport.map((x, i) => <Text><Text as="span" weight="semibold">{i + 1}.</Text> {x}</Text>)}
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm">Export ← Russia</Pill>}>Лучшие экспортные идеи</CardHeader>
          <CardBody>
            <Stack gap={8}>
              {bestExport.map((x, i) => <Text><Text as="span" weight="semibold">{i + 1}.</Text> {x}</Text>)}
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Divider />
      <H2>Интерактивная сравнительная таблица</H2>
      <Row gap={10} wrap align="center">
        <TextInput
          value={query}
          onChange={setQuery}
          placeholder="Поиск рынка или wedge…"
          style={{ width: 280 }}
        />
        <Select
          value={strategy}
          onChange={setStrategy}
          options={[
            { value: "all", label: "Все стратегии" },
            { value: "import", label: "Import score ≥4" },
            { value: "export", label: "Export score ≥4" },
          ]}
          style={{ width: 180 }}
        />
        <Select
          value={sort}
          onChange={setSort}
          options={[
            { value: "opportunity", label: "Суммарный score" },
            { value: "revenue", label: "Revenue 2025" },
            { value: "growth", label: "CAGR" },
            { value: "import", label: "Import score" },
            { value: "export", label: "Export score" },
          ]}
          style={{ width: 180 }}
        />
      </Row>
      <Table
        stickyHeader
        striped
        headers={["Рынок", "Revenue 2025", "CAGR", "Стадия", "Import", "Export", "Confidence", ""]}
        rows={filtered.map((m) => [
          <Text weight="semibold">{m.name}</Text>,
          m.revenueLabel,
          `${m.cagr.toFixed(1)}%`,
          m.stage,
          <Score value={m.importScore} />,
          <Score value={m.exportScore} />,
          m.confidence,
          <Button variant={selected.id === m.id ? "primary" : "secondary"} onClick={() => setSelectedId(m.id)}>
            Разбор
          </Button>,
        ])}
        columnAlign={["left", "left", "right", "left", "center", "center", "left", "right"]}
        rowTone={filtered.map((m) => (m.importScore + m.exportScore >= 9 ? "success" : m.cagr >= 20 ? "info" : undefined))}
      />

      <Divider />
      <Row justify="space-between" align="center" wrap gap={12}>
        <H2>{selected.name}</H2>
        <Row gap={8}>
          <Pill active>Import <Score value={selected.importScore} /></Pill>
          <Pill active>Export <Score value={selected.exportScore} /></Pill>
          <Pill>{selected.confidence} confidence</Pill>
        </Row>
      </Row>

      <Grid columns="1.15fr 0.85fr" gap={18}>
        <Stack gap={14}>
          <Stack gap={6}>
            <H3>Граница рынка</H3>
            <Text>{selected.boundary}</Text>
            <Text tone="tertiary">Исключено: {selected.excludes}</Text>
          </Stack>
          <Stack gap={6}>
            <H3>TAM / SAM и методика</H3>
            <Text><Text as="span" weight="semibold">TAM:</Text> {selected.tam}</Text>
            <Text><Text as="span" weight="semibold">SAM:</Text> {selected.sam}</Text>
            <Text tone="secondary">{selected.method}</Text>
          </Stack>
          <Stack gap={6}>
            <H3>Почему whitespace ещё существует</H3>
            <Text>{selected.whitespace}</Text>
          </Stack>
        </Stack>

        <Card size="lg">
          <CardHeader trailing={<Pill size="sm">{selected.stage}</Pill>}>Startup wedge</CardHeader>
          <CardBody>
            <Stack gap={12}>
              <Text weight="semibold" style={{ color: theme.accent.primary }}>{selected.wedge}</Text>
              <Divider />
              <Text><Text as="span" weight="semibold">Лидеры:</Text> {selected.leaders}</Text>
              <Grid columns={3} gap={12}>
                <Stat value={selected.revenueLabel.split(" ")[0]} label="current revenue" />
                <Stat value={`${selected.cagr.toFixed(1)}%`} label="CAGR" />
                <Stat value={selected.confidence} label="confidence" />
              </Grid>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3>Региональное сопоставление</H3>
      <Grid columns={2} gap={14}>
        {selected.regions.map((r) => (
          <Card collapsible defaultOpen>
            <CardHeader trailing={<StatusPill status={r.status} />}>{r.name}</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text weight="semibold">{r.revenue}</Text>
                <Text><Text as="span" weight="semibold">Динамика:</Text> {r.dynamics}</Text>
                <Text><Text as="span" weight="semibold">Барьер:</Text> {r.barriers}</Text>
                <Text style={{ color: theme.accent.primary }}><Text as="span" weight="semibold">Возможность:</Text> {r.opportunity}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <H3>Публичные источники</H3>
      <Table
        striped
        headers={["Источник", "Что подтверждает"]}
        rows={selected.sources.map((s) => [
          <Link href={s.url}>{s.label}</Link>,
          s.note,
        ])}
      />

      <Divider />
      <H2>Методологические ограничения</H2>
      <Grid columns={3} gap={16}>
        <Stack gap={6}>
          <H3>Единицы</H3>
          <Text tone="secondary">
            Только годовая выручка поставщиков ПО/платформ. ARR отдельной компании, valuation и cloud bill
            подписаны как таковые и не подменяют category revenue.
          </Text>
        </Stack>
        <Stack gap={6}>
          <H3>Региональность</H3>
          <Text tone="secondary">
            Глобальный market report не считается региональным фактом. Региональные числа либо прямо
            опубликованы, либо явно рассчитаны из доли в той же таксономии, либо помечены proxy.
          </Text>
        </Stack>
        <Stack gap={6}>
          <H3>Score 1–5</H3>
          <Text tone="secondary">
            Import учитывает локальный gap, регуляторный moat, ARPU и конкуренцию РФ. Export учитывает
            product universality, sanctions/payment friction, trust burden и доступность partner-led GTM.
          </Text>
        </Stack>
      </Grid>

      <Callout tone="neutral" title="Decision rule">
        Сначала валидировать wedge, а не TAM: 15–20 problem interviews в одном регионе, затем 3 paid design
        partners. Для экспорта приоритет — product-led или channel-led motion без доступа к чувствительным
        данным; для РФ — интеграционный moat вокруг локальных систем записей.
      </Callout>
    </Stack>
  );
}
