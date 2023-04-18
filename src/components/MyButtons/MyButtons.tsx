import { useEffect } from 'react';
import { useBadge } from '../../Hooks/useBadge';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { incrementBadge, decrementBadge, addDataBadge, removeDataBadge } from '../../Slices/BadgeSlice';
import { BadgeType, IClothesService } from '../../types/Types';

interface IProps{
    on?: string,
    off?: string,
    type: BadgeType,
    product: IClothesService,
    sizeForCart?: string[]
}

const MyButtons = ({ on, off, type, product, sizeForCart }: IProps) => {

    const style = () => { 
        if(type === BadgeType.favorite){
            return !badge ? 'bttnFavoritesOn' : 'bttnFavoritesOff';
        }
        if(type === BadgeType.compare){
            return !badge ? 'bttn__link bttnCompareOff' : 'bttn__link bttnCompareOn'
        }
        if(type === BadgeType.cart){
            return !badge ? 'bttnCartOn' : 'bttnCartOff';
        }
    }
    const {badge, isCheckId, changeBadge} = useBadge();
    const {data} = useAppSelector(state => state.BadgeSlice[type]);
    const dispatch = useAppDispatch();    
    

    useEffect(()=> { isCheckId(data, product) } , [product])
    


    return (
        !badge?
            <button 
                className={style()}
                onClick={ () => {
                    dispatch(incrementBadge(type))
                    dispatch(addDataBadge({name: type, data: {...product, size: sizeForCart} as IClothesService}))
                    changeBadge()
                }}
            >
            {on}
            </button>
        :
            <button 
                className={ style()}
                onClick={ () => {
                    dispatch(decrementBadge(type))
                    dispatch(removeDataBadge({name: type, data: product}))
                    changeBadge()
                }}
            >
                {off}
            </button>
    );
};

export default MyButtons;