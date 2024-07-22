import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Breadcrumbs,
  Typography,
  Stack,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { productsImageUrl } from "../../config";
import { useTranslation } from "react-i18next";
import axios from "axios";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import CategoryList from "../components/categories/CategoryList";
import { Container } from "../elements/StyledComponents";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import PrintableComponent from "../components/PrintableComponent";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BuildYourPc = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [prices, setPrices] = useState({});
  const [selectedImagesArray, setSelectedImagesArray] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [currentTime, setCurrentTime] = useState("");
  const [quantities, setQuantities] = useState({});
  const [compatibleMotherBoards, setCompatibleMotherBoards] = useState([]);
  const contentRef = useRef(null);
  const printableComponentRef = useRef();

  const [pdfDisplayStyle, setPdfDisplayStyle] = useState({
    position: "absolute",
    top: "-9999px",
    left: "-9999px",
  });

  const handlePrint = useReactToPrint({
    content: () => printableComponentRef.current,
  });

  const downloadPdf = () => {
    setPdfDisplayStyle({
      position: "static",
      // @ts-ignore
      display: "none",
    });

    const input = document.getElementById("pdf-content");

    const elementsWithLetterSpacing = input.querySelectorAll("*");
    elementsWithLetterSpacing.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.getPropertyValue("letter-spacing") !== "normal") {
        // @ts-ignore
        el.style.letterSpacing = "normal";
      }
    });

    html2canvas(input, {
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight, // ارتفاع الصفحة
      scale: 2, // زيادة حجم الصورة لتغطية المحتوى بشكل أفضل
      logging: true,
      width: input.scrollWidth, // تعيين عرض الـ html2canvas
    }).then((canvas) => {
      input.style.textAlign = "";

      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("build-your-pc.pdf");

      window.open(pdf.path.toString());
    });
  };

  const apiUrl = "https://fanaristore.sama-tek.com/api/build-your-pc";

  useEffect(() => {
    const cachedData = localStorage.getItem("buildYourPcData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("buildYourPcData", JSON.stringify(data));
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let newTotalPrice = 0;
    for (const key in prices) {
      if (prices.hasOwnProperty(key)) {
        newTotalPrice += prices[key] * (quantities[key] || 1);
      }
    }
    setTotalPrice(newTotalPrice);
  }, [prices, quantities]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getCompatibleMotherBoards = (socket) => {
    return data.motherBoards.filter((mb) => mb.socket === socket);
  };

  const handleSelectionChange = (category, newValue) => {
    setSelectedItems((prev) => ({ ...prev, [category]: newValue }));
    setPrices((prev) => ({
      ...prev,
      [category]: newValue ? newValue.price : 0,
    }));
    setSelectedImagesArray((prev) => ({
      ...prev,
      [category]: newValue ? newValue.image : null,
    }));
    setQuantities((prev) => ({
      ...prev,
      [category]: 1,
    }));

    if (category === "processors") {
      const selectedProcessorSocket = newValue ? newValue.socket : null;
      const compatibleMotherBoards = selectedProcessorSocket
        ? getCompatibleMotherBoards(selectedProcessorSocket)
        : [];
      setCompatibleMotherBoards(compatibleMotherBoards);

      const selectedMotherBoard =
        compatibleMotherBoards.length > 0 ? compatibleMotherBoards[0] : null;

      setSelectedItems((prev) => ({
        ...prev,
        motherBoards: selectedMotherBoard,
      }));
      setPrices((prev) => ({
        ...prev,
        motherBoards: selectedMotherBoard ? selectedMotherBoard.price : 0,
      }));
      setSelectedImagesArray((prev) => ({
        ...prev,
        motherBoards: selectedMotherBoard ? selectedMotherBoard.image : null,
      }));
      setQuantities((prev) => ({ ...prev, motherBoards: 1 }));
    }
  };

  if (!data) {
    return (
      <Container>
        <Typography
          sx={{
            color: "var(--primary-color)",
            fontWeight: "650",
            my: "20px",
          }}
          variant="h4"
          component="div"
        >
          {t("build_pc")}
        </Typography>
        <Typography sx={{ mt: 10, fontSize: "1.5rem", fontWeight: "650" }}>
          {t("reload")}
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  const breadcrumbSeparator =
    i18n.language === "ar" ? (
      <NavigateNextIcon style={{ transform: "rotate(180deg)" }} />
    ) : (
      <NavigateNextIcon fontSize="small" />
    );

  const getOptionStyle = (productType) => {
    switch (productType) {
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

  return (
    <Container ref={contentRef}>
      <Stack direction="row" spacing={3} sx={{ width: "100%" }}>
        <Box
          sx={{
            my: "20px",
            mr: { md: 2 },
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "20%",
            display: { xs: "none", md: "block" },
          }}
        >
          <CategoryList />
        </Box>
        <Box
          sx={{
            maxWidth: "100%",
            "@media (min-width:800px)": {
              maxWidth: "80%",
            },
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginBottom: 1, marginTop: 3, mx: 0 }}
            separator={breadcrumbSeparator}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "var(--primary-color)",
                  "&:hover": { color: "red" },
                }}
              >
                {t("home")}
              </Typography>
            </Link>
            <Typography sx={{ fontSize: "12px" }} color="textPrimary">
              {t("build_pc")}
            </Typography>
          </Breadcrumbs>
          <Box sx={{ maxWidth: "80%" }} ref={contentRef}>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontWeight: "650",
                my: "20px",
              }}
              variant="h4"
              component="div"
            >
              {t("build_pc")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Box
                sx={{ width: "5vw", height: "2px", backgroundColor: "red" }}
              />
              <Box
                sx={{
                  width: "8vw",
                  height: "2px",
                  backgroundColor: "#01abae",
                }}
              />
              <Box
                sx={{
                  width: "75vw",
                  height: "1px",
                  backgroundColor: "#eee",
                }}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              {t("date")}: {currentDate} - {currentTime}
            </Typography>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        "@media (max-width:800px)": {
                          width: "30%",
                        },
                      }}
                    >
                      {t("category")}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "55%",
                        textAlign: "center",
                        "@media (max-width:600px)": {
                          width: "60%",
                        },
                      }}
                    >
                      {t("product")}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "12%",
                        textAlign: "center",
                        "@media (max-width:1200px)": {
                          width: "0%",
                        },
                      }}
                    >
                      {t("quantity")}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        "@media (max-width:200px)": {
                          width: "10%",
                        },
                      }}
                    >
                      {t("price")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(data).map((category) => (
                    <TableRow key={category}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ textAlign: "center" }}
                      >
                        {t(category)}
                      </TableCell>
                      <TableCell>
                        {category === "motherBoards" ? (
                          <Autocomplete
                            key={`${category}-autocomplete`} // Ensure a unique key
                            options={compatibleMotherBoards}
                            getOptionLabel={(option) => option.product_name}
                            value={selectedItems[category] || null}
                            onChange={(event, newValue) =>
                              handleSelectionChange(category, newValue)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={t(category)}
                                variant="outlined"
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment:
                                    data[category].length === 0 &&
                                    !selectedItems[category] ? (
                                      <Typography
                                        variant="body2"
                                        sx={{ color: "red" }}
                                      >
                                        {t("not_select")}
                                      </Typography>
                                    ) : null,
                                }}
                                InputLabelProps={{
                                  ...params.InputLabelProps,
                                  shrink: true,
                                }}
                              />
                            )}
                          />
                        ) : (
                          <Autocomplete
                            key={`${category}-autocomplete`} // Ensure a unique key
                            options={data[category]}
                            getOptionLabel={(option) => option.product_name}
                            value={selectedItems[category] || null}
                            onChange={(event, newValue) =>
                              handleSelectionChange(category, newValue)
                            }
                            renderOption={(props, option) => {
                              const { key, ...otherProps } = props;
                              return (
                                <li
                                  key={option.product_name}
                                  style={getOptionStyle(option.product_type)}
                                  {...otherProps}
                                >
                                  {option.product_name}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label={t(category)} />
                            )}
                          />
                        )}
                      </TableCell>

                      <TableCell>
                        <TextField
                          type="number"
                          variant="outlined"
                          size="small"
                          value={quantities[category] || 1}
                          InputProps={{ inputProps: { min: 1 } }}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            setQuantities({
                              ...quantities,
                              [category]: newQuantity,
                            });
                            setPrices((prev) => ({
                              ...prev,
                              [category]:
                                selectedItems[category]?.price * newQuantity ||
                                0,
                            }));
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {selectedItems[category]?.price
                          ? `${(
                              selectedItems[category].price *
                              (quantities[category] || 1)
                            ).toLocaleString()} ${t("currency")}`
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <Stack direction="row" spacing={3} justifyContent="space-between">
              <Typography variant="h4">{t("total_price")}:</Typography>
              <Typography variant="h4">
                {totalPrice.toLocaleString()} {t("currency")}
              </Typography>
            </Stack>
            <Box
              sx={{
                marginTop: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {t("images")}
              </Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {Object.keys(selectedImagesArray).map(
                  (category) =>
                    selectedImagesArray[category] && (
                      <img
                        key={category}
                        src={`${productsImageUrl}/${selectedImagesArray[category]}`}
                        alt={selectedItems[category]?.product_name}
                        style={{ width: "100%", maxWidth: 200 }}
                      />
                    )
                )}
              </Box>
            </Box>
          </Box>
          {/* Print button should trigger the printing of the PrintableComponent */}
          <Button
            sx={{ bgcolor: "var(--primary-color)", mx: 2, mt: 4 }}
            variant="contained"
            onClick={handlePrint}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {t("print")}
              <Box>
                <PrintIcon sx={{ alignItems: "center", mx: 1 }} />
              </Box>
            </Box>
          </Button>

          {/* Download PDF button */}
          <Button
            sx={{ bgcolor: "var(--primary-color)", mx: 2, mt: 4 }}
            variant="contained"
            onClick={downloadPdf}
          >
            <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
              {t("download")} PDF
              <Box>
                <DownloadIcon sx={{ alignItems: "center", mx: 1 }} />
              </Box>
            </Box>
          </Button>
        </Box>
      </Stack>

      {/* PrintableComponent that will be hidden from view */}
      <div
        id="pdf-content"
        // @ts-ignore
        style={pdfDisplayStyle}
      >
        <PrintableComponent
          ref={printableComponentRef}
          // @ts-ignore
          selectedItems={selectedItems}
          prices={prices}
          totalPrice={totalPrice}
        />
      </div>
    </Container>
  );
};

export default BuildYourPc;
