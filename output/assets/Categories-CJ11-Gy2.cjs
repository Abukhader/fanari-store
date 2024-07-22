"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime");
require("react");
const a = require("@mui/material"), r = require("react-lazyload"), i = require("i18next");
exports.default = ({ categories: t, language: n, handleCategoryClick: s }) => e.jsxs(e.Fragment, { children: [e.jsx(a.Typography, { variant: "h4", gutterBottom: true, sx: { mx: "30px", fontWeight: "500", my: 5 }, children: i.t("view_categories") }), e.jsx(a.Box, { sx: { display: "flex", flexWrap: "wrap", gap: 2 }, children: t.map((i2) => {
  var _a, _b;
  return e.jsxs(a.Box, { sx: { flexBasis: "calc(50% - 16px)", textAlign: "center", cursor: "pointer", padding: 2, mb: 3, "@media screen and (min-width: 768px)": { flexBasis: "calc(50% - 16px)", marginLeft: "auto" }, "@media screen and (min-width: 1024px)": { flexBasis: "calc(33.33% - 16px)" }, color: "var(--primary-color)", "&:hover": { color: "red" } }, onClick: () => s(i2.categoryUrl), children: [e.jsx(r, { height: 200, once: true, children: e.jsx("img", { src: i2.image, alt: n ? i2.name : i2.translations && ((_a = i2.translations.find((e2) => e2.locale === n)) == null ? void 0 : _a.category_name), style: { maxWidth: "100%", borderRadius: "8px", width: "100%", height: "auto" }, width: "260", height: "207.5" }) }), e.jsx(a.Typography, { variant: "h5", sx: { mt: 1 }, children: n ? i2.name : i2.translations && ((_b = i2.translations.find((e2) => e2.locale === n)) == null ? void 0 : _b.category_name) })] }, i2.id);
}) }), e.jsx(a.Divider, {})] });
