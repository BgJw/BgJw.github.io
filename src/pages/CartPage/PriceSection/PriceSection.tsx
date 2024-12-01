import { useState } from 'react';
import { checkPrice } from "../../../Helpers/checkPrice";

import './PriceSection.scss';

interface IProps {
    totalPrice: { [x: string]: number; }
}


const PriceSection = ({ totalPrice }: IProps) => {
    const [inputGift, setInputGift] = useState('');

    
    const GIFT = 'gift';
    
    const summary = Object.values(totalPrice).reduce((a, b) => a + b, 0);
    const isDiscount = inputGift === GIFT;
    const discount = isDiscount ? summary * 0.9 : summary;
    
        
    return (
        <div className="priceWrap">
            <div className="priceWrap__section">
                <h4>Summary</h4>
            </div>
            <div className="priceWrap__gift">
                Gift code:
                <input
                    placeholder="gift"
                    type="text"
                    value={inputGift}
                    onChange={ e => setInputGift(e.target.value)}
                />
            </div>
            <div className="priceWrap__grid">
                Discount:
                <p className="discount">{isDiscount ? '10%' : '0%'}</p>
                Total:
                <p>
                    <span className={isDiscount ? 'line smallSize' : 'bigSize'}>
                        {checkPrice(summary)} $
                    </span>
                    {isDiscount && 
                        <span className='bigSize'>
                            {checkPrice(discount)} $
                        </span>}
                </p>
            </div>
            <button className="priceWrap__bttn">
                Buy now
            </button>
        </div>
    );
};

export default PriceSection;