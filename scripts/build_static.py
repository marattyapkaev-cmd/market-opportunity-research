#!/usr/bin/env python3
"""Build the static market research portal using Python's standard library only."""

import argparse
import html
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "canvas-sources"

REPORTS = [
    {
        "file": "ranked-product-ideas.canvas.tsx",
        "slug": "ranked-product-ideas",
        "title": "50 продуктовых идей: рейтинг и критика",
        "geo": "Россия / мир", "segment": "B2B/B2C", "status": "Итоговый", "group": "Итоговые карты",
        "description": "Рейтинг 50 гипотез: полный продуктовый паспорт и отдельная критика с вопросами и kill criteria для каждой идеи.",
    },
    {
        "file": "global-B2B-entry-opportunities.canvas.tsx",
        "slug": "global-b2b-entry-opportunities",
        "title": "Глобальная карта входа в B2B",
        "geo": "Мир", "segment": "B2B", "status": "Итоговый", "group": "Итоговые карты",
        "description": "33 рынка, региональные различия, рейтинги импорта и экспорта и конкретные продуктовые гипотезы.",
    },
    {
        "file": "global-B2C-entry-opportunities.canvas.tsx",
        "slug": "global-b2c-entry-opportunities",
        "title": "Глобальная карта входа в B2C",
        "geo": "Мир", "segment": "B2C", "status": "Итоговый", "group": "Итоговые карты",
        "description": "35 цифровых рынков, два рейтинга направлений и практические точки входа для независимой команды.",
    },
    {
        "file": "russian-saas-entry-opportunities.canvas.tsx",
        "slug": "russian-saas-entry-opportunities",
        "title": "Карта входа в B2B SaaS России",
        "geo": "Россия", "segment": "B2B", "status": "Итоговый", "group": "Итоговые карты",
        "description": "Сводная оценка российских SaaS-рынков, незакрытых ниш, конкуренции и стартовых продуктовых клиньев.",
    },
    {
        "file": "russian-b2c-entry-opportunities.canvas.tsx",
        "slug": "russian-b2c-entry-opportunities",
        "title": "Карта входа в B2C России",
        "geo": "Россия", "segment": "B2C", "status": "Итоговый", "group": "Итоговые карты",
        "description": "Сводная карта цифровых B2C-рынков России с фильтрами, оценкой привлекательности и точками входа.",
    },
    {
        "file": "global-B2B-horizontal-markets.canvas.tsx",
        "slug": "global-b2b-horizontal-markets",
        "title": "Горизонтальные B2B-рынки",
        "geo": "Мир", "segment": "B2B", "status": "Промежуточный", "group": "Международные исследования",
        "description": "Кросс-отраслевые software-категории, размер рынка, рост, конкурентная среда и стратегия локализации.",
    },
    {
        "file": "global-B2B-vertical-markets.canvas.tsx",
        "slug": "global-b2b-vertical-markets",
        "title": "Вертикальные B2B software-рынки",
        "geo": "Мир", "segment": "B2B", "status": "Промежуточный", "group": "Международные исследования",
        "description": "12 отраслевых рынков и региональные пары: строительство, сервис, медицина, логистика и другие вертикали.",
    },
    {
        "file": "global-B2B-SMB-commerce-markets.canvas.tsx",
        "slug": "global-b2b-smb-commerce-markets",
        "title": "B2B SMB, commerce и финансовые операции",
        "geo": "Мир", "segment": "B2B", "status": "Промежуточный", "group": "Международные исследования",
        "description": "Инструменты малого бизнеса, продавцов и финансовых операций с картой привлекательности рынков.",
    },
    {
        "file": "global-B2C-commerce-travel-markets.canvas.tsx",
        "slug": "global-b2c-commerce-travel-markets",
        "title": "B2C commerce, travel и mobility",
        "geo": "Мир", "segment": "B2C", "status": "Промежуточный", "group": "Международные исследования",
        "description": "Потребительские рынки торговли, путешествий, мобильности и lifestyle с региональными выводами.",
    },
    {
        "file": "global-B2C-finance-health-markets.canvas.tsx",
        "slug": "global-b2c-finance-health-markets",
        "title": "B2C finance, health и family",
        "geo": "Мир", "segment": "B2C", "status": "Промежуточный", "group": "Международные исследования",
        "description": "Финансы, здоровье и семейные сервисы: размеры рынков, барьеры и независимые продуктовые стратегии.",
    },
    {
        "file": "global-B2C-media-education-markets.canvas.tsx",
        "slug": "global-b2c-media-education-markets",
        "title": "B2C media, creator и education",
        "geo": "Мир", "segment": "B2C", "status": "Промежуточный", "group": "Международные исследования",
        "description": "Цифровые медиа, creator economy, образование и AI-продукты с интерактивным скорингом.",
    },
    {
        "file": "russian-vertical-B2B-SaaS-markets.canvas.tsx",
        "slug": "russian-vertical-b2b-saas-markets",
        "title": "Вертикальные B2B SaaS-рынки России",
        "geo": "Россия", "segment": "B2B", "status": "Промежуточный", "group": "Рынок РФ",
        "description": "Отраслевые SaaS-сегменты России, текущая ёмкость, конкуренты и незакрытые ниши.",
    },
    {
        "file": "russian-b2b-saas-markets-2025.canvas.tsx",
        "slug": "russian-b2b-saas-markets-2025",
        "title": "Российские B2B SaaS-рынки: 2025/2024",
        "geo": "Россия", "segment": "B2B", "status": "Промежуточный", "group": "Рынок РФ",
        "description": "Сопоставимый обзор российских SaaS-категорий с методикой расчёта и источниками.",
    },
    {
        "file": "russian-b2b-saas-2025.canvas.tsx",
        "slug": "russian-b2b-saas-2025",
        "title": "Шесть B2B SaaS-рынков и 15 компаний",
        "geo": "Россия", "segment": "B2B", "status": "Промежуточный", "group": "Рынок РФ",
        "description": "Узкое исследование КЭДО, ATS, LMS, project management, ITSM и ВКС в России.",
    },
    {
        "file": "russia-b2c-digital-markets-2025.canvas.tsx",
        "slug": "russia-b2c-digital-markets-2025",
        "title": "14 цифровых B2C-рынков России",
        "geo": "Россия", "segment": "B2C", "status": "Промежуточный", "group": "Рынок РФ",
        "description": "Рыночные оценки 2024–2025 и окна для независимого стартапа в 14 потребительских категориях.",
    },
    {
        "file": "russian-product-software-companies.canvas.tsx",
        "slug": "russian-product-software-companies",
        "title": "Продуктовые разработчики ПО в России",
        "geo": "Россия", "segment": "B2B/B2C", "status": "Исходный", "group": "Исходный список компаний",
        "description": "Исходный список российских продуктовых software-компаний с юридическими лицами и рыночной группировкой.",
    },
]

GROUPS = ["Итоговые карты", "Международные исследования", "Рынок РФ", "Исходный список компаний"]
CANVAS_NAMES = [
    "Button", "Callout", "Card", "CardBody", "CardHeader", "CollapsibleSection",
    "Divider", "Grid", "H1", "H2", "H3", "Link", "Pill", "Row", "Select",
    "Stack", "Stat", "Table", "Text", "TextInput", "BarChart", "useCanvasState",
    "useHostTheme", "useCanvasAction",
]


def transform(source: str):
    source = re.sub(
        r'import\s*\{[\s\S]*?\}\s*from\s*["\']cursor/canvas["\'];?\s*',
        "",
        source,
        count=1,
    )
    match = re.search(r"export\s+default\s+function\s+([A-Za-z_$][\w$]*)", source)
    if match:
        component = match.group(1)
        source = re.sub(
            r"export\s+default\s+function\s+" + re.escape(component),
            "function " + component,
            source,
            count=1,
        )
    else:
        match = re.search(r"export\s+default\s+([A-Za-z_$][\w$]*)\s*;?", source)
        if not match:
            raise ValueError("No default component export found")
        component = match.group(1)
        source = source[:match.start()] + source[match.end():]
    return source, component


def report_html(report, transformed, component):
    title = html.escape(report["title"])
    source_href = "../../canvas-sources/" + report["file"]
    bindings = ", ".join(CANVAS_NAMES)
    return f"""<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{html.escape(report['description'])}">
  <title>{title} — Market Opportunity Research</title>
  <link rel="stylesheet" href="../../assets/styles.css">
</head>
<body>
  <header class="report-shell">
    <div class="report-shell-inner">
      <nav class="report-nav" aria-label="Навигация по отчёту">
        <a class="report-back" href="../../index.html">← Все отчёты</a>
        <span class="report-name">{title}</span>
      </nav>
      <div class="report-actions">
        <span class="badge">{html.escape(report['geo'])}</span>
        <span class="badge">{html.escape(report['segment'])}</span>
        <a class="raw-link" href="{source_href}">Исходник .canvas.tsx</a>
      </div>
    </div>
  </header>
  <div id="report-root" aria-live="polite"></div>
  <script>window.CANVAS_STATE_NAMESPACE = {report['slug']!r};</script>
  <script src="../../assets/vendor/react.production.min.js"></script>
  <script src="../../assets/vendor/react-dom.production.min.js"></script>
  <script src="../../assets/vendor/babel.min.js"></script>
  <script src="../../assets/canvas-shim.js"></script>
  <script type="text/plain" id="report-source">
const {{ {bindings} }} = window.CursorCanvas;
{transformed}
const portalRoot = ReactDOM.createRoot(document.getElementById("report-root"));
portalRoot.render(<{component} />);
  </script>
  <script>
    try {{
      var source = document.getElementById("report-source").textContent;
      var compiled = Babel.transform(source, {{
        presets: ["typescript", "react"],
        filename: "{report['slug']}.tsx"
      }}).code;
      (0, eval)(compiled);
    }} catch (error) {{
      var root = document.getElementById("report-root");
      if (root) {{
        root.innerHTML = '<div class="report-error"><strong>Не удалось открыть отчёт.</strong><br>' +
          String(error && (error.stack || error.message) || "Ошибка выполнения") + '</div>';
      }}
      console.error(error);
    }}
  </script>
</body>
</html>
"""


def card_html(report):
    searchable = " ".join([report["title"], report["description"], report["geo"], report["segment"], report["status"]]).lower()
    final_class = " badge-final" if report["status"] == "Итоговый" else ""
    return f"""<article class="report-card" data-search="{html.escape(searchable)}" data-geo="{html.escape(report['geo'])}" data-segment="{html.escape(report['segment'])}" data-status="{html.escape(report['status'])}">
  <div class="card-meta">
    <span class="badge{final_class}">{html.escape(report['status'])}</span>
    <span class="badge">{html.escape(report['geo'])}</span>
    <span class="badge">{html.escape(report['segment'])}</span>
  </div>
  <h3>{html.escape(report['title'])}</h3>
  <p>{html.escape(report['description'])}</p>
  <a class="report-link" href="reports/{report['slug']}/index.html">Открыть исследование →</a>
</article>"""


def index_html():
    sections = []
    for group in GROUPS:
        reports = [report for report in REPORTS if report["group"] == group]
        cards = "\n".join(card_html(report) for report in reports)
        sections.append(f"""<section class="catalog-section" data-section>
  <div class="section-heading"><h2>{html.escape(group)}</h2><span>{len(reports)} отч.</span></div>
  <div class="report-grid">{cards}</div>
</section>""")
    return f"""<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Единый портал исследований рыночных возможностей B2B и B2C в России и мире.">
  <title>Market Opportunity Research</title>
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <p class="eyebrow">Market Opportunity Research</p>
      <h1 class="site-title">Карта рынков для запуска и локализации цифровых продуктов</h1>
      <p class="site-lead">16 исследований рынков России и мира: от исходных обзоров до итоговых карт входа и рейтинга 50 продуктовых гипотез с отдельной критикой.</p>
      <div class="header-stats">
        <div class="header-stat"><strong>16</strong><span>исследований</span></div>
        <div class="header-stat"><strong>5</strong><span>итоговых карт</span></div>
        <div class="header-stat"><strong>2</strong><span>географии</span></div>
        <div class="header-stat"><strong>B2B + B2C</strong><span>сегменты</span></div>
      </div>
    </div>
  </header>
  <main class="portal-main">
    <div class="container">
      <form class="controls" id="catalog-controls" role="search">
        <input class="control" id="search" type="search" placeholder="Поиск по названию и описанию" aria-label="Поиск отчётов">
        <select class="control" id="geo" aria-label="География"><option value="">Все географии</option><option>Мир</option><option>Россия</option></select>
        <select class="control" id="segment" aria-label="Сегмент"><option value="">Все сегменты</option><option>B2B</option><option>B2C</option><option>B2B/B2C</option></select>
        <select class="control" id="status" aria-label="Статус"><option value="">Все статусы</option><option>Итоговый</option><option>Промежуточный</option><option>Исходный</option></select>
      </form>
      <div id="catalog">{"".join(sections)}</div>
      <div class="empty-state" id="empty-state">По заданным условиям отчёты не найдены.</div>
      <section class="how-to">
        <h2>Как пользоваться порталом</h2>
        <ol>
          <li><strong>Начните с итоговой карты</strong><br>Выберите географию и B2B/B2C, чтобы увидеть приоритеты и точки входа.</li>
          <li><strong>Проверьте исходные исследования</strong><br>Откройте детальные обзоры для границ рынка, расчётов и первичных ссылок.</li>
          <li><strong>Сохраняйте рабочий контекст</strong><br>Фильтры внутри отчётов остаются в браузере отдельно для каждой страницы.</li>
        </ol>
      </section>
    </div>
  </main>
  <footer class="site-footer"><div class="container">Частный исследовательский репозиторий · статическая совместимая версия Cursor Canvas</div></footer>
  <script>
    (function () {{
      const controls = ["search", "geo", "segment", "status"].map(id => document.getElementById(id));
      const cards = Array.from(document.querySelectorAll(".report-card"));
      const sections = Array.from(document.querySelectorAll("[data-section]"));
      const empty = document.getElementById("empty-state");
      function applyFilters() {{
        const query = controls[0].value.trim().toLowerCase();
        const geo = controls[1].value;
        const segment = controls[2].value;
        const status = controls[3].value;
        let shown = 0;
        cards.forEach(card => {{
          const visible = (!query || card.dataset.search.includes(query)) &&
            (!geo || card.dataset.geo === geo) &&
            (!segment || card.dataset.segment === segment) &&
            (!status || card.dataset.status === status);
          card.hidden = !visible;
          if (visible) shown += 1;
        }});
        sections.forEach(section => {{
          section.hidden = !Array.from(section.querySelectorAll(".report-card")).some(card => !card.hidden);
        }});
        empty.classList.toggle("is-visible", shown === 0);
      }}
      controls.forEach(control => control.addEventListener("input", applyFilters));
      document.getElementById("catalog-controls").addEventListener("submit", event => event.preventDefault());
    }})();
  </script>
</body>
</html>
"""


def main():
    parser = argparse.ArgumentParser(description="Copy Cursor Canvas sources and build static report pages.")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE, help=f"Canvas directory (default: {DEFAULT_SOURCE})")
    args = parser.parse_args()
    source_dir = args.source.expanduser().resolve()
    if not source_dir.is_dir():
        raise SystemExit(f"Source directory not found: {source_dir}")

    expected = {report["file"] for report in REPORTS}
    available = {path.name for path in source_dir.glob("*.canvas.tsx")}
    missing = expected - available
    if missing:
        raise SystemExit("Missing source canvases: " + ", ".join(sorted(missing)))
    unexpected = available - expected
    if unexpected:
        raise SystemExit("Uncatalogued source canvases: " + ", ".join(sorted(unexpected)))

    canvas_dir = ROOT / "canvas-sources"
    reports_dir = ROOT / "reports"
    canvas_dir.mkdir(parents=True, exist_ok=True)
    reports_dir.mkdir(parents=True, exist_ok=True)

    for report in REPORTS:
        source_path = source_dir / report["file"]
        copied_path = canvas_dir / report["file"]
        if source_path != copied_path:
            shutil.copyfile(source_path, copied_path)
        source = copied_path.read_text(encoding="utf-8")
        transformed, component = transform(source)
        output_dir = reports_dir / report["slug"]
        output_dir.mkdir(parents=True, exist_ok=True)
        (output_dir / "index.html").write_text(
            report_html(report, transformed, component),
            encoding="utf-8",
        )

    (ROOT / "index.html").write_text(index_html(), encoding="utf-8")
    print(f"Built {len(REPORTS)} report pages from {source_dir}")
    print(f"Copied {len(expected)} exact source canvases to {canvas_dir}")


if __name__ == "__main__":
    main()
