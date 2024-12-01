import { memo, useCallback, useState } from 'react';
import { useAppSelector } from '../../../Hooks/useDispatch_Selector';
import { sizes } from '../../../services/ClothesService';
import './Sizes.scss';
import MyButtons from '../../../components/MyButtons/MyButtons';
import { BadgeType, IClothesService } from '../../../types/Types';

interface IProps {
    product: IClothesService
}
const BttnSizeAndBuy = memo(({ product }: IProps) => {
    const [size, setSize] = useState<string[]>(['S']);
    
    const data = useAppSelector(state => state.BadgeSlice.cart.data);

    const isCheckSize = useCallback((size: string) => {
            setSize(prev => {
                if (!prev.includes(size)) {
                    return [...prev, size]
                } else {
                    return prev.length > 1 ? prev.filter(el => el !== size) : prev
                }
            })
    }, [setSize]);


    const find = data.find(e => e.id === product.id);

    return (
        <>
        
        <div className="sizes">
            {
                sizes.map(el => (
                    <button
                        disabled={ Boolean(find) }
                        className={ size.includes(el) ? 'active' : ''}
                        onClick={() => isCheckSize(el)}
                        key={el}
                    >
                        {el}
                    </button>
                ))
            }
        </div>
        <div className='wrap__information__buy'>
                        <MyButtons
                            on="BUY IT"
                            off='REMOVE IT'
                            type={BadgeType.cart}
                            product={product}
                            sizeForCart={size}
                        />
                        <MyButtons
                            type={BadgeType.favorite}
                            product={product}
                        />
                    </div>
        </>
    );
});

export default BttnSizeAndBuy;