import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { hideModal, onChangeIndex, setModalMainPhoto } from '../../Slices/PreviewGallerySlice';

import './Modal.scss';



const Modal = () => {

    const dispatch = useAppDispatch();
    const { singleClothesModal, clothesList, isOpenModal } = useAppSelector(state => state.PreviewGallerySlice);


    console.log('render Modal');
    



    const onChangeModalPhoto = useCallback((e: KeyboardEvent) => {
        if (e.keyCode === 39 || e.keyCode === 68) { dispatch(onChangeIndex('+')) }
        if (e.keyCode === 37 || e.keyCode === 65) { dispatch(onChangeIndex('-')) }
    }, [dispatch]);

    useEffect(() => {

        document.addEventListener('keydown', onChangeModalPhoto);

        return () => document.removeEventListener('keydown', onChangeModalPhoto);
    }, []);



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
            <div className='modal__bg'
                style={{ backgroundImage: `url(${singleClothesModal.urls.thumb})` }}
            />
            <div className='modal__item'>
                <img
                    className={'modal__item-img animateOn'}
                    src={singleClothesModal.urls.regular}
                    alt={singleClothesModal.alt_description} />
            </div>
            <div className='modal__carousel'>
                {
                    clothesList.map((carousel, i) => (
                        <div key={carousel.id} className='modal__carousel__items'>
                            <img
                                className='modal__carousel__items-img'
                                src={carousel.urls.thumb}
                                alt={carousel.alt_description}
                                onClick={() => singleClothesModal.id !== carousel.id && dispatch(setModalMainPhoto(i))}
                            />
                            {
                                singleClothesModal.id === carousel.id
                                    && <span className='modal__carousel__items-activeImg' />
                            }
                        </div>
                    ))
                }


            </div>
        </div>
    }
    </>
        );
};

export default Modal;
