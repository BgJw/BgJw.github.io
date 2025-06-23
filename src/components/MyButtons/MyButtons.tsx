import { memo } from 'react';
import { useBadge } from '../../Hooks/useBadge';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { incrementBadge, decrementBadge, addDataBadge, removeDataBadge } from '../../Slices/BadgeSlice';
import { BadgeType, IClothesService } from '../../types/Types';

interface IProps {
    on?: string;
    off?: string;
    type: BadgeType;
    product: IClothesService;
    sizeForCart?: string[];
}

const MyButtons = memo(({ on, off, type, product, sizeForCart }: IProps) => {
    const { isCheckId } = useBadge();
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.BadgeSlice[type].data);

    const badge = isCheckId(data, product);

    const style = () => {
        if (type === BadgeType.favorite) {
            return !badge ? 'bttn__link bttnFavoritesOn' : 'bttn__link bttnFavoritesOff';
        }
        if (type === BadgeType.compare) {
            return !badge ? 'bttn__link bttnCompareOff' : 'bttn__link bttnCompareOn';
        }
        if (type === BadgeType.cart) {
            return !badge ? 'bttnCartOn' : 'bttnCartOff';
        }
        return ''; 
    };

    return (
        !badge ? (
            <button
                className={style()}
                aria-label={type}
                onClick={() => {
                    dispatch(incrementBadge(type));
                    dispatch(addDataBadge({ name: type, data: { ...product, size: sizeForCart } as IClothesService }));
                }}
            >
                {on}
            </button>
        ) : (
            <button
                className={style()}
                onClick={() => {
                    dispatch(decrementBadge(type));
                    dispatch(removeDataBadge({ name: type, data: product }));
                }}
            >
                {off}
            </button>
        )
    );
});

export default MyButtons;
