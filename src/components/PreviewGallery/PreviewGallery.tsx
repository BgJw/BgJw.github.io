import { memo, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { showModal, setModalMainPhoto } from '../../Slices/PreviewGallerySlice';
import { Status } from '../../types/Types';
import Spinner from '../Spinner/Spinner';
import './PreviewGallery.scss';

const PreviewGallery = memo(() => {
    const dispatch = useAppDispatch();
    const clothesList = useAppSelector(state => state.PreviewGallerySlice.clothesList);
    const status = useAppSelector(state => state.PreviewGallerySlice.status);

    const divRef = useRef<HTMLDivElement>(null);
    let interval: ReturnType<typeof setInterval>;
    let left = 0;
    let right = 0;

    const scrollGallery = useCallback((): void => {
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
    }, [left, right]);

    useEffect(() => {
        interval = setInterval(scrollGallery, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gallery" ref={divRef}>
            {status === Status.loading && (
                <div className="gallery__status">
                    <Spinner />
                </div>
            )}

            {status === Status.error && (
                <div className="gallery__status">
                    <p>Pls reload page</p>
                </div>
            )}

            {status === Status.idle && (
                <div className="gallery__panel">
                    {clothesList.map((photo, i) => (
                        <div key={photo.id} className="gallery__panel__item">
                            <img
                                className="gallery__panel__item-img"
                                onClick={() => {
                                    dispatch(showModal());
                                    dispatch(setModalMainPhoto(i));
                                }}
                                src={photo.urls.thumb}
                                alt={photo.alt_description}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default PreviewGallery;
