import React, { useEffect, useState } from 'react';
import { ITotal } from '../Content';
import './Counter.scss';

interface IProps{
    disabled: boolean,
    activeSize: string,
    setTotalInfo: React.Dispatch<React.SetStateAction<ITotal>> ,
    totalInfo: ITotal
}

const Counter = ({disabled, activeSize, setTotalInfo, totalInfo }:IProps) => {

    const index = activeSize as keyof ITotal;
        
    const [count, setCount] = useState( totalInfo[index] );

    
    useEffect( () => {
        setTotalInfo( {...totalInfo, [index]: count })
    }, [count]);


    useEffect( () => {
        setCount(totalInfo[index]);
    }, [activeSize]);
    
    const checkValue = (e: {target: HTMLInputElement}) => {

        if( Number(e.target.value) <= 0 ) setCount(1);
        
        else if(Number(e.target.value) <= 30) setCount( Number(e.target.value)); 
        
        else setCount(30);
    }
    
    return (
        <div className="counter">
            <button
                disabled={disabled || count <= 1}
                className="left"
                onClick={() => setCount(prev => prev > 1 ? prev-1 : prev = 1)}
            >-</button>
            <input
                disabled={disabled} 
                type="number" 
                value={ disabled ? 1 : Number(count).toString()}
                onChange={e => checkValue(e)}
            />
            <button
                disabled={disabled || count >= 30} 
                className="right"
                onClick={() => setCount(prev => prev < 30 ? prev+1 : prev = 30)}
            >+</button>
        </div>
    );
};

export default Counter;