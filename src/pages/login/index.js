import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/productSlice";

const Login = () => {
  const authCredentials = { email: "admin@admin.com", password: "admin" };
  const dispatch = useDispatch();
  const [logInValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const formHandler = (e) => {
    e.preventDefault();
    if (
      authCredentials.email === logInValue.email &&
      authCredentials.password === logInValue.password
    ) {
      dispatch(setIsLoggedIn(true));
      localStorage.setItem('email', logInValue.email)
      navigate('/owner');
    } else{
      dispatch(setIsLoggedIn(false))
    }
  };
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={12} md={4} spacing={4}>
        <form onSubmit={formHandler}>
          <Box component={"div"} display={"flex"} flexDirection={"column"}>
            <Typography varient="h1" textAlign={"center"} gutterBottom>
              Sign In Your Account
            </Typography>
            <TextField
              placeholder="Enter Your Email"
              type="text"
              value={logInValue.email}
              onChange={(e) => {
                setLoginValue((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              sx={{ marginBottom: "10px" }}
              required
            />
            <TextField
              placeholder="Password"
              type="text"
              value={logInValue.password}
              onChange={(e) => {
                setLoginValue((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
              sx={{ marginBottom: "10px" }}
              required
            />
            <Button variant="contained" color="secondary" type="submit">
              Sign In
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
