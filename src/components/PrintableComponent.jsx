// @ts-ignore
import React, { forwardRef } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
// @ts-ignore
import Logo from "../images/fanariLogo.png";

const PrintableComponent = forwardRef(
  // @ts-ignore
  ({ selectedItems = {}, totalPrice = 0 }, ref) => {
    const { t, i18n } = useTranslation();

    const textDirection = i18n.language === "ar" ? "rtl" : "ltr";

    return (
      <div ref={ref} style={{ display: "block" }}>
        <TableContainer ref={ref} dir={textDirection}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "30%" }}>
              <Avatar
                alt={t("شعار_الموقع")}
                src={Logo}
                sx={{ width: "70px", height: "70px", mx: 8 }}
              />
            </Box>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                my: "10px",
                mx: "50px",
                color: "var(--primary-color)",
              }}
            >
              {t("fanari_store")}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                marginBottom: "2px",
                marginInline: 2,
                color: "var(--primary-color)",
              }}
            >
              {t("date")}: {new Date().toLocaleDateString()} -{" "}
              {new Date().toLocaleTimeString()}
            </Typography>
          </Stack>
          <Divider
            sx={{
              marginTop: "8px",
              marginBottom: "8px",
              backgroundColor: "var(--primary-color)",
              height: "3px",
            }}
          />

          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              my: "10px",
              mx: "50px",
              color: "var(--primary-color)",
            }}
          >
            {t("build_pc")}
          </Typography>
          <Divider />

          <Table>
            <TableBody>
              {Object.keys(selectedItems).map((category, index) => (
                <TableRow
                  key={category}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff", // تحديد الألوان للصفوف
                  }}
                >
                  <TableCell align="center">{t(category)}</TableCell>
                  <TableCell align="center">
                    {selectedItems[category]?.product_name}
                  </TableCell>
                  <TableCell align="center">
                    {selectedItems[category]?.price
                      ? `${selectedItems[category].price.toLocaleString()} ${t(
                          "currency"
                        )}`
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: "700" }} colSpan={2}>
                  {t("total_price")}:
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }}>
                  {totalPrice.toLocaleString()} {t("currency")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            bgcolor="var(--primary-color)"
            mt={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>
              &copy; {t("fanari")} - {t("phone")}: {t("no_1")} - {t("mobile")}:
              {t("no_2")} - {t("email")}: sales@fanari-store.com
            </Typography>
          </Box>
        </TableContainer>
      </div>
    );
  }
);

export default PrintableComponent;
