import {
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
  useHostTheme,
} from "cursor/canvas";

type Company = {
  name: string;
  revenue: string;
  share: string;
  note?: string;
  source: string;
};

type Market = {
  id: string;
  title: string;
  current: string;
  year: string;
  tam: string;
  forecast: string;
  stage: string;
  confidence: "высокая" | "средняя" | "низкая";
  boundary: string;
  method: string;
  companies: Company[];
  competitors: string;
  whitespace: string;
  dynamics: string;
  barriers: string;
  niches: string;
  sources: { label: string; href: string }[];
};

const markets: Market[] = [
  {
    id: "horeca",
    title: "Автоматизация ресторанов / HoReCa",
    current: "6 670–6 840",
    year: "2024, расчёт",
    tam: "10 700–23 900",
    forecast: "10 500–12 500 к 2028",
    stage: "зрелый, консолидация",
    confidence: "средняя",
    boundary:
      "POS/касса, склад и техкарты, кухня, доставка, лояльность, аналитика, ЭДО/ЕГАИС/«Честный знак» и интеграции, продаваемые ресторанам по лицензии/SaaS. Исключены оборот общепита, эквайринг, оборудование, агрегаторская комиссия и заказная разработка.",
    method:
      "Текущий объём: опубликованные 5 800 млн ₽ за 2023 × рост сегмента цифровых решений 15–18% в 2024 = 6 670–6 844 млн ₽. TAM: 198–199 тыс. точек × реалистичный годовой ARPA 54–120 тыс. ₽ = 10 692–23 880 млн ₽. ARPA — расчётный blended-чек: базовый POS дешевле, комплексная сеть и ЭДО дороже.",
    companies: [
      { name: "iiko", revenue: "3 900 (2024)", share: "57,0–58,5%", source: "Smart Ranking" },
      { name: "DocsInBox", revenue: "1 100 (2024)", share: "16,1–16,5%", source: "Inc." },
      { name: "Quick Resto", revenue: "261 (2024)", share: "3,8–3,9%", source: "ФНС / Фирмотека" },
      { name: "R-Keeper", revenue: "850 (2023)", share: "14,7% рынка 2023", note: "2024 консолидированно не раскрыт", source: "Smart Ranking / СМИ" },
    ],
    competitors:
      "Saby Presto/СБИС, 1С‑Рарус и 1С:Общепит, АТОЛ Sigma, Poster (где доступен), Paloma365, МойСклад, специализированные delivery/loyalty‑решения. iiko и r_keeper сильны в core POS; DocsInBox — в обязательном документообороте.",
    whitespace:
      "Из 198–199 тыс. точек только часть платит за полноценный контур. Нижний текущий объём соответствует около 56–127 тыс. «эквивалентных» точек при ARPA 54–120 тыс. ₽; потенциал — микроточки, столовые, dark kitchen и регионы. Его тормозят низкая маржа заведений, высокая смертность бизнеса, стоимость оборудования и миграции.",
    dynamics:
      "2023: +68,3% до 5 800 млн ₽; скачок включал восстановление и импортозамещение. В 2024 отраслевые эксперты оценивали +15–18%: рынок перешёл от гиперроста к апсейлу модулей и консолидации. Число объектов выросло примерно до 198–199 тыс.",
    barriers:
      "Фискализация и маркировка; 24/7‑надёжность и офлайн‑режим; глубокие интеграции с кассами, доставкой и 1С; дорогой перенос меню/техкарт; дилерские сети лидеров; высокий CAC при короткой жизни малого ресторана.",
    niches:
      "AI‑прогноз спроса и food‑cost; единый слой данных поверх iiko/r_keeper; автоматизация столовых и фабрик‑кухонь; антифрод/контроль списаний; lightweight‑продукт для 1–2 точек; управление персоналом и закупками с измеримым ROI.",
    sources: [
      { label: "Smart Ranking / Ведомости: 5,8 млрд ₽ в 2023", href: "https://www.vedomosti.ru/business/articles/2024/06/14/1043711-rinok-softa-dlya-restorannogo-biznesa-viros" },
      { label: "TAdviser: рост цифровизации HoReCa 15–18%", href: "https://www.tadviser.ru/index.php/Статья:Российский_рынок_цифровизации_HoReCa._Обзор_TAdviser" },
      { label: "Контур.Фокус: 199 тыс. заведений", href: "https://restoranoved.ru/news/chislo-zavedeniy-obschestvennogo-pitaniya-v-rossii-prevysilo-199-tysyach/" },
      { label: "iiko: 3,9 млрд ₽ в 2024", href: "https://smartranking.ru/ru/ranking/company/iiko/" },
      { label: "DocsInBox: 1,1 млрд ₽ в 2024", href: "https://incrussia.ru/understand/3-biznes-oshibki-osnovatelya-servisa-elektronnogo-dokumentooborota-docsinbox-leonida-dovbenko/" },
      { label: "Quick Resto: 261 млн ₽ в 2024", href: "https://firmoteka.ru/7726734798" },
    ],
  },
  {
    id: "hotel",
    title: "Hotel PMS / channel manager / посуточная аренда",
    current: "8 100",
    year: "2024, прямая оценка",
    tam: "9 940–19 890",
    forecast: "15 000–17 000 к 2028",
    stage: "быстрый рост, лидер доминирует",
    confidence: "высокая",
    boundary:
      "PMS, channel manager, booking engine, revenue management, CRM/guest journey и управление посуточными объектами. Исключены OTA‑GMV, стоимость проживания, гостиничное оборудование и универсальные ERP.",
    method:
      "Текущий объём — опубликованная выручка 52 HotelTech-компаний: 8 100 млн ₽. TAM: 33 142 коллективных средства размещения × 300–600 тыс. ₽ годового blended ARPA = 9 943–19 885 млн ₽. Верхняя граница включает booking engine/комиссию, RMS и CRM; одни PMS дают меньший TAM.",
    companies: [
      { name: "TravelLine", revenue: "4 891 (2024)", share: "60,4%", source: "HotelTech 2025" },
      { name: "Bnovo", revenue: "418 (2024)", share: "5,2%", source: "HotelTech 2025" },
      { name: "RealtyCalendar", revenue: "220 (2024)", share: "2,7%", source: "HotelTech 2025" },
      { name: "Итого список", revenue: "5 529", share: "68,3%", source: "расчёт" },
    ],
    competitors:
      "HRS (1 105 млн ₽), Hoteza, Libra Hospitality, Shelter, Logus HMS, Контур.Отель, Travelline‑подобные booking engines, Bronevik/Островок в дистрибуции; для квартир — Bnovo, RealtyCalendar, Apart‑sharing‑сервисы и таблицы.",
    whitespace:
      "В 2024 было 33,1 тыс. КСР, а обязательная классификация в 2025–2026 вывела в реестр тысячи ранее неформальных объектов. Неосвоены гостевые дома, базы отдыха, глэмпинги и малые апарт‑операторы; многие используют только channel manager без PMS/RMS/CRM.",
    dynamics:
      "Рынок 2024 вырос на 25%; PMS + бронирование/дистрибуция дали 69% выручки и росли на 28%. Прогноз исследования на 2025 — 9 900 млн ₽ (+22%). Стадия — scale-up с сильной концентрацией: топ‑3 формируют 80%, TravelLine — около 60%.",
    barriers:
      "Сетевой эффект каналов и интеграций; миграция броней и тарифов без простоя; 152‑ФЗ и миграционный учёт; сезонность и поддержка 24/7; комиссия OTA/booking engine усложняет сравнение цен; доверие отельеров к лидеру.",
    niches:
      "PMS для гостевых домов и глэмпингов; единый продукт для отеля + апартаментов; AI‑revenue management для 10–50 номеров; автоматизация хаускипинга и self check‑in; платежи/фискализация; B2B‑дистрибуция и corporate rates.",
    sources: [
      { label: "HotelTech 2025: рынок 8,1 млрд ₽ и рейтинг", href: "https://travelres.ru/reiting-hoteltech-kompanii-2025/" },
      { label: "Рынок +25%, прогноз 9,9 млрд ₽", href: "https://ekec.ru/v-rossii-opyblikovan-pervyi-reiting-tehnologicheskih-reshenii-dlia-gostinichnogo-biznesa-hoteltech-2025/" },
      { label: "Росстат: 33 142 КСР в 2024", href: "https://wordyou.ru/2505189-novosti-gostinichnoj-industrii-chto-izmenilos-v-etom-sezone.html" },
      { label: "Тарифы Bnovo", href: "https://bnovo.ru/tarif/" },
      { label: "Тарифы RealtyCalendar", href: "https://new.realtycalendar.ru/price" },
    ],
  },
  {
    id: "travel",
    title: "Корпоративные поездки / OBT",
    current: "3 220–4 830",
    year: "2024, расчёт",
    tam: "6 900–10 350",
    forecast: "6 000–10 000 к 2028",
    stage: "рост и консолидация",
    confidence: "средняя",
    boundary:
      "Net‑выручка онлайн‑инструментов бронирования и TMC‑платформ: подписка, сервисный доход, технологическая/агентская маржа, отчётность и интеграции. Исключён GMV билетов, гостиниц и MICE: рынок деловых поездок 1 050 000 млн ₽ — это база транзакций, не SaaS‑рынок.",
    method:
      "Текущий объём: 23 млн поездок × 70% онлайн × 200–300 ₽ net‑выручки платформы на поездку = 3 220–4 830 млн ₽. TAM: все 23 млн поездок × 300–450 ₽ = 6 900–10 350 млн ₽. Допроверка: публичный Smartway стартует примерно от 10,9 тыс. ₽/мес., но число компаний‑покупателей публично не раскрыто.",
    companies: [
      { name: "Smartway", revenue: "989 (2024)", share: "20,5–30,7%", note: "РСБУ юрлица; возможна агентская составляющая", source: "ФНС / Reputation" },
      { name: "Trivio + Trivio Service", revenue: "776 (2024)", share: "16,1–24,1%", note: "сумма двух юрлиц", source: "РСБУ / Mergers.ru" },
      { name: "Итого список", revenue: "1 765", share: "36,5–54,8%", source: "расчёт" },
    ],
    competitors:
      "Аэроклуб, Випсервис/Hamilton Apps, OneTwoTrip для бизнеса, Островок Командировки, Ozon Travel, Яндекс Путешествия для бизнеса, Туту, Bronevik, классические TMC и банковские travel‑решения.",
    whitespace:
      "70% командировок уже оформлялись онлайн в I полугодии 2024, но online booking не равен end‑to‑end автоматизации. Разрыв остаётся в заявках, тревел‑политике, авансовом отчёте, зарубежных поездках, такси/суточных и сверке закрывающих документов.",
    dynamics:
      "GMV деловых поездок вырос на 27% до 1,05 трлн ₽, число поездок — на 15% до примерно 23 млн. Рынок платформ растёт быстрее количества поездок за счёт перехода офлайн‑агентств в OBT и консолидации: Smartway приобрёл TMC‑активы и Bnovo.",
    barriers:
      "Прямые договоры и контент GDS/РЖД/авиакомпаний; оборотный капитал и возвраты; поддержка 24/7; интеграции с 1С/ERP/КЭДО; procurement крупных клиентов; низкая прозрачность net‑выручки против GMV; высокий риск ценовой конкуренции.",
    niches:
      "Командировки для компаний 20–200 сотрудников; полностью автоматический авансовый отчёт; санкционно‑устойчивый международный контент; disruption management; единая карта/такси/суточные; независимый policy‑engine/API поверх нескольких поставщиков.",
    sources: [
      { label: "САД: 1,05 трлн ₽ и +27% GMV", href: "https://www.miceandmore.org/articles/topic/v-2024-godu-rossiyskiy-rynok-delovykh-poezdok-dostig-rekordnoy-otmetki-bolee-1-trilliona-rubley/" },
      { label: "23 млн поездок в 2024", href: "https://www.tadviser.ru/index.php/Статья:Деловой_туризм_в_России" },
      { label: "70% поездок оформлялись онлайн", href: "https://www.dp.ru/a/2025/04/22/vpidzhake-isnoutbukom-rinok" },
      { label: "Smartway: 989 млн ₽ в 2024", href: "https://reputation.ru/ogrn/1167746277247" },
      { label: "Trivio: 776,3 млн ₽ двумя юрлицами", href: "https://mergers.ru/companies/Trivio" },
      { label: "Тарифы Smartway", href: "https://toolfox.ru/services/s/smartway" },
    ],
  },
  {
    id: "tms",
    title: "TMS / транспортная логистика",
    current: "3 000–5 500",
    year: "2024, расчёт",
    tam: "5 400–14 400",
    forecast: "7 000–12 000 к 2028",
    stage: "ранний рост, фрагментация",
    confidence: "низкая",
    boundary:
      "SaaS/лицензии TMS для перевозчиков, экспедиторов и грузовладельцев: заявки, тендеры, маршруты, рейсы, тарифы, документы, трекинг, автопарк. Исключены фрахт/GMV перевозок, топливо, лизинг, WMS и выручка цифрового экспедитора как принципала.",
    method:
      "Текущий объём: 20–30 тыс. реально подходящих компаний × 15–25% платного проникновения × 0,4–0,9 млн ₽ ARPA = 1 200–6 750 млн ₽; рабочий центральный диапазон 3 000–5 500. TAM: 20–30 тыс. компаний × 270–480 тыс. ₽ blended ARPA = 5 400–14 400 млн ₽. База: около 45–53 тыс. зарегистрированных автоперевозчиков, но 89,5% — микробизнес, не весь он ICP.",
    companies: [
      { name: "Умная Логистика", revenue: "507 (2024)", share: "9,2–16,9%", note: "6 416 платящих компаний", source: "СПАРК / Коммерсантъ" },
    ],
    competitors:
      "ATI.SU, LogistPro, Atrucks, Trucker, 1С:TMS Логистика, AXELOT TMS, Мегалогист, Saby TMS, Адвантум, Relog, Maxoptra, Monopoly.online. Важно: площадка, TMS и цифровой экспедитор — разные модели.",
    whitespace:
      "У «Умной Логистики» 6 416 платящих компаний против десятков тысяч перевозчиков и экспедиторов. Главный резерв — малые автопарки и экспедиторы, работающие в мессенджерах/Excel, а также грузовладельцы без тендерного и контрольного контура.",
    dynamics:
      "Суммарная выручка опрошенных вендоров в 2024 выросла примерно на 10%; сами вендоры ожидали ускорение TMS до 30–37% ежегодно. «Умная Логистика» выросла на 53%, платная база — на 43%. Стадия раннего масштабирования, но с сильной фрагментацией по use case.",
    barriers:
      "Интеграции с 1С, ЭТрН, ГЛОНАСС и телематикой; грязные справочники тарифов; двустороннее подключение перевозчиков; кастомные процессы; низкая ИТ‑зрелость микропарков; длинные enterprise‑внедрения и ответственность за срыв рейса.",
    niches:
      "TMS‑lite для 3–20 машин; AI‑диспетчер и расчёт маржи рейса; электронные перевозочные документы end‑to‑end; мультимодальность; контроль подрядчиков для среднего грузовладельца; factoring/страхование как embedded‑модули.",
    sources: [
      { label: "Исследование 32 TMS-вендоров", href: "https://logistics360.ru/issledovanie-rynka-sistem-upravleniya-transportnoj-logistikoj-tms/" },
      { label: "Умная Логистика: 507,3 млн ₽", href: "https://www.kommersant.ru/doc/7638774" },
      { label: "6 416 платящих клиентов", href: "https://monopoly.ru/wp-content/uploads/2025/04/klyuchevye_operacionnye_i_finansovye-_pokazateli_ao_monopoliya_za_2024_god.pdf" },
      { label: "Около 45 тыс. перевозчиков; 89,5% микро", href: "https://spb.plus.rbc.ru/news/65ae24587a8aa9227143bf14" },
      { label: "Тарифы Умной Логистики", href: "https://ul.su/cargo/rates/" },
      { label: "Kept: не путать TMS с GMV перевозок", href: "https://kept.ru/news/obzor-rossiyskogo-onlayn-rynka-avtomobilnykh-gruzoperevozok-i-prognoz-ego-razvitiya/" },
    ],
  },
  {
    id: "construction",
    title: "Автоматизация строительства / девелопмента",
    current: "3 000–5 000",
    year: "2024, расчёт",
    tam: "8 000–18 000",
    forecast: "7 000–12 000 к 2028",
    stage: "рост, рынок ещё формируется",
    confidence: "низкая",
    boundary:
      "Вертикальный SaaS для закупок/снабжения, управления строительными процессами и проектами, CRM/продаж новостроек, сделки и клиентского пути. Исключены оборот строительства, CAD/BIM‑лицензии общего назначения, серверы, системная интеграция и заказная разработка.",
    method:
      "Прямая оценка 14 000 млн ₽ для топ‑20 ИТ‑поставщиков непригодна как SaaS‑рынок: в неё входят интегратор «Айтеко» и «Нанософт». Узкий текущий рынок оценён по раскрытым вертикальным вендорам и длинному хвосту: 3 000–5 000 млн ₽. TAM: 2,7 тыс. девелоперов × 0,4–1,2 млн ₽ + 25–40 тыс. цифровизируемых подрядчиков/стройкомпаний × 0,2–0,4 млн ₽ = 6 080–19 240 млн ₽; рабочий диапазон 8 000–18 000.",
    companies: [
      { name: "CYNTEKA / ГК Синтека", revenue: "785 (2024)", share: "15,7–26,2%", note: "вся группа: Cynteka, Закупай, FaceKIT, mySnab", source: "CNews" },
      { name: "Macro", revenue: "282 (2024)", share: "5,6–9,4%", source: "SaaS Rating" },
      { name: "Profitbase", revenue: "309 (2024)", share: "6,2–10,3%", source: "CNews" },
      { name: "ДВИЖ", revenue: "280 (2024)", share: "5,6–9,3%", note: "ООО «Цифровые продажи»", source: "ФНС / Rusprofile" },
      { name: "Итого список", revenue: "1 656", share: "33,1–55,2%", source: "расчёт" },
    ],
    competitors:
      "PlanRadar‑подобные российские решения, Exon, Pragmacore, Adept, 1С:ERP/УСО, Битрикс24/amoCRM с интеграторами, Nmarket.PRO, Домопланер, цифровые продукты банков и ДОМ.РФ; в закупках — ЭТП и внутренние ERP.",
    whitespace:
      "В 2024 работало около 2,7 тыс. жилищных девелоперов, а в СРО на начало 2025 состояло 75,4 тыс. организаций. Глубокие отраслевые системы сосредоточены у крупных игроков; средние подрядчики сохраняют Excel, мессенджеры и фрагментарную 1С.",
    dynamics:
      "Топ‑20 ИТ‑поставщиков строительства заработали 14 000 млн ₽ в 2024, но это более широкий рынок. Вертикальные игроки росли быстрее: CYNTEKA +34,9%, Profitbase +40,5%, Macro с 198 млн ₽ в 2023 до 282 млн ₽ в 2024. Драйверы — импортозамещение, высокая ставка, дефицит кадров и запрос на прозрачность.",
    barriers:
      "Длинный цикл продажи и внедрения; проектные юрлица и разрозненные данные; интеграция с 1С/BIM/банками/Росреестром; сопротивление площадки; кастомизация; информационная безопасность; консолидация девелоперов снижает число крупных покупателей.",
    niches:
      "Единый data layer «смета—закупка—факт»; SaaS для субподрядчика; мобильный контроль качества/исполнительная документация; AI‑сопоставление смет и коммерческих предложений; post‑sales/эксплуатация; ипотечная и электронная сделка без привязки к одному банку.",
    sources: [
      { label: "CNews: топ‑20 ИТ для строительства — 14 млрд ₽", href: "https://corp.cnews.ru/reviews/tsifrovizatsiya_stroitelnoj_otrasli" },
      { label: "CNews: CYNTEKA 785; Profitbase 309", href: "https://www.cnews.ru/reviews/tsifrovizatsiya_stroitelnoj_otrasli/review_table/6aa0b226b451977abbc0b47ddd5826eb515d6fe1" },
      { label: "SaaS Rating: Macro 282 млн ₽ в 2024", href: "https://saas-rating.ru/" },
      { label: "ДВИЖ / ООО «Цифровые продажи»", href: "https://www.rusprofile.ru/id/11358411" },
      { label: "ЕИСЖС: около 2,7 тыс. застройщиков", href: "https://erzrf.ru/news/eksperty-s-2023-goda-kolichestvo-developerov-v-rossii-uvelichilos-boleye-chem-na-165-" },
      { label: "Контур: 75 412 организаций в СРО", href: "https://kontur.ru/press/news/55452-chto_nam_stoit_dom_postroit" },
      { label: "Тарифы Profitbase", href: "https://profitbase.ru/tariff" },
    ],
  },
  {
    id: "flowers",
    title: "Автоматизация цветочного бизнеса",
    current: "450–700",
    year: "2024, расчёт",
    tam: "680–1 360",
    forecast: "750–1 200 к 2028",
    stage: "вертикальная ниша, ранняя зрелость",
    confidence: "низкая",
    boundary:
      "POS/касса, поштучный и партийный учёт цветов, списания, заказы/предзаказы, CRM/лояльность, доставка, витрина и аналитика для флористической розницы. Исключён оборот продажи цветов, универсальный retail‑софт вне флористических клиентов и оборудование.",
    method:
      "TAM: 18 906 организаций в 2024 × 36–72 тыс. ₽ годового ARPA = 681–1 361 млн ₽. Текущий рынок: 35–55% платного проникновения × тот же ARPA = 238–749 млн ₽; с учётом сетей и более дорогих тарифов рабочий диапазон 450–700. Проверка ARPA: Posiflora от 4,8 тыс. ₽/мес.; специализированные конкуренты примерно 1,7–3 тыс. ₽/мес.",
    companies: [
      { name: "Posiflora", revenue: "218 (2024)", share: "31,1–48,4%", note: "выручка бренда может включать 30+ стран; доля РФ завышена", source: "SaaS Rating" },
    ],
    competitors:
      "FloraPoint, INSPIRO, Subtotal, МойСклад, 1С:Розница/Управление торговлей, RetailCRM, Flora POS, Papyrus Flower Shop, Юпитер, самописные таблицы и кассовые решения.",
    whitespace:
      "В 2024 было около 18,9 тыс. организаций, а точек — заметно больше. Posiflora заявляла 5–6 тыс. магазинов/клиентов глобально, поэтому большая часть российской базы всё ещё использует универсальный учёт или таблицы. Резерв — одиночные точки, региональные сети и онлайн‑флористы.",
    dynamics:
      "Posiflora выросла со 120 млн ₽ в 2023 до 218 млн ₽ в 2024 (+82% по данным строки рейтинга). Клиентские обороты в 2023 росли на 17%, но к 2026 количество физических магазинов начало снижаться: рынок ПО переходит от подключения новых точек к повышению ARPA и ROI.",
    barriers:
      "Очень малый бизнес и высокая чувствительность к цене; сезонные пики 14 февраля/8 марта; сложный учёт скоропортящегося товара и сборных букетов; обучение флористов; касса/эквайринг/маркировка; churn при закрытии магазина.",
    niches:
      "AI‑закупка и прогноз списаний; маркетплейс локальной доставки без высокой комиссии; B2B‑заказы и подписки; управление сетью/франшизой; динамическое ценообразование скоропорта; простой импорт из мессенджеров и соцсетей.",
    sources: [
      { label: "Точка: 18 906 организаций годом ранее", href: "https://www.retail.ru/news/rynok-tsvetochnoy-roznitsy-v-rossii-dostig-nasyshcheniya-11-marta-2026-275367/" },
      { label: "SaaS Rating: Posiflora 218 млн ₽ в 2024", href: "https://saas-rating.ru/" },
      { label: "Posiflora: 5 000 магазинов", href: "https://posiflora.com/czvetochnye-magaziny-online/" },
      { label: "Тарифы Posiflora", href: "https://posiflora.com/prices/" },
      { label: "Сравнение специализированных конкурентов", href: "https://www.greencom.ru/close-up/index/sravnenie-crm-dlya-tsvetochnogo-biznesa_art.html" },
      { label: "Динамика клиентских оборотов", href: "https://ecomhub.ru/lots-of-data-on-the-russian-flower-market-in-2022-2024/" },
    ],
  },
];

const confidenceTone = (value: Market["confidence"]) =>
  value === "высокая" ? "success" : value === "средняя" ? "info" : "warning";

export default function RussianVerticalB2BSaaSMarkets() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1500, margin: "0 auto" }}>
      <Stack gap={10}>
        <Row justify="space-between" align="start" gap={20} wrap>
          <Stack gap={6} style={{ maxWidth: 980 }}>
            <H1>Российские вертикальные B2B SaaS‑рынки</H1>
            <Text style={{ color: theme.text.secondary }}>
              Срез 2024–2025 · все денежные показатели — млн ₽ · подготовлено 27 июля 2026
            </Text>
          </Stack>
          <Pill tone="info" active>6 рынков</Pill>
        </Row>
        <Callout tone="warning" title="Главное ограничение">
          «Выручка компании» не всегда равна российской SaaS‑выручке: часть групп включает несколько продуктов,
          агентскую маржу или зарубежные продажи. Такие случаи помечены. Оборот отрасли и транзакционный GMV нигде
          не используются как объём SaaS‑рынка.
        </Callout>
      </Stack>

      <Grid columns={3} gap={14}>
        <Stat value="2" label="рынка с прямой внешней оценкой" tone="success" />
        <Stat value="4" label="рынка с прозрачным bottom‑up" tone="info" />
        <Stat value="2024" label="единый базовый год для долей" />
      </Grid>

      <Stack gap={10}>
        <H2>Сводка</H2>
        <Table
          headers={["Рынок", "Текущий объём", "TAM / потенциал", "Прогноз", "Стадия", "Уверенность"]}
          rows={markets.map((market) => [
            <Text weight="semibold">{market.title}</Text>,
            <Stack gap={2}><Text weight="semibold">{market.current}</Text><Text style={{ color: theme.text.tertiary }}>{market.year}</Text></Stack>,
            market.tam,
            market.forecast,
            market.stage,
            <Pill tone={confidenceTone(market.confidence)}>{market.confidence}</Pill>,
          ])}
          columnAlign={["left", "right", "right", "right", "left", "center"]}
          striped
          stickyHeader
        />
        <Text style={{ color: theme.text.tertiary }}>
          TAM — годовая выручка поставщиков ПО при полном достижимом проникновении, а не оборот клиентской отрасли.
        </Text>
      </Stack>

      <Callout tone="info" title="Наиболее привлекательные точки входа">
        HotelTech — лучший по качеству данных, но лидер уже контролирует 60%. Более открытый whitespace — TMS‑lite для
        малого автопарка, end‑to‑end командировки для среднего бизнеса, data layer для стройки и AI‑оптимизация
        списаний/закупок в HoReCa и цветах. Во всех четырёх случаях новый продукт должен давать измеримый ROI за 1–3 месяца.
      </Callout>

      <Stack gap={14}>
        <H2>Разбор по рынкам</H2>
        {markets.map((market, index) => (
          <CollapsibleSection
            defaultOpen={index < 2}
            title={market.title}
            trailing={
              <Row gap={8} align="center">
                <Text style={{ color: theme.text.tertiary }}>{market.current} млн ₽</Text>
                <Pill tone={confidenceTone(market.confidence)}>{market.confidence}</Pill>
              </Row>
            }
          >
            <Stack gap={18} style={{ paddingTop: 10 }}>
              <Grid columns={3} gap={14}>
                <Stat value={market.current} label={`текущий рынок · ${market.year}`} />
                <Stat value={market.tam} label="TAM · расчёт" tone="info" />
                <Stat value={market.forecast} label="базовый прогноз" tone="success" />
              </Grid>

              <Grid columns={2} gap={16}>
                <Card>
                  <CardHeader>Границы рынка</CardHeader>
                  <CardBody><Text>{market.boundary}</Text></CardBody>
                </Card>
                <Card>
                  <CardHeader>Метод и формула</CardHeader>
                  <CardBody><Text>{market.method}</Text></CardBody>
                </Card>
              </Grid>

              <Stack gap={8}>
                <H3>Доля компаний списка по выручке</H3>
                <Table
                  headers={["Компания", "Выручка, млн ₽", "Доля рынка", "Оговорка", "Источник"]}
                  rows={market.companies.map((company) => [
                    <Text weight="semibold">{company.name}</Text>,
                    company.revenue,
                    <Text weight="semibold">{company.share}</Text>,
                    company.note ?? "—",
                    company.source,
                  ])}
                  columnAlign={["left", "right", "right", "left", "left"]}
                  striped
                />
              </Stack>

              <Grid columns={2} gap={16}>
                <Stack gap={6}>
                  <H3>Конкуренты</H3>
                  <Text>{market.competitors}</Text>
                </Stack>
                <Stack gap={6}>
                  <H3>Неосвоенный потенциал</H3>
                  <Text>{market.whitespace}</Text>
                </Stack>
                <Stack gap={6}>
                  <H3>Динамика и стадия</H3>
                  <Text>{market.dynamics}</Text>
                </Stack>
                <Stack gap={6}>
                  <H3>Барьеры входа</H3>
                  <Text>{market.barriers}</Text>
                </Stack>
              </Grid>

              <Callout tone="success" title="Незакрытые ниши для нового продукта">
                {market.niches}
              </Callout>

              <Stack gap={5}>
                <H3>Источники</H3>
                <Row gap={10} wrap>
                  {market.sources.map((source) => (
                    <Link href={source.href}>{source.label}</Link>
                  ))}
                </Row>
              </Stack>
            </Stack>
          </CollapsibleSection>
        ))}
      </Stack>

      <Stack gap={8}>
        <H2>Как читать оценки</H2>
        <Text>
          «Прямая оценка» — опубликованный размер рынка с описанной выборкой. «Расчёт» — число потенциальных клиентов ×
          реалистичный ARPA либо число транзакций × net‑доход платформы. Диапазон отражает не статистическую погрешность,
          а неопределённость проникновения, состава продуктов и границ выручки.
        </Text>
        <Text>
          Доли рассчитаны как выручка компании / текущий объём рынка того же года. Если сопоставимого 2024 показателя нет,
          показан последний доступный год и доля не смешивается с итогом. Прогнозы — сценарные номинальные значения:
          HoReCa 12–16% CAGR, HotelTech 15–20%, OBT 17–25%, TMS 23–32%, стройка 23–32%, цветы 14–20%.
        </Text>
      </Stack>
    </Stack>
  );
}
