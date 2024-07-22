"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("axios"), t = require("@mui/material"), o = require("react-router-dom"), a = require("../main.cjs"), n = require("i18next"), s = require("@mui/icons-material/NavigateNext.js");
require("react-dom/client"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
exports.default = () => {
  const { id: c } = o.useParams(), [l, d] = r.useState(null), [u, x] = r.useState(true), h = localStorage.getItem("i18nextLng") || "ar", m = t.useMediaQuery("(max-width:800px)"), p = t.useMediaQuery("(min-width:800px)");
  r.useEffect(() => {
    (async () => {
      try {
        x(true);
        const e2 = ((e3) => {
          const r3 = document.cookie.split(";");
          for (let i2 = 0; i2 < r3.length; i2++) {
            const t3 = r3[i2].trim();
            if (t3.startsWith(e3 + "=")) return t3.substring(e3.length + 1);
          }
          return null;
        })("accessToken"), r2 = { Authorization: `${a.tokenType} ${e2}`, "Accept-Language": h }, t2 = await i.get(`https://fanaristore.sama-tek.com/api/show-invoice/${c}`, { headers: r2 });
        d(t2.data), x(false);
      } catch (e2) {
        console.error("Error fetching invoice details:", e2);
      }
    })();
  }, [c]);
  const y = (e2) => e2.split("T")[0], g = "ar" === h ? e.jsx(s, { style: { transform: "rotate(180deg)" }, fontSize: "small" }) : e.jsx(s, { fontSize: "small" });
  return e.jsxs("div", { style: { padding: "16px" }, children: [e.jsxs(t.Breadcrumbs, { "aria-label": "breadcrumb", sx: { marginBottom: 1, marginTop: 1, mx: 4 }, separator: g, children: [e.jsx(o.Link, { to: "/", style: { textDecoration: "none" }, children: e.jsx(t.Typography, { sx: { fontSize: "15px", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: n.t("home") }) }), e.jsx(o.Link, { to: "/orders", style: { textDecoration: "none" }, children: e.jsx(t.Typography, { sx: { fontSize: "13px", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: n.t("invoices") }) }), e.jsx(t.Typography, { sx: { fontSize: "13px" }, color: "textPrimary", children: n.t("invoice_details") })] }), e.jsx(t.Typography, { sx: { color: "var(--primary-color)", mx: 4, fontWeight: "600" }, variant: "h4", component: "div", children: n.t("invoice_details") }), e.jsxs(t.Box, { sx: { display: "flex", alignItems: "center", mt: 2, mb: 3, mx: 4 }, children: [e.jsx(t.Box, { sx: { width: "5vw", height: "3px", backgroundColor: "red" } }), e.jsx(t.Box, { sx: { width: "8vw", height: "3px", backgroundColor: "#01abae" } }), e.jsx(t.Box, { sx: { width: "75vw", height: "1px", backgroundColor: "#eee" } })] }), u && e.jsx(t.Typography, { variant: "h5", style: { textAlign: "center" }, children: n.t("fetching_invoice_data") }), l && !u && e.jsxs("div", { style: { marginBottom: "32px" }, children: [m && e.jsxs(t.Paper, { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "2px", borderRadius: "8px", padding: "16px", width: "70%", background: "#eee" }, children: [e.jsx(t.Typography, { sx: { color: "var(--primary-color)", fontWeight: "700" }, variant: "h5", gutterBottom: true, children: n.t("invoice_data") }), e.jsxs(t.Typography, { sx: { my: 1, fontWeight: "650" }, children: [" ", n.t("invoice_num"), ": ", l.invoice.invoice_number] }), e.jsxs(t.Typography, { sx: { fontWeight: "650" }, children: [" ", n.t("invoice_date"), ":", " ", y(l.invoice.invoice_date)] }), e.jsxs(t.Typography, { sx: { my: 1, fontWeight: "650" }, children: [" ", n.t("total"), ":", " ", l.invoice.total_price.toLocaleString(), " ", n.t("currency")] }), e.jsxs(t.Typography, { sx: { fontWeight: "650" }, children: [n.t("pay_method"), " : ", n.t("cash")] }), e.jsxs(t.Typography, { sx: { fontWeight: "650" }, children: [n.t("discount"), ":", " ", l.invoice.discount.toLocaleString(), " ", n.t("currency")] })] }), p && e.jsxs(t.Paper, { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "2px", borderRadius: "8px", padding: "16px", width: "30%", background: "#eee" }, children: [e.jsx(t.Typography, { sx: { color: "var(--primary-color)", fontWeight: "700" }, variant: "h5", gutterBottom: true, children: n.t("invoice_data") }), e.jsxs(t.Typography, { variant: "body1", sx: { my: 1, fontWeight: "650" }, children: [" ", n.t("invoice_num"), ": ", l.invoice.invoice_number] }), e.jsxs(t.Typography, { variant: "body1", sx: { fontWeight: "650" }, children: [" ", n.t("invoice_date"), ":", " ", y(l.invoice.invoice_date)] }), e.jsxs(t.Typography, { variant: "body1", sx: { my: 1, fontWeight: "650" }, children: [" ", n.t("total"), ":", " ", l.invoice.total_price.toLocaleString(), " ", n.t("currency")] }), e.jsxs(t.Typography, { variant: "body1", sx: { fontWeight: "650" }, children: [n.t("pay_method"), " : ", n.t("cash")] }), e.jsxs(t.Typography, { variant: "body1", sx: { fontWeight: "650" }, children: [n.t("discount"), ":", " ", l.invoice.discount.toLocaleString(), " ", n.t("currency")] })] }), e.jsx(t.Typography, { sx: { color: "var(--primary-color)", mx: 4, mt: 8, mb: 2, fontWeight: "600" }, variant: "h5", gutterBottom: true, children: n.t("product-details") }), e.jsx(t.TableContainer, { component: t.Paper, children: e.jsxs(t.Table, { children: [e.jsx(t.TableHead, { children: e.jsxs(t.TableRow, { children: [e.jsx(t.TableCell, { children: n.t("product_id") }), e.jsx(t.TableCell, { children: n.t("product_name") }), e.jsx(t.TableCell, { children: n.t("price") }), e.jsx(t.TableCell, { children: n.t("quantity") }), e.jsx(t.TableCell, { children: n.t("total") })] }) }), e.jsx(t.TableBody, { children: l.invoiceProduct.map((r2, i2) => e.jsxs(t.TableRow, { style: { backgroundColor: i2 % 2 == 0 ? "#f5f5f5" : "#e0e0e0" }, children: [e.jsx(t.TableCell, { children: r2.product_code }), e.jsx(t.TableCell, { children: r2.product_name }), e.jsxs(t.TableCell, { children: [r2.product_price.toLocaleString(), " ", n.t("currency")] }), e.jsx(t.TableCell, { children: r2.qty }), e.jsxs(t.TableCell, { children: [r2.product_total_price.toLocaleString(), " ", n.t("currency")] })] }, i2)) })] }) })] })] });
};
