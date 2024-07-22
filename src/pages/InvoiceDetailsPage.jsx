import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Breadcrumbs,
  useMediaQuery,
} from "@mui/material";
// @ts-ignore
import { Link, useParams } from "react-router-dom"; // استيراد مكون useParams من مكتبة React Router DOM
import {
  apiUrl,
  tokenType,
  productsImageUrl,
  brandsImageUrl,
} from "../../config";
import { t } from "i18next";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const InvoiceDetailsPage = () => {
  const { id } = useParams(); // استخدام مكون useParams للوصول إلى قيمة ID من عنوان URL

  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = localStorage.getItem("i18nextLng") || "ar";
  const matches = useMediaQuery("(max-width:800px)");
  const wideScreenMatches = useMediaQuery("(min-width:800px)");

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        setLoading(true);
        const storedToken = getCookie("accessToken");
        const headers = {
          Authorization: `${tokenType} ${storedToken}`,
          "Accept-Language": language,
        };
        const response = await axios.get(
          `https://fanaristore.sama-tek.com/api/show-invoice/${id}`,
          { headers }
        );
        setInvoiceDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const formatDate = (date) => {
    return date.split("T")[0];
  };

  const breadcrumbSeparator =
    language === "ar" ? (
      <NavigateNextIcon
        style={{ transform: "rotate(180deg)" }}
        fontSize="small"
      />
    ) : (
      <NavigateNextIcon fontSize="small" />
    );

  return (
    <div style={{ padding: "16px" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: 1, marginTop: 1, mx: 4 }}
        separator={breadcrumbSeparator}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: "15px",
              color: "var(--primary-color)",
              "&:hover": { color: "red" },
            }}
          >
            {t("home")}
          </Typography>
        </Link>

        <Link to={`/orders`} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: "13px",
              color: "var(--primary-color)",
              "&:hover": { color: "red" },
            }}
          >
            {t("invoices")}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: "13px" }} color="textPrimary">
          {t("invoice_details")}
        </Typography>
      </Breadcrumbs>

      <Typography
        sx={{ color: "var(--primary-color)", mx: 4, fontWeight: "600" }}
        variant="h4"
        component="div"
      >
        {t("invoice_details")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 3, mx: 4 }}>
        <Box sx={{ width: "5vw", height: "3px", backgroundColor: "red" }} />
        <Box sx={{ width: "8vw", height: "3px", backgroundColor: "#01abae" }} />
        <Box sx={{ width: "75vw", height: "1px", backgroundColor: "#eee" }} />
      </Box>
      {loading && (
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {t("fetching_invoice_data")}
        </Typography>
      )}
      {invoiceDetails && !loading && (
        <div style={{ marginBottom: "32px" }}>
          {matches && (
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                border: "2px",
                borderRadius: "8px",
                padding: "16px",
                width: "70%",
                background: "#eee",
              }}
            >
              <Typography
                sx={{ color: "var(--primary-color)", fontWeight: "700" }}
                variant="h5"
                gutterBottom
              >
                {t("invoice_data")}
              </Typography>
              <Typography sx={{ my: 1, fontWeight: "650" }}>
                {" "}
                {t("invoice_num")}: {invoiceDetails.invoice.invoice_number}
              </Typography>
              <Typography sx={{ fontWeight: "650" }}>
                {" "}
                {t("invoice_date")}:{" "}
                {formatDate(invoiceDetails.invoice.invoice_date)}
              </Typography>
              <Typography sx={{ my: 1, fontWeight: "650" }}>
                {" "}
                {t("total")}:{" "}
                {invoiceDetails.invoice.total_price.toLocaleString()}{" "}
                {t("currency")}
              </Typography>
              <Typography sx={{ fontWeight: "650" }}>
                {t("pay_method")} : {t("cash")}
              </Typography>
              <Typography sx={{ fontWeight: "650" }}>
                {t("discount")}:{" "}
                {invoiceDetails.invoice.discount.toLocaleString()}{" "}
                {t("currency")}
              </Typography>
            </Paper>
          )}
          {wideScreenMatches && (
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                border: "2px",
                borderRadius: "8px",
                padding: "16px",
                width: "30%",
                background: "#eee",
              }}
            >
              <Typography
                sx={{ color: "var(--primary-color)", fontWeight: "700" }}
                variant="h5"
                gutterBottom
              >
                {t("invoice_data")}
              </Typography>
              <Typography variant="body1" sx={{ my: 1, fontWeight: "650" }}>
                {" "}
                {t("invoice_num")}: {invoiceDetails.invoice.invoice_number}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "650" }}>
                {" "}
                {t("invoice_date")}:{" "}
                {formatDate(invoiceDetails.invoice.invoice_date)}
              </Typography>
              <Typography variant="body1" sx={{ my: 1, fontWeight: "650" }}>
                {" "}
                {t("total")}:{" "}
                {invoiceDetails.invoice.total_price.toLocaleString()}{" "}
                {t("currency")}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "650" }}>
                {t("pay_method")} : {t("cash")}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "650" }}>
                {t("discount")}:{" "}
                {invoiceDetails.invoice.discount.toLocaleString()}{" "}
                {t("currency")}
              </Typography>
            </Paper>
          )}

          <Typography
            sx={{
              color: "var(--primary-color)",
              mx: 4,
              mt: 8,
              mb: 2,
              fontWeight: "600",
            }}
            variant="h5"
            gutterBottom
          >
            {t("product-details")}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("product_id")}</TableCell>
                  <TableCell>{t("product_name")}</TableCell>
                  <TableCell>{t("price")}</TableCell>
                  <TableCell>{t("quantity")}</TableCell>
                  <TableCell>{t("total")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceDetails.invoiceProduct.map((product, index) => (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                    }}
                  >
                    <TableCell>{product.product_code}</TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>
                      {product.product_price.toLocaleString()} {t("currency")}
                    </TableCell>
                    <TableCell>{product.qty}</TableCell>
                    <TableCell>
                      {product.product_total_price.toLocaleString()}{" "}
                      {t("currency")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailsPage;
