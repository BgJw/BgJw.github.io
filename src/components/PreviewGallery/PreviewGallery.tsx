import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { showModal, setModalMainPhoto } from '../../Slices/PreviewGallerySlice';
import { Status } from '../../types/Types';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';
import './PreviewGallery.scss';

const PreviewGallery = () => {

    const dispatch = useAppDispatch();
    const { clothesList, isOpenModal, status } = useAppSelector(state => state.PreviewGallerySlice);
    const [scrollMove, setScrollMove] = useState(false);
    
    const divRef = useRef<HTMLDivElement>(null);
    let interval: ReturnType<typeof setInterval>;
    let left = 0;
    let right = 0;

    const scrollGallery = useCallback((): void => {

        if (!scrollMove) {
            const el = divRef.current as Element;

            if (el) {
                if (left <= el.scrollWidth - el.clientWidth) {
                    el.scrollTo({ top: 0, left: left });
                    left += 1;
                    right = left;
                } else {
                    right -= 1;
                    el.scrollTo({ top: 0, left: right });
                    if (right <= 0) {
                        left = right;
                    }
                }
            }
        }
    }, [left, right]);


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        interval = setInterval(scrollGallery, 30);

        return () => clearInterval(interval);
    }, [scrollMove])

    isOpenModal ?
        document.body.style.overflow = 'hidden' :
        document.body.style.overflow = '';

    return (
        <>
        
            {status === Status.loading && <Spinner />}
            {status === Status.error && <p> pls reload </p>}
            {status === Status.idle &&
                <>
                    <div className='gallery'
                        ref={divRef}
                        onMouseMove={() => setScrollMove(true)}
                        onMouseLeave={() => setScrollMove(false)}
                    >
                        <div className='gallery__panel' >
                            {
                                clothesList.map(photo => (
                                    <div
                                        key={photo.id} 
                                        className='gallery__panel__item'>
                                        
                                        <img 
                                            onMouseMove={() => clearInterval(interval)}
                                            className='gallery__panel__item-img'
                                            onClick={() => {
                                                dispatch(showModal());
                                                dispatch(setModalMainPhoto(photo))
                                            }}
                                            src={photo.urls.thumb}
                                            alt={photo.alt_description} 
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {isOpenModal && <Modal />}
                </>
            }
        </>
    );
};

export default PreviewGallery;
