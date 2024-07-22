import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CancelIcon from "@mui/icons-material/Cancel";
import { t } from "i18next";

const FavoriteProductCard = ({ product, handleRemoveFromFavorites }) => {
  return (
    <Card sx={{ maxWidth: 220, margin: "auto", mt: 5, cursor: "pointer" }}>
      <CardContent>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          m="5px"
        >
          <Typography variant="body2" color="text.secondary">
            {product.brand}
          </Typography>
          <Typography
            sx={{
              bgcolor: "#ff605c",
              width: "90px",
              borderRadius: "50px",
              textAlign: "center",
              color: "#fff",
            }}
            variant="body2"
            color="text.secondary"
          >
            {product.discount} OFF
          </Typography>
        </Stack>
        <LazyLoadImage
          effect="blur"
          src={product.image}
          alt={product.name}
          height="140"
          width="100%"
          style={{
            objectFit: "contain",
            transition: "transform 0.3s",
          }}
        />
        <Typography
          sx={{
            height: "13vh",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            whiteSpace: "normal",
            "&:hover": {
              color: "var(--primary-color)",
            },
          }}
          variant="h6"
          component="div"
          mt={2}
        >
          {product.name}
        </Typography>
        <Typography sx={{ fontWeight: "700" }} variant="h6">
          {product.originalPrice}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: "line-through" }}
        >
          {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("product_code")}: {product.code}
        </Typography>
        <Divider
          sx={{
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderWidth: "0.5px",
            width: "100%",
            marginBlock: "10px",
          }}
        />
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            color="error"
            onClick={(event) => {
              event.stopPropagation();
              handleRemoveFromFavorites(product.productId);
            }}
          >
            <CancelIcon />
            <Typography variant="body2" color="text.secondary" ml={1}>
              {t("remove_fav")}
            </Typography>
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FavoriteProductCard;
