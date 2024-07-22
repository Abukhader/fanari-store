"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("axios"), a = require("@mui/material"), t = require("react-router-dom"), l = require("../main.cjs"), s = require("i18next");
require("react-dom/client"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
exports.default = () => {
  const [n, o] = r.useState([]), [c, u] = r.useState(true);
  return r.useEffect(() => {
    (async () => {
      try {
        const e2 = ((e3) => {
          const r3 = document.cookie.split(";");
          for (let i2 = 0; i2 < r3.length; i2++) {
            const a3 = r3[i2].trim();
            if (a3.startsWith(e3 + "=")) return a3.substring(e3.length + 1);
          }
          return null;
        })("accessToken"), r2 = localStorage.getItem("i18nextLng") || "ar", a2 = { Authorization: `${l.tokenType} ${e2}`, "Accept-Language": r2 }, t2 = await i.get("https://fanaristore.sama-tek.com/api/invoices", { headers: a2 });
        o(t2.data.invoices), u(false);
      } catch (e2) {
        console.error("Error fetching invoice data:", e2), u(false);
      }
    })();
  }, []), e.jsxs("div", { children: [e.jsx(a.Typography, { sx: { color: "var(--primary-color)", mx: 4, mt: 4, fontWeight: "600" }, variant: "h4", component: "div", children: s.t("invoice_data") }), e.jsxs(a.Box, { sx: { display: "flex", alignItems: "center", mt: 2, mb: 3, mx: 4 }, children: [e.jsx(a.Box, { sx: { width: "5vw", height: "3px", backgroundColor: "red" } }), e.jsx(a.Box, { sx: { width: "8vw", height: "3px", backgroundColor: "#01abae" } }), e.jsx(a.Box, { sx: { width: "75vw", height: "1px", backgroundColor: "#eee" } })] }), c && e.jsx(a.Typography, { variant: "h5", style: { textAlign: "center" }, children: s.t("fetching_invoice_data") }), !c && e.jsx(a.TableContainer, { component: a.Paper, children: e.jsxs(a.Table, { children: [e.jsx(a.TableHead, { children: e.jsxs(a.TableRow, { children: [e.jsx(a.TableCell, { children: s.t("invoice_num") }), e.jsx(a.TableCell, { children: s.t("pay_method") }), e.jsx(a.TableCell, { children: s.t("total") }), e.jsx(a.TableCell, { children: s.t("invoice_date") }), e.jsx(a.TableCell, { children: s.t("details") })] }) }), e.jsx(a.TableBody, { children: n.map((r2, i2) => {
    return e.jsxs(a.TableRow, { sx: { backgroundColor: i2 % 2 == 0 ? "#fafafa" : "#e0e0e0" }, children: [e.jsx(a.TableCell, { children: r2.invoice_number }), e.jsx(a.TableCell, { children: s.t("cash") }), e.jsxs(a.TableCell, { children: [r2.total_price.toLocaleString(), " ", s.t("currency")] }), e.jsx(a.TableCell, { children: (l2 = r2.invoice_date, l2 ? l2.split("T")[0] : "") }), e.jsx(a.TableCell, { children: e.jsx(t.Link, { to: `/invoice/${r2.id}`, children: e.jsx(a.Button, { variant: "contained", color: "primary", children: s.t("details") }) }) })] }, i2);
    var l2;
  }) })] }) })] });
};
