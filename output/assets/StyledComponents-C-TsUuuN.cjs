"use strict";
const i = "480px", t = "768px", e = require("styled-components")(require("@mui/material").Box)`
  width: 95%;
  align-items: center;
  margin-inline: auto;
  margin-top: 10px;
  position: relative;
  @media (max-width: ${t}) {
    width: 90%;
    font-size: 20px;
  }
  @media (max-width: ${i}) {
    width: 95%;
    font-size: 20px;
  }
`;
exports.Container = e;
