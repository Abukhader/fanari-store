import React, { useState, useEffect } from "react";
// @ts-ignore
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Divider } from "@mui/material";
import { apiUrl } from "../../config";

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // تحديد الصفحة الافتراضية
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/products-list/${categoryId}?page=${currentPage}`
        );
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [categoryId, currentPage]);

  return (
    <Box>
      {categoryData ? (
        <Box>
          <Typography variant="h2">{categoryData.name}</Typography>
          <Divider />
          <Box>
            <Typography>{categoryData.description}</Typography>
            <img src={categoryData.image} alt={categoryData.name} />
          </Box>
          <Divider />
          <Box>
            <Typography variant="h4">Products:</Typography>
            <ul>
              {categoryData.products.map((product) => (
                <li key={product.id}>
                  <a href={`/product-details/${product.url}`}>{product.name}</a>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default CategoriesPage;
