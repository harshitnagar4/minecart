import { createSlice } from '@reduxjs/toolkit'
import { currentProductApi, fakeStoreProduct, fetchProductData } from "./thunk";
const initialState = {
  loading:false,
  productData : [],
  fakeProductData : [],
  currentProduct:{},
  productCartCounter:0,
  cartItems:[],
  error:'',
  userState:'LogIn',
  orderPanelData:[],
  modalOpen:false,
  isLoggedIn:false,
  selectBrand:[],
  selectCat:[],
}

export const productSlice = createSlice({
  name: 'productslice',
  initialState,
  reducers: {
    setProductCartCounter:(state,action)=>{
      state.productCartCounter = action.payload
    },
    setCartItems:(state,action)=>{
      state.cartItems = action.payload
    },
    setUserState:(state,action)=>{
      state.userState = action.payload
    },
    setOrderPanelData:(state,action)=>{
      state.orderPanelData = action.payload
    },
    setModalOpen:(state,action)=>{
      state.modalOpen = action.payload
    },
    setIsLoggedIn:(state,action)=>{
      state.isLoggedIn = action.payload
    }
    ,
    setSelectBrand:(state,action)=>{
      state.selectBrand = action.payload
    },
    setSelectCat:(state,action)=>{
      state.selectCat = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchProductData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProductData.fulfilled, (state, action) => {
      state.loading = false;
      state.productData = action.payload.products;
    })
    builder
    .addCase(fakeStoreProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(fakeStoreProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.fakeProductData = action.payload;
    })
    builder
    .addCase(currentProductApi.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload
    })

  }
})

// Action creators are generated for each case reducer function
export const { setProductCartCounter,setCartItems, setUserState, setModalOpen, setOrderPanelData,setSelectBrand,setSelectCat,setIsLoggedIn } = productSlice.actions

export default productSlice.reducer