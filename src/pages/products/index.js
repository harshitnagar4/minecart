import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Grade } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductFilter from "../../component/product-filter";

const Products = () => {
  const value = useSelector((state) => state.productslice.productData);
  const selectCategory = [...new Set(value.map((item) => item.category))];
  const selectBrand = [...new Set(value.map((item) => item.brand))];
  const [products, setProducts] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const selectCatData = useSelector((state) => state.productslice.selectCat);
  const selectBrandData = useSelector((state) => state.productslice.selectBrand);
  const ProductdataFilter = products && products.length>0 && products.filter((item) => {
    if (selectCatData.length > 0 && selectBrandData.length > 0) {
      // Filter based on both category and brand
      return selectCatData.includes(item.category) && selectBrandData.includes(item.brand);
    } else if (selectCatData.length > 0) {
      // Filter based only on category
      return selectCatData.includes(item.category);
    } else if (selectBrandData.length > 0) {
      // Filter based only on brand
      return selectBrandData.includes(item.brand);
    } else {
      // If no filters are applied, return all data
      return true;
    }
  });

  useEffect(() => {
    if (value) {
      setProducts(value);
    }
  }, [value]);
  useEffect(() => {
    const filterData =
      value &&
      value.length > 0 &&
      value.filter((item) =>
        item.title.toLowerCase().includes(searchVal.toLowerCase())
      );
    setProducts(filterData);
  }, [searchVal]);

  return (
    <>
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={4}
        marginBottom={4}
      >
        <Grid item md={6} xs={12} sm={12} width={"100%"}>
          <TextField
            value={searchVal}
            placeholder="search your product"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item md={2} xs={12}>
          <Box component={"div"} marginBottom={2}>
            <Typography variant={"h6"} textAlign={'center'} gutterBottom color={'purple'}>Filter Products</Typography>
            <Typography variant="h6" textAlign={"center"}>
              {" "}
              Category Wise
            </Typography>
            <ProductFilter data={{title:'category', selectData:selectCategory}} />
          </Box>
          <Divider />
          <Box component={"div"} marginTop={2}>
            <Typography variant="h6" textAlign={"center"}>
              Brand Wise
            </Typography>
            <ProductFilter data={{title:'brand', selectData:selectBrand}} />
          </Box>
        </Grid>
        <Grid item md={10}>
          <Grid container>
            {ProductdataFilter.length > 0 ? (
              ProductdataFilter.map((items, index) => (
                <Fragment key={index}>
                  <Grid
                    item
                    md={3}
                    sm={12}
                    xs={12}
                    padding={"1rem"}
                    direction={"column"}
                  >
                    <Card
                      style={{
                        height: "280px",
                        boxShadow: "none",
                        position: "relative",
                      }}
                      onClick={() => navigate(`/products/${items.id}`)}
                    >
                      <CardMedia
                        component="img"
                        alt={items.title}
                        image={items.thumbnail}
                        height="180px"
                      />
                      <CardContent
                        sx={{
                          position: "absolute",
                          color: "white",
                          top: "52%",
                          backgroundColor: "#159f1457",
                          padding: "1px 17px",
                        }}
                      >
                        <Typography variant="caption">
                          {items.rating} <Grade fontSize="small" />
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="caption"
                          component="div"
                        >
                          {items.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="caption"
                          component="div"
                          fontSize={"9px"}
                        >
                          Rs.{" "}
                          {Math.ceil(
                            items.price -
                              (items.price * items.discountPercentage) / 100
                          )}{" "}
                          <span style={{ textDecoration: "line-through" }}>
                            Rs.{items.price}
                          </span>{" "}
                          <span style={{ fontSize: "8px" }}>
                            ({items.discountPercentage}%OFF)
                          </span>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Fragment>
              ))
            ) : (
              <Typography variant="caption">No products available</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
