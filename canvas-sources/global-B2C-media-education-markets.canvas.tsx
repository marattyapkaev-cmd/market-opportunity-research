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
  Stack,
  Stat,
  Table,
  Text,
  useCanvasAction,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Market = {
  id: string;
  name: string;
  block: "Media" | "Education" | "Creator" | "AI & productivity" | "Safety";
  revenue: number;
  year: string;
  tam: string;
  sam: string;
  method: string;
  growth: string;
  stage: string;
  regions: string;
  leaders: string;
  whitespace: string;
  barriers: string;
  wedge: string;
  importScore: number;
  exportScore: number;
  confidence: "High" | "Medium" | "Low";
  pattern: "Proven" | "Promising" | "Large only";
  verdict: string;
  sources: { label: string; url: string }[];
};

const markets: Market[] = [
  {
    id: "niche-svod",
    name: "Нишевой SVOD: жанр / диаспора / fandom",
    block: "Media",
    revenue: 8.5,
    year: "2025E",
    tam: "$157B global subscription streaming revenue (2025)",
    sam: "$6–11B — 4–7% SVOD spend attributable to focused services; midpoint $8.5B",
    method: "Top-down: Ampere global subscription streaming × 4–7%; excludes broad Netflix/Prime bundles. Current revenue is modelled, not a published market total.",
    growth: "≈12–18% niche; total streaming +14% in 2025",
    stage: "Mature core, fragmented niches",
    regions: "US ≈$4.0B; Europe ≈$2.2B; CIS ≈$0.25B; India/SEA ≈$0.9B; LatAm/MENA ≈$0.5B. US has 50% of global subscription revenue; Russia total online cinema ≈$1.4B at 2024 average FX.",
    leaders: "Crunchyroll, BritBox, Shudder, MUBI, Viki. Broad benchmark: Netflix $39B FY2024; Russia: Kinopoisk 32%, Ivi 16%, Wink 15% of ₽128.8B.",
    whitespace: "Diaspora content; anime-adjacent verticals; expert curation; local-language dubbing; FAST-to-paid funnel.",
    barriers: "Territorial rights, minimum guarantees, churn, device distribution. Content library is a scale moat; fandom creates weak-to-medium network effects.",
    wedge: "Start with one exportable fandom and 100–300 hours of exclusive/localized catalog; community premieres + annual plan.",
    importScore: 2,
    exportScore: 3,
    confidence: "Medium",
    pattern: "Proven",
    verdict: "Pattern is proven, but winning requires rights or a community—not merely a catalog app.",
    sources: [
      { label: "Ampere / 2025 streaming", url: "https://thestreamable.com/global-streaming-revenue-passes-150-billion-ampere" },
      { label: "Netflix FY2024", url: "https://axis-intelligence.com/streaming-statistics-definitive-data-report/" },
      { label: "Russia VoD 2024", url: "https://www.vedomosti.ru/media/news/2025/03/04/1095902-rost-rinka-videoservisov" },
    ],
  },
  {
    id: "audiobooks",
    name: "Аудиокниги и serial audio",
    block: "Media",
    revenue: 8.7,
    year: "2024",
    tam: "$8.7B current; $35.5B 2030 forecast",
    sam: "$2.0–3.5B addressable to local-language subscription entrants outside Audible-heavy English markets",
    method: "Published global consumer revenue; SAM removes ≈63% Audible-controlled revenue, then adds reachable multilingual indie/catalog spend.",
    growth: "10.6–26.2% CAGR range (scope-sensitive)",
    stage: "Scaling, consolidating",
    regions: "North America ≈45–52%; Europe ≈25%; CIS <3%; APAC fastest. Local-language depth matters more than global catalog breadth.",
    leaders: "Audible ≈41–63% depending scope; Spotify bundle; Storytel strong in Europe/India; Apple/Kobo/Google stores.",
    whitespace: "Romance/genre serials, kids co-listening, local non-fiction, AI-assisted backlist localization.",
    barriers: "Publisher rights, windowing, narrator consent, royalties. Catalog and listening-history improve retention; little true network effect.",
    wedge: "License overlooked regional backlists and serialize proven genre fiction; bundle text+audio and family profiles.",
    importScore: 3,
    exportScore: 4,
    confidence: "High",
    pattern: "Proven",
    verdict: "Strong proven subscription pattern; localized supply is the defensible wedge.",
    sources: [
      { label: "Grand View 2024", url: "https://www.grandviewresearch.com/industry-analysis/audiobooks-market" },
      { label: "Mordor / share", url: "https://www.mordorintelligence.com/industry-reports/audiobook-market" },
    ],
  },
  {
    id: "podcast-membership",
    name: "Paid podcasts & audio memberships",
    block: "Creator",
    revenue: 3.1,
    year: "2024E",
    tam: "$30.7B broad podcast economy; ≈$4.0B ads alone",
    sam: "$2–4B paid memberships, premium feeds and fan monetization; midpoint $3.1B",
    method: "Derived from broad podcast revenue: remove production/services and ads, triangulate 10–15% listener-paid share. Lower confidence.",
    growth: "Subscriptions ≈20.4% CAGR; broad estimates 27%",
    stage: "Early scaling",
    regions: "North America 38–46%; Europe ≈25–30%; LatAm has high listening but lower ARPU; CIS/MENA under-monetized.",
    leaders: "Spotify/Apple/YouTube distribution; Patreon/Substack/Supporting Cast monetization. No clean global paid-audio share disclosure.",
    whitespace: "Local business/education shows, private communities, multilingual repackaging, bundles across several creators.",
    barriers: "Discovery controlled by platforms; creator portability and RSS reduce lock-in. Audience trust is the moat; network effects mostly creator-side aggregation.",
    wedge: "Revenue-share operating system for 20–50 mid-tail creators: paywall, community, transcripts, clips, local payments.",
    importScore: 4,
    exportScore: 4,
    confidence: "Low",
    pattern: "Promising",
    verdict: "Paid superfan behavior is proven; a standalone global ‘podcast subscription market’ is not cleanly measured.",
    sources: [
      { label: "Podcast market 2024", url: "https://www.grandviewresearch.com/industry-analysis/podcast-market" },
      { label: "Revenue models", url: "https://www.mordorintelligence.com/industry-reports/podcast-market" },
    ],
  },
  {
    id: "game-subscriptions",
    name: "Game subscriptions & cloud play",
    block: "Media",
    revenue: 19.0,
    year: "2024",
    tam: "$19B game subscriptions; $3.7B cloud component",
    sam: "$3–6B for independent cloud, family, retro and regional catalog propositions",
    method: "Omdia consumer spend across library, single-game and platform subscriptions. SAM excludes dominant console platform base.",
    growth: "≈9% to $27B by 2028; cloud ≈12%",
    stage: "Mature platform subs; cloud emerging",
    regions: "US/Europe/Japan/Korea monetize best; India/SEA/LatAm gain from device-light cloud but face latency/payment constraints; CIS constrained by rights/payments.",
    leaders: "Microsoft + Sony = 82M library subscribers; Nvidia leads pure cloud mindshare; Game Pass/PS Plus dominate hybrid economics.",
    whitespace: "Family co-play, retro/local catalogs, PC cafés in cloud, telco bundles, creator-led game clubs.",
    barriers: "Publisher rights, compute and latency, app-store/platform rules. Cross-play identity and multiplayer communities create strong network effects.",
    wedge: "Cloud-enabled subscription for low-spec devices around one genre/region, distributed through a telco with prepaid billing.",
    importScore: 2,
    exportScore: 3,
    confidence: "High",
    pattern: "Proven",
    verdict: "Subscription is proven; pure cloud-only economics remain less proven than hybrid bundles.",
    sources: [
      { label: "Omdia 2024", url: "https://www.digitimes.com/news/a20240906PD206/omdia-2028-market-revenue-2024.html" },
      { label: "Mobile games context", url: "https://www.prnewswire.com/news-releases/sensor-tower-mobile-gaming-rebounds-in-2024-as-player-engagement-and-spending-reach-new-highs-302398268.html" },
    ],
  },
  {
    id: "creator-memberships",
    name: "Creator memberships & digital goods",
    block: "Creator",
    revenue: 10.2,
    year: "2024E GMV",
    tam: "$10–13B GMV across OnlyFans, Patreon, Substack and long tail",
    sam: "$1.0–2.0B platform net revenue pool at 8–20% take rates",
    method: "Bottom-up: OnlyFans $7.22B fan payments + Patreon ≈$1.65B implied 2024 GMV + Substack and long-tail estimates. Shows GMV and platform SAM separately.",
    growth: "≈9–20%; mature leaders slowing",
    stage: "Proven, consolidating by format",
    regions: "US/UK/Europe lead ARPU; LatAm/CIS/SEA supply creators but payment rails and purchasing power lower monetization; MENA faces content rules.",
    leaders: "OnlyFans $7.22B GMV / $1.41B net revenue FY2024; Patreon ≈$140M revenue 2024; Substack >4M paid subscriptions by 2025.",
    whitespace: "Non-US local payments, creator CRM/ownership, bundles, high-trust expert niches, migration and tax tooling.",
    barriers: "Payments, moderation, chargebacks, app-store restrictions. Two-sided creator/fan network effects are meaningful but audience portability weakens platform lock-in.",
    wedge: "Local-first membership stack for expert creators: Telegram/community import, recurring payments, digital goods, tax receipts, audience export.",
    importScore: 5,
    exportScore: 5,
    confidence: "Medium",
    pattern: "Proven",
    verdict: "One of the clearest proven patterns; avoid generic marketplace launch—bring an existing audience or payment advantage.",
    sources: [
      { label: "OnlyFans audited metrics", url: "https://sacra.com/c/onlyfans/" },
      { label: "Patreon estimates", url: "https://sacra.com/c/patreon/" },
    ],
  },
  {
    id: "language",
    name: "Language self-learning + AI speaking",
    block: "Education",
    revenue: 22.1,
    year: "2024",
    tam: "$22.1B current; $54.8B 2030",
    sam: "$14.2B self-learning apps (64.2% of market); focused AI-speaking wedge ≈$2–4B",
    method: "Published global online language revenue × published self-learning share; vertical SAM narrows to conversational and exam/job-intent users.",
    growth: "16.6% CAGR",
    stage: "Scaled, still fast-growing",
    regions: "North America 36% ≈$8.0B; MEA $2.78B; LatAm $1.37B; APAC fastest. Europe material; CIS embedded in Europe estimates but payment/localization differ.",
    leaders: "Duolingo $748M FY2024 (+41%, 8.6M paid in Sep-24); Babbel reported ≈€352M; Busuu, Preply, Speak.",
    whitespace: "Outcome-specific English, pronunciation for native-language cohorts, migrant integration, low-bandwidth/offline, exam-to-job continuum.",
    barriers: "CAC and free alternatives. Habit data and social streaks create retention loops; AI model access is not a moat.",
    wedge: "AI speaking coach for one native-language × profession pair, with human calibration and a measurable interview/certification outcome.",
    importScore: 5,
    exportScore: 5,
    confidence: "High",
    pattern: "Proven",
    verdict: "Best combination of validated consumer subscription, global demand and localization wedge.",
    sources: [
      { label: "Global / regions", url: "https://www.grandviewresearch.com/industry-analysis/online-language-learning-market-report" },
      { label: "Duolingo FY2024", url: "https://investors.duolingo.com/static-files/99006c40-d8cf-41ca-b5b1-c5cb1fa5ba88" },
      { label: "LatAm 2024", url: "https://www.grandviewresearch.com/horizon/outlook/online-language-learning-market/latin-america" },
    ],
  },
  {
    id: "k12-tutoring",
    name: "K–12 online tutoring / parent-paid",
    block: "Education",
    revenue: 8.9,
    year: "2024 midpoint",
    tam: "$7.8–10.6B K–12 online; broader online tutoring $10.4B",
    sam: "$2–4B for focused 1:1/group STEM, literacy and homework support outside China",
    method: "Midpoint of two published K–12 scopes; SAM applies 25–40% reachable subject/geography slice.",
    growth: "8–14.5% CAGR",
    stage: "Large, fragmented, post-hype reset",
    regions: "APAC ≈40% / $3.1B in one estimate; North America >35% of broad tutoring; Europe smaller; Russia kids EdTech ₽48.8B and +32% in 2024.",
    leaders: "TAL/New Oriental, Varsity Tutors, Preply, GoStudent, Vedantu; BYJU'S demonstrates scale but also governance/unit-economics risk.",
    whitespace: "Special needs, reading fluency, parent reporting, small groups, bilingual migrant children, teacher copilots with human accountability.",
    barriers: "Tutor supply, safeguarding, local curricula, high CAC and seasonality. Marketplace liquidity is local/subject-specific; trust and outcomes are stronger moats.",
    wedge: "Small-group math/reading for a narrow grade band, sold on guaranteed cadence and parent-visible mastery—not a broad tutor directory.",
    importScore: 4,
    exportScore: 4,
    confidence: "Medium",
    pattern: "Proven",
    verdict: "Demand is proven; marketplace scale alone is not. The wedge must control quality and outcomes.",
    sources: [
      { label: "Global tutoring 2024", url: "https://www.grandviewresearch.com/industry-analysis/online-tutoring-services-market" },
      { label: "K–12 APAC", url: "https://market.us/report/global-k-12-online-tutoring-market/" },
      { label: "Russia EdTech", url: "https://marketing.rbc.ru/articles/15521/" },
    ],
  },
  {
    id: "test-prep",
    name: "Digital exam & test preparation",
    block: "Education",
    revenue: 4.9,
    year: "2024 midpoint",
    tam: "$2.17–7.73B online-only; $10.7B college prep including offline",
    sam: "$1–3B for mobile-first IELTS/TOEFL, admissions and professional credentials",
    method: "Midpoint of narrow tutoring-style and broad digital-service definitions; do not use the $142.8B blended/offline headline as digital TAM.",
    growth: "5.9–15.3% CAGR",
    stage: "Mature demand, AI product reset",
    regions: "North America largest revenue; India highest expected CAGR; Europe strong for language/admissions; CIS has local state exams; MENA/LatAm outbound education creates demand.",
    leaders: "Pearson/Kaplan/Princeton Review; Magoosh, UWorld, Quizlet, local champions. Shares not reliably disclosed.",
    whitespace: "Speaking/writing feedback, credential-specific micro-verticals, adaptive error diagnosis, scholarship/application bundles.",
    barriers: "Exam-body dependence, question IP, seasonal peaks, score-claim regulation. Proprietary item-response and outcome datasets compound.",
    wedge: "One high-stakes exam, AI feedback on its hardest subjective section, cohort accountability, score-linked guarantee.",
    importScore: 5,
    exportScore: 4,
    confidence: "Medium",
    pattern: "Proven",
    verdict: "Clear willingness to pay and intent; a sharper opportunity than broad education despite smaller TAM.",
    sources: [
      { label: "Narrow online 2024", url: "https://www.grandviewresearch.com/horizon/statistics/online-tutoring-services-market/tutoring-style/test-preparation-service/global" },
      { label: "Broad online scope", url: "https://www.wiseguyreports.com/reports/online-test-preparatory-services-market" },
    ],
  },
  {
    id: "hobby-learning",
    name: "Hobby & creative learning subscriptions",
    block: "Education",
    revenue: 3.5,
    year: "2025E",
    tam: "$2.6–3.8B paid-knowledge narrow scope",
    sam: "$0.8–1.5B consumer hobby/creative share excluding career credentials",
    method: "Triangulates two paid-knowledge reports; SAM assumes 30–40% hobby/creative content. Market boundaries are weak.",
    growth: "≈8%; selective leaders faster",
    stage: "Mature niche, AI disruption",
    regions: "US/Europe lead paid subscriptions; LatAm has Domestika-style supply; India/SEA/CIS strong creator supply but lower ARPU.",
    leaders: "Skillshare estimated $78M 2024 / 500k paid; MasterClass, Domestika, YouTube free substitute. Reliable shares unavailable.",
    whitespace: "Outcome clubs, physical kit bundles, local crafts, AI-era creative workflows, intergenerational/kids+parent formats.",
    barriers: "YouTube substitution, completion and churn, instructor dependence. Community/project feedback creates modest network effects.",
    wedge: "A 6–8 week project club for one hobby with kit, instructor critique and showcase; sell transformation, not library access.",
    importScore: 4,
    exportScore: 4,
    confidence: "Low",
    pattern: "Promising",
    verdict: "The broad library pattern is fragile; cohort, community or physical bundle is the stronger product pattern.",
    sources: [
      { label: "Paid knowledge", url: "https://reports.valuates.com/market-reports/QYRE-Auto-18B5845/global-online-paid-knowledge" },
      { label: "Skillshare estimate", url: "https://geo.sig.ai/brands/skillshare" },
    ],
  },
  {
    id: "consumer-ai",
    name: "Consumer AI vertical agents",
    block: "AI & productivity",
    revenue: 3.7,
    year: "2025 run-rate",
    tam: "$3.7–4.0B mobile GenAI run-rate from $1.87B H1 2025; broader web revenue higher",
    sam: "$0.9–1.5B non-generalist vertical apps at 25–40% of mobile spend",
    method: "Annualized H1 mobile consumer spend; vertical share is inferred from Appfigures segment mix. Excludes API and enterprise revenue.",
    growth: ">100% YoY in H1 2025; volatile",
    stage: "Hypergrowth, pre-consolidation",
    regions: "US leads revenue; Europe constrained by privacy/AI regulation; India/SEA/LatAm lead usage growth but lower ARPU; CIS has model/payment access gaps.",
    leaders: "ChatGPT drove 41% of Q4 2024 AI-app spend; general assistants dominate. Vertical winners remain fluid: photo, companion, study, writing, fitness.",
    whitespace: "Life admin, immigration, eldercare, parenting, home maintenance, local legal/benefit navigation, job-search execution.",
    barriers: "Model commoditization, inference cost, trust, hallucinations and platform bundling. Workflow history and integrations—not prompts—form the moat.",
    wedge: "Agent for one recurring, high-anxiety job with permissioned execution and human escalation; price against saved service cost.",
    importScore: 5,
    exportScore: 5,
    confidence: "Medium",
    pattern: "Promising",
    verdict: "Spend is proven; autonomous vertical-agent retention is not yet proven at market scale.",
    sources: [
      { label: "Sensor Tower 2024", url: "https://techcrunch.com/2025/01/22/ai-apps-saw-over-1-billion-in-consumer-spending-in-2024/" },
      { label: "Appfigures report", url: "https://resources-cdn.appfigures.com/industry-reports/appfigures-rise-of-ai-apps-key-trends-shaping-2025-report-v2.2.pdf" },
    ],
  },
  {
    id: "family-safety",
    name: "Family digital safety & parental control",
    block: "Safety",
    revenue: 1.5,
    year: "2024",
    tam: "$1.5B parental-control software; $3.0B forecast 2030",
    sam: "$0.4–0.8B premium cross-platform family subscriptions outside OS-free defaults",
    method: "Published consumer/residential software revenue; SAM removes enterprise/school and free OS-bundled use.",
    growth: "12.1% CAGR",
    stage: "Established, moving to AI safety",
    regions: "North America ≈$0.4–0.5B / 33.5%; Europe privacy-sensitive; CIS has Kaspersky legacy; MENA high family need but monitoring legality varies.",
    leaders: "Qustodio ≈16% in one estimate; Norton, Bark, Kaspersky, Microsoft/Google free defaults. Share estimates conflict by source.",
    whitespace: "Grooming/bullying signals, teen consent, family cyber insurance, scam protection for children+elders, router+device coverage.",
    barriers: "iOS sandboxing, encrypted apps, child privacy, false positives. Threat intelligence and family graph compound; OS owners can bundle.",
    wedge: "Consent-based family safety for scams and harmful-contact risk across child and elder devices, sold through telco/bank/insurer.",
    importScore: 4,
    exportScore: 4,
    confidence: "High",
    pattern: "Proven",
    verdict: "Subscription demand is proven; pure screen-time control is commoditized—expand to family risk response.",
    sources: [
      { label: "2024 size / CAGR", url: "https://www.giiresearch.com/report/go1644138-parental-control-software.html" },
      { label: "Competitive landscape", url: "https://www.futuremarketinsights.com/reports/parental-control-software-market" },
    ],
  },
  {
    id: "personal-productivity",
    name: "Personal productivity & life OS",
    block: "AI & productivity",
    revenue: 9.7,
    year: "2024",
    tam: "$9.65B productivity apps",
    sam: "$2–4B personal note/task/calendar/focus excluding enterprise collaboration",
    method: "Published app market; SAM uses 20–40% personal-use share because B2B seats inflate broad totals.",
    growth: "9% CAGR; AI add-ons faster",
    stage: "Mature, re-bundling around AI",
    regions: "North America >40% / $3.86B; Europe strong privacy/offline segment; CIS/India/SEA favor lower-priced mobile products.",
    leaders: "Microsoft/Google bundles; Notion reached ≈$500M ARR in Sep-2025 but is mixed B2C/B2B; Todoist, TickTick, Evernote, Obsidian.",
    whitespace: "Household admin, neurodivergent workflows, privacy-first local AI, proactive calendar/email execution, family coordination.",
    barriers: "Free OS suites, switching costs, trust and integration permissions. Personal history creates data lock-in; collaboration adds network effects.",
    wedge: "Life-admin agent for one persona that turns inbox/messages into completed tasks and shared household workflows.",
    importScore: 5,
    exportScore: 5,
    confidence: "Medium",
    pattern: "Proven",
    verdict: "Paid productivity is proven, but generic to-do apps are saturated; execution and vertical context are the wedge.",
    sources: [
      { label: "Market size 2024", url: "https://www.cognitivemarketresearch.com/productivity-apps-market-report" },
      { label: "Notion ARR", url: "https://sacra.com/c/notion/" },
    ],
  },
  {
    id: "consumer-vpn",
    name: "Consumer VPN & privacy bundles",
    block: "Safety",
    revenue: 5.9,
    year: "2024",
    tam: "$5.9B app revenue; alternative reports range $1.2–51.1B due to scope",
    sam: "$1–2B privacy/security bundle opportunity outside top brands and free VPNs",
    method: "Uses observable app/subscription scope, rejects reports that mix enterprise/security infrastructure. SAM applies 17–34% challenger pool.",
    growth: "15.6% YoY in 2024",
    stage: "Mature, highly competitive",
    regions: "US has high paid adoption; Europe privacy-led; UAE/MENA and restricted markets have high usage; CIS demand high but legal/payment risk; India logging rules complicate supply.",
    leaders: "NordVPN, Surfshark, ExpressVPN; Nord ≈27% of US consumer users in one estimate. Free apps dominate downloads.",
    whitespace: "Family privacy, scam/identity protection, travel eSIM bundle, transparent jurisdiction, SMB-to-family crossover.",
    barriers: "Trust, regulation, server capex, app-store/search CAC. Scale lowers network cost, but product network effects are weak; brand is the main moat.",
    wedge: "Travel/family security bundle: VPN + eSIM + breach/scam alerts, distributed via travel, bank or telecom partners.",
    importScore: 2,
    exportScore: 3,
    confidence: "Medium",
    pattern: "Large only",
    verdict: "Large and profitable category, but generic new VPN is a poor wedge without distribution or a broader safety bundle.",
    sources: [
      { label: "VPN app revenue", url: "https://www.businessofapps.com/data/vpn-app-market/" },
      { label: "Scope comparison", url: "https://www.researchandmarkets.com/reports/6094442/b2c-vpn-market-global-strategic-business-report" },
    ],
  },
];

const blocks = ["Все", "Media", "Education", "Creator", "AI & productivity", "Safety"] as const;
const patterns = ["Все", "Proven", "Promising", "Large only"] as const;

function Score({ value }: { value: number }) {
  const theme = useHostTheme();
  return (
    <span style={{ color: value >= 4 ? theme.accent.primary : theme.text.secondary, fontWeight: 600 }}>
      {value}/5
    </span>
  );
}

function MarketDetail({ market }: { market: Market }) {
  return (
    <Card collapsible defaultOpen={false}>
      <CardHeader
        trailing={<Pill size="sm" active={market.pattern === "Proven"}>{market.pattern}</Pill>}
      >
        {market.name} · ${market.revenue}B
      </CardHeader>
      <CardBody>
        <Stack gap={12}>
          <Callout
            tone={market.pattern === "Proven" ? "success" : market.pattern === "Large only" ? "warning" : "info"}
            title="Product pattern vs. market size"
          >
            {market.verdict}
          </Callout>
          <Grid columns="minmax(0, 1fr) minmax(0, 1fr)" gap={16}>
            <Stack gap={8}>
              <H3>Размер и динамика</H3>
              <Text><Text weight="semibold">Current net revenue:</Text> ${market.revenue}B ({market.year})</Text>
              <Text><Text weight="semibold">TAM:</Text> {market.tam}</Text>
              <Text><Text weight="semibold">SAM:</Text> {market.sam}</Text>
              <Text><Text weight="semibold">Метод:</Text> {market.method}</Text>
              <Text><Text weight="semibold">Рост / стадия:</Text> {market.growth}; {market.stage}</Text>
            </Stack>
            <Stack gap={8}>
              <H3>Конкуренция и география</H3>
              <Text><Text weight="semibold">Регионы:</Text> {market.regions}</Text>
              <Text><Text weight="semibold">Лидеры:</Text> {market.leaders}</Text>
              <Text><Text weight="semibold">Барьеры / moat:</Text> {market.barriers}</Text>
            </Stack>
          </Grid>
          <Divider />
          <Grid columns="2fr 1fr" gap={16}>
            <Stack gap={8}>
              <Text><Text weight="semibold">Whitespace:</Text> {market.whitespace}</Text>
              <Text><Text weight="semibold">Concrete wedge:</Text> {market.wedge}</Text>
            </Stack>
            <Stack gap={8}>
              <Text>Import → Russia: <Score value={market.importScore} /></Text>
              <Text>Export ← Russia: <Score value={market.exportScore} /></Text>
              <Text>Confidence: <Text weight="semibold">{market.confidence}</Text></Text>
            </Stack>
          </Grid>
          <Row gap={12} wrap>
            {market.sources.map((source) => (
              <Link href={source.url}>{source.label}</Link>
            ))}
          </Row>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function GlobalB2CMarkets() {
  const theme = useHostTheme();
  const action = useCanvasAction();
  const [block, setBlock] = useCanvasState<(typeof blocks)[number]>("market-block", "Все");
  const [pattern, setPattern] = useCanvasState<(typeof patterns)[number]>("market-pattern", "Все");
  const [minScore, setMinScore] = useCanvasState<number>("market-min-score", 1);

  const filtered = markets.filter(
    (market) =>
      (block === "Все" || market.block === block) &&
      (pattern === "Все" || market.pattern === pattern) &&
      Math.max(market.importScore, market.exportScore) >= minScore,
  );

  const topIdeas = [
    markets.find((m) => m.id === "language")!,
    markets.find((m) => m.id === "creator-memberships")!,
    markets.find((m) => m.id === "consumer-ai")!,
    markets.find((m) => m.id === "family-safety")!,
    markets.find((m) => m.id === "test-prep")!,
  ];

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1440, margin: "0 auto" }}>
      <Stack gap={8}>
        <Text size="small" tone="tertiary">STRATEGY MAP · DATA CUT: 2024 / 2025 · USD</Text>
        <H1>Международные B2C digital рынки</H1>
        <Text tone="secondary">
          Media, education, creator, consumer AI, productivity и family safety. Узкие operational
          definitions, net revenue отдельно от TAM/SAM, региональный взгляд и два направления
          применимости для России.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="12" label="узких рынков" />
        <Stat value="$109.7B" label="сумма current revenue*"/>
        <Stat value="9" label="proven product patterns" tone="success" />
        <Stat value="5" label="приоритетных wedges" tone="info" />
      </Grid>
      <Text size="small" tone="tertiary">
        *Не портфельный TAM: категории пересекаются, а creator memberships показан как GMV. Нельзя суммировать для инвестиционного решения.
      </Text>

      <Callout tone="warning" title="Как читать оценки">
        Current revenue — ближайшая наблюдаемая 2024/2025 потребительская выручка в узком scope.
        TAM — верхняя граница категории; SAM — авторская достижимая часть с явным методом.
        Региональные цифры без прямого источника — аллокации по опубликованным долям/ARPU и отмечены
        сниженным confidence. Scores: 1 = структурно плохо, 5 = сильный fit; это не прогноз успеха.
      </Callout>

      <Stack gap={10}>
        <H2>Фильтры</H2>
        <Row gap={8} wrap>
          {blocks.map((value) => (
            <Pill active={block === value} onClick={() => setBlock(value)}>{value}</Pill>
          ))}
        </Row>
        <Row gap={8} wrap>
          {patterns.map((value) => (
            <Pill active={pattern === value} onClick={() => setPattern(value)}>{value}</Pill>
          ))}
          {[1, 3, 4, 5].map((value) => (
            <Pill active={minScore === value} onClick={() => setMinScore(value)}>
              max RU score ≥ {value}
            </Pill>
          ))}
        </Row>
      </Stack>

      <Stack gap={12}>
        <Row justify="space-between" align="center">
          <H2>Карта рынков</H2>
          <Text size="small" tone="tertiary">{filtered.length} из {markets.length}</Text>
        </Row>
        <Table
          headers={["Рынок", "Блок", "Current", "Рост", "Pattern", "Import RU", "Export RU", "Confidence"]}
          rows={filtered.map((market) => [
            market.name,
            market.block,
            `$${market.revenue}B ${market.year}`,
            market.growth,
            market.pattern,
            <Score value={market.importScore} />,
            <Score value={market.exportScore} />,
            market.confidence,
          ])}
          rowTone={filtered.map((market) =>
            market.pattern === "Proven" ? "success" : market.pattern === "Large only" ? "warning" : "info"
          )}
          columnAlign={["left", "left", "right", "left", "left", "center", "center", "left"]}
          striped
          stickyHeader
        />
      </Stack>

      <Stack gap={12}>
        <H2>Top ideas: где есть pattern + wedge</H2>
        <Grid columns="repeat(5, minmax(190px, 1fr))" gap={12}>
          {topIdeas.map((market, index) => (
            <Card size="lg">
              <CardHeader trailing={`#${index + 1}`}>{market.name}</CardHeader>
              <CardBody>
                <Stack gap={10}>
                  <Text weight="semibold" style={{ color: theme.accent.primary }}>{market.wedge}</Text>
                  <Text size="small" tone="secondary">{market.verdict}</Text>
                  <Row gap={8}>
                    <Text size="small">In <Score value={market.importScore} /></Text>
                    <Text size="small">Out <Score value={market.exportScore} /></Text>
                  </Row>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Детальные market cards</H2>
        <Text tone="secondary">Раскройте карточку: TAM/SAM method, региональные оценки, лидеры, барьеры, whitespace, wedge и источники.</Text>
        {filtered.map((market) => <MarketDetail market={market} />)}
      </Stack>

      <Stack gap={10}>
        <H2>Вывод по направлениям России</H2>
        <Grid columns={2} gap={16}>
          <Stack gap={8}>
            <H3>Import to Russia</H3>
            <Text>
              Лучший переносимый паттерн: outcome-specific language/test prep, creator payments,
              life-admin AI и consent-based family safety. Не переносить механически: rights-heavy
              SVOD, generic VPN и pure cloud gaming — санкции, права, платежи и инфраструктура
              ухудшают economics.
            </Text>
          </Stack>
          <Stack gap={8}>
            <H3>Export from Russia</H3>
            <Text>
              Экспортировать не «русский контент вообще», а компетенции: олимпиадная/математическая
              педагогика, AI-speaking для конкретных L1, creator/Telegram workflows, family scam
              detection и genre audio. Стартовые рынки: diaspora → MENA/LatAm/India/SEA с локальным
              партнером и local payments.
            </Text>
          </Stack>
        </Grid>
      </Stack>

      <Divider />
      <Row justify="space-between" align="center">
        <Text size="small" tone="tertiary">
          Desk research; public sources linked per card. Revenue estimates are directional, not audited investment advice.
        </Text>
        <Button
          variant="secondary"
          onClick={() => action({ type: "newComposerChat", userPrompt: "Сделай deep dive по выбранным top-3 рынкам: юнит-экономика, ICP, pricing, GTM и 90-day validation plan." })}
        >
          Продолжить deep dive
        </Button>
      </Row>
    </Stack>
  );
}
