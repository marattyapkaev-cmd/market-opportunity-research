(function () {
  "use strict";
  const React = window.React;
  const h = React.createElement;

  const classNames = (...items) => items.filter(Boolean).join(" ");
  const gapValue = (gap) => typeof gap === "number" ? gap + "px" : (gap || undefined);
  const pass = (props, omitted) => Object.fromEntries(
    Object.entries(props || {}).filter(([key]) => !omitted.includes(key))
  );

  function Stack({ gap, children, className, style, ...rest }) {
    return h("div", { ...rest, className: classNames("cc-stack", className), style: { gap: gapValue(gap), ...style } }, children);
  }
  function Row({ gap, children, className, style, align, justify, wrap, ...rest }) {
    return h("div", {
      ...rest,
      className: classNames("cc-row", className),
      style: {
        gap: gapValue(gap),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : undefined,
        ...style,
      },
    }, children);
  }
  function Grid({ columns = 1, gap, children, className, style, ...rest }) {
    const template = typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;
    return h("div", {
      ...rest,
      className: classNames("cc-grid", className),
      style: { gridTemplateColumns: template, gap: gapValue(gap), ...style },
    }, children);
  }
  function Heading(tag, className) {
    return ({ children, style, ...rest }) => h(tag, { ...rest, className, style }, children);
  }
  const H1 = Heading("h1", "cc-h1");
  const H2 = Heading("h2", "cc-h2");
  const H3 = Heading("h3", "cc-h3");

  function Text({ as = "div", size, tone, weight, children, className, style, ...rest }) {
    return h(as, {
      ...rest,
      className: classNames("cc-text", size && `cc-text-${size}`, tone && `cc-tone-${tone}`, weight && `cc-weight-${weight}`, className),
      style,
    }, children);
  }
  function Link({ href, children, ...rest }) {
    const external = /^https?:\/\//.test(href || "");
    return h("a", { href, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined, ...rest }, children);
  }
  function Divider(props) { return h("hr", { ...props, className: classNames("cc-divider", props.className) }); }
  function Button({ variant = "primary", children, className, ...rest }) {
    return h("button", { type: "button", ...rest, className: classNames("cc-button", `cc-button-${variant}`, className) }, children);
  }
  function Pill({ tone = "neutral", active, size, children, className, onClick, ...rest }) {
    const Tag = onClick ? "button" : "span";
    return h(Tag, {
      type: onClick ? "button" : undefined,
      onClick,
      ...rest,
      className: classNames("cc-pill", `cc-pill-${tone}`, active && "is-active", size && `cc-pill-${size}`, className),
    }, children);
  }
  function Callout({ tone = "neutral", title, children, className, ...rest }) {
    return h("aside", { ...rest, className: classNames("cc-callout", `cc-callout-${tone}`, className) },
      title && h("strong", { className: "cc-callout-title" }, title),
      h("div", null, children)
    );
  }
  function CardHeader({ children, trailing, className, ...rest }) {
    return h("div", { ...rest, className: classNames("cc-card-header", className) },
      h("div", null, children), trailing && h("div", { className: "cc-card-trailing" }, trailing)
    );
  }
  CardHeader.__canvasType = "header";
  function CardBody({ children, className, ...rest }) {
    return h("div", { ...rest, className: classNames("cc-card-body", className) }, children);
  }
  CardBody.__canvasType = "body";
  function Card({ collapsible, defaultOpen, children, className, ...rest }) {
    if (!collapsible) return h("section", { ...pass(rest, ["size"]), className: classNames("cc-card", className) }, children);
    const parts = React.Children.toArray(children);
    const header = parts.find((child) => child.type && child.type.__canvasType === "header");
    const body = parts.find((child) => child.type && child.type.__canvasType === "body");
    const summaryContent = header
      ? h(React.Fragment, null, header.props.children, header.props.trailing && h("span", { className: "cc-card-trailing" }, header.props.trailing))
      : "Подробнее";
    return h("details", { ...pass(rest, ["size"]), open: defaultOpen || undefined, className: classNames("cc-card", "cc-details-card", className) },
      h("summary", { className: "cc-card-header" }, summaryContent),
      body ? h(CardBody, body.props) : parts.filter((part) => part !== header)
    );
  }
  function CollapsibleSection({ title, trailing, defaultOpen, children, className, ...rest }) {
    return h("details", { ...rest, open: defaultOpen || undefined, className: classNames("cc-collapsible", className) },
      h("summary", null, h("span", null, title), trailing && h("span", { className: "cc-card-trailing" }, trailing)),
      h("div", { className: "cc-collapsible-body" }, children)
    );
  }
  function Stat({ value, label, tone = "neutral", className, ...rest }) {
    return h("div", { ...rest, className: classNames("cc-stat", `cc-stat-${tone}`, className) },
      h("div", { className: "cc-stat-value" }, value),
      h("div", { className: "cc-stat-label" }, label)
    );
  }
  function Table({ headers = [], rows = [], striped, className, ...rest }) {
    return h("div", { className: "cc-table-wrap" },
      h("table", { ...rest, className: classNames("cc-table", striped && "is-striped", className) },
        headers.length > 0 && h("thead", null, h("tr", null, headers.map((cell, index) => h("th", { key: index }, cell)))),
        h("tbody", null, rows.map((row, rowIndex) =>
          h("tr", { key: rowIndex }, row.map((cell, cellIndex) => h("td", { key: cellIndex }, cell)))
        ))
      )
    );
  }
  function Select({ value, onChange, options = [], className, ...rest }) {
    return h("select", {
      ...rest,
      value,
      onChange: (event) => onChange && onChange(event.target.value),
      className: classNames("cc-control", className),
    }, options.map((option) => h("option", { key: option.value, value: option.value }, option.label)));
  }
  function TextInput({ value, onChange, className, ...rest }) {
    return h("input", {
      type: "text",
      ...rest,
      value,
      onChange: (event) => onChange && onChange(event.target.value),
      className: classNames("cc-control", className),
    });
  }
  function BarChart({ categories = [], series = [], height, yMax, valueSuffix = "", showValues, className }) {
    const values = series.flatMap((entry) => entry.data || []);
    const max = yMax || Math.max(1, ...values);
    return h("div", { className: classNames("cc-chart", className), style: { minHeight: height } },
      categories.map((category, index) => h("div", { className: "cc-chart-row", key: category },
        h("div", { className: "cc-chart-label" }, category),
        h("div", { className: "cc-chart-track" },
          series.map((entry) => {
            const value = entry.data[index] || 0;
            return h("div", {
              key: entry.name,
              className: classNames("cc-chart-bar", `cc-chart-${entry.tone || "info"}`),
              style: { width: `${Math.max(1, value / max * 100)}%` },
              title: `${entry.name}: ${value}${valueSuffix}`,
            }, showValues ? `${value}${valueSuffix}` : "");
          })
        )
      ))
    );
  }

  function useCanvasState(key, initialValue) {
    const namespace = window.CANVAS_STATE_NAMESPACE || "portal";
    const storageKey = `cursor-canvas:${namespace}:${key}`;
    const [value, setValue] = React.useState(() => {
      try {
        const stored = localStorage.getItem(storageKey);
        return stored === null ? initialValue : JSON.parse(stored);
      } catch (_) { return initialValue; }
    });
    const update = React.useCallback((next) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? next(current) : next;
        try { localStorage.setItem(storageKey, JSON.stringify(resolved)); } catch (_) {}
        return resolved;
      });
    }, [storageKey]);
    return [value, update];
  }
  function useHostTheme() {
    const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return {
      bg: { editor: dark ? "#111827" : "#ffffff" },
      text: {
        primary: dark ? "#f3f4f6" : "#172033",
        secondary: dark ? "#cbd5e1" : "#4b5563",
        tertiary: dark ? "#94a3b8" : "#6b7280",
        quaternary: dark ? "#64748b" : "#9ca3af",
        onAccent: "#ffffff",
      },
      accent: { primary: dark ? "#60a5fa" : "#1d4ed8" },
      fill: { tertiary: dark ? "#263244" : "#eef2f7", quaternary: dark ? "#1f2937" : "#f4f6f8" },
      stroke: { secondary: dark ? "#475569" : "#cbd5e1", tertiary: dark ? "#334155" : "#e2e8f0" },
      diff: { removedLine: dark ? "#fca5a5" : "#b91c1c" },
    };
  }
  function useCanvasAction() {
    return React.useCallback(async (action) => {
      const prompt = action && (action.userPrompt || action.prompt) || JSON.stringify(action || {});
      try {
        await navigator.clipboard.writeText(prompt);
        window.alert("Промпт скопирован в буфер обмена. Откройте Cursor Chat и вставьте его.");
      } catch (_) {
        window.prompt("Скопируйте промпт для Cursor Chat:", prompt);
      }
    }, []);
  }

  window.CursorCanvas = {
    Button, Callout, Card, CardBody, CardHeader, CollapsibleSection, Divider, Grid,
    H1, H2, H3, Link, Pill, Row, Select, Stack, Stat, Table, Text, TextInput,
    BarChart, useCanvasState, useHostTheme, useCanvasAction,
  };
})();
