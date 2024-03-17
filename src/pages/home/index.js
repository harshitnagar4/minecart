import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Grid, Link, Typography } from "@mui/material";
import importImages from "../../utills/Image";
import ImageSlider from "../../component/image-slider";
import { headingTypo, imageSliderBox } from "./styled";

function Home() {
  const imagesSlider = importImages();
  const value = useSelector((state) => state.productslice.productData);
  const fakeProductData = useSelector((state) => state.productslice.fakeProductData);
  const images = [
    {
      label: "sliderimg1",
      imgPath: imagesSlider.bg1,
    },
    {
      label: "sliderimg2",
      imgPath: imagesSlider.bg2,
    },
    {
      label: "sliderimg3",
      imgPath: imagesSlider.bg3,
    },
    {
      label: "sliderimg4",
      imgPath: imagesSlider.bg4,
    },
  ];
  const items = images.map((item) => {
    return (
      <>
        <img src={item.imgPath} alt={item.label} height={400} width={"100%"} />
      </>
    );
  });
  const productItems = value.map((item) => {
    return (
      <>
        <Link component={RouterLink} to={"/products"}>
          <img
            src={item.thumbnail}
            alt={item.title}
            height={200}
            width={"95%"}
          />
        </Link>
      </>
    );
  });
  const fakeProductItems = fakeProductData.map((item) => {
    return (
      <>
        <Link component={RouterLink} to={"/products"}>
          {" "}
          <img src={item.image} alt={item.title} height={200} width={"95%"} />
        </Link>
      </>
    );
  });
  const responsive = {
    0: { items: 1, itemsFit: "contain" },
    600: { items: 1, itemsFit: "contain" },
    1024: { items: 1, itemsFit: "contain" },
  };
  const bannerProperties = {
    mouseTracking: true,
    autoPlay: true,
    infinite: true,
    autoPlayInterval: 2000,
    animationDuration: 1500,
    responsive: responsive,
    items: items,
    disableButtonsControls: true,
  };
  const productsResponsive = {
    0: { items: 1 },
    600: { items: 3 },
    1024: { items: 6, itemsFit: "contain" },
  };
  const productsProperties = {
    mouseTracking: true,
    autoPlay: true,
    infinite: true,
    autoPlayInterval: 2000,
    animationDuration: 1500,
    disableDotsControls: true,
    responsive: productsResponsive,
    items: productItems,
    disableButtonsControls: true,
  };
  const fakeProductsProperties = {
    mouseTracking: true,
    autoPlay: true,
    infinite: true,
    autoPlayInterval: 2000,
    animationDuration: 1500,
    disableDotsControls: true,
    responsive: productsResponsive,
    items: fakeProductItems,
    disableButtonsControls: true,
  };
  
  return (
    <>
      <Grid container>
        <Grid item md={12} sx={imageSliderBox}>
          <Box component={"div"} width={"100%"}>
            <ImageSlider CarouselProperties={bannerProperties} />
          </Box>
        </Grid>
        <Grid
          item
          md={12}
          sx={imageSliderBox}
          marginTop={"50px"}
          marginBottom={"50px"}
        >
          <Typography
            varient="h1"
            sx={headingTypo}
          >
            BIGGEST DEALS ON TOP BRANDS
          </Typography>
          <Box component={"div"} width={"100%"}>
            <ImageSlider CarouselProperties={productsProperties} />
          </Box>
        </Grid>
        <Grid item md={12} sx={imageSliderBox}>
          <Typography
            varient="h1"
            sx={headingTypo}
          >
            EXPLORE TOP BRANDS
          </Typography>
          <Box component={"div"} width={"100%"}>
            <ImageSlider CarouselProperties={fakeProductsProperties} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
