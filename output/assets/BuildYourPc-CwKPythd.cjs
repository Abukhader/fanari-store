"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), t = require("@mui/material"), i = require("@mui/material/Autocomplete/index.js"), a = require("../main.cjs"), o = require("react-i18next"), s = require("axios"), n = require("@mui/icons-material/NavigateNext.js"), l = require("react-router-dom"), c = require("./CategoryList-Di9rZZyD.cjs"), d = require("./StyledComponents-C-TsUuuN.cjs"), u = require("@mui/icons-material/Print.js"), x = require("@mui/icons-material/Download.js"), m = require("jspdf"), h = require("html2canvas");
require("react-dom/client"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
exports.default = () => {
  const { t: p, i18n: g } = o.useTranslation(), [j, y] = r.useState(null), [b, w] = r.useState({}), [f, q] = r.useState({}), [S, v] = r.useState({}), [B, C] = r.useState(0), [T, k] = r.useState((/* @__PURE__ */ new Date()).toLocaleDateString()), [D, P] = r.useState(""), [I, A] = r.useState({}), W = r.useRef(null);
  r.useEffect(() => {
    const e2 = localStorage.getItem("buildYourPcData");
    e2 ? y(JSON.parse(e2)) : _();
  }, []), r.useEffect(() => {
    j && localStorage.setItem("buildYourPcData", JSON.stringify(j));
  }, [j]);
  const _ = async () => {
    try {
      const e2 = await s.get("https://fanaristore.sama-tek.com/api/build-your-pc");
      y(e2.data);
    } catch (e2) {
      console.error("Error fetching data:", e2);
    }
  };
  r.useEffect(() => {
    let e2 = 0;
    for (const r2 in f) f.hasOwnProperty(r2) && (e2 += f[r2] * (I[r2] || 1));
    C(e2);
  }, [f, I]), r.useEffect(() => {
    const e2 = setInterval(() => {
      const e3 = /* @__PURE__ */ new Date(), r2 = `${e3.getHours()}:${e3.getMinutes()}:${e3.getSeconds()}`;
      P(r2);
    }, 1e3);
    return () => clearInterval(e2);
  }, []);
  if (!j) return e.jsxs(d.Container, { children: [e.jsx(t.Typography, { sx: { color: "var(--primary-color)", fontWeight: "650", my: "20px" }, variant: "h4", component: "div", children: p("build_pc") }), e.jsx(t.Typography, { sx: { mt: 10, fontSize: "1.5rem", fontWeight: "650" }, children: p("reload") }), e.jsx(t.CircularProgress, {})] });
  const E = "ar" === g.language ? e.jsx(n, { style: { transform: "rotate(180deg)" } }) : e.jsx(n, { fontSize: "small" }), R = (e2) => {
    switch (e2) {
      case "DDR4":
        return { color: "blue" };
      case "DDR3":
        return { color: "green" };
      case "DDR2":
        return { color: "red" };
      default:
        return { color: "black" };
    }
  };
  return e.jsx(d.Container, { ref: W, children: e.jsxs(t.Stack, { direction: "row", spacing: 3, sx: { width: "100%" }, children: [e.jsx(t.Box, { sx: { my: "20px", mr: { md: 2 }, flexGrow: 0, flexShrink: 0, flexBasis: "20%", display: { xs: "none", md: "block" } }, children: e.jsx(c.CategoryList, {}) }), e.jsxs(t.Box, { sx: { maxWidth: "100%", "@media (min-width:800px)": { maxWidth: "80%" } }, children: [e.jsxs(t.Breadcrumbs, { "aria-label": "breadcrumb", sx: { marginBottom: 1, marginTop: 3, mx: 0 }, separator: E, children: [e.jsx(l.Link, { to: "/", style: { textDecoration: "none" }, children: e.jsx(t.Typography, { sx: { fontSize: "12px", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: p("home") }) }), e.jsx(t.Typography, { sx: { fontSize: "12px" }, color: "textPrimary", children: p("build_pc") })] }), e.jsxs(t.Box, { sx: { maxWidth: "80%" }, ref: W, id: "pdf-content", children: [e.jsx(t.Typography, { sx: { color: "var(--primary-color)", fontWeight: "650", my: "20px" }, variant: "h4", component: "div", children: p("build_pc") }), e.jsxs(t.Box, { sx: { display: "flex", alignItems: "center", my: 2 }, children: [e.jsx(t.Box, { sx: { width: "5vw", height: "2px", backgroundColor: "red" } }), e.jsx(t.Box, { sx: { width: "8vw", height: "2px", backgroundColor: "#01abae" } }), e.jsx(t.Box, { sx: { width: "75vw", height: "1px", backgroundColor: "#eee" } })] }), e.jsxs(t.Typography, { variant: "subtitle1", sx: { marginBottom: 1 }, children: [p("date"), ": ", T, " - ", D] }), e.jsx(t.TableContainer, { component: t.Paper, sx: { marginBottom: 2 }, children: e.jsxs(t.Table, { children: [e.jsx(t.TableHead, { children: e.jsxs(t.TableRow, { children: [e.jsx(t.TableCell, { sx: { width: "20%", textAlign: "center", "@media (max-width:800px)": { width: "30%" } }, children: p("category") }), e.jsx(t.TableCell, { sx: { width: "55%", textAlign: "center", "@media (max-width:600px)": { width: "60%" } }, children: p("product") }), e.jsx(t.TableCell, { sx: { width: "12%", textAlign: "center", "@media (max-width:1200px)": { width: "0%" } }, children: p("quantity") }), e.jsx(t.TableCell, { sx: { width: "15%", textAlign: "center", "@media (max-width:200px)": { width: "10%" } }, children: p("price") })] }) }), e.jsx(t.TableBody, { children: Object.keys(j).map((r2) => {
    var _a;
    return e.jsxs(t.TableRow, { children: [e.jsx(t.TableCell, { component: "th", scope: "row", sx: { textAlign: "center" }, children: p(r2) }), e.jsx(t.TableCell, { children: e.jsx(i, { options: j[r2].length > 0 ? j[r2] : [{ product_name: p("no_data_available") }], getOptionLabel: (e2) => e2.product_name, onChange: (e2, t2) => ((e3, r3) => {
      if ("motherBoards" !== e3 && (w((t3) => ({ ...t3, [e3]: r3 })), q((t3) => ({ ...t3, [e3]: r3 ? r3.price : 0 })), v((t3) => ({ ...t3, [e3]: r3 ? r3.image : null })), A((r4) => ({ ...r4, [e3]: 1 })), "processors" === e3)) {
        const e4 = r3 ? r3.socket : null, t3 = j.motherBoards.filter((r4) => r4.socket === e4), i2 = t3.length > 0 ? t3[0] : null;
        w((e5) => ({ ...e5, motherBoards: i2 })), q((e5) => ({ ...e5, motherBoards: i2 ? i2.price : 0 })), v((e5) => ({ ...e5, motherBoards: i2 ? i2.image : null })), A((e5) => ({ ...e5, motherBoards: 1 }));
      }
    })(r2, t2), renderInput: (i2) => e.jsx(t.TextField, { ...i2, label: p(r2), variant: "outlined", disabled: "motherBoards" === r2 || "processors" === r2 }), value: b[r2] || null, renderOption: (r3, t2) => {
      const { key: i2, ...a2 } = r3;
      return e.jsx("li", { style: R(t2.product_type), ...a2, children: t2.product_name }, t2.product_name);
    } }) }), e.jsx(t.TableCell, { children: e.jsx(t.TextField, { type: "number", variant: "outlined", size: "small", value: I[r2] || 1, InputProps: { inputProps: { min: 1 } }, onChange: (e2) => {
      const t2 = parseInt(e2.target.value);
      A({ ...I, [r2]: t2 }), q((e3) => {
        var _a2;
        return { ...e3, [r2]: ((_a2 = b[r2]) == null ? void 0 : _a2.price) * t2 || 0 };
      });
    } }) }), e.jsx(t.TableCell, { sx: { textAlign: "center" }, children: ((_a = b[r2]) == null ? void 0 : _a.price) ? `${(b[r2].price * (I[r2] || 1)).toLocaleString()} ${p("currency")}` : "" })] }, r2);
  }) })] }) }), e.jsx(t.Divider, {}), e.jsxs(t.Stack, { direction: "row", spacing: 3, justifyContent: "space-between", children: [e.jsxs(t.Typography, { variant: "h4", children: [p("total_price"), ":"] }), e.jsxs(t.Typography, { variant: "h4", children: [B.toLocaleString(), " ", p("currency")] })] }), e.jsxs(t.Box, { sx: { marginTop: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: "0 3px 6px rgba(0,0,0,0.1)", padding: 2 }, children: [e.jsx(t.Typography, { variant: "h6", gutterBottom: true, children: p("images") }), e.jsx(t.Divider, { sx: { marginBottom: 1 } }), e.jsx(t.Box, { sx: { display: "flex", flexWrap: "wrap", gap: 1 }, children: Object.keys(S).map((r2) => {
    var _a;
    return S[r2] && e.jsx("img", { src: `${a.productsImageUrl}/${S[r2]}`, alt: (_a = b[r2]) == null ? void 0 : _a.product_name, style: { width: "100%", maxWidth: 200 } }, r2);
  }) })] })] }), e.jsxs(t.Stack, { direction: "row", spacing: 3, sx: { my: 6 }, children: [e.jsx(t.Button, { sx: { bgcolor: "var(--primary-color)" }, variant: "contained", onClick: () => {
    const e2 = document.getElementById("pdf-content");
    e2.querySelectorAll("*").forEach((e3) => {
      "normal" !== window.getComputedStyle(e3).getPropertyValue("letter-spacing") && (e3.style.letterSpacing = "normal");
    }), h(e2, { letterRendering: 1, useCORS: true, scrollY: -window.scrollY, windowWidth: document.documentElement.offsetWidth, autoPaging: true }).then((r2) => {
      e2.style.textAlign = "";
      const t2 = new m(), i2 = r2.toDataURL("image/png"), a2 = t2.getImageProperties(i2), o2 = t2.internal.pageSize.getWidth(), s2 = a2.height * o2 / a2.width;
      t2.addImage(i2, "PNG", 0, 0, o2, s2 + -160), t2.setFont("helvetica"), t2.setFontSize(12), t2.setTextColor("#0055a3"), t2.text("Fanari Store © - Phone: +963 21 5075 - Mobile: +963 944 771160 - Email Address: sales@fanari-store.com", 2, 15), t2.save("build-your-pc.pdf");
    });
  }, children: e.jsxs(t.Box, { sx: { display: "flex", alignItems: "center", mx: 1 }, children: [p("download"), " PDF", e.jsx(t.Box, { children: e.jsx(x, { sx: { alignItems: "center", mx: 1 } }) })] }) }), e.jsx(t.Button, { sx: { bgcolor: "var(--primary-color)" }, variant: "contained", onClick: () => window.print(), children: e.jsxs(t.Box, { sx: { display: "flex", alignItems: "center" }, children: [p("print"), e.jsx(t.Box, { children: e.jsx(u, { sx: { alignItems: "center", mx: 1 } }) })] }) })] })] })] }) });
};
