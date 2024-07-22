// @ts-ignore
import { Link } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Container = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  return (
    <Box
      component="div"
      display="flex"
      dir="rtl"
      alignItems="center"
      bgcolor="var(--primary-color)"
      mt="20px"
      flexDirection={isRtl ? "row-reverse" : "row"} // تغيير الاتجاه بناءً على اللغة
    >
      {children}
    </Box>
  );
};

const Right = ({ children }) => (
  <Box
    component="div"
    display="flex"
    flex={1}
    width="33.3%"
    flexDirection="column"
    padding="20px"
  >
    {children}
  </Box>
);

const Desc = ({ children }) => (
  <Typography
    variant="body1"
    component="div"
    sx={{
      margin: "40px 0px",
      color: "rgba(255, 255, 255, 0.8)",
    }}
  >
    {children}
  </Typography>
);

const SmallDesc = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  return (
    <Typography
      variant="body1"
      component="div"
      sx={{
        mx: "-15px",
        fontSize: "12px",
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: isRtl ? "right" : "left",
      }}
    >
      {children}
    </Typography>
  );
};

const SocialContainer = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <Box
      component="div"
      display="flex"
      marginTop="50px"
      sx={{ mx: isRtl ? 0 : 13 }}
    >
      {children}
    </Box>
  );
};

const SmallSocialContainer = ({ children }) => (
  <Box component="div" display="flex" marginTop="30px">
    {children}
  </Box>
);

const SocialIcon = ({ color, children }) => (
  <Box
    component="div"
    width="40px"
    height="40px"
    borderRadius="50px"
    color="white"
    sx={{
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "20px",
      cursor: "pointer",
    }}
  >
    {children}
  </Box>
);

const SmallSocialIcon = ({ color, children }) => (
  <Box
    component="div"
    width="50px"
    height="30px"
    borderRadius="50px"
    color="white"
    sx={{
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
      cursor: "pointer",
    }}
  >
    {children}
  </Box>
);

const Center = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <Box
      component="div"
      padding="20px"
      width="33.3%"
      sx={{
        direction: isRtl ? "rtl" : "ltr",
        textAlign: isRtl ? "right" : "center",
      }}
    >
      {children}
    </Box>
  );
};

const Title = ({ children }) => (
  <Typography
    variant="body1"
    component="div"
    sx={{
      marginBottom: "30px",
      color: "white",
    }}
  >
    {children}
  </Typography>
);
const LinkTitle = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <Typography
      variant="body1"
      component="div"
      sx={{
        marginBottom: "15px",
        color: "white",
        direction: "ltr",
        textAlign: isRtl ? "right" : "center",
      }}
    >
      {children}
    </Typography>
  );
};
const FanariTitle = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <Typography
      variant="body1"
      component="div"
      sx={{
        marginBottom: "30px",
        color: "white",
        textAlign: isRtl ? "right" : "center",
      }}
    >
      {children}
    </Typography>
  );
};

const SmallTitle = ({ children }) => (
  <Typography
    variant="body1"
    component="div"
    sx={{
      marginBottom: "30px",
      marginX: "auto",
      color: "white",
    }}
  >
    {children}
  </Typography>
);
const SmallFanariTitle = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <Typography
      variant="body1"
      component="div"
      sx={{
        marginBottom: "30px",
        marginX: "auto",
        color: "white",
        textAlign: isRtl ? "right" : "center",
      }}
    >
      {children}
    </Typography>
  );
};
const SmallLinkTitle = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <Typography
      variant="body1"
      component="div"
      sx={{
        marginBottom: "30px",
        color: "white",
        textAlign: isRtl ? "right" : "center",
      }}
    >
      {children}
    </Typography>
  );
};

const List = ({ children }) => (
  <Box
    component="ul"
    margin="0px"
    padding="0px"
    sx={{ listStyle: "none", display: "flex", flexWrap: "wrap" }}
  >
    {children}
  </Box>
);

const SmallList = ({ children }) => (
  <Box
    minWidth="170px"
    component="ul"
    marginY="0px"
    marginX="auto"
    padding="0px"
    sx={{ listStyle: "none", display: "block" }}
  >
    {children}
  </Box>
);

const ListItem = ({ children, to }) => (
  <Box
    component="li"
    width="50%"
    marginBottom="20px"
    marginTop="20px"
    color="rgba(255, 255, 255, 0.8)"
    sx={{
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  </Box>
);

const SmallListItem = ({ children, to }) => (
  <Box
    component="li"
    fontSize="12px"
    width="50%"
    textAlign="center"
    marginBottom="10px"
    marginTop="20px"
    color="rgba(255, 255, 255, 0.8)"
    sx={{
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  </Box>
);

const Left = ({ children }) => (
  <Box component="div" width="33.3%" padding="20px">
    {children}
  </Box>
);

const ContactItem = ({ children }) => (
  <Box
    component="div"
    marginBottom="20px"
    display="flex"
    alignItems="center"
    color="rgba(255, 255, 255, 0.8)"
    sx={{
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    {children}
  </Box>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isLargeScreen = useMediaQuery("(min-width:800px)");
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  return (
    <>
      {isLargeScreen && (
        <Container>
          <Right>
            <Title>{t("contactUsF")}</Title>
            <ContactItem>
              <Typography sx={{ direction: "ltr" }}>
                <a
                  href="tel:+963 21 5075"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +963 21 5075
                </a>
              </Typography>
              <CallIcon
                sx={{ mr: "10px", color: "rgba(255, 255, 255, 0.8)" }}
              />
            </ContactItem>
            <ContactItem>
              <Typography sx={{ direction: "ltr" }}>
                <a
                  href="tel:+963 944 771160"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +963 944 771160
                </a>
              </Typography>
              <CallIcon
                sx={{ mr: "10px", color: "rgba(255, 255, 255, 0.8)" }}
              />
            </ContactItem>
            <ContactItem>
              <a
                href="mailto:sales@fanari-store.com"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                sales@fanari-store.com
              </a>
              <EmailIcon
                sx={{ mr: "10px", color: "rgba(255, 255, 255, 0.8)" }}
              />
            </ContactItem>
          </Right>

          <Center>
            <LinkTitle>{t("links")}</LinkTitle>
            <List>
              <ListItem to="/"> {t("home")}</ListItem>
              <ListItem to="/build-your-pc">{t("chooseComputer")} </ListItem>
              <ListItem to="/about-us"> {t("aboutUs")}</ListItem>
              <ListItem to="/price-lists">{t("priceList")}</ListItem>
              <ListItem to="/site-map">{t("siteMap")}</ListItem>
              <ListItem to="/contact-us">{t("contactUs")}</ListItem>
            </List>
          </Center>
          <Left>
            <FanariTitle>{t("fanari")}</FanariTitle>
            <Desc>
              &copy; {t("fanari")}- {currentYear} {t("all_right")}
            </Desc>
            <SocialContainer>
              <SocialIcon color="#3B5999">
                <Link
                  to="https://web.facebook.com/FanariStore/?ref=embed_page&_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon sx={{ color: "#fff" }} />
                </Link>
              </SocialIcon>

              <SocialIcon color="#25D366">
                <Link
                  to="https://api.whatsapp.com/send?phone=963944771160&text=Hello,%20I%27m%20interested%20in%20contacting%20you%20to%20answer%20some%20queries."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon sx={{ color: "#fff" }} />
                </Link>
              </SocialIcon>

              <SocialIcon color="#0088CC">
                <Link
                  to="https://web.telegram.org/a/#-1001094262788"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon sx={{ color: "#fff" }} />
                </Link>
              </SocialIcon>
            </SocialContainer>
          </Left>
        </Container>
      )}

      {isSmallScreen && (
        <Container>
          <Right>
            <SmallTitle>{t("contactUsF")}</SmallTitle>
            <ContactItem>
              <Typography sx={{ direction: "ltr", fontSize: "12px" }}>
                <a
                  href="tel:+963 21 5075"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +963 21 5075
                </a>
              </Typography>
              <CallIcon
                sx={{
                  width: "40px",
                  mr: "5px",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              />
            </ContactItem>
            <ContactItem>
              <Typography sx={{ direction: "ltr", fontSize: "11px" }}>
                <a
                  href="tel:+963 944 771160"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +963 944 771160
                </a>
              </Typography>
              <CallIcon
                sx={{
                  mr: "5px",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              />
            </ContactItem>
            <ContactItem>
              <Typography sx={{ direction: "ltr", fontSize: "11px" }}>
                <a
                  href="mailto:sales@fanari-store.com"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  sales@fanari-store.com
                </a>
              </Typography>
              <EmailIcon sx={{ mx: 1, color: "rgba(255, 255, 255, 0.8)" }} />
            </ContactItem>
          </Right>
          <Center>
            <SmallLinkTitle>{t("links")}</SmallLinkTitle>
            <SmallList>
              <SmallListItem to="/">{t("home")}</SmallListItem>
              <SmallListItem to="/build-your-pc">
                {t("chooseComputer")}
              </SmallListItem>
              <SmallListItem to="/about-us">{t("aboutUs")}</SmallListItem>
              <SmallListItem to="/price-lists">{t("priceList")}</SmallListItem>
              <SmallListItem to="/site-map">{t("siteMap")}</SmallListItem>
              <SmallListItem to="/contact-us">{t("contactUs")}</SmallListItem>
            </SmallList>
          </Center>
          <Left>
            <SmallFanariTitle>{t("fanari")}</SmallFanariTitle>
            <SmallDesc>
              &copy; {t("fanari")} - {t("all_right")} {currentYear}
            </SmallDesc>
            <SmallSocialContainer>
              <SmallSocialIcon color="#3B5999">
                <Link
                  to="https://web.facebook.com/FanariStore/?ref=embed_page&_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon sx={{ fontSize: "18px", color: "#fff" }} />
                </Link>
              </SmallSocialIcon>

              <SmallSocialIcon color="#25D366">
                <Link
                  to="https://api.whatsapp.com/send?phone=963944771160&text=Hello,%20I%27m%20interested%20in%20contacting%20you%20to%20answer%20some%20queries."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon sx={{ fontSize: "20px", color: "#fff" }} />
                </Link>
              </SmallSocialIcon>

              <SmallSocialIcon color="#0088CC">
                <Link
                  to="https://web.telegram.org/a/#-1001094262788"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon sx={{ fontSize: "20px", color: "#fff" }} />
                </Link>
              </SmallSocialIcon>
            </SmallSocialContainer>
          </Left>
        </Container>
      )}
    </>
  );
}
