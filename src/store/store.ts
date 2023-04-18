import { configureStore } from '@reduxjs/toolkit'
import PreviewGallerySlice from '../Slices/PreviewGallerySlice';
import ProductSlice from '../Slices/ProductSlice';
import BadgeSlice from '../Slices/BadgeSlice';


export const store = configureStore({
    reducer: {
      PreviewGallerySlice,
      ProductSlice,
      BadgeSlice
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;