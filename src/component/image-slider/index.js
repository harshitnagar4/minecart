import { Box } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";

const ImageSlider = ({CarouselProperties}) => {
  return (
    <>
      <Box component={"div"} width={"100%"}>
        <AliceCarousel { ...CarouselProperties }/>
      </Box>
    </>
  );
};

export default ImageSlider;
