import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import ClothesService from '../services/ClothesService';
import { IClothesService, IProducts, Name, Status } from '../types/Types';


export const fetchClothesForMan = createAsyncThunk(
    'products/fetchClothesForMan',
    () =>  ClothesService().getClothesForMan()
);
export const fetchClothesForWoman = createAsyncThunk(
    'products/fetchClothesForWoman',
    () =>  ClothesService().getClothesForWomen()
);
export const fetchClothesForSingleProduct = createAsyncThunk(
    'products/fetchClothesForSingleProduct',
    async (id: string) =>  await ClothesService().getClothesForSingleProduct(id)
);


const initialState: IProducts = {
    productsMan: [],
    productsWoman: [],
    singleProduct: {} as IClothesService,
    statusMan: Status.idle,
    statusWoman: Status.idle,
    statusSingleProduct: Status.loading,
    activeFilter: 'man',
}

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeActiveFilter: (state, action: PayloadAction<Name>) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClothesForMan.pending, state => {
                state.statusMan = Status.loading;
        })
            .addCase(fetchClothesForMan.fulfilled, (state, action) => {
                state.productsMan = action.payload;
                state.statusMan = Status.idle;
        })
            .addCase(fetchClothesForMan.rejected, state => {
                state.statusMan = Status.error
        })
        //  
            .addCase(fetchClothesForWoman.pending, state => {
                state.statusWoman = Status.loading;
        })
            .addCase(fetchClothesForWoman.fulfilled, (state, action) => {
                state.productsWoman = action.payload;
                state.statusWoman = Status.idle;
        })
            .addCase(fetchClothesForWoman.rejected, state => {
                state.statusWoman = Status.error
        })
        //
        .addCase(fetchClothesForSingleProduct.pending, state => {
            state.singleProduct = {} as IClothesService;
            state.statusSingleProduct = Status.loading
        })
        .addCase(fetchClothesForSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.statusSingleProduct = Status.idle;
        })
        .addCase(fetchClothesForSingleProduct.rejected, state => {
            state.singleProduct = {} as IClothesService;
            state.statusSingleProduct = Status.error
        })
        //
            .addDefaultCase(()=> {})
        },
});

export const {
        changeActiveFilter,
            } = ProductSlice.actions;

export default ProductSlice.reducer;