export const checkPrice = (price: number): string | number => {

    let temp: number | string = Math.trunc(price);
    
    if( price < 1000) temp = Math.trunc(price);

    if (price >= 1000) temp = Math.trunc(price).toString().slice(0,1) + ' '+  Math.trunc(price).toString().slice(1);
    
    if (price >= 10000) temp = Math.trunc(price).toString().slice(0,2) + ' '+  Math.trunc(price).toString().slice(2);
    
    return temp;
}