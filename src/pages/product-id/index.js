import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { currentProductApi } from "../../redux/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Grade, LinkRounded, Tag } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ImageListItem,
  ImageList
} from "@mui/material";
import { setCartItems, setProductCartCounter } from "../../redux/productSlice";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ImageData = useSelector((state) => state.productslice.currentProduct);
  const counter = useSelector((state) => state.productslice.productCartCounter);
  const cartItems = useSelector((state) => state.productslice.cartItems);
 
// add to cart function 
  const cartHandler = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      dispatch(setCartItems(updatedCart));
    } else {
      // If item doesn't exist in cart, add it with quantity 1
      dispatch(setCartItems([...cartItems, { ...product, quantity: 1 }]));
    }
    dispatch(setProductCartCounter(counter + 1));
  };

  useEffect(() => {
    if (id) {
      dispatch(currentProductApi(id));
    }
  }, [id]);

  return (
    <Container>
      <Grid container  spacing={4}>
        <Grid item md={7}>
          <ImageList
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            cols={2}
            rowHeight={280}
          >
            {ImageData.images &&
              ImageData.images.length > 0 &&
              ImageData.images.map((item) => (
                <ImageListItem key={item}>
                  <img
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    loading="lazy"
                    height={"100%"}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </Grid>
        <Grid item md={5}>
          <Box width={"100%"}>
            <Card sx={{ width: "100%", boxShadow: "none" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {ImageData.brand}
                </Typography>
                <Typography variant="caption" component="div">
                  {ImageData.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {ImageData.description}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "inline-block",
                    padding: "1px 2px",
                    border: "1px solid #cec8c8",
                    width: "100px",
                  }}
                >
                  {ImageData.rating} <Grade fontSize="small" />{" "}
                </Typography>
                <Divider />
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  fontSize={"9px"}
                >
                  Rs.{" "}
                  {Math.ceil(
                    ImageData.price -
                      (ImageData.price * ImageData.discountPercentage) / 100
                  )}{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    Rs.
                    {ImageData.price}
                  </span>{" "}
                  <span style={{ fontSize: "8px" }}>
                    ({ImageData.discountPercentage}%OFF)
                  </span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  inclusive of all taxes
                </Typography>
              </CardContent>
              <CardActions sx={{ marginBottom: "2rem" }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    cartHandler(ImageData);
                  }}
                >
                  ADD TO BAG
                </Button>
              </CardActions>
              <Divider />
              <CardContent>
                <Typography gutterBottom variant="body2">
                  100% Original Products
                </Typography>
                <Typography gutterBottom variant="body2">
                  Pay on delivery might be available
                </Typography>
                <Typography gutterBottom variant="body2">
                  Easy 14 days returns and exchangesducts
                </Typography>
                <Typography gutterBottom variant="body2">
                  Try & Buy might be available
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  BEST OFFERS{" "}
                  <span>
                    <Tag />
                  </span>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Best Price: Rs.{" "}
                  {Math.ceil(
                    ImageData.price -
                      (ImageData.price * ImageData.discountPercentage) / 100
                  )}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Coupon code: TOPBRANDOFFER" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Coupon Discount: Rs. 243 off (check cart for final savings)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Applicable on: Orders above Rs. 1099 (only on first purchase)" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
