import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
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
  TextInput,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Market = {
  name: string;
  category: "Продажи" | "HR и работа" | "Торговля и данные" | "Вертикальный SaaS";
  volume: number;
  tam: number;
  year: string;
  confidence: "высокая" | "средняя" | "низкая";
  stage: string;
  growth: string;
  score: number;
  listed: string;
  competitors: string;
  gapWhy: string;
  outlook: string;
  entry: string;
  source: string;
  sourceUrl: string;
};

const markets: Market[] = [
  {
    name: "CRM и автоматизация продаж",
    category: "Продажи",
    volume: 44100,
    tam: 90000,
    year: "2025",
    confidence: "высокая",
    stage: "поздний рост",
    growth: "+25%",
    score: 3,
    listed: "Битрикс24 ≈15,2% выручки рынка; amoCRM ≈4,9%; RetailCRM ≈1,4%. По установкам доли выше: Битрикс24 ≈49%, amoCRM ≈9%.",
    competitors: "BPMSoft, 1С‑Рарус, Лига цифровой экономики, Норбит, Мегаплан, отраслевые CRM и внутренние разработки.",
    gapWhy: "Потенциал ≈45,9 млрд ₽. Микробизнес остаётся в таблицах и чатах; мешают внедрение, дисциплина продаж, интеграции с 1С и отсутствие готовых отраслевых сценариев.",
    outlook: "Рост замедлится до 12–18%: крупные клиенты насыщаются, но импортозамещение, low-code и AI‑ассистенты поддержат апсейл.",
    entry: "Не ещё одна горизонтальная CRM, а автономная vertical CRM для микробизнеса: настройка из банковских операций, чатов и кассы без администратора.",
    source: "TAdviser: рынок CRM РФ",
    sourceUrl: "https://www.tadviser.ru/index.php/Статья:CRM_(рынок_России)",
  },
  {
    name: "CDP и маркетинговая автоматизация",
    category: "Продажи",
    volume: 7000,
    tam: 25000,
    year: "2025",
    confidence: "средняя",
    stage: "быстрый рост",
    growth: "+40%",
    score: 5,
    listed: "Mindbox — до 39–55% в зависимости от границы; Retail Rocket ≈9–13%; PremiumBonus, anyQuery и Sendsay занимают меньшие пересекающиеся доли.",
    competitors: "MTS Ads/CDP, VK CXhub, CleverData, Weborama, CXDP, Flocktory, KonnektU, 1С.",
    gapWhy: "Потенциал ≈18 млрд ₽. Его сдерживают плохие first‑party данные, долгие интеграции, нехватка аналитиков, 152‑ФЗ и неочевидный uplift.",
    outlook: "20–30% в год благодаря e-commerce, персонализации и AI; риск — поглощение функций CRM и экосистемами.",
    entry: "CDP‑lite для mid-market: запуск за дни, готовые модели, контроль качества данных и автоматическое доказательство incremental uplift.",
    source: "МТС Ads: рынок CDP",
    sourceUrl: "https://new-retail.ru/tehnologii/chto_zhdyet_rossiyskiy_rynok_cdp_v_2025_godu/",
  },
  {
    name: "Email и омниканальные рассылки",
    category: "Продажи",
    volume: 3300,
    tam: 8000,
    year: "2024",
    confidence: "средняя",
    stage: "зрелость с ростом",
    growth: "+10–15%",
    score: 3,
    listed: "Unisender ≈26%; Sendsay ≈14%; профильная часть Mindbox — ориентировочно до 29%; Carrot quest ≈6%.",
    competitors: "DashaMail, NotiSend, RuSender, eSputnik/Yespo, модули Битрикс24, VK и Mindbox.",
    gapWhy: "Потенциал ≈4,7 млрд ₽. Малые базы, нехватка контента и согласий, deliverability и конкуренция Telegram/VK ограничивают спрос.",
    outlook: "Email остаётся базовым каналом, но ценность смещается в оркестрацию каналов, генерацию контента и управление согласиями.",
    entry: "Автопилот коммуникаций для SMB: AI‑контент, consent ledger и автоматическое переключение канала при недоставке.",
    source: "Исследование российского рынка рассылок",
    sourceUrl: "https://ppc.world/articles/analitika-i-statistika-est-li-buduschee-u-email-marketinga-issledovanie/",
  },
  {
    name: "Коллтрекинг и сквозная аналитика",
    category: "Продажи",
    volume: 5500,
    tam: 15000,
    year: "2024, оценка",
    confidence: "низкая",
    stage: "зрелость / AI‑перезапуск",
    growth: "+12–18%",
    score: 3,
    listed: "Calltouch ≈29%; UIS ≈19%; Roistat ≈19%; Callibri ≈5%.",
    competitors: "Mango Office, K50, Calltracking.ru, Alytics, LPTracker, MCN Telecom, Яндекс Метрика.",
    gapWhy: "Потенциал ≈9,5 млрд ₽. Интеграции CRM/кассы, ограничения cookie, цена номеров и недоверие к атрибуции тормозят проникновение.",
    outlook: "Классический коллтрекинг зрелый; растут речевая аналитика и единая атрибуция звонков, чатов и офлайн-продаж.",
    entry: "Privacy-first атрибуция для локального бизнеса без ручной настройки BI, с AI‑разбором звонков и сверкой с кассой.",
    source: "BusinessStat: коллтрекинг РФ",
    sourceUrl: "https://www.businesstat.ru/catalog/id78948/",
  },
  {
    name: "Интеграция мессенджеров",
    category: "Продажи",
    volume: 4500,
    tam: 12000,
    year: "2024, оценка",
    confidence: "средняя",
    stage: "быстрый рост / платформенный риск",
    growth: "+20–25%",
    score: 4,
    listed: "Wazzup ≈40%; BotHelp ≈8%; TextBack ≈6%; Carrot quest и Chat2Desk — по ≈4–5%.",
    competitors: "edna, Pact, i2crm, Umnico, Usedesk, Jivo, Webim, MANGO.",
    gapWhy: "Потенциал ≈7,5 млрд ₽. WhatsApp API, блокировки, серые интеграции и отсутствие единой customer identity создают барьеры.",
    outlook: "Продажи мигрируют в Telegram, VK и MAX; AI‑операторы увеличат ARPU, но зависимость от платформ остаётся критической.",
    entry: "Platform-neutral customer identity и журнал согласий между Telegram, MAX, VK, WhatsApp и CRM с fallback‑маршрутизацией.",
    source: "ТМТ Консалтинг: Telecom API",
    sourceUrl: "https://www.kommersant.ru/doc/8271594",
  },
  {
    name: "Онлайн‑запись для сферы услуг",
    category: "Продажи",
    volume: 2500,
    tam: 18000,
    year: "2024, оценка",
    confidence: "средняя",
    stage: "быстрый рост",
    growth: "+20–30%",
    score: 5,
    listed: "YClients ≈56%; сервис обслуживал около 45 тыс. бизнесов. Beauty уже концентрирован, другие вертикали заметно свободнее.",
    competitors: "Dikidi ≈16%, Altegio, Арника, Rubitime, EasyWeek, Клиентикс, Beauty Pro, запись внутри карт.",
    gapWhy: "Потенциал ≈15,5 млрд ₽. Самозанятые и микробизнес используют бумагу и мессенджеры; мешают цена, миграция базы и отраслевые различия.",
    outlook: "Рост сохранится, но beauty консолидируется вокруг VK/YClients и Dikidi. Следующая волна — выездные и ресурсные услуги.",
    entry: "Mobile-first OS для ремонта, обучения и B2B‑сервисов: сотрудники, ресурсы, маршруты, предоплаты и повторные продажи.",
    source: "CNews: YClients и рынок",
    sourceUrl: "https://www.cnews.ru/news/top/2024-03-22_vk_potratil_39_milliarda_na",
  },
  {
    name: "Репутация и данные на картах",
    category: "Продажи",
    volume: 1300,
    tam: 12000,
    year: "2024, оценка",
    confidence: "низкая",
    stage: "ранний рост",
    growth: "+20–25%",
    score: 5,
    listed: "RocketData ≈27%; Поинтер ≈18%.",
    competitors: "Repometr, LocalHero, Revvy, кабинеты Яндекс Бизнес и 2ГИС, агентские решения.",
    gapWhy: "Потенциал ≈10,7 млрд ₽. Одиночные точки не готовы платить, API карт закрыты, а связь рейтинга с выручкой трудно доказать.",
    outlook: "Local search переносится в карты и AI‑ответы; сети требуют централизованного качества данных и измерения офлайн-конверсии.",
    entry: "Продукт для сетей до 100 точек: исправление карточек, AI‑ответы, benchmark конкурентов и маршруты/звонки до кассовой продажи.",
    source: "RocketData: рынок геосервисов",
    sourceUrl: "https://exlibris.ru/news/kak-menyaetsya-rynok-geoservisov-v-rossii/",
  },
  {
    name: "SEO software / search visibility",
    category: "Продажи",
    volume: 1800,
    tam: 5500,
    year: "2025, оценка",
    confidence: "низкая",
    stage: "зрелость / новый GEO‑цикл",
    growth: "+12–18%",
    score: 4,
    listed: "Топвизор ≈20%; SEOWORK ориентировочно ≈12–15%.",
    competitors: "Keys.so, Rush Analytics, Pixel Tools, MegaIndex, PR‑CY, Serpstat, Labrika, внутренние инструменты агентств.",
    gapWhy: "Потенциал ≈3,7 млрд ₽. Бесплатные Вебмастер/Метрика, Excel и собственные инструменты снижают готовность платить.",
    outlook: "Rank tracking коммодитизируется, но GEO/AEO и измерение упоминаний в нейроответах запускают новый цикл спроса.",
    entry: "Search Visibility для Яндекса, Google и AI‑ответов с доказуемым влиянием на лиды и выручку.",
    source: "Workspace / Топвизор",
    sourceUrl: "https://journal.topvisor.com/ru/money/seo-ratings/",
  },
  {
    name: "Influencer marketing analytics",
    category: "Продажи",
    volume: 1150,
    tam: 3000,
    year: "2024–2025, оценка",
    confidence: "низкая",
    stage: "ранний рост",
    growth: "+15–25%",
    score: 4,
    listed: "WhoIsBlogger ориентировочно 8–12% узкого analytics‑рынка; оценка менее надёжна из-за отсутствия свежей раскрытой выручки.",
    competitors: "Yoloco, LUP/LabelUp, LiveDune, Popsters, HypeAuditor; GetBlogger и Perfluence совмещают аналитику с исполнением.",
    gapWhy: "Потенциал ≈1,85 млрд ₽. Закрытые API, исчезающий контент, сложная causal attribution и регулирование рекламы мешают измеримости.",
    outlook: "Рекламные бюджеты стагнировали в 2025, но доля расходов на brand safety, attribution и Sales Lift будет расти.",
    entry: "Независимая attribution Telegram/VK/MAX/YouTube с brand safety и Sales Lift без передачи клиентской базы наружу.",
    source: "АКАР: рынок блогеров",
    sourceUrl: "https://akarussia.ru/news/novosti-akar/rynok-blogerov-v-rossii-ocenili-v-60-mlrd-rublej/",
  },
  {
    name: "E‑commerce search и персонализация",
    category: "Продажи",
    volume: 2200,
    tam: 4500,
    year: "2025, оценка",
    confidence: "низкая",
    stage: "быстрый рост",
    growth: "+18–25%",
    score: 4,
    listed: "anyQuery ≈14%; профильная часть Retail Rocket ≈15–20%.",
    competitors: "SearchBooster, REES46, Resosearch, PromoSearch, Searcherry, Poisk.dev, встроенный поиск 1С‑Битрикс.",
    gapWhy: "Потенциал ≈2,3 млрд ₽. Независимые магазины часто слишком малы; товарные данные плохие, интеграция дорогая, uplift не доказан.",
    outlook: "Semantic/visual search и shopping assistants растут вместе с owned e-commerce, несмотря на доминирование маркетплейсов.",
    entry: "AI‑shopping assistant для среднего магазина: подключение по YML за день и оплата долей доказанного incremental GMV.",
    source: "Data Insight: российский e-commerce",
    sourceUrl: "https://datainsight.ru/DI_eCommerce_2025",
  },
  {
    name: "Виртуальные АТС / корпоративная телефония",
    category: "Продажи",
    volume: 34400,
    tam: 54000,
    year: "2025 / прогноз 2030",
    confidence: "высокая",
    stage: "зрелость / качественное развитие",
    growth: "+17,1% по деньгам; +2,3% клиентов",
    score: 2,
    listed: "Sipuni ≈3% рынка. UIS также присутствует в ВАТС, но её сопоставимая доля отдельно не раскрыта.",
    competitors: "Ростелеком вместе с MANGO OFFICE ≈35%, МТС, Билайн, Novofon, МегаФон, Телфин, Дом.ru Бизнес.",
    gapWhy: "Дополнительная ёмкость до 2030 ≈19,6 млрд ₽ — это будущий рост ARPU и сервисов, а не greenfield: уже подключено 540,7 тыс. компаний.",
    outlook: "Количество новых клиентов почти вышло на плато. Рост смещается в речевую аналитику, AI‑операторов, омниканальность, маркировку вызовов и антиспам.",
    entry: "Горизонтальная ВАТС непривлекательна. Возможен независимый AI‑слой контроля звонков и омниканальных коммуникаций поверх нескольких операторов.",
    source: "ТМТ Консалтинг: рынок ВАТС 2025",
    sourceUrl: "https://tmt-consulting.ru/wp-content/uploads/2026/05/%D0%A2%D0%9C%D0%A2_%D0%A0%D0%B5%D0%B9%D1%82%D0%B8%D0%BD%D0%B3-%D0%92%D0%90%D0%A2%D0%A1_2025.pdf",
  },
  {
    name: "Кадровый электронный документооборот",
    category: "HR и работа",
    volume: 5000,
    tam: 25000,
    year: "2025",
    confidence: "средняя",
    stage: "ранний mass market",
    growth: "+60–80%",
    score: 5,
    listed: "HR‑Link ≈30%.",
    competitors: "VK HR Tek, Saby/Тензор, Контур.КЭДО, Directum HR Pro, 1С, BOSS‑Кадровик, ELMA365, СберКорус.",
    gapWhy: "Потенциал ≈20 млрд ₽. Низкое проникновение у SMB и blue-collar, сложные интеграции с ЗУП, ИБ и консервативность работодателей.",
    outlook: "Регуляторика и распределённый персонал поддержат высокий рост; функции будут встраиваться в HR‑экосистемы.",
    entry: "Mobile-first КЭДО для blue-collar и франшиз: офлайн‑подписание, миграция за дни, цена за юрлицо и готовый коннектор 1С ЗУП.",
    source: "CNews: рынок КЭДО 2025",
    sourceUrl: "https://www.cnews.ru/news/line/2026-01-15_hrlink_v_2025_godu_rynok_kadrovogo",
  },
  {
    name: "ATS / автоматизация рекрутмента",
    category: "HR и работа",
    volume: 4500,
    tam: 10700,
    year: "2024, расчёт",
    confidence: "низкая",
    stage: "рост / консолидация",
    growth: "+15–25%",
    score: 3,
    listed: "Хантфлоу ≈17%; Skillaz ≈18–21%, но Skillaz — более широкая HR‑платформа.",
    competitors: "Поток, Talantix, E‑Staff, FriendWork, СберПодбор, 1С, Битрикс24, VK HR Tek, Robovoice/Naumen.",
    gapWhy: "Потенциал ≈6,2 млрд ₽. Автоматизация ниже у малого бизнеса; AI в найме применяют единицы, а бюджеты смещаются в удержание.",
    outlook: "Кадровый дефицит поддерживает спрос, но bundling со стороны hh.ru, 1С и экосистем сжимает горизонтальные ATS.",
    entry: "ATS для массового почасового персонала: Telegram/VK‑воронка, антифрод, прогноз выхода и outcome‑pricing за фактический найм.",
    source: "SuperJob: проникновение ATS",
    sourceUrl: "https://www.superjob.ru/research/articles/114792/kedo-i-sistemy-avtomatizacii-rekrutinga-chasche-vnedryaet-krupnyj-biznes/",
  },
  {
    name: "Корпоративное обучение / LMS",
    category: "HR и работа",
    volume: 7200,
    tam: 12600,
    year: "2024",
    confidence: "высокая",
    stage: "зрелый enterprise / рост SMB",
    growth: "+20%",
    score: 4,
    listed: "Mirapolis ≈8%; Эквио ≈8%; Teachbase ≈4%.",
    competitors: "iSpring ≈49%, Websoft ≈14%, Saby HRM, VK HR Tek, Поток Обучение, Neon HRM, Unicraft, Motivity.",
    gapWhy: "Потенциал ≈5,4 млрд ₽. Enterprise насыщен, но регионы и frontline имеют низкое проникновение; ROI обучения трудно доказать.",
    outlook: "AI‑авторинг ускорит создание контента, однако LMS‑функции встраиваются в HRM. Рост — в operational learning.",
    entry: "Обучение frontline: микроуроки, проверка навыка на рабочем месте, сменные задания, офлайн‑режим и outcome‑метрики.",
    source: "Smart Ranking: LMS 2024",
    sourceUrl: "https://skillbox.ru/media/corptrain/stali-izvestny-lidery-rossiyskogo-rynka-lms-dlya-korporativnogo-obucheniya/",
  },
  {
    name: "Управление проектами и задачами",
    category: "HR и работа",
    volume: 6600,
    tam: 8000,
    year: "2025, прогноз",
    confidence: "средняя",
    stage: "середина роста / насыщение SMB",
    growth: "+10–15%",
    score: 2,
    listed: "Pyrus ≈9% всего рынка; Kaiten ≈5%; YouGile ≈3,5%. В узком task tracking доли выше.",
    competitors: "Битрикс24, Мегаплан, WEEEK, Shtab, ПланФикс, EvaTeam, VK WorkSpace, Яндекс Трекер, Advanta.",
    gapWhy: "Потенциал всего ≈1,4 млрд ₽ при текущей границе. Бесплатные инструменты и экосистемы делают горизонтальный продукт commodity.",
    outlook: "Импортозамещение Jira поддерживает enterprise, но SMB близок к насыщению. Ценность переходит в отраслевые workflows.",
    entry: "Только вертикальный PM: стройка/инжиниринг с графиками, сметами, актами, внешними подрядчиками и миграцией Excel/Primavera.",
    source: "Naumen: рынок управления проектами",
    sourceUrl: "https://www.naumen.ru/events/news/7454/",
  },
  {
    name: "Service Desk / ITSM / ESM",
    category: "HR и работа",
    volume: 11000,
    tam: 29300,
    year: "2024, диапазон",
    confidence: "средняя",
    stage: "зрелый enterprise / replacement",
    growth: "+15–20%",
    score: 4,
    listed: "Naumen ITSM до ≈21%; Okdesk ≈2%; HelpDeskEddy ≈2%; Юздеск ≈2%. ITSM 365 входит в Naumen.",
    competitors: "SimpleOne, BPMSoft, 1С:ITILIUM, ELMA365, InfraManager, Comindware, GreenData, vsDesk, IntraService, Omnidesk.",
    gapWhy: "Потенциал ≈18,3 млрд ₽. Многие используют базовый help desk, но не полноценный ESM; мешают кастомизация и длинные внедрения.",
    outlook: "Уход ServiceNow/Jira SM создаёт replacement cycle; AI‑агенты и ESM за пределами ИТ расширят рынок.",
    entry: "SaaS‑ESM для среднего бизнеса: готовые каталоги ИТ/АХО/HR/закупок, discovery и запуск до 30 дней.",
    source: "TAdviser: рынок ITSM",
    sourceUrl: "https://www.tadviser.ru/index.php/Статья:Российский_рынок_ITSM-систем",
  },
  {
    name: "ВКС и совместная работа",
    category: "HR и работа",
    volume: 24250,
    tam: 44500,
    year: "2024 / потенциал 2028",
    confidence: "высокая",
    stage: "рост / быстрая консолидация",
    growth: "+15–18%",
    score: 3,
    listed: "МТС Линк ≈7,5% широкого рынка ВКС; в облачном сегменте компания — один из лидеров.",
    competitors: "TrueConf, IVA Technologies, VK WorkSpace, Яндекс 360, Контур.Толк, Dion, eXpress, VideoMost, SaluteJazz.",
    gapWhy: "Дополнительная ёмкость до 2028 ≈20,25 млрд ₽. Она не «ничья»: это будущий рост от импортозамещения и обновления инфраструктуры.",
    outlook: "ВКС сливается с мессенджером, почтой и календарём; AI‑протоколы становятся обязательной функцией.",
    entry: "Защищённая федеративная ВКС для регулируемых отраслей: on‑prem AI, legacy rooms, гостевой доступ и SLA слабых каналов.",
    source: "J’son & Partners: рынок ВКС",
    sourceUrl: "https://json.tv/analytic/rossijskij-rynok-po-vks-v-segmente-on-premise-2023-2028-gg/",
  },
  {
    name: "Облачная ERP / склад / торговля",
    category: "Торговля и данные",
    volume: 7500,
    tam: 54000,
    year: "2025, оценка",
    confidence: "средняя",
    stage: "рост / консолидация",
    growth: "+15–25%",
    score: 5,
    listed: "МойСклад ≈22–33%; Бизнес.ру ≈4–6%; АТОЛ Sigma ≈3–5%.",
    competitors: "1С:Фреш/УНФ/Розница, Saby, Контур.Маркет, LiteBox, CloudShop, RetailCRM, ЕКАМ.",
    gapWhy: "Потенциал ≈46,5 млрд ₽. Микробизнес остаётся в Excel или локальной 1С и покупает только обязательный кассовый минимум.",
    outlook: "Маркировка, маркетплейсы и банковские API увеличивают спрос; универсальный ERP проигрывает отраслевому workflow.",
    entry: "Vertical ERP для автозапчастей, малого производства или дистрибуции с AI‑закупками и маржинальностью SKU.",
    source: "АНО НЦК ИСУ: ERP РФ",
    sourceUrl: "https://www.cnews.ru/news/line/2025-03-05_ano_ntsk_isu_rossijskij",
  },
  {
    name: "Конструкторы сайтов / e‑commerce platforms",
    category: "Торговля и данные",
    volume: 6500,
    tam: 54000,
    year: "2024, оценка",
    confidence: "средняя",
    stage: "зрелый builder / рост commerce",
    growth: "+10–20%",
    score: 4,
    listed: "Tilda ≈32–44%; InSales ≈9–13%.",
    competitors: "1С‑Битрикс, Nethouse, Craftum, Flexbe, AdvantShop, WordPress/WooCommerce, VK и Яндекс.",
    gapWhy: "Потенциал ≈47,5 млрд ₽, но SAM намного уже: спрос ушёл на маркетплейсы, многие используют соцсети или разовую разработку.",
    outlook: "Site builder зрелый; рост — в owned commerce, PIM, доставке и снижении зависимости брендов от маркетплейсов.",
    entry: "Owned commerce OS: PIM + сайт + CRM‑маркетинг + доставка + unit‑экономика для брендов и производителей.",
    source: "InSales: итоги 2024",
    sourceUrl: "https://oborot.ru/news/za-schet-chego-vyruchka-insales-vyrosla-na-115-za-god-sellery-marketplejsov-i-sluzhby-dostavki-zaplatili-kompanii-707-millionov-i242206.html",
  },
  {
    name: "Аналитика и управление маркетплейсами",
    category: "Торговля и данные",
    volume: 4730,
    tam: 20450,
    year: "2024",
    confidence: "высокая",
    stage: "консолидация после гиперроста",
    growth: "+15,5%, затем снижение части игроков",
    score: 3,
    listed: "MPSTATS ≈32–50%; MarketGURU ≈10–14%; EGGHEADS ≈9–12%; XWAY, Маяк, SellMonitor и Дживио — длинный хвост.",
    competitors: "Moneyplace, Sellematics, SellerFox, Selsup, Меркатус, LikeStats, Shopstat, аналитика WB/Ozon.",
    gapWhy: "Потенциал ≈15,7 млрд ₽. Из 620 тыс. селлеров платит меньшинство; микроселлеры уходят, а площадки ограничивают данные.",
    outlook: "Дашборды коммодитизируются; банки консолидируют лидеров. Рост возможен через исполнение решений, а не визуализацию.",
    entry: "AI‑оператор прибыли: закупка, реклама, цена, поставка и cash‑flow; outcome‑pricing за управляемый GMV или экономию.",
    source: "Исследование рынка аналитики маркетплейсов",
    sourceUrl: "https://ecomhub.ru/marketplace-analytics-market-2024-mpstat-marketguru-eggsheads-moneyplace-sellematics/",
  },
  {
    name: "Управленческий финансовый учёт",
    category: "Торговля и данные",
    volume: 1000,
    tam: 30000,
    year: "2024, оценка",
    confidence: "средняя",
    stage: "ранний рост",
    growth: "+30–60%",
    score: 5,
    listed: "PlanFact ≈18–28%; Финтабло ≈17–26%; Финансист ≈12–18%.",
    competitors: "Adesk, Seeneco, Финолог, 1С:УНФ, Моё дело, Контур, Excel/Google Sheets, аутсорс‑финдиры.",
    gapWhy: "Потенциал ≈29 млрд ₽. Большинство собственников не ведёт P&L; требуются методология, onboarding и дисциплина команды.",
    outlook: "Категория формирует новую привычку. Банковские интеграции и AI‑категоризация ускорят рост, но сервисная нагрузка останется.",
    entry: "Финансовый автопилот для конкретной вертикали: ежедневная прибыль, налоги, cash‑gap и рекомендации «что делать сегодня».",
    source: "Рейтинг SaaS финансового учёта",
    sourceUrl: "https://vc.ru/services/1903007-reyting-saas-servisov-dlya-finansovogo-uchyota",
  },
  {
    name: "OCR/IDP и data API",
    category: "Торговля и данные",
    volume: 4850,
    tam: 18500,
    year: "2024",
    confidence: "средняя",
    stage: "быстрый IDP / зрелый data API",
    growth: "IDP +52%",
    score: 5,
    listed: "Entera ≈7% OCR; DaData и DMP.one занимают заметные, но несопоставимые доли отдельного data API‑сегмента.",
    competitors: "Content AI, Smart Engines, ITFB, Correct, Dbrain, Beorg; Контур.Фокус, Saby, HFLabs, ФИАС.",
    gapWhy: "Потенциал ≈13,65 млрд ₽. Интеграция в учёт дороже распознавания; персональные данные и ответственность за ошибки тормозят внедрение.",
    outlook: "Чистый OCR коммодитизируется VLM, ценность переходит в завершённый business workflow и проверку данных.",
    entry: "AP automation: документ → контрагент → проводка → сверка → платёж; human‑in‑the‑loop только для исключений.",
    source: "CNews: рынок OCR/IDP",
    sourceUrl: "https://www.cnews.ru/news/top/2025-04-18_obem_rynka_sistem_raspoznavaniya",
  },
  {
    name: "Облачное видеонаблюдение",
    category: "Торговля и данные",
    volume: 8850,
    tam: 24000,
    year: "2025, оценка",
    confidence: "высокая",
    stage: "устойчивое масштабирование",
    growth: "+18–26%",
    score: 4,
    listed: "Ivideon: подписка ≈13–17% рынка; вся группа даёт верхнюю границу доли около 20%.",
    competitors: "Ростелеком, МТС, Билайн, Trassir Cloud, Macroscop, Faceter, IPEYE, WebGlazok, Netris.",
    gapWhy: "Потенциал ≈15,15 млрд ₽. Локальный регистратор дешевле, нужны камеры и канал, компании опасаются утечки видео.",
    outlook: "ПВЗ, франшизы и white label операторов ускоряют дистрибуцию. Следующая волна — операционная видеоаналитика.",
    entry: "«Камера + событие + workflow» для ПВЗ, общепита или сетей: очередь, выкладка, касса, качество и доказуемый ROI.",
    source: "Исследование российского VSaaS",
    sourceUrl: "https://companies.rbc.ru/news/i6iMgcpwaZ/rossijskij-ryinok-oblachnogo-videonablyudeniya-uvelichitsya-vdvoe-k-2030-godu/",
  },
  {
    name: "Музыка для бизнеса",
    category: "Торговля и данные",
    volume: 2000,
    tam: 9000,
    year: "2024, оценка",
    confidence: "низкая",
    stage: "фрагментированный рост",
    growth: "+10–20%",
    score: 4,
    listed: "Звук Бизнес ориентировочно 12–30% сервисной части; отдельная выручка не раскрыта.",
    competitors: "FONMIX, Бубука, Muzlab, Market Music, РадиоПарк, Музкафе, нелегальный consumer streaming.",
    gapWhy: "Потенциал ≈7 млрд ₽. Низкая правовая грамотность, двойная оплата сервису и ОКУП, пиратство и длинный хвост точек.",
    outlook: "Консолидация вероятна вокруг экосистем и правообладателей; аудиореклама и управление сетью повышают ARPU.",
    entry: "Compliance‑first «музыка + права + документы» по цене за точку, затем retail‑media и измерение uplift через кассу.",
    source: "Ведомости: музыка для бизнеса",
    sourceUrl: "https://www.vedomosti.ru/media/articles/2021/10/05/889836-restoranah-zalah",
  },
  {
    name: "Аудит торговых точек / field force",
    category: "Торговля и данные",
    volume: 2250,
    tam: 10000,
    year: "2024, оценка",
    confidence: "низкая",
    stage: "рост / M&A",
    growth: "+15–25%",
    score: 4,
    listed: "MD Audit ≈6–11%.",
    competitors: "ST‑Mobile, Моби‑С, Planado, Okdesk, SimpleOne, BPMSoft, Naumen, 1С и внутренние приложения сетей.",
    gapWhy: "Потенциал ≈7,75 млрд ₽. Крупные сети строят in-house, SMB не видит ROI, а фотоотчёт без AI создаёт ручную проверку.",
    outlook: "Компьютерное зрение превращает чек‑лист из фиксации в обнаружение нарушений; enterprise‑канал стимулирует сделки.",
    entry: "Self‑serve для сетей 20–300 точек: отраслевые стандарты, AI‑проверка фото, запуск за день и цена за активную точку.",
    source: "MD Audit / РСБУ",
    sourceUrl: "https://zachestnyibiznes.ru/company/ul/1197746211684_9731034717_OOO-MD-AUDIT",
  },
  {
    name: "Платформы создания и продажи обучения",
    category: "Торговля и данные",
    volume: 4000,
    tam: 11500,
    year: "2024, оценка",
    confidence: "средняя",
    stage: "зрелый лидер / замедление школ",
    growth: "+5–15%",
    score: 3,
    listed: "GetCourse ≈33–55%; ProgressMe — отдельная ниша языковых школ и репетиторов.",
    competitors: "Антитренинги, CoreApp, Bizon 365, Stepik, iSpring Market, Skillspace, Prodamus XL, Salebot.",
    gapWhy: "Потенциал ≈7,5 млрд ₽. Дорогой трафик и высокая смертность школ ограничивают спрос; зрелые игроки боятся комиссии и lock‑in.",
    outlook: "Рост смещается в AI‑production, cohort learning, B2B‑обучение и OS для малых образовательных бизнесов.",
    entry: "Usage-based платформа без процента GMV: AI‑курс, CRM, платежи и измеримые learning outcomes для компаний и сообществ.",
    source: "Forbes: GetCourse и рынок школ",
    sourceUrl: "https://www.forbes.ru/education/530288-oboroty-rossijskih-onlajn-skol-v-2024-godu-vyrosli-bolee-cem-na-6",
  },
  {
    name: "Автоматизация ресторанов / HoReCa",
    category: "Вертикальный SaaS",
    volume: 6750,
    tam: 17300,
    year: "2024, оценка",
    confidence: "средняя",
    stage: "зрелость / консолидация",
    growth: "+15–18%",
    score: 4,
    listed: "iiko ≈57–59%; DocsInBox ≈16%; Quick Resto ≈4%; R‑Keeper — крупный исторический игрок.",
    competitors: "Saby Presto, 1С‑Рарус/1С:Общепит, АТОЛ Sigma, Paloma365, МойСклад, delivery/loyalty‑решения.",
    gapWhy: "Потенциал midpoint ≈10,55 млрд ₽. Микроточки, столовые и регионы не покупают полный контур из-за низкой маржи и цены миграции.",
    outlook: "Core POS консолидирован; рост — в апсейле данных, закупок, антифрода, персонала и AI‑оптимизации.",
    entry: "Data layer поверх iiko/r_keeper: прогноз спроса, food‑cost, закупки и контроль списаний с ROI за 1–3 месяца.",
    source: "Ведомости / Smart Ranking: HoReCa software",
    sourceUrl: "https://www.vedomosti.ru/business/articles/2024/06/14/1043711-rinok-softa-dlya-restorannogo-biznesa-viros",
  },
  {
    name: "Hotel PMS / channel manager",
    category: "Вертикальный SaaS",
    volume: 8100,
    tam: 14900,
    year: "2024",
    confidence: "высокая",
    stage: "быстрый рост / доминирующий лидер",
    growth: "+25%",
    score: 3,
    listed: "TravelLine ≈60%; Bnovo ≈5%; RealtyCalendar ≈3%; вместе компании списка ≈68%.",
    competitors: "HRS ≈14%, Hoteza, Libra Hospitality, Shelter, Logus HMS, Контур.Отель, Bronevik/Островок.",
    gapWhy: "Потенциал midpoint ≈6,8 млрд ₽. Гостевые дома, глэмпинги и апартаменты часто используют только channel manager без PMS/RMS.",
    outlook: "2025 прогнозировался на уровне 9,9 млрд ₽. Обязательная классификация выводит неформальные объекты в цифровой контур.",
    entry: "PMS для гостевых домов/глэмпингов либо AI revenue management для объектов на 10–50 номеров; конкурировать с TravelLine в лоб не стоит.",
    source: "HotelTech 2025",
    sourceUrl: "https://travelres.ru/reiting-hoteltech-kompanii-2025/",
  },
  {
    name: "Корпоративные поездки / OBT",
    category: "Вертикальный SaaS",
    volume: 4025,
    tam: 8625,
    year: "2024, расчёт",
    confidence: "средняя",
    stage: "рост / консолидация",
    growth: "+20–27%",
    score: 4,
    listed: "Smartway ≈21–31%; Trivio ≈16–24%; вместе ≈37–55%.",
    competitors: "Аэроклуб, Випсервис/Hamilton, OneTwoTrip, Островок, Ozon Travel, Яндекс Путешествия, Туту, Bronevik.",
    gapWhy: "Потенциал midpoint ≈4,6 млрд ₽. 70% поездок уже онлайн, но заявки, политика, авансовый отчёт и закрывающие документы не автоматизированы end‑to‑end.",
    outlook: "Рост GMV и миграция TMC в OBT поддерживают рынок; консолидация усиливается.",
    entry: "Средний бизнес 20–200 сотрудников: авансовый отчёт, суточные, такси, policy‑engine и санкционно‑устойчивые зарубежные поездки.",
    source: "САД: рынок деловых поездок",
    sourceUrl: "https://www.miceandmore.org/articles/topic/v-2024-godu-rossiyskiy-rynok-delovykh-poezdok-dostig-rekordnoy-otmetki-bolee-1-trilliona-rubley/",
  },
  {
    name: "TMS / транспортная логистика",
    category: "Вертикальный SaaS",
    volume: 4250,
    tam: 9900,
    year: "2024, расчёт",
    confidence: "низкая",
    stage: "ранний рост / фрагментация",
    growth: "+20–30%",
    score: 5,
    listed: "Умная Логистика ≈9–17%; 6 416 платящих компаний.",
    competitors: "ATI.SU, LogistPro, Atrucks, Trucker, 1С:TMS, AXELOT, Мегалогист, Saby TMS, Адвантум, Relog.",
    gapWhy: "Потенциал midpoint ≈5,65 млрд ₽. Малые автопарки и экспедиторы остаются в чатах/Excel; грузовладельцам не хватает тендерного контура.",
    outlook: "Проникновение низкое, платная база лидеров быстро растёт. ЭТрН и AI‑диспетчер создают новый цикл автоматизации.",
    entry: "TMS‑lite для 3–20 машин: маржа рейса, AI‑диспетчер, ЭТрН, факторинг и страхование.",
    source: "Исследование российского TMS",
    sourceUrl: "https://logistics360.ru/issledovanie-rynka-sistem-upravleniya-transportnoj-logistikoj-tms/",
  },
  {
    name: "Автоматизация строительства / девелопмента",
    category: "Вертикальный SaaS",
    volume: 4000,
    tam: 13000,
    year: "2024, расчёт",
    confidence: "низкая",
    stage: "рост / формирование",
    growth: "+25–35%",
    score: 5,
    listed: "CYNTEKA ≈16–26%; Macro ≈6–9%; Profitbase ≈6–10%; ДВИЖ ≈6–9%; вместе ≈33–55%.",
    competitors: "Exon, Pragmacore, Adept, 1С, отраслевые Битрикс24/amoCRM, Nmarket.PRO, Домопланер, ДОМ.РФ.",
    gapWhy: "Потенциал ≈9 млрд ₽. Средние подрядчики сохраняют Excel, мессенджеры и фрагментарную 1С; данные сметы, закупки и факта не связаны.",
    outlook: "Высокая ставка и дефицит кадров усиливают спрос на прозрачность. Консолидация девелоперов сокращает число крупных покупателей, но mid-market свободен.",
    entry: "Data layer «смета—закупка—факт» или SaaS для субподрядчика: мобильный контроль, исполнительная документация и AI‑сопоставление КП.",
    source: "CNews: цифровизация строительства",
    sourceUrl: "https://corp.cnews.ru/reviews/tsifrovizatsiya_stroitelnoj_otrasli",
  },
  {
    name: "Автоматизация цветочного бизнеса",
    category: "Вертикальный SaaS",
    volume: 575,
    tam: 1020,
    year: "2024, расчёт",
    confidence: "низкая",
    stage: "ранняя зрелость",
    growth: "+15–20%",
    score: 2,
    listed: "Posiflora ≈31–48%, но часть выручки может приходиться на зарубежные рынки.",
    competitors: "FloraPoint, INSPIRO, Subtotal, МойСклад, 1С:Розница, RetailCRM, Flora POS, таблицы.",
    gapWhy: "Потенциал midpoint ≈445 млн ₽. Одиночные точки чувствительны к цене, churn высок из-за закрытий магазинов.",
    outlook: "Подключение новых точек замедлится; рост — в ARPU, прогнозе списаний, B2B‑заказах и франчайзинговом управлении.",
    entry: "Только узкий клин: AI‑закупка и прогноз списаний либо инфраструктура B2B‑подписок и локальной доставки.",
    source: "Точка: цветочный рынок",
    sourceUrl: "https://www.retail.ru/news/rynok-tsvetochnoy-roznitsy-v-rossii-dostig-nasyshcheniya-11-marta-2026-275367/",
  },
];

const categories = ["Все", "Продажи", "HR и работа", "Торговля и данные", "Вертикальный SaaS"] as const;
const companyMap = [
  ["Битрикс24", "CRM и автоматизация продаж"],
  ["iiko", "Автоматизация ресторанов / HoReCa"],
  ["TravelLine", "Hotel PMS / channel manager"],
  ["Smartway", "Корпоративные поездки / OBT"],
  ["Mindbox", "CDP и маркетинговая автоматизация"],
  ["Tilda", "Конструкторы сайтов / e‑commerce platforms"],
  ["Wazzup", "Интеграция мессенджеров"],
  ["Calltouch", "Коллтрекинг и сквозная аналитика"],
  ["YClients", "Онлайн‑запись для сферы услуг"],
  ["МойСклад", "Облачная ERP / склад / торговля"],
  ["amoCRM", "CRM и автоматизация продаж"],
  ["GetCourse", "Платформы создания и продажи обучения"],
  ["DocsInBox", "Автоматизация ресторанов / HoReCa"],
  ["MPSTATS", "Аналитика и управление маркетплейсами"],
  ["Ivideon", "Облачное видеонаблюдение"],
  ["HR‑Link", "Кадровый электронный документооборот"],
  ["UIS", "Коллтрекинг / ВАТС"],
  ["Roistat", "Коллтрекинг и сквозная аналитика"],
  ["Моё дело", "Облачная ERP / бухгалтерия SMB"],
  ["МТС Линк", "ВКС и совместная работа"],
  ["InSales", "Конструкторы сайтов / e‑commerce platforms"],
  ["Unisender", "Email и омниканальные рассылки"],
  ["Хантфлоу", "ATS / автоматизация рекрутмента"],
  ["Skillaz", "ATS / автоматизация рекрутмента"],
  ["RetailCRM", "CRM и автоматизация продаж"],
  ["Trivio", "Корпоративные поездки / OBT"],
  ["Умная Логистика", "TMS / транспортная логистика"],
  ["Retail Rocket", "CDP / e‑commerce персонализация"],
  ["Pyrus", "Управление проектами и задачами"],
  ["MarketGURU", "Аналитика и управление маркетплейсами"],
  ["Эквио", "Корпоративное обучение / LMS"],
  ["Sendsay", "Email и омниканальные рассылки"],
  ["Bnovo", "Hotel PMS / channel manager"],
  ["Mirapolis", "Корпоративное обучение / LMS"],
  ["RealtyCalendar", "Hotel PMS / посуточная аренда"],
  ["anyQuery", "E‑commerce search и персонализация"],
  ["CYNTEKA", "Автоматизация строительства / девелопмента"],
  ["XWAY", "Аналитика и управление маркетплейсами"],
  ["Kaiten", "Управление проектами и задачами"],
  ["R‑Keeper", "Автоматизация ресторанов / HoReCa"],
  ["PremiumBonus", "CDP / программы лояльности"],
  ["Macro", "Автоматизация строительства / девелопмента"],
  ["RocketData", "Репутация и данные на картах"],
  ["Топвизор", "SEO software / search visibility"],
  ["BotHelp", "Интеграция мессенджеров"],
  ["Posiflora", "Автоматизация цветочного бизнеса"],
  ["Бизнес.ру", "Облачная ERP / склад / торговля"],
  ["Поинтер", "Репутация и данные на картах"],
  ["Callibri", "Коллтрекинг и сквозная аналитика"],
  ["Entera", "OCR/IDP и data API"],
  ["Маяк", "Аналитика и управление маркетплейсами"],
  ["Chat2Desk", "Интеграция мессенджеров"],
  ["QuickResto", "Автоматизация ресторанов / HoReCa"],
  ["YouGile", "Управление проектами и задачами"],
  ["Profitbase", "Автоматизация строительства / девелопмента"],
  ["DMP.one", "OCR/IDP и data API"],
  ["Звук Бизнес", "Музыка для бизнеса"],
  ["SellMonitor", "Аналитика и управление маркетплейсами"],
  ["АТОЛ Sigma", "Облачная ERP / склад / торговля"],
  ["ITSM 365", "Service Desk / ITSM / ESM"],
  ["ДВИЖ", "Автоматизация строительства / девелопмента"],
  ["Sipuni", "Виртуальные АТС / корпоративная телефония"],
  ["Imshop", "E‑commerce apps / CDP и лояльность"],
  ["Okdesk", "Service Desk / ITSM / ESM"],
  ["WhoIsBlogger", "Influencer marketing analytics"],
  ["DaData", "OCR/IDP и data API"],
  ["Teachbase", "Корпоративное обучение / LMS"],
  ["ProgressMe", "Платформы создания и продажи обучения"],
  ["Дживио", "Аналитика и управление маркетплейсами"],
  ["SEOWORK", "SEO software / search visibility"],
  ["Финтабло", "Управленческий финансовый учёт"],
  ["Финансист", "Управленческий финансовый учёт"],
  ["MD Audit", "Аудит торговых точек / field force"],
  ["Юздеск", "Service Desk / ITSM / ESM"],
  ["HelpDeskEddy", "Service Desk / ITSM / ESM"],
  ["Carrot quest", "Email и омниканальные рассылки"],
  ["PlanFact", "Управленческий финансовый учёт"],
  ["TextBack", "Интеграция мессенджеров"],
  ["EGGHEADS", "Аналитика и управление маркетплейсами"],
] as const;
const fmt = (value: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(value);
const confidenceTone = (value: Market["confidence"]) =>
  value === "высокая" ? "success" : value === "средняя" ? "info" : "warning";

export default function RussianSaaSEntryOpportunities() {
  const theme = useHostTheme();
  const [category, setCategory] = useCanvasState<(typeof categories)[number]>("category", "Все");
  const [query, setQuery] = useCanvasState("query", "");
  const [onlyTop, setOnlyTop] = useCanvasState("onlyTop", false);

  const filtered = markets
    .filter((m) => category === "Все" || m.category === category)
    .filter((m) => !onlyTop || m.score >= 4)
    .filter((m) => `${m.name} ${m.listed} ${m.entry}`.toLocaleLowerCase("ru").includes(query.toLocaleLowerCase("ru")))
    .sort((a, b) => b.score - a.score || b.tam / b.volume - a.tam / a.volume);

  const topMarkets = markets.filter((m) => m.score === 5);
  const highConfidence = markets.filter((m) => m.confidence === "высокая").length;

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1540, margin: "0 auto" }}>
      <Stack gap={10}>
        <Row justify="space-between" align="start" gap={20} wrap>
          <Stack gap={6} style={{ maxWidth: 1050 }}>
            <H1>Карта рынков для запуска нового B2B SaaS‑продукта в России</H1>
            <Text style={{ color: theme.text.secondary }}>
              32 рынка · все 79 компаний расширенного SaaS‑списка · объём, TAM, доли, конкуренты и точки входа · 2024–2025
            </Text>
          </Stack>
          <Pill tone="info" active>обновлено 27.07.2026</Pill>
        </Row>
        <Callout tone="warning" title="«Свободная ёмкость» не является ничейной выручкой">
          Текущий объём рынка уже принадлежит поставщикам. В отчёте свободный потенциал — разница TAM и текущего объёма:
          клиенты без продукта, недомонетизированные модули и будущий рост. TAM рассчитан при полном достижимом проникновении,
          поэтому реальный SAM нового игрока обычно в 2–5 раз меньше. Пересекающиеся рынки нельзя складывать.
        </Callout>
      </Stack>

      <Grid columns={4} gap={14}>
        <Stat value={markets.length} label="рынок в итоговой карте" />
        <Stat value={topMarkets.length} label="наиболее привлекательных ниш" tone="success" />
        <Stat value={highConfidence} label="рынков с высокой уверенностью" />
        <Stat value="15–20%" label="ожидаемый рост B2B SaaS РФ в 2026–2027" tone="info" />
      </Grid>

      <Card>
        <CardHeader trailing={`${filtered.length} рынков`}>Фильтры</CardHeader>
        <CardBody>
          <Stack gap={12}>
            <Row gap={8} wrap>
              {categories.map((item) => (
                <Button
                  variant={category === item ? "primary" : "secondary"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ))}
              <Button variant={onlyTop ? "primary" : "secondary"} onClick={() => setOnlyTop(!onlyTop)}>
                Только привлекательные
              </Button>
            </Row>
            <TextInput
              value={query}
              onChange={setQuery}
              type="search"
              placeholder="Поиск по рынку, компании или точке входа…"
              style={{ width: "100%" }}
            />
          </Stack>
        </CardBody>
      </Card>

      <Stack gap={10}>
        <H2>Сравнительная карта</H2>
        <Table
          headers={["Рынок", "Сегмент", "Объём", "TAM", "TAM / рынок", "Стадия", "Рост", "Вход", "Уверенность"]}
          rows={filtered.map((m) => [
            <Text weight="semibold">{m.name}</Text>,
            m.category,
            `${fmt(m.volume)} млн ₽`,
            `${fmt(m.tam)} млн ₽`,
            `${(m.tam / m.volume).toFixed(1)}×`,
            m.stage,
            m.growth,
            <Text weight="semibold">{m.score}/5</Text>,
            <Pill tone={confidenceTone(m.confidence)}>{m.confidence}</Pill>,
          ])}
          columnAlign={["left", "left", "right", "right", "right", "left", "right", "right", "left"]}
          striped
          stickyHeader
          style={{ maxHeight: 680 }}
        />
      </Stack>

      <CollapsibleSection
        title="Проверка охвата исходного расширенного списка"
        trailing={<Text style={{ color: theme.text.tertiary }}>{companyMap.length} компаний</Text>}
      >
        <Stack gap={10} style={{ paddingTop: 10 }}>
          <Text style={{ color: theme.text.secondary }}>
            Для многопродуктовых компаний указан основной рынок; UIS, Retail Rocket, Sendsay и Imshop пересекают несколько категорий.
          </Text>
          <Table
            headers={["Компания", "Основной рынок в исследовании"]}
            rows={companyMap.map(([company, market]) => [
              <Text weight="semibold">{company}</Text>,
              market,
            ])}
            striped
            style={{ maxHeight: 520 }}
          />
        </Stack>
      </CollapsibleSection>

      <Grid columns={2} gap={20}>
        <Stack gap={8}>
          <H2>Лучшие окна для нового продукта</H2>
          <Text><b>1. Управленческий финучёт:</b> огромный разрыв между привычкой и TAM; входить вертикальным финансовым автопилотом.</Text>
          <Text><b>2. КЭДО для frontline:</b> регуляторный рынок с низким проникновением вне крупного офиса.</Text>
          <Text><b>3. Vertical ERP:</b> обязательные процессы и большой TAM; выигрывает глубина одной отрасли.</Text>
          <Text><b>4. CDP‑lite:</b> mid-market недоступны дорогие внедрения лидеров, но нужны first-party data и измеримый uplift.</Text>
          <Text><b>5. TMS‑lite:</b> десятки тысяч малых перевозчиков остаются в Excel и чатах.</Text>
          <Text><b>6. Строительный data layer:</b> смета, закупка и фактическое исполнение по-прежнему разорваны.</Text>
          <Text><b>7. Local reputation:</b> карты стали каналом продаж, а mid-market ещё не умеет измерять конверсию до кассы.</Text>
        </Stack>
        <Stack gap={8}>
          <H2>Куда входить опаснее</H2>
          <Text><b>Горизонтальная CRM:</b> экосистемы и лидеры контролируют дистрибуцию; нужен узкий vertical wedge.</Text>
          <Text><b>Task trackers:</b> маленький оставшийся gap и сильная бесплатная конкуренция.</Text>
          <Text><b>HotelTech «в лоб»:</b> TravelLine около 60%; целесообразны только узкие объекты или отдельный модуль.</Text>
          <Text><b>Marketplace dashboards:</b> рынок консолидируется, доступ к данным ухудшается; оправдан только action/outcome product.</Text>
          <Text><b>Цветочный SaaS:</b> небольшой TAM и высокий churn; самостоятельный большой бизнес построить трудно.</Text>
          <Text><b>Обычный OCR, email или rank tracker:</b> отдельная функция быстро коммодитизируется AI и бесплатными инструментами.</Text>
        </Stack>
      </Grid>

      <Stack gap={14}>
        <H2>Разбор каждого рынка</H2>
        {filtered.map((m, index) => (
          <CollapsibleSection
            defaultOpen={index < 3}
            title={m.name}
            trailing={
              <Row gap={8} align="center">
                <Text style={{ color: theme.text.tertiary }}>{m.score}/5</Text>
                <Pill tone={confidenceTone(m.confidence)}>{m.confidence}</Pill>
              </Row>
            }
          >
            <Stack gap={16} style={{ paddingTop: 10 }}>
              <Grid columns={4} gap={12}>
                <Stat value={`${fmt(m.volume)} млн ₽`} label={`текущий объём · ${m.year}`} />
                <Stat value={`${fmt(m.tam)} млн ₽`} label="потенциальный TAM" tone="info" />
                <Stat value={`${fmt(Math.max(m.tam - m.volume, 0))} млн ₽`} label="неосвоенный потенциал" />
                <Stat value={`${m.score}/5`} label="привлекательность входа" tone={m.score >= 4 ? "success" : "warning"} />
              </Grid>
              <Grid columns={2} gap={18}>
                <Stack gap={8}>
                  <H3>Компании списка и их доля</H3>
                  <Text>{m.listed}</Text>
                  <H3>Конкуренты</H3>
                  <Text>{m.competitors}</Text>
                  <H3>Почему TAM ещё не монетизирован</H3>
                  <Text>{m.gapWhy}</Text>
                </Stack>
                <Stack gap={8}>
                  <H3>Что происходит с рынком</H3>
                  <Text><b>{m.stage}; {m.growth}.</b> {m.outlook}</Text>
                  <Callout tone={m.score >= 4 ? "success" : "info"} title="Рекомендуемая точка входа">
                    {m.entry}
                  </Callout>
                  <Text style={{ color: theme.text.secondary }}>
                    Основной источник: <Link href={m.sourceUrl}>{m.source}</Link>
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </CollapsibleSection>
        ))}
      </Stack>

      <Stack gap={8}>
        <H2>Методика и качество данных</H2>
        <Text>
          Объём — годовая выручка поставщиков внутри узкой границы, не оборот клиентской отрасли и не GMV.
          TAM получен из независимого исследования либо bottom‑up: число достижимых покупателей × реалистичный ARPA.
          Доля компании рассчитана только когда её продуктовая выручка сопоставима с границей рынка; иначе показан диапазон.
        </Text>
        <Text>
          Уверенность «высокая» означает прямую рыночную оценку и сопоставимые данные компаний; «средняя» — один расчётный
          компонент; «низкая» — bottom‑up с несколькими допущениями. Оценки предназначены для выбора направления исследования,
          а не для инвестиционного решения без customer discovery.
        </Text>
        <Text style={{ color: theme.text.secondary }}>
          Общий фон: <Link href="https://saas-rating.ru/">SaaS Rating 2025</Link> оценивает наблюдаемый B2B SaaS в 98,6 млрд ₽,
          рост замедлился до 25%, прогноз на 2026–2027 — 15–20%. Альтернативная широкая методика iKS‑Consulting оценивает весь
          SaaS РФ в 190,7 млрд ₽; цифры различаются из-за состава компаний и видов облачного ПО.
        </Text>
      </Stack>
    </Stack>
  );
}
