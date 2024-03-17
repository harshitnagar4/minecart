import React, { useEffect, useState } from "react";
import {Card, CardContent,CardMedia,Button,Typography,Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Cancel, Celebration, Grade } from "@mui/icons-material";
import { setCartItems, setModalOpen, setOrderPanelData, setProductCartCounter } from "../../redux/productSlice";
import { cancelIcon, cardContainer, cardContent, cardItem, secondCardContent } from "./styled";
import OrderModal from "../../component/order-modal";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.productslice.cartItems);
  const [ clickedFunc, setClickFunc ] = useState(false)
  const modalData = {heading:'Congratulation',icon:<Celebration color='purple' fontSize='small'/>,desc:'your Order Has Been Placed'}
  const modalOpen = useSelector((state) => state.productslice.modalOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice =
    cartItems &&
    cartItems.length > 0 &&
    cartItems.reduce(
      (acc, item) =>
        (acc +=
          Math.ceil(item.price - (item.price * item.discountPercentage) / 100) *
          item.quantity),
      0
    );

  const cancelHandler = (product) => {
    const updateProduct = cartItems.filter((item) => item.id !== product.id);
    const updateQuantity = cartItems.reduce(
      (acc, item) => (acc += item.quantity),
      0
    );
    dispatch(setProductCartCounter(updateQuantity - product.quantity));
    dispatch(setCartItems(updateProduct));
  };
  const orderHandler = ()=>{
    dispatch(setOrderPanelData(cartItems));
    dispatch(setModalOpen(true));
    setClickFunc(true);
  }
  useEffect(()=>{
    if(!modalOpen && clickedFunc){
      dispatch(setCartItems([]));
      dispatch(setProductCartCounter(0));
      dispatch(setModalOpen(false));
      navigate('/');
    }
  }, [clickedFunc,modalOpen])
  return (
    <Container>
      <Grid container>
        {cartItems && cartItems.length > 0 ? (
          <>
            <Grid item md={6} width={"100%"}>
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => {
                  return (
                    <>
                      <Card
                        sx={cardContainer}
                      >
                        <Cancel
                          fontSize="large"
                          color="secondary"
                          sx={cancelIcon}
                          onClick={() => {
                            cancelHandler(item);
                          }}
                        />
                        <CardMedia
                          component="img"
                          alt={item.title}
                          image={item.thumbnail}
                          height="180px"
                        />
                        <CardContent
                          sx={cardContent}
                        >
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
            </Grid>
            <Grid item md={6}>
              <Card
                sx={cardContainer}
              >
                <CardContent>
                  <Typography variant="h6">Price Details</Typography>
                </CardContent>
                <CardContent
                  sx={secondCardContent}
                >
                  <Typography variant="h6" color={"secondary"}>
                    Total Price
                  </Typography>
                  <Typography variant="h6" fontWeight={"800"}>
                    {totalPrice}
                  </Typography>
                </CardContent>
                <CardContent
                  sx={secondCardContent}
                >
                  <Typography variant="h6" color={"secondary"}>
                    Shipping fee
                  </Typography>
                  <Typography variant="h6" fontWeight={"800"} color={"green"}>
                    free
                  </Typography>
                </CardContent>
                <CardContent sx={cardItem}>
                  <Button variant="contained" color="secondary" onClick={orderHandler}>
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <OrderModal modalData={modalData} />
          </>
        ) : (
          "oppsssss yoy cart is empty please add some products"
        )}
      </Grid>
    </Container>
  );
}
