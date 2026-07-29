import {
  Card,
  CardBody,
  CardHeader,
  Callout,
  Divider,
  Grid,
  H1,
  H2,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Market = {
  id: number;
  name: string;
  boundary: string;
  rev24: number;
  rev25: number;
  tam: number;
  basis: string;
  leaders: string;
  gap: string;
  stage: string;
  forecast: string;
  barriers: string;
  wedge: string;
  score: number;
  confidence: "Высокая" | "Средняя" | "Низкая";
  sourceIds: number[];
};

const markets: Market[] = [
  {
    id: 1,
    name: "OTA: авиа / ж/д",
    boundary: "Поиск, метапоиск и транзакционная продажа билетов B2C; комиссия, сервисный сбор, реклама. Не включены выручка перевозчиков и корпоративный travel.",
    rev24: 55,
    rev25: 65,
    tam: 95,
    basis: "[Р] 2024: онлайн-GMV авиа ≈1 000 000 + ж/д ≈350 000; средняя чистая монетизация 4,1%. 2025: GMV +10%, монетизация 4,4%.",
    leaders: "Tutu, Aviasales, Ozon Travel, Яндекс Путешествия, OneTwoTrip; прямые сайты авиакомпаний/РЖД забирают основную транзакцию. Tutu: 9 700 выручки НТТ в 2024 и 12 300 в 2025 [П].",
    gap: "Слабая поддержка сложных возвратов, мультимодальных маршрутов, региональных перевозчиков и международных карт. Низкая лояльность: билет стандартизирован.",
    stage: "Зрелый, рост в основном ценовой и за счёт cross-sell.",
    forecast: "6–10% CAGR net revenue до 2028; онлайн-проникновение уже 86–90%.",
    barriers: "Низкая базовая комиссия, CAC, доступ к GDS/контенту, кассовые разрывы при возвратах, экосистемный cashback.",
    wedge: "Post-booking concierge: автоматизация возвратов/обмена и компенсаций для сложных маршрутов; B2C-подписка вместо лобовой OTA.",
    score: 2,
    confidence: "Средняя",
    sourceIds: [1, 2],
  },
  {
    id: 2,
    name: "Отели / краткосрочная аренда",
    boundary: "Транзакционные B2C-бронирования отелей, апартаментов, домов; комиссия платформы. Не включены прямые продажи объектов и валовая стоимость проживания.",
    rev24: 55,
    rev25: 68,
    tam: 150,
    basis: "[Р] Отели: OTA-GMV ≈280 000 × 13%; STR online-GMV 155 000 × 12%. 2025: рост бронирований/чека и доли OTA. Проверка: Ostrovok 9 700 в 2024 [П], Sutochno 7 100 в 2025 [П].",
    leaders: "Отели 2024: Яндекс 29,2%, Ostrovok 21,5%, Bronevik 9,4%. STR: Avito 49%, Sutochno 27% [П].",
    gap: "Непрофессиональный supply в регионах, плохая стандартизация качества, депозиты/ущерб, длинные stays и семейные сценарии.",
    stage: "Рост и консолидация после ухода Booking/Airbnb.",
    forecast: "12–18% CAGR; STR TAM GMV прогнозируется 333 000 → 1 200 000 к 2030 [П].",
    barriers: "Двусторонний marketplace, доверие, fraud, поддержка 24/7, субсидирование лояльности экосистемами.",
    wedge: "Вертикаль «семьи/длинные поездки/малые города» с верификацией, страхованием ущерба и SaaS для хозяина.",
    score: 3,
    confidence: "Высокая",
    sourceIds: [3, 4, 5],
  },
  {
    id: 3,
    name: "Экскурсии / experiences",
    boundary: "Маркетплейсы экскурсий, активностей, мастер-классов и мини-туров; комиссия с заказа. Не весь рынок экскурсионных услуг.",
    rev24: 12,
    rev25: 15,
    tam: 45,
    basis: "[Р] Общий рынок услуг 311 210; онлайн GMV ≈75 000 (24% проникновение) × take rate 16% = 12 000. 2025: GMV +22%, take rate стабилен.",
    leaders: "Tripster, Sputnik8; далее Weatlas, Experience Trip, Avito, Яндекс/OTA. Tripster обслужил 2,2 млн гостей в 2024 [П]; точных долей нет.",
    gap: "Рынок всё ещё фрагментирован и офлайновый; слабая доступность last-minute, локальных событий, B2C-гарантий и динамической упаковки.",
    stage: "Ранняя масштабируемая стадия, двузначный рост.",
    forecast: "18–25% CAGR online GMV до 2028 при росте внутреннего туризма.",
    barriers: "Фрагментированный supply, сезонность, контроль качества/безопасности, обход платформы после первого контакта.",
    wedge: "Instant-booking для локального досуга «сегодня рядом»; инструменты расписания/оплаты/налогов для самозанятых гидов.",
    score: 4,
    confidence: "Средняя",
    sourceIds: [6, 7],
  },
  {
    id: 4,
    name: "Агрегаторы такси",
    boundary: "Комиссия и сервисные сборы агрегаторов B2C; не валовая оплата поездок и не выручка таксопарков/водителей.",
    rev24: 180,
    rev25: 215,
    tam: 260,
    basis: "[Р] GMV перевозок 924 000 (2024) и 1 092 000 (2025) [П] × эффективная монетизация агрегатора 19,5–19,7%.",
    leaders: "Яндекс Go доминирует; в Москве >90% app-заказов [П]. Максим, Drivee, региональные диспетчерские — нишевые альтернативы.",
    gap: "Регионы и корпоративно-социальные сценарии доступны, но ценность независимого B2C-агрегатора ограничена сетевым эффектом.",
    stage: "Зрелый квазимонопольный рынок; денежный рост в основном тарифный.",
    forecast: "8–12% nominal CAGR, поездки растут медленно.",
    barriers: "Ликвидность в реальном времени, субсидии двум сторонам, регуляция/локализация авто, безопасность, карты/ETA.",
    wedge: "Не новый агрегатор: SaaS/финтех для независимых парков или доступное такси для специальных групп через партнёрства.",
    score: 1,
    confidence: "Высокая",
    sourceIds: [8],
  },
  {
    id: 5,
    name: "Каршеринг",
    boundary: "Выручка операторов краткосрочной аренды авто B2C, включая сервисные сборы; продажа списанных машин исключена по возможности.",
    rev24: 63,
    rev25: 68.5,
    tam: 120,
    basis: "[П/Р] Росстат/отраслевые оценки рынка; 2025 +0,5% до 68 500. Delimobil: 27 287 carsharing+прочее в 2024, 28 984 в 2025.",
    leaders: "Делимобиль ≈43% 2024 по выручке рынка; Ситидрайв ≈20%; Яндекс Драйв, BelkaCar. Четыре игрока формируют почти весь рынок.",
    gap: "30 городов присутствия при слабом региональном покрытии; подписка на несколько дней, B2B2C-жильцы/отели, авто по назначению.",
    stage: "Капиталоёмкая зрелость; 2025 — стагнация и давление на маржу.",
    forecast: "5–10% CAGR при снижении ставки; рост ограничен стоимостью машин и фондирования.",
    barriers: "Капитал/лизинг, телематика, парковка, повреждения/fraud, локальная плотность флота.",
    wedge: "Asset-light marketplace управляемых частных/дилерских авто на 1–14 дней в городах без полноценного каршеринга.",
    score: 2,
    confidence: "Высокая",
    sourceIds: [9],
  },
  {
    id: 6,
    name: "Микромобильность / кикшеринг",
    boundary: "Выручка операторов аренды самокатов/велосипедов B2C; не продажи устройств и не общественный транспорт.",
    rev24: 31.2,
    rev25: 34,
    tam: 54,
    basis: "[П] 2024 рынок 31 200 (+39,8%); 2025 оценка как сумма Юрент 15 500 + Whoosh РФ ≈12 000 + Яндекс 6 000–6 500.",
    leaders: "Whoosh, МТС Юрент, Яндекс: 96,8% денежного рынка в 2024 [П]. В 2025 лидер по выручке — Юрент.",
    gap: "Города второго эшелона и безопасная инфраструктура; B2C-продукт уже стандартизирован.",
    stage: "Переход от гиперроста к зрелости; консолидация top-3.",
    forecast: "Отраслевой ориентир 53 600 к 2027, но 2025 показал замедление.",
    barriers: "Флот/ремонт, сезонность, муниципальные квоты, штрафы/безопасность, плотность зарядки.",
    wedge: "Не флот: safety/parking layer для городов и операторов либо подписка на owned-device service.",
    score: 2,
    confidence: "Высокая",
    sourceIds: [10],
  },
  {
    id: 7,
    name: "Межгород: ridesharing / автобусы",
    boundary: "Комиссия платформ с автобусных билетов и бронирований попуток; не выручка перевозчиков и не GMV поездок.",
    rev24: 3.1,
    rev25: 3.8,
    tam: 9,
    basis: "[Р] Автобусный оборот 78 000; online ≈38% = 29 600 GMV; ridesharing GMV ≈7 000; blended take rate 8,5%. 2025 +20–22%.",
    leaders: "BlaBlaCar/Busfor, Tutu, Ecolines и сайты автовокзалов; 25 млн российских пользователей BlaBlaCar (исторически) [П].",
    gap: "Тысячи малых перевозчиков без API, непрозрачные остановки/багаж/возвраты, слабые гарантии попуток.",
    stage: "Растущий цифровой слой над фрагментированным офлайном.",
    forecast: "15–20% CAGR platform revenue; online penetration ещё далеко от авиа/жд.",
    barriers: "Интеграции с автовокзалами, серые перевозчики, низкий чек, chargebacks, безопасность и страхование.",
    wedge: "ОС для малых перевозчиков + единый B2C-инвентарь на underserved corridors; гарантия пересадки и багажа.",
    score: 4,
    confidence: "Низкая",
    sourceIds: [11],
  },
  {
    id: 8,
    name: "Карты / навигация / local discovery",
    boundary: "B2C-карты и discovery, монетизируемые рекламой, promoted listings, lead-gen и подпиской; не весь search-ad рынок и не B2B GIS.",
    rev24: 32,
    rev25: 42,
    tam: 70,
    basis: "[Р/Э] Яндекс Карты/Навигатор ad revenue 20 000–25 000 в 2024 [Э]; 2ГИС + прочие 8 000–10 000. 2025 +30% за счёт аукциона и local ads.",
    leaders: "Аудиторные доли Q1 2025: Яндекс 34%, 2ГИС 33%, Google Maps 33% [П]; это не доли выручки. MAU геосервисов Яндекса >90 млн.",
    gap: "Вертикальный discovery (семьи, доступность, outdoors), качество realtime-данных и конверсия карточки в транзакцию.",
    stage: "Зрелая аудитория, ранняя монетизация local commerce.",
    forecast: "18–25% CAGR рекламной/транзакционной выручки.",
    barriers: "Картографические данные, UGC, SEO/default distribution, модерация, сетевой эффект организаций/отзывов.",
    wedge: "Не карта общего назначения: trusted vertical discovery с собственной supply-side workflow и бронированием.",
    score: 3,
    confidence: "Средняя",
    sourceIds: [12],
  },
  {
    id: 9,
    name: "Недвижимость: classifieds / transaction",
    boundary: "Платные листинги, реклама, lead-gen, ипотечные и цифровые транзакционные сервисы B2C/B2B2C; не стоимость объектов.",
    rev24: 38,
    rev25: 45,
    tam: 85,
    basis: "[Р] Циан 12 987 в 2024 и 15 160 в 2025 [П] + оценка Avito Недвижимость, Домклик, Яндекс и нишевых сервисов. Транзакционная выручка Циан лишь ≈5%.",
    leaders: "Avito силён в регионах; Циан — Москва/СПб и крупные города; Домклик, Яндекс Недвижимость. Доли по выручке вертикали не раскрыты.",
    gap: "Сделка после лида остаётся офлайн: проверка объекта, торг, документы, регистрация, ремонт/переезд.",
    stage: "Classifieds зрелые; transaction layer ранний и циклический.",
    forecast: "10–16% CAGR platform revenue, ускорение при снижении ставок.",
    barriers: "Ликвидность листингов, мошенничество, регулирование/ПДн, доступ к реестрам, банковские экосистемы.",
    wedge: "Buyer-side operating system для вторички: проверка, offer management, документы и escrow по фиксированной цене.",
    score: 3,
    confidence: "Средняя",
    sourceIds: [13],
  },
  {
    id: 10,
    name: "Авто: classifieds / transaction",
    boundary: "Листинги, дилерские подписки, реклама, lead-gen, инспекция/гарантия/финансирование сделки; не GMV проданных автомобилей.",
    rev24: 48,
    rev25: 50,
    tam: 90,
    basis: "[Э/Р] Auto.ru ≈20 000 в 2024 и 22 000 в 2025 по сумме юрлиц [Э]; Avito Auto/Drom/прочие ≈28 000. Сверка: 43% проданных авто были выставлены на Auto.ru в Q3'25 [П], не доля выручки.",
    leaders: "Avito Auto и Auto.ru; Drom силён на востоке/в импорте. Classifieds высококонцентрированы, но transaction monetization ещё мала.",
    gap: "Проверка состояния, безопасный C2C-расчёт, trade-in между городами, владение после сделки.",
    stage: "Зрелый classifieds на слабом авторынке; переход к transaction/fintech.",
    forecast: "3–8% classifieds; 15%+ у транзакционных add-ons.",
    barriers: "Бренд/ликвидность, fraud, инспекционная сеть, банки/страховые, цикличность продаж авто.",
    wedge: "Remote C2C deal: независимая инспекция + escrow + логистика, начиная с межрегиональных китайских/редких авто.",
    score: 3,
    confidence: "Низкая",
    sourceIds: [14],
  },
  {
    id: 11,
    name: "Поиск работы / career B2C",
    boundary: "Job marketplaces, профили/резюме, career services и consumer upskilling around search; HRM/КЭДО и staffing исключены.",
    rev24: 54,
    rev25: 58,
    tam: 95,
    basis: "[Р] hh.ru 39 620 в 2024 и 41 203 в 2025 [П] + Avito Работа, SuperJob, Работа.ру и B2C career ≈14 000/17 000.",
    leaders: "hh.ru: ФАС ≈57% рынка; 64,3% трафика top-20. SuperJob и Avito Работа сильно отстают; Работа России — бесплатный госканал.",
    gap: "Продукт оптимизирован под работодателя, а не outcome кандидата; skills proof, salary negotiation, career transitions и blue-collar retention.",
    stage: "Зрелый marketplace; 2025 замедление hh до +4%, HRTech растёт быстрее.",
    forecast: "6–10% CAGR core; career/AI services 20%+ с низкой базы.",
    barriers: "Резюме/вакансии как сетевой эффект, бренд, мошеннические вакансии, willingness-to-pay кандидата.",
    wedge: "Outcome-based career agent для одной профессии: skill evidence → подбор → подготовка → гарантия интервью; платёж от результата.",
    score: 3,
    confidence: "Высокая",
    sourceIds: [15, 16],
  },
  {
    id: 12,
    name: "Relocation / immigration digital",
    boundary: "B2C-помощники по визам, ВНЖ/РВП, регистрации, документам, переводам и адаптации; госпошлины и юридическая выручка вне digital layer.",
    rev24: 3,
    rev25: 4.5,
    tam: 20,
    basis: "[Э] 1,0–1,5 млн платных кейсов × 2–3 тыс. ₽ digital ARPU; 2025 рост чека/сложности. Открытой статистики выручки категории нет.",
    leaders: "Госуслуги/МВД как обязательный канал; банки и миграционные центры; фрагментированные юрфирмы/Telegram-сервисы. Национального независимого лидера нет.",
    gap: "Высокая боль, языковой барьер, постоянно меняющиеся правила, отсутствие единого case tracker и проверенного marketplace.",
    stage: "До формирования категории; regulation-driven digitization.",
    forecast: "20–30% CAGR при организованном найме и цифровом профиле иностранца; высокая policy volatility.",
    barriers: "Правовая ответственность, доверие, ПДн/биометрия, доступ к госинтеграциям, быстрое изменение правил.",
    wedge: "Multilingual compliance companion для одного corridor/работодателей: checklist, deadlines, document OCR, vetted human escalation.",
    score: 4,
    confidence: "Низкая",
    sourceIds: [17],
  },
  {
    id: 13,
    name: "Парковка / toll / driver apps",
    boundary: "Цифровая комиссия/контрактная выручка приложений оплаты парковок и платных дорог, транспондеров и driver wallet; не сами сборы операторов.",
    rev24: 6,
    rev25: 8.5,
    tam: 25,
    basis: "[Р] Платёжный GMV: дороги 121 800 + парковки ≈20 000 в 2024; digital share 80–95%; monetization IT/payment layer 4–5%. 2025 GMV ≈170 000.",
    leaders: "Автодор/ЦКАД и «Парковки России» — государственно-контролируемые каналы; Яндекс Заправки/Go, банковские приложения — платёжные оболочки.",
    gap: "Фрагментация городов/операторов, долги free-flow, нет единого баланса, планирования полной стоимости маршрута.",
    stage: "Инфраструктурный рост, но B2C-дистрибуция закрывается государством/экосистемами.",
    forecast: "15–20% GMV CAGR по мере расширения платных дорог/парковок; net take rate ограничен.",
    barriers: "Госконтракты, интеграции, нулевая комиссия для пользователя, требования к платежам и точности госномера.",
    wedge: "B2B2C API/driver wallet для автопарков, leasing и региональных приложений; независимый B2C слаб.",
    score: 2,
    confidence: "Средняя",
    sourceIds: [18, 19],
  },
  {
    id: 14,
    name: "Автосервис / топливо / ownership",
    boundary: "Маркетплейсы записи/оплаты СТО, агрегаторы топлива/моек/зарядки, цифровая история владения; не полная выручка АЗС/СТО/запчастей.",
    rev24: 18,
    rev25: 25,
    tam: 100,
    basis: "[Э/Р] TAM underlying aftersales 1 543 000, из них СТО 870 000 [П]; digital-influenced ≈15%, platform monetization ≈1,3%. 2025 +35–40% с низкой базы.",
    leaders: "Яндекс Заправки (>10 тыс. АЗС), приложения нефтесетей, FIT Service (11 200 network revenue, не platform revenue), Uremont (>1 000 СТО), банки/страховые.",
    gap: "64% хотят онлайн-запись, но только 11% используют её [П]; нет нейтральной истории авто, прозрачного estimate и сквозной гарантии.",
    stage: "Большой офлайн-TAM, ранняя цифровая транзакция.",
    forecast: "20–30% CAGR platform revenue; старение парка поддерживает спрос.",
    barriers: "Фрагментированные СТО, несовместимые каталоги/нормочасы, качество работ, обход платформы, низкая маржа топлива.",
    wedge: "Digital maintenance passport + fixed-price jobs для 3–5 популярных моделей; гарантия, запчасти и repeat reminders.",
    score: 5,
    confidence: "Средняя",
    sourceIds: [20, 21],
  },
];

const sources = [
  ["РБК: онлайн-авиабилеты, penetration и GMV", "https://marketing.rbc.ru/articles/15660/"],
  ["РБК: Tutu готовится к IPO, РСБУ 2024", "https://www.rbc.ru/technology_and_media/28/04/2025/6809021f9a7947cda2ec8afc"],
  ["TravelLine / Hotel.Report: доли OTA 2024", "https://ru.hotel.report/technology/programmy-dlya-otelej.-itogi-goda-onlajn-bronirovaniya-otelej-ot-travelline-v-rossii-ustanovilsya-novyj-lider"],
  ["ЦСР / Суточно: STR 333 млрд и прогноз", "https://corp.sutochno.ru/tpost/x07o0v4jf1-sutochnoru-zanimaet-27-rinka-kratkosroch"],
  ["Суточно.ру: результаты 2025", "https://sjcdn.sutochno.ru/Sutochno_ru_Reliz_Rezultaty_2025_4539905f1e.pdf"],
  ["ГидМаркет: экскурсионный рынок 2024", "https://gidmark.ru/news/transformacziya-i-razvitie-ryinka-ekskursionnyih-uslug-v-rossii"],
  ["Tripster: итоги 2024", "https://affiliateacademy.tripster.ru/novosti/2024-itogi-rekordy-i-peremeny/"],
  ["TAdviser: рынок такси России", "https://www.tadviser.ru/index.php/Статья:Такси_(рынок_России)"],
  ["Делимобиль: результаты 2025", "https://delimobil.ru/media/Prezentacija_Delimobil_itogi_2025_vF_short.pdf"],
  ["Трушеринг: кикшеринг 2024", "https://truesharing.ru/tp/54173/"],
  ["BusinesStat: межгородные автобусы 2024", "https://dzen.ru/a/aHFA39l-5Q6KL51Q"],
  ["ТАСС: аудитория и реклама геосервисов Яндекса", "https://fomag.ru/news-streem/ezhemesyachnaya-auditoriya-geoservisov-yandeksa-prevysila-90-mln-polzovateley/"],
  ["Циан: финансовые результаты 2024", "https://ir.ciangroup.ru/upload/iblock/ded/7ef2t4fjljnz1lqxicrq6oh9ij9ox4ev/Cian_Q4_2024_financial_results_RUS.pdf"],
  ["Яндекс: transcript FY2024, Auto.ru и O2O", "https://yastatic.net/s3/ir-docs/docs/2024/q4/cbf2d1c3ff32ff65da6l438h44902945/Transcript_4Q24_and_FY24.pdf"],
  ["Ведомости: HeadHunter 2024", "https://www.vedomosti.ru/business/news/2025/03/05/1096149-viruchka-headhunter-virosla"],
  ["Smart Ranking: HRTech 2024", "https://smartranking.ru/ru/analytics/hrtech/hrtech-rynok-v-rossii-vyros-na-38/"],
  ["Эксперт РА: миграция 2024", "https://raexpert.ru/researches/regions/migration_regions_2024/"],
  ["Коммерсантъ: сборы Автодора 2024", "https://www.kommersant.ru/doc/7639316"],
  ["Парковки России: app usage", "https://parking.mos.ru/news/4864/"],
  ["Движок: aftersales TAM 2024", "https://dvizhok.su/parts/rossijskij-ryinok-posleprodazhnogo-obsluzhivaniya.-situacziya-v-sfere-aftersales-s-tochki-zreniya-sto"],
  ["Движок: цифровая запись в СТО", "https://dvizhok.su/business/put-na-servis-lezhit-cherez-czifru-rossijskij-ryinok-posleprodazhnogo-obsluzhivaniya-v-i-kvartale-2024-goda"],
] as const;

function Stars({ value }: { value: number }) {
  const theme = useHostTheme();
  return (
    <span style={{ color: theme.accent.primary, letterSpacing: 2, fontWeight: 700 }}>
      {"●".repeat(value)}
      <span style={{ color: theme.text.quaternary }}>{"○".repeat(5 - value)}</span>
    </span>
  );
}

function MarketCard({ market }: { market: Market }) {
  const theme = useHostTheme();
  const growth = Math.round((market.rev25 / market.rev24 - 1) * 100);
  return (
    <Card collapsible defaultOpen={market.score >= 4}>
      <CardHeader trailing={<Pill size="sm" active={market.score >= 4}>{market.score}/5 · {market.confidence}</Pill>}>
        {market.id}. {market.name}
      </CardHeader>
      <CardBody>
        <Grid columns="minmax(130px, 0.65fr) minmax(180px, 1fr) minmax(180px, 1fr)" gap={16}>
          <Stack gap={8}>
            <Text size="small" tone="tertiary">NET REVENUE, МЛН ₽</Text>
            <Text weight="bold" style={{ fontSize: 19 }}>{market.rev24.toLocaleString("ru-RU")} → {market.rev25.toLocaleString("ru-RU")}</Text>
            <Text size="small" style={{ color: growth >= 15 ? theme.accent.primary : theme.text.secondary }}>2024 → 2025 · +{growth}%</Text>
            <Text size="small"><Text as="span" weight="semibold">TAM:</Text> {market.tam.toLocaleString("ru-RU")} млн ₽ platform revenue</Text>
            <Stars value={market.score} />
          </Stack>
          <Stack gap={7}>
            <Text size="small"><Text as="span" weight="semibold">Граница:</Text> {market.boundary}</Text>
            <Text size="small"><Text as="span" weight="semibold">Расчёт:</Text> {market.basis}</Text>
            <Text size="small"><Text as="span" weight="semibold">Лидеры:</Text> {market.leaders}</Text>
          </Stack>
          <Stack gap={7}>
            <Text size="small"><Text as="span" weight="semibold">White space:</Text> {market.gap}</Text>
            <Text size="small"><Text as="span" weight="semibold">Стадия / прогноз:</Text> {market.stage} {market.forecast}</Text>
            <Text size="small"><Text as="span" weight="semibold">Барьеры:</Text> {market.barriers}</Text>
            <Text size="small" style={{ color: theme.accent.primary }}><Text as="span" weight="bold">Startup wedge:</Text> {market.wedge}</Text>
            <Text size="small" tone="tertiary">
              Источники: {market.sourceIds.map((id, index) => (
                <span key={id}>{index ? ", " : ""}<Link href={sources[id - 1][1]}>[{id}]</Link></span>
              ))}
            </Text>
          </Stack>
        </Grid>
      </CardBody>
    </Card>
  );
}

export default function RussiaB2CMarkets() {
  const theme = useHostTheme();
  const [filter, setFilter] = useCanvasState<"all" | "high" | "confident">("market-filter", "all");
  const visible = markets.filter((m) => filter === "all" || (filter === "high" ? m.score >= 4 : m.confidence === "Высокая"));
  const top = markets.filter((m) => m.score >= 4);

  return (
    <Stack gap={18} style={{ padding: 24, maxWidth: 1220, margin: "0 auto", color: theme.text.primary }}>
      <Stack gap={6}>
        <Text size="small" tone="tertiary">РОССИЯ · B2C DIGITAL · 2024–2025 · DESK RESEARCH</Text>
        <H1>14 цифровых рынков: где есть окно для независимого стартапа</H1>
        <Text tone="secondary">
          Net revenue платформ, а не GMV базовой услуги. Все суммы — млн ₽, 2025 — факт там, где опубликован к июлю 2026, иначе расчётная оценка.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="14" label="сегментов" />
        <Stat value="4" label="рынка с оценкой ≥4" tone="success" />
        <Stat value="1 543 000" label="млн ₽ крупнейший offline TAM" />
        <Stat value="2024 → 2025" label="сопоставимый период" />
      </Grid>

      <Callout tone="info" title="Как читать цифры">
        <Text size="small">
          [П] — публичный факт; [Р] — расчёт из GMV × take rate или сумма раскрытых игроков; [Э] — экспертная оценка при отсутствии category reporting.
          TAM — достижимая годовая выручка цифрового слоя при зрелом проникновении, а не стоимость поездок, жилья, авто или недвижимости.
          Диапазон ошибки: высокая confidence ±10–15%, средняя ±20–30%, низкая ±40–60%.
        </Text>
      </Callout>

      <Stack gap={10}>
        <H2>Короткий инвестиционный вывод</H2>
        <Grid columns={2} gap={18}>
          <Stack gap={8} style={{ borderLeft: `3px solid ${theme.accent.primary}`, paddingLeft: 14 }}>
            <Text weight="bold">Лучшее окно: ownership layer, не новый агрегатор</Text>
            <Text size="small" tone="secondary">
              Автосервис/ownership (5/5) сочетает огромный офлайн-TAM, явный digital gap и повторные транзакции. Experiences, межгород и migration (4/5) меньше, но допускают узкий supply-led старт.
            </Text>
          </Stack>
          <Stack gap={8}>
            <Text weight="bold">Избегать фронтальной атаки на network effects</Text>
            <Text size="small" tone="secondary">
              Такси, карты, билеты, каршеринг и кикшеринг велики, но value capture уже у экосистем или капиталоёмких операторов. Реалистичный вход — workflow/API/guarantee layer.
            </Text>
          </Stack>
        </Grid>
        <Row gap={8} wrap>
          {top.map((m) => <Pill active>{m.name} · {m.score}/5</Pill>)}
        </Row>
      </Stack>

      <Divider />
      <Row gap={8} wrap>
        <Pill active={filter === "all"} onClick={() => setFilter("all")}>Все 14</Pill>
        <Pill active={filter === "high"} onClick={() => setFilter("high")}>Attractiveness ≥4</Pill>
        <Pill active={filter === "confident"} onClick={() => setFilter("confident")}>Высокая confidence</Pill>
      </Row>

      <Stack gap={10}>
        {visible.map((market) => <MarketCard market={market} />)}
      </Stack>

      <Divider />
      <Stack gap={8}>
        <H2>Источники</H2>
        <Grid columns={2} gap={7}>
          {sources.map((source, index) => (
            <Text size="small" tone="secondary">
              [{index + 1}] <Link href={source[1]}>{source[0]}</Link>
            </Text>
          ))}
        </Grid>
        <Text size="small" tone="tertiary">
          Ограничения: компании часто смешивают GMV, агентскую и валовую выручку, B2B/B2C и несколько вертикалей в одном юрлице. Поэтому оценки [Р]/[Э] предназначены для market screening, не для valuation без первичных интервью и выгрузок СПАРК/ФНС.
        </Text>
      </Stack>
    </Stack>
  );
}
