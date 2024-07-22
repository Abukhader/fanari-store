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
  Button,
  Box,
} from "@mui/material";
// @ts-ignore
import { Link } from "react-router-dom";
import {
  apiUrl,
  tokenType,
  productsImageUrl,
  brandsImageUrl,
} from "../../config";
import { t } from "i18next";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const storedToken = getCookie("accessToken");
        const language = localStorage.getItem("i18nextLng") || "ar";

        const headers = {
          Authorization: `${tokenType} ${storedToken}`,
          "Accept-Language": language,
        };

        const response = await axios.get(
          "https://fanaristore.sama-tek.com/api/invoices",
          { headers }
        );

        // استخدام تحميل البيانات بشكل تدفقي
        setInvoiceData(response.data.invoices);
        setLoading(false); // عند الانتهاء من تحميل البيانات
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        setLoading(false); // في حالة حدوث خطأ أثناء التحميل
      }
    };

    fetchInvoiceData();
  }, []);

  return (
    <div>
      <Typography
        sx={{ color: "var(--primary-color)", mx: 4, mt: 4, fontWeight: "600" }}
        variant="h4"
        component="div"
      >
        {t("invoice_data")}
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
      {!loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("invoice_num")}</TableCell>
                <TableCell>{t("pay_method")}</TableCell>
                <TableCell>{t("total")}</TableCell>
                <TableCell>{t("invoice_date")}</TableCell>
                <TableCell>{t("details")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.map((invoice, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#e0e0e0",
                  }}
                >
                  <TableCell>{invoice.invoice_number}</TableCell>
                  <TableCell>{t("cash")}</TableCell>
                  <TableCell>
                    {invoice.total_price.toLocaleString()} {t("currency")}
                  </TableCell>
                  <TableCell>{formatDate(invoice.invoice_date)}</TableCell>
                  <TableCell>
                    <Link to={`/invoice/${invoice.id}`}>
                      <Button variant="contained" color="primary">
                        {t("details")}
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default InvoicePage;
