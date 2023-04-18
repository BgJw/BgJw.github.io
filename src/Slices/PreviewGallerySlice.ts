import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import ClothesService from '../services/ClothesService';
import { IClothesService, IPreviewGallerySlice, Status } from '../types/Types';



export const fetchClothes = createAsyncThunk(
    'previewGallery/fetchClothes',
    () =>  ClothesService().getClothesForPreviewGallery()
);



const initialState: IPreviewGallerySlice = {
    clothesList: [],
    isOpenModal: false,
    singleClothesModal: {} as IClothesService,
    status: Status.idle
}

export const PreviewGallerySlice = createSlice({
    name: 'previewGallery',
    initialState,
    reducers: {
        hideModal: ( state ) => {
            state.isOpenModal = false;
        },
        showModal: ( state ) => {
            state.isOpenModal = true;
        },
        setModalMainPhoto: (state, action: PayloadAction<IClothesService>) => {
            state.singleClothesModal = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchClothes.pending, state => {
            state.status = Status.loading;
        })
        .addCase(fetchClothes.fulfilled, (state, action)=> {
                state.clothesList = action.payload;
                state.status = Status.idle;

        })
        .addCase(fetchClothes.rejected, state => {
            state.status = Status.error;
        })
        .addDefaultCase( () => {})
    },
});

export const {
                hideModal, 
                showModal, 
                setModalMainPhoto,
            } = PreviewGallerySlice.actions;

export default PreviewGallerySlice.reducer;