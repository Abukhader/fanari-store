"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), a = require("@mui/material");
exports.default = ({ brands: t, language: n, handleBrandClick: o }) => {
  const [i, s] = r.useState("ar" === n), [c, l] = r.useState(0);
  return r.useEffect(() => {
    s("ar" === n);
    const e2 = setInterval(() => {
      l((e3) => e3 === t.length - 1 ? 0 : e3 + 1);
    }, 5e3);
    return () => clearInterval(e2);
  }, [n, t]), e.jsx(a.Box, { sx: { display: "flex", cursor: "pointer", overflow: "hidden", width: "100%", whiteSpace: "nowrap", position: "relative", scrollBehavior: "smooth", "&::-webkit-scrollbar": { display: "none" }, mb: 5 }, children: t.map((r2, t2) => e.jsx(a.Box, { sx: { minWidth: 130, height: 100, backgroundImage: `url(${r2.image})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: 1, transform: `translateX(${"ar" === n ? 100 * c : 100 * -c}%)`, transition: "transform 0.5s ease-in-out", display: "inline-block" }, onClick: () => o(r2.name), children: e.jsx(a.Box, { sx: { height: 100, backgroundImage: `url(${r2.image})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: 1 } }) }, r2.id)) });
};
