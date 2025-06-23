import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { hideModal, onChangeIndex, setModalMainPhoto } from '../../Slices/PreviewGallerySlice';
import CarouselItem from './CarouselItem';

import './Modal.scss';



const Modal = memo(() => {
    
    const dispatch = useAppDispatch();
    const { singleClothesModal, clothesList, isOpenModal } = useAppSelector(state => state.PreviewGallerySlice);    



    const onChangeModalPhoto = useCallback((e: KeyboardEvent) => {
        if (e.keyCode === 39 || e.keyCode === 68) { dispatch(onChangeIndex('+')) }
        if (e.keyCode === 37 || e.keyCode === 65) { dispatch(onChangeIndex('-')) }
    }, [dispatch]);

    useEffect(() => {
        if (!isOpenModal) return;
        document.addEventListener('keydown', onChangeModalPhoto);

        return () => document.removeEventListener('keydown', onChangeModalPhoto);
    }, [isOpenModal, onChangeModalPhoto]);



    return (
        <>
        {
            isOpenModal &&

        <div className='modal'>
            <button className='carousel next' onClick={() => dispatch(onChangeIndex('+'))} >
                &#8811;
            </button>
            <button className='carousel prev' onClick={() => dispatch(onChangeIndex('-'))} >
                &#8810;
            </button>
            <button
                className='modal__close'
                onClick={() => dispatch(hideModal())}>
                X
            </button>
            <div 
                className='modal__bg'
                style={{ backgroundImage: `url(${singleClothesModal.urls.regular})` }}
            />
            <div className='modal__item'>
                <img
                    className={'modal__item-img animateOn lazy'}
                    src={singleClothesModal.urls.regular}
                    alt={singleClothesModal.alt_description} />
            </div>
            <div className='modal__carousel'>
                {clothesList.map((carousel, i) => (
                     <CarouselItem
                     key={carousel.id}
                     carousel={carousel}
                     isActive={singleClothesModal.id === carousel.id}
                     onClick={() => singleClothesModal.id !== carousel.id && dispatch(setModalMainPhoto(i))}
                   />
                    ))}


            </div>
        </div>
    }
    </>
        );
});

export default Modal;
