import { Box, Grid } from "@mui/material";
import React from "react";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <>
      <Box component='div'>
        <Header />
        {children}
      </Box>
    </>
  );
};

export default Layout;
