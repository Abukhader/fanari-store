import styled from "styled-components";
import { Box, TextField, Typography } from "@mui/material";

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
};

export const Container = styled(Box)`
  width: 95%;
  align-items: center;
  margin-inline: auto;
  margin-top: 10px;
  position: relative;
  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
    font-size: 20px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
    font-size: 20px;
  }
`;
