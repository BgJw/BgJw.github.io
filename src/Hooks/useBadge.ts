import { useCallback } from 'react';
import { IClothesService } from '../types/Types';

export const useBadge = () => {
    const isCheckId = useCallback((data: IClothesService[], product: IClothesService) => {
        return data.some(el => el.id === product.id);
    }, []);

    return { isCheckId };
};
