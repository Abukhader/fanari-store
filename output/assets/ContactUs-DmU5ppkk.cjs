"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime");
require("react");
const r = require("@mui/material"), i = require("./CategoryList-Di9rZZyD.cjs"), t = require("styled-components"), s = require("react-i18next");
require("axios"), require("@mui/icons-material/ArrowDropUp.js"), require("react-router-dom"), require("../main.cjs"), require("react-dom/client"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
const a = "768px", n = t(r.Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;

  @media (max-width: ${a}) {
    margin: 5px;
  }
`, o = t(r.Box)`
  width: calc(50% - 20px);
  margin-bottom: 10px;

  @media (max-width: ${a}) {
    width: 100%;
    margin-bottom: 5px;
  }
`, l = t(r.Box)`
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: ${a}) {
    margin-bottom: 5px;
  }
`, x = t(r.TextField)`
  width: 100%;

  & .MuiOutlinedInput-input {
    padding-top: 14.5px; /* Ajust vertical padding */
    padding-bottom: 14.5px; /* Ajust vertical padding */
  }
`;
exports.default = () => {
  const { t: t2 } = s.useTranslation(), a2 = localStorage.getItem("i18nextLng") || "ar";
  return e.jsx(r.Container, { children: e.jsxs(r.Stack, { direction: { xs: "column", md: "row" }, spacing: 2, sx: { width: "100%" }, children: [e.jsx(r.Box, { sx: { mt: 4, mr: { md: 2 }, flexGrow: 0, flexShrink: 0, flexBasis: "20%", display: { xs: "none", md: "block" } }, children: e.jsx(i.CategoryList, {}) }), e.jsxs(r.Box, { sx: { maxWidth: "80%" }, children: [" ", e.jsx(r.Typography, { sx: { color: "var(--primary-color)", mt: 4 }, variant: "h4", component: "div", children: t2("contactUs") }), e.jsxs(r.Box, { sx: { display: "flex", alignItems: "center", my: 2 }, children: [e.jsx(r.Box, { sx: { width: "5vw", height: "2px", backgroundColor: "red" } }), e.jsx(r.Box, { sx: { width: "8vw", height: "2px", backgroundColor: "#01abae" } }), e.jsx(r.Box, { sx: { width: "55vw", height: "1px", backgroundColor: "#eee" } })] }), e.jsx(r.Typography, { sx: { color: "var(--primary-color)", fontSize: "32px", mt: "20px", mb: "30px", fontWeight: "650" }, children: t2("fanari_store") }), e.jsx(r.Typography, { sx: { fontSize: "18px", mb: "20px", fontWeight: "600" }, children: t2("address") }), e.jsxs(r.Typography, { sx: { fontSize: "17px", mb: "5px", fontWeight: "600" }, children: [t2("phone"), ": ", e.jsx("span", { dir: "ltr", children: " +963 21 5075" })] }), e.jsxs(r.Typography, { sx: { fontSize: "17px", mb: "5px", fontWeight: "600" }, children: [t2("sales"), ": ", e.jsx("span", { dir: "ltr", children: " +963 944 771160" })] }), e.jsxs(r.Typography, { sx: { fontSize: "17px", fontWeight: "600" }, children: [t2("maintenance"), ": ", e.jsx("span", { dir: "ltr", children: " +963 943 629 629" })] }), e.jsxs(r.Typography, { sx: { fontSize: "18px", mt: "20px", fontWeight: "650" }, children: [t2("email"), ":", " ", e.jsx(r.Link, { href: "mailto:sales@fanari-store.com", children: "sales@fanari-store.com" })] }), e.jsx(r.Typography, { sx: { color: "var(--primary-color)", fontSize: "32px", mt: "40px", mb: "25px", fontWeight: "650" }, children: t2("contactform") }), e.jsxs("form", { children: [e.jsxs(r.Stack, { direction: "column", mx: { xs: "0" }, children: [e.jsxs(n, { children: [e.jsx(o, { children: e.jsx(x, { label: t2("name"), type: "text", name: "name", fullWidth: true, required: true, InputLabelProps: { dir: "ar" === a2 ? "rtl" : "ltr" } }) }), e.jsx(o, { children: e.jsx(x, { label: t2("email"), type: "text", name: "email", fullWidth: true, required: true, InputLabelProps: { dir: "ar" === a2 ? "rtl" : "ltr" } }) })] }), e.jsxs(n, { children: [e.jsx(o, { children: e.jsx(x, { label: t2("phone"), type: "text", name: "phone", fullWidth: true, required: true, InputLabelProps: { dir: "ar" === a2 ? "rtl" : "ltr" } }) }), e.jsx(o, { children: e.jsx(x, { label: t2("title"), type: "text", name: "title", fullWidth: true, required: true, InputLabelProps: { dir: "ar" === a2 ? "rtl" : "ltr" } }) })] }), e.jsx(n, { children: e.jsx(l, { children: e.jsx(x, { label: t2("subject"), type: "text", name: "subject", fullWidth: true, required: true, InputLabelProps: { dir: "ar" === a2 ? "rtl" : "ltr" } }) }) }), e.jsx(n, { children: e.jsx(l, { children: e.jsx(x, { label: t2("message"), type: "text", name: "message", fullWidth: true, multiline: true, rows: 4, required: true, InputLabelProps: { dir: "ar" === a2 ? "rtl" : "ltr" } }) }) })] }), e.jsx(r.Button, { type: "submit", variant: "contained", color: "primary", sx: { mx: 1 }, children: t2("send") })] }), " ", e.jsx(r.Box, { sx: { mt: "40px", ml: "10px" }, children: e.jsx(r.Box, { sx: { position: "relative", width: "100%", height: "300px" }, children: e.jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.311900733475!2d37.14016341524308!3d36.20761318007483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff9d35f42a3a3%3A0xff3e6dfe40ec6e4e!2z2YHZhtix2Yog2LPYqtmI2LEgRmFuYXJpIFN0b3Jl!5e0!3m2!1sen!2s!4v1571768926496!5m2!1sen!2s", width: "100%", height: "100%", style: { border: 0, borderRadius: "5px" } }) }) })] })] }) });
};
