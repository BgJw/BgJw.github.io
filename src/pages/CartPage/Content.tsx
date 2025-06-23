import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MyButtons from '../../components/MyButtons/MyButtons';
import { checkPrice } from '../../Helpers/checkPrice';
import { BadgeType, ICarts } from '../../types/Types';
import Counter from './Counter/Counter';
import Dropdown from './Dropdown/Dropdown';

interface IProps {
  product: ICarts;
  totalPrice: { [x: string]: number };
  setPrice: React.Dispatch<React.SetStateAction<{ [x: string]: number }>>;
}

export interface ITotal {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

const Content = ({ product, setPrice, totalPrice }: IProps) => {
  const { alt_description, id, urls, price, size } = product;

  const [disabledCounter, setDisabledCounter] = useState(true);
  const [totalInfo, setTotalInfo] = useState<ITotal>({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
  const [activeSize, setActiveSize] = useState('');

  const setSize = () => {
    const obj = {} as ITotal;
    size?.forEach(s => {
      obj[s as keyof ITotal] = 1;
    });
    setTotalInfo(obj);
  };

  const contentPrice = useMemo(() => {
    const totalCount = Object.values(totalInfo).reduce((a, b) => a + b, 0);
    return totalCount * (price ?? 0);
  }, [totalInfo, price]);

  useEffect(() => {
    setSize();
  }, []);

  useEffect(() => {
    setPrice(prev => ({ ...prev, [id]: contentPrice }));
  }, [contentPrice, id, setPrice]);

  const removeEL = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = e.target as Element;
    if (target.classList.contains('bttnCartOff')) {
      const currentPrice = totalPrice[id] ?? 0;
      setPrice(prev => ({ ...prev, [id]: contentPrice - currentPrice }));
    }
  };

  return (
    <div className="cart__product">
      <Link to={`/product/${id}`}>
        <img className="img" src={urls.regular} alt={alt_description} />
      </Link>
      <div className="information">
        <p>{alt_description}</p>
        <p>{price} $/oс</p>
      </div>
      <div className="selectSize">
        <Dropdown
          size={size}
          setActiveSize={setActiveSize}
          activeSize={activeSize}
          setDisabledCounter={setDisabledCounter}
        />
        <Counter
          disabled={disabledCounter}
          activeSize={activeSize}
          setTotalInfo={setTotalInfo}
          totalInfo={totalInfo}
        />
      </div>
      <div className="totalPrice">
        <span>{checkPrice(contentPrice)} $</span>
      </div>
      <div className="additionalOptions" onClick={e => removeEL(e, id)}>
        <MyButtons type={BadgeType.favorite} product={product} />
        <MyButtons type={BadgeType.cart} product={product} />
      </div>
    </div>
  );
};

export default Content;
