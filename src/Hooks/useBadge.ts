import {useCallback, useState} from 'react';
import { IClothesService } from '../types/Types';

export const useBadge = ( ) => {

    const [badge, setbadge] = useState<boolean>(false);

    const changeBadge = useCallback(() => setbadge( badge => !badge), []);

    const isCheckId = (data: IClothesService[], product: IClothesService) => { 
          
            data.find(el => el.id === product.id && changeBadge())
    };


    return {
        badge,
        changeBadge,
        isCheckId
    }
};