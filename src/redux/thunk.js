import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProductData = createAsyncThunk(
  "home/fetchProductData",
  async () => {
    const response = await axios.get(`https://dummyjson.com/products`);
    return response.data;
  }
);
export const fakeStoreProduct = createAsyncThunk(
  "home/fakeStoreProduct",
  async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    return response.data;
  }
);

export const currentProductApi = createAsyncThunk(
  "products/:id",
  async (userId) => {
    const response = await axios.get(`https://dummyjson.com/products/${userId}`);
    return response.data;
  }
);