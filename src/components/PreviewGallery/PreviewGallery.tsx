import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { showModal, setModalMainPhoto, fetchClothes } from '../../Slices/PreviewGallerySlice';
import { Status } from '../../types/Types';
import Spinner from '../Spinner/Spinner';
import './PreviewGallery.scss';

const PreviewGallery = memo(() => {
    const dispatch = useAppDispatch();
    const clothesList = useAppSelector(state => state.PreviewGallerySlice.clothesList);
    const status = useAppSelector(state => state.PreviewGallerySlice.status);

    useEffect(() => {
        dispatch(fetchClothes());
    }, []);

    return (
        <div className="gallery">
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
                                className="gallery__panel__item-img lazy"
                                onClick={() => {
                                    dispatch(showModal());
                                    dispatch(setModalMainPhoto(i));
                                }}
                                src={photo.urls.thumb}
                                data-src={photo.urls.small}
                                alt={photo.alt_description}
                                width={200}
                                height={240}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default PreviewGallery;
