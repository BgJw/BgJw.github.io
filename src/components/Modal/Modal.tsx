import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { hideModal, setModalMainPhoto } from '../../Slices/PreviewGallerySlice';
import { IClothesService } from '../../types/Types';

import './Modal.scss';



const Modal = () => {

    const dispatch = useAppDispatch();
    const {singleClothesModal, clothesList} = useAppSelector( state => state.PreviewGallerySlice);
    const [animation, setAnimation] = useState(true);


    const animated = (carousel: IClothesService) => {

        if (singleClothesModal.id !== carousel.id ) {
            
            setTimeout(() => {
                setAnimation(true)
                dispatch(setModalMainPhoto(carousel))
            }, 400)
            setAnimation(false);
        }
    };

    return (
        <div 
            className='modal'>
            <button 
                className='modal__close'
                onClick={() => dispatch(hideModal()) }
            >
                X
            </button>
            <div className='modal__bg'
                 style={{backgroundImage: `url(${singleClothesModal.urls.thumb})`}}  
            />
            <div className='modal__item'>
                <img
                    className={animation? 'modal__item-img animateOn': 'animateOff modal__item-img'}
                    src={singleClothesModal.urls.regular} 
                    alt={singleClothesModal.alt_description} />
            </div>
            <div className='modal__carousel'>
                {
                    clothesList.map( carousel  => (
                        <div key={carousel.id} className='modal__carousel__items'>
                            <img 
                                className='modal__carousel__items-img' 
                                src={carousel.urls.thumb} 
                                alt={carousel.alt_description}
                                onClick={() => animated(carousel) } 
                            />
                            {
                                singleClothesModal.id === carousel.id 
                                        && <div className='modal__carousel__items-activeImg' />
                            }
                        </div>
                    ) )
                }


            </div>
        </div>
    );
};

export default Modal;
