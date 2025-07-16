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
    index: 0,
    status: Status.idle
}

export const PreviewGallerySlice = createSlice({
    name: 'previewGallery',
    initialState,
    reducers: {
        hideModal: ( state ) => {
            state.isOpenModal = false;
            document.body.style.overflow = '';
        },
        showModal: ( state ) => {
            state.isOpenModal = true;
            document.body.style.overflow = 'hidden';
        },
        setModalMainPhoto: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
            state.singleClothesModal = state.clothesList[state.index];
        },
        onChangeIndex: (state, action: PayloadAction<string>) => {
            if (action.payload === '+') {
                if (state.index < state.clothesList.length - 1) {
                    state.index += 1;
                }
                else {
                    state.index = 0;
                }
            }
            if (action.payload === '-') {
                if (state.index > 0) {
                    state.index -= 1;
                } else {
                    state.index = state.clothesList.length - 1;
                }
            }
            state.singleClothesModal = state.clothesList[state.index];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchClothes.pending, state => {
            state.status = Status.loading;
        })
        .addCase(fetchClothes.fulfilled, (state, action)=> {
            state.clothesList = action.payload;
            state.status = Status.success;

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
                onChangeIndex,
            } = PreviewGallerySlice.actions;

export default PreviewGallerySlice.reducer;