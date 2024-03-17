import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { setModalOpen } from "../../redux/productSlice";
import OrderModal from "../../component/order-modal";
import { Grade, SentimentDissatisfied } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import {
  cardContainer,
  cardContent,
  cardItem,
  secondCardContent,
} from "../cart/styled";

const Owner = () => {
  const isLoggedIn = useSelector((state) => state.productslice.isLoggedIn);
  const orderPanelData = useSelector(
    (state) => state.productslice.orderPanelData
  );
  const totalPrice =
    orderPanelData &&
    orderPanelData.length > 0 &&
    orderPanelData.reduce(
      (acc, item) =>
        (acc +=
          Math.ceil(item.price - (item.price * item.discountPercentage) / 100) *
          item.quantity),
      0
    );
  const dispatch = useDispatch();
  const modalData = {
    heading: "Sorry",
    icon: <SentimentDissatisfied color="purple" fontSize="small" />,
    desc: "your are not Authorized",
    goTo: "/login",
  };
  // useEffect to redirect if user is not authenticated
  useEffect(() => {
    // Only redirect if user is not logged in
    if (!isLoggedIn) {
      dispatch(setModalOpen(true));
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Container>
            {orderPanelData && orderPanelData.length > 0 ? (
              <Grid container>
                <Grid
                  item
                  md={6}
                  display={"flex"}
                  justifyContent={"center"}
                  direction={"column"}
                  xs={12}
                >
                  {orderPanelData.map((item) => {
                    return (
                      <>
                        <Card sx={cardContainer}>
                          <CardMedia
                            component="img"
                            alt={item.title}
                            image={item.thumbnail}
                            height="190px"
                          />
                          <CardContent sx={cardContent}>
                            <Typography variant="caption">
                              {item.rating} <Grade fontSize="small" />
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="caption"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="caption"
                              component="div"
                              fontSize={"9px"}
                            >
                              Rs.{" "}
                              {Math.ceil(
                                item.price -
                                  (item.price * item.discountPercentage) / 100
                              )}{" "}
                              <span style={{ textDecoration: "line-through" }}>
                                Rs.{item.price}
                              </span>{" "}
                              <span style={{ fontSize: "8px" }}>
                                ({item.discountPercentage}%OFF)
                              </span>
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h3"
                              component="div"
                              fontSize={"16px"}
                              fontWeight={500}
                            >
                              quantity {item.quantity}
                            </Typography>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
                  <Card sx={cardContainer}>
                    <CardContent>
                      <Typography variant="h6">Price Details</Typography>
                    </CardContent>
                    <CardContent sx={secondCardContent}>
                      <Typography variant="h6" color={"secondary"}>
                        Total Price
                      </Typography>
                      <Typography variant="h6" fontWeight={"800"}>
                        {totalPrice}
                      </Typography>
                    </CardContent>
                    <CardContent sx={secondCardContent}>
                      <Typography variant="h6" color={"secondary"}>
                        Shipping fee
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={"800"}
                        color={"green"}
                      >
                        free
                      </Typography>
                    </CardContent>
                    <CardContent sx={cardItem}>
                      <Link component={RouterLink} to={'/'}><Button variant="contained" color="secondary">
                        Go Back Home
                      </Button></Link>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="h6" textAlign={"center"}>
                oppsss You have not made any sell yet.......
              </Typography>
            )}
          </Container>
        </>
      ) : (
        <OrderModal modalData={modalData} />
      )}
    </div>
  );
};

export default Owner;
