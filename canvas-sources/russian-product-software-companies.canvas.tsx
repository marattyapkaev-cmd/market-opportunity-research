import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Grid,
  H1,
  H2,
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

type Company = {
  company: string;
  legal?: string;
  inn?: string;
  product: string;
  revenue: number;
  profit: number | null;
  year: number;
  source: string;
};

const verified: Company[] = [
  { company: "Лаборатория Касперского", legal: "АО «Лаборатория Касперского»", inn: "7713140469", product: "Kaspersky: защита устройств, сетей и промышленных систем; SIEM, EDR, anti‑APT", revenue: 59993.9, profit: -13996.7, year: 2025, source: "ФНС / Firmalyze / TAdviser" },
  { company: "СКБ Контур", legal: "АО «ПФ „СКБ Контур“»", inn: "6663003127", product: "Контур: электронная отчётность, ЭДО, бухгалтерия, закупки и сервисы для бизнеса", revenue: 40285.0, profit: 2876.0, year: 2025, source: "ФНС / TestFirm" },
  { company: "Сбертех", legal: "АО «Сбертех»", inn: "7736632467", product: "Platform V: корпоративная платформа, СУБД, интеграция, DevOps и инфраструктурное ПО", revenue: 28273.3, profit: 1157.7, year: 2025, source: "ФНС / TestFirm" },
  { company: "Тензор", legal: "ООО «Компания „Тензор“»", inn: "7605016030", product: "Saby (СБИС): ЭДО, отчётность, бухгалтерия, CRM, HRM, торговля и HoReCa", revenue: 22473.4, profit: 4150.0, year: 2025, source: "ФНС / TAdviser" },
  { company: "UserGate", legal: "ООО «Юзергейт»", inn: "5408308256", product: "UserGate: NGFW, WAF, SIEM, защита сетей и управление безопасностью", revenue: 10342.0, profit: 5100.0, year: 2025, source: "ФНС / TAdviser / Checko" },
  { company: "Postgres Professional", legal: "ООО «Постгрес Профессиональный»", product: "Postgres Pro: российская СУБД и инструменты для работы с корпоративными данными", revenue: 6655.0, profit: 3073.0, year: 2025, source: "ФНС / ComNews / TAdviser" },
  { company: "Актион‑диджитал", legal: "ООО «Актион‑диджитал»", inn: "7715670503", product: "Цифровые справочные системы и профессиональные сервисы для бухгалтеров, юристов и HR", revenue: 6171.0, profit: 2660.0, year: 2025, source: "ФНС / TAdviser" },
  { company: "SearchInform", legal: "ООО «Серчинформ»", inn: "7704306397", product: "DLP, DCAP, SIEM и другие продукты для защиты данных и контроля внутренних угроз", revenue: 5772.4, profit: 3930.0, year: 2025, source: "ФНС / TAdviser / Checko" },
  { company: "Киберпротект", legal: "ООО «Киберпротект»", inn: "9715274292", product: "Резервное копирование, восстановление, защита данных и управление ИТ‑инфраструктурой", revenue: 5333.0, profit: 1300.0, year: 2025, source: "ФНС / TAdviser / Checko" },
  { company: "Naumen", legal: "ООО «Наумен Консалтинг»", inn: "7725507256", product: "Naumen Service Desk, Contact Center, BPM и решения для управления клиентским сервисом", revenue: 2560.0, profit: 5.69, year: 2025, source: "ФНС / Cbonds / Checko" },
];

const saas: Company[] = [
  ["Битрикс24","Экосистема B2B‑продуктов: CRM, задачи, коммуникации и контакт‑центр",7007,null],
  ["iiko","Автоматизация ресторанов: учёт, кассы, склад, доставка и аналитика",6219,1408],
  ["TravelLine","Платформа продаж и управления для гостиничного бизнеса",5772,2123],
  ["Smartway","Организация и учёт корпоративных командировок",4258,865],
  ["Mindbox","CDP и платформа автоматизации персонализированного маркетинга",3340,-159],
  ["Tilda","Облачный конструктор сайтов и интернет‑магазинов",3084,2531],
  ["Wazzup","Интеграция мессенджеров с CRM для отделов продаж",2428,1576],
  ["Calltouch","Сквозная аналитика, коллтрекинг и управление рекламой",2140,695],
  ["YClients","Онлайн‑запись и автоматизация сервисного бизнеса",2001,302],
  ["МойСклад","Облачная ERP для торговли, склада и малого производства",1957,49],
  ["amoCRM","Облачная CRM для продаж и коммуникаций с клиентами",1850,678],
  ["GetCourse","Платформа создания, продажи и проведения онлайн‑обучения",1636,-634],
  ["DocsInBox","ЭДО, маркировка и автоматизация документов в HoReCa",1585,510],
  ["MPSTATS","Аналитика и управление продажами на маркетплейсах",1492,287],
  ["Ivideon","Облачное видеонаблюдение и видеоаналитика для бизнеса",1468,420],
  ["HR‑Link","Кадровый электронный документооборот",1436,256],
  ["UIS","Виртуальная телефония, коллтрекинг и аналитика маркетинга",1278,461],
  ["Roistat","Сквозная аналитика и инструменты управления маркетингом",1157,95],
  ["Моё дело","Онлайн‑бухгалтерия и сервисы учёта для малого бизнеса",1136,1],
  ["МТС Линк","Видеоконференции, вебинары, онлайн‑доски и совместная работа",1071,-1498],
  ["InSales","Платформа создания и управления интернет‑магазинами",1069,190],
  ["Unisender","Email‑, SMS‑ и омниканальные маркетинговые рассылки",953,214],
  ["Хантфлоу","CRM/ATS для автоматизации рекрутмента",897,223],
  ["Skillaz","Платформа автоматизации рекрутмента и HR‑процессов",846,-335],
  ["RetailCRM","CRM для интернет‑торговли и омниканальных продаж",687,-3],
  ["Trivio","Сервис организации корпоративных поездок",639,22],
  ["Умная Логистика","TMS‑платформа управления грузоперевозками",634,367],
  ["Retail Rocket","Персонализация, рекомендации и удержание покупателей",622,-7],
  ["Pyrus","Управление задачами, документами и бизнес‑процессами",594,216],
  ["MarketGURU","Аналитика и управление продажами на маркетплейсах",587,-41],
  ["Эквио","Корпоративное обучение и управление знаниями",584,20],
  ["Sendsay","Платформа омниканальных коммуникаций и автоматизации маркетинга",538,83],
  ["Bnovo","Облачная система управления отелем и продажами номеров",526,-42],
  ["Mirapolis","Корпоративное обучение, HRM и управление талантами",507,145],
  ["RealtyCalendar","Управление посуточной арендой и каналами продаж",485,-41],
  ["anyQuery","Маркетинговая аналитика и автоматизация работы с данными",469,94],
  ["CYNTEKA","Автоматизация закупок и снабжения в строительстве",415,6],
  ["XWAY","Управление продажами и аналитика маркетплейсов",399,64],
  ["Kaiten","Управление проектами, процессами и командами",396,32],
  ["R‑Keeper","Автоматизация ресторанов, касс и складского учёта",394,91],
  ["PremiumBonus","Платформа программ лояльности и CRM‑маркетинга",381,0],
  ["Macro","Управление девелоперскими и строительными проектами",378,3],
  ["RocketData","Управление данными компании на картах и отзывами",362,23],
  ["Топвизор","SEO‑аналитика и мониторинг поискового продвижения",358,194],
  ["BotHelp","Конструктор чат‑ботов и автоворонок в мессенджерах",351,198],
  ["Posiflora","CRM, учёт и онлайн‑продажи для цветочного бизнеса",343,77],
  ["Бизнес.ру","CRM, склад, касса и автоматизация торговли",342,17],
  ["Поинтер","Управление присутствием на картах и репутацией",339,68],
  ["Callibri","Коллтрекинг, лид‑менеджмент и маркетинговая аналитика",325,101],
  ["Entera","Распознавание первичных документов для бухгалтерии",325,106],
  ["Маяк","Аналитика и управление продажами на маркетплейсах",320,-27],
  ["Chat2Desk","Омниканальная платформа общения с клиентами",319,46],
  ["QuickResto","Облачная автоматизация кафе и ресторанов",318,-9],
  ["YouGile","Система управления проектами и командной коммуникации",314,32],
  ["Profitbase","Продажи, CRM и аналитика для девелоперов",312,33],
  ["DMP.one","Обогащение клиентских данных и data‑marketing",311,41],
  ["Звук Бизнес","Лицензионный аудиоконтент и музыка для бизнеса",306,74],
  ["SellMonitor","Аналитика товаров и продаж на маркетплейсах",301,10],
  ["АТОЛ Sigma","Облачная касса и управление торговлей",298,119],
  ["ITSM 365","Service Desk и автоматизация поддержки",293,10],
  ["ДВИЖ","CRM и цифровая платформа для девелоперов",282,2],
  ["Sipuni","Облачная АТС и аналитика звонков",276,104],
  ["Imshop","Мобильные приложения и платформа лояльности для ритейла",271,18],
  ["Okdesk","Help Desk и управление выездным обслуживанием",268,69],
  ["WhoIsBlogger","Аналитика блогеров и influencer‑маркетинга",262,82],
  ["DaData","Очистка, стандартизация и обогащение данных",261,187],
  ["Teachbase","Платформа корпоративного онлайн‑обучения",257,0],
  ["ProgressMe","Онлайн‑платформа для языковых школ и преподавателей",254,17],
  ["Дживио","Аналитика и управление продажами на маркетплейсах",252,-191],
  ["SEOWORK","Платформа аналитики и управления SEO",244,5],
  ["Финтабло","Управленческий финансовый учёт для бизнеса",240,33],
  ["Финансист","Планирование и управленческий учёт финансов",233,13],
  ["MD Audit","Аудит торговых точек и управление полевыми командами",232,68],
  ["Юздеск","Help Desk для клиентской поддержки",230,0],
  ["HelpDeskEddy","Сервис‑деск и автоматизация поддержки",229,157],
  ["Carrot quest","Коммуникации, лидогенерация и аналитика пользователей",228,-17],
  ["PlanFact","Управленческий учёт и планирование денег",222,10],
  ["TextBack","Коммуникации и продажи через мессенджеры",221,-48],
  ["EGGHEADS","Управление и аналитика продаж на маркетплейсах",219,18],
].map(([company, product, revenue, profit]) => ({
  company: company as string,
  product: product as string,
  revenue: revenue as number,
  profit: profit as number | null,
  year: 2025,
  source: "SaaS Rating 2025",
}));

const fmt = (value: number | null) =>
  value === null
    ? "не раскрыто"
    : `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(value)} млн ₽`;

export default function RussianProductSoftwareCompanies() {
  const theme = useHostTheme();
  const [view, setView] = useCanvasState<"legal" | "market">("view", "legal");
  const [query, setQuery] = useCanvasState("query", "");
  const data = view === "legal" ? verified : saas;
  const filtered = data
    .filter((item) =>
      `${item.company} ${item.legal ?? ""} ${item.product}`
        .toLocaleLowerCase("ru")
        .includes(query.toLocaleLowerCase("ru")),
    )
    .sort((a, b) => b.revenue - a.revenue);
  const revenueTotal = filtered.reduce((sum, item) => sum + item.revenue, 0);
  const profitable = filtered.filter((item) => item.profit !== null && item.profit > 0).length;

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1500, margin: "0 auto" }}>
      <Stack gap={8}>
        <Row justify="space-between" align="start" gap={16}>
          <Stack gap={6}>
            <H1>Продуктовые разработчики ПО в России</H1>
            <Text style={{ color: theme.text.secondary }}>
              Публичный срез на 27 июля 2026 года · сортировка по выручке
            </Text>
          </Stack>
          <Pill tone="info" active>{view === "legal" ? "РСБУ юрлиц" : "Расширенный SaaS"}</Pill>
        </Row>
        <Callout tone="warning" title="Почему это не буквально «все компании»">
          Отдельного официального реестра продуктовых разработчиков не существует. Строгая вкладка содержит только
          юрлица, для которых удалось публично подтвердить выручку и чистую прибыль одного и того же отчётного года.
          Расширенная вкладка охватывает 79 B2B SaaS‑брендов, но часть показателей может объединять несколько юрлиц.
        </Callout>
      </Stack>

      <Row gap={8} wrap>
        <Button variant={view === "legal" ? "primary" : "secondary"} onClick={() => setView("legal")}>
          Проверенные юрлица
        </Button>
        <Button variant={view === "market" ? "primary" : "secondary"} onClick={() => setView("market")}>
          Расширенный SaaS‑рынок
        </Button>
      </Row>

      <Grid columns={3} gap={16}>
        <Stat value={filtered.length} label={view === "legal" ? "юрлиц в строгой выборке" : "продуктовых SaaS‑брендов"} />
        <Stat value={`${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(revenueTotal / 1000)} млрд ₽`} label="суммарная выручка показанных строк" />
        <Stat value={profitable} label="компаний с положительной прибылью" tone="success" />
      </Grid>

      <Card>
        <CardHeader trailing="по названию, юрлицу или продукту">Фильтр</CardHeader>
        <CardBody>
          <TextInput value={query} onChange={setQuery} type="search" placeholder="Например: кибербезопасность, CRM, ООО…" style={{ width: "100%" }} />
        </CardBody>
      </Card>

      <Stack gap={10}>
        <Row justify="space-between" align="center">
          <H2>{view === "legal" ? "Финансы конкретных юридических лиц" : "Расширенный рейтинг B2B SaaS"}</H2>
          <Text style={{ color: theme.text.tertiary }}>Все суммы — млн ₽</Text>
        </Row>
        <Table
          headers={view === "legal"
            ? ["№", "Компания / юрлицо", "Продукт и суть", "Выручка", "Чистая прибыль", "Год", "Источник"]
            : ["№", "Компания", "Продукт и суть", "Выручка", "Чистая прибыль", "Год"]}
          rows={filtered.map((item, index) => {
            const base = [
              index + 1,
              view === "legal" ? (
                <Stack gap={2}>
                  <Text weight="semibold">{item.company}</Text>
                  <Text style={{ color: theme.text.secondary }}>{item.legal}{item.inn ? ` · ИНН ${item.inn}` : ""}</Text>
                </Stack>
              ) : <Text weight="semibold">{item.company}</Text>,
              item.product,
              <Text weight="semibold">{fmt(item.revenue)}</Text>,
              <Text style={{ color: item.profit !== null && item.profit < 0 ? theme.diff.removedLine : theme.text.primary }}>
                {fmt(item.profit)}
              </Text>,
              item.year,
            ];
            return view === "legal"
              ? [...base, <Text style={{ color: theme.text.secondary }}>{item.source}</Text>]
              : base;
          })}
          columnAlign={view === "legal"
            ? ["right", "left", "left", "right", "right", "right", "left"]
            : ["right", "left", "left", "right", "right", "right"]}
          rowTone={filtered.map((item) => item.profit !== null && item.profit < 0 ? "danger" : undefined)}
          striped
          stickyHeader
          style={{ maxHeight: 720 }}
        />
      </Stack>

      <Stack gap={8}>
        <H2>Методика и ограничения</H2>
        <Text>
          В строгой выборке использованы показатели РСБУ: выручка (строка 2110) и чистая прибыль/убыток
          (строка 2400). Приоритет — 2025 год; 2024 год допустим только когда обе метрики относятся к нему.
          Группы компаний, интеграторы, заказная разработка, банки, маркетплейсы и диверсифицированные экосистемы
          исключены. Поэтому, например, показатели группы «Астра», Positive Technologies по МСФО и Яндекс 360
          не смешиваются с РСБУ отдельных юрлиц.
        </Text>
        <Text>
          Расширенная вкладка:{" "}
          <Link href="https://saas-rating.ru/">SaaS Rating 2025</Link>. Строгая вкладка: ГИР БО ФНС в пересказе
          TestFirm, TAdviser, Checko, Firmalyze, Cbonds и профильных публикаций. «Не раскрыто» означает, что
          автор рейтинга не опубликовал сопоставимую чистую прибыль.
        </Text>
      </Stack>
    </Stack>
  );
}
