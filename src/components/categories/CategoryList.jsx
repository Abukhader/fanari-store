import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Collapse, Divider } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../config";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ar"
  );
  const navigate = useNavigate();

  useEffect(() => {
    // جلب البيانات من الـ API أو من localStorage إذا توفرت
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("categories");
        if (cachedData) {
          setCategories(JSON.parse(cachedData));
        } else {
          const response = await axios.get(
            `${apiUrl}categories?locale=${language}`
          );
          setCategories(response.data[0]);
          localStorage.setItem("categories", JSON.stringify(response.data[0]));
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب التصنيفات!", error);
      }
    };

    fetchData();
  }, [language]);

  const handleToggle = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderCategories = (parentId) => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => {
        const hasSubcategories = categories.some(
          (subcategory) => subcategory.parent_id === category.id
        );
        const translation = category.translations.find(
          (trans) => trans.locale === language
        );

        return (
          <div key={category.id}>
            <ListItem
              button
              onClick={() => {
                if (hasSubcategories) {
                  handleToggle(category.id);
                } else {
                  navigate(`/products/${category.category_url}`);
                }
              }}
              sx={{
                color: "var(--primary-color)",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    fontSize: "11px",
                    fontWeight: 650,
                    marginRight: "8px",
                    textAlign: language === "ar" ? "right" : "left",
                  },
                }}
                primary={
                  translation
                    ? translation.category_name.toUpperCase()
                    : category.category_name
                }
              />
              {hasSubcategories ? (
                openCategories[category.id] ? (
                  <ArrowDropUpIcon sx={{ color: "var(--primary-color)" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "var(--primary-color)" }} />
                )
              ) : null}
            </ListItem>
            {hasSubcategories && (
              <Collapse
                in={openCategories[category.id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {renderCategories(category.id)}
                </List>
              </Collapse>
            )}
            <Divider sx={{ width: "90%" }} />
          </div>
        );
      });
  };

  return <List>{renderCategories(0)}</List>;
};

export default CategoryList;
