"use strict";
const r = require("react/jsx-runtime"), e = require("react"), t = require("axios"), i = require("@mui/material"), a = require("@mui/icons-material/ArrowDropUp.js"), o = require("react-router-dom"), s = require("../main.cjs"), n = require("@mui/icons-material/ArrowDropDown.js");
exports.CategoryList = () => {
  const [c, l] = e.useState([]), [u, d] = e.useState({}), [m, p] = e.useState(localStorage.getItem("i18nextLng") || "ar"), x = o.useNavigate();
  e.useEffect(() => {
    t.get(`${s.apiUrl}categories?locale=${m}`).then((r2) => {
      l(r2.data[0]);
    }).catch((r2) => {
      console.error("حدث خطأ أثناء جلب التصنيفات!", r2);
    });
  }, [m]);
  const g = (e2) => c.filter((r2) => r2.parent_id === e2).map((e3) => {
    const t2 = c.some((r2) => r2.parent_id === e3.id), o2 = e3.translations.find((r2) => r2.locale === m);
    return r.jsxs("div", { children: [r.jsxs(i.ListItem, { button: true, onClick: () => {
      var r2;
      t2 ? (r2 = e3.id, d((e4) => ({ ...e4, [r2]: !e4[r2] }))) : x(`/products/${e3.category_url}`);
    }, sx: { color: "var(--primary-color)", display: "flex", alignItems: "center", width: "100%" }, children: [r.jsx(i.ListItemText, { primaryTypographyProps: { style: { fontSize: "11px", fontWeight: 650, marginRight: "8px", textAlign: "ar" === m ? "right" : "left" } }, primary: o2 ? o2.category_name.toUpperCase() : e3.category_name }), t2 ? u[e3.id] ? r.jsx(a, { sx: { color: "var(--primary-color)" } }) : r.jsx(n, { sx: { color: "var(--primary-color)" } }) : null] }), t2 && r.jsx(i.Collapse, { in: u[e3.id], timeout: "auto", unmountOnExit: true, children: r.jsx(i.List, { component: "div", disablePadding: true, children: g(e3.id) }) }), r.jsx(i.Divider, { sx: { width: "90%" } })] }, e3.id);
  });
  return r.jsx(i.List, { children: g(0) });
};
