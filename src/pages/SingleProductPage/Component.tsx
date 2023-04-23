import { BadgeType, IClothesService } from '../../types/Types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import MyButtons from '../../components/MyButtons/MyButtons';
import Sizes from '../../components/Sizes/Sizes';
import { useState } from 'react';

interface IProps {
    singleProduct: IClothesService,
}

const Component = ({ singleProduct }: IProps) => {
    const [size, setSize] = useState<string[]>(['S']);

    
    return (
        <>
            <Breadcrumbs />
            <div className='wrap'>
            {/* start photo element */}
                <div className='wrap__photo'>
                    <MyButtons
                        type={BadgeType.compare}
                        product={singleProduct}
                    />
                    <img className='wrap__photo-img' src={singleProduct.urls.regular} alt={singleProduct.alt_description} />
                </div>
                {/* End photo element */}

                <div className='wrap__information'>
                    <div className='wrap__information__preview'>
                        {/* Price  */}
                        <p>{singleProduct.alt_description}</p>
                        <span className='wrap__information__preview-price'>{singleProduct.price} $</span>
                    </div>
                    {/* Size */}
                    <span className='size'>
                        Sizing
                    </span> 
                    <Sizes 
                        setSize={setSize} 
                        size={size}  
                        product={singleProduct.id}
                    />

                        {/* Buy and likes bttn */}
                    <div className='wrap__information__buy'>
                        <MyButtons
                            on="BUY IT"
                            off='REMOVE IT'
                            type={BadgeType.cart}
                            product={singleProduct}
                            sizeForCart={size}
                        />
                        <MyButtons
                            on='&#9825;'
                            off='&#10084;'
                            type={BadgeType.favorite}
                            product={singleProduct}
                        />
                    </div>
                    <hr />
                    {/* Product characteristic */}
                    <div className='wrap__information__characteristic'>
                        <h4>Characteristics</h4>
                        <div className='wrap__information__characteristic__div'>
                            <div className='wrap__information__characteristic__div-country'>
                                <small>Country</small>
                                <p>{singleProduct.country}</p>
                            </div>
                            <div className='wrap__information__characteristic__div-material'>
                                <small>Material</small>
                                <p>{singleProduct.material}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end information */}
        </>
    );
};

export default Component;