"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("axios"), a = require("../main.cjs"), t = require("@mui/material"), s = require("i18next");
require("react-dom/client"), require("react-router-dom"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
exports.default = () => {
  const [n, o] = r.useState({ name: "", email: "", phone: "", address: "", governorate: "" }), [l, u] = r.useState({ currentPassword: "", newPassword: "", confirmPassword: "" }), [c, d] = r.useState(false), [m, x] = r.useState(false), h = ((e2) => {
    const r2 = document.cookie.split(";");
    for (let i2 = 0; i2 < r2.length; i2++) {
      const a2 = r2[i2].trim();
      if (a2.startsWith(e2 + "=")) return a2.substring(e2.length + 1);
    }
    return null;
  })("accessToken"), [j, p] = r.useState(localStorage.getItem("i18nextLng") || "ar");
  r.useEffect(() => {
    g();
  }, []);
  const g = async () => {
    try {
      d(true);
      const e2 = (await i.get("https://fanaristore.sama-tek.com/api/customer-data", { headers: { Authorization: `${a.tokenType} ${h}`, "Accept-Language": j } })).data.customerData;
      o(e2), d(false);
    } catch (e2) {
      console.error("حدث خطأ في جلب بيانات المستخدم:", e2), d(false);
    }
  }, q = (e2) => {
    const { name: r2, value: i2 } = e2.target;
    o((e3) => ({ ...e3, [r2]: i2 }));
  }, w = (e2) => {
    const { name: r2, value: i2 } = e2.target;
    u((e3) => ({ ...e3, [r2]: "" }));
  };
  return e.jsxs("div", { style: { maxWidth: "800px", margin: "0 auto", padding: "20px" }, children: [e.jsxs(t.Grid, { container: true, spacing: 2, children: [e.jsxs(t.Grid, { item: true, xs: 12, md: 6, children: [e.jsx("h2", { children: s.t("user_data") }), e.jsxs(t.Grid, { container: true, spacing: 2, children: [e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, label: s.t("name"), name: "name", value: n.name, onChange: q }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, label: s.t("email"), name: "email", value: n.email, onChange: q }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, label: s.t("phone"), name: "phone", value: n.phone, onChange: q }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, label: s.t("title"), name: "address", value: n.address, onChange: q }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, label: s.t("goverment"), name: "governorate", value: n.governorate, onChange: q }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.Button, { variant: "contained", color: "primary", onClick: async () => {
    try {
      d(true);
      const e2 = await i.post("https://fanaristore.sama-tek.com/api/edit-customer-data", n, { headers: { Authorization: `${a.tokenType} ${h}`, "Accept-Language": j } });
      console.log("تم تحديث بيانات المستخدم بنجاح:", e2.data), d(false), x(true);
    } catch (e2) {
      console.error("حدث خطأ في تحديث بيانات المستخدم:", e2), d(false);
    }
  }, disabled: c, children: c ? e.jsx(t.CircularProgress, { size: 24 }) : s.t("update") }) })] })] }), e.jsxs(t.Grid, { item: true, xs: 12, md: 6, children: [e.jsx("h2", { children: s.t("change_pass") }), e.jsxs(t.Grid, { container: true, spacing: 2, children: [e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, type: "password", label: s.t("current_pass"), name: "currentPassword", value: l.currentPassword, onChange: w }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, type: "password", label: s.t("new_pass"), name: "newPassword", value: l.newPassword, onChange: w }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.TextField, { fullWidth: true, type: "password", label: s.t("confirm_pass"), name: "confirmPassword", value: l.confirmPassword, onChange: w }) }), e.jsx(t.Grid, { item: true, xs: 12, children: e.jsx(t.Button, { variant: "contained", color: "primary", onClick: async () => {
    try {
      d(true);
      const e2 = await i.post("https://fanaristore.sama-tek.com/api/edit-customer-password", l, { headers: { Authorization: `${a.tokenType} ${h}`, "Accept-Language": j } });
      console.log("تم تحديث كلمة المرور بنجاح:", e2.data), d(false);
    } catch (e2) {
      console.error("حدث خطأ في تحديث كلمة المرور:", e2), d(false);
    }
  }, disabled: c, children: c ? e.jsx(t.CircularProgress, { size: 24 }) : s.t("update") }) })] })] })] }), e.jsx(t.Snackbar, { open: m, autoHideDuration: 6e3, onClose: () => x(false), message: s.t("customer_data_updated") })] });
};
