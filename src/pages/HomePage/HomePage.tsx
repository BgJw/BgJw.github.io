import { useEffect } from "react";
import MainContent from "../../components/MainContent/MainContent";
import PreviewGallery from "../../components/PreviewGallery/PreviewGallery";
import { useAppDispatch } from "../../Hooks/useDispatch_Selector";
import { fetchClothes } from "../../Slices/PreviewGallerySlice";

import { Helmet } from "react-helmet";
const HomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchClothes());

    }, []);

    return (
        <>
            <Helmet>
                <title>O Stories</title>
            </Helmet>

            <PreviewGallery />
            <MainContent />
        </>
    );
};

export default HomePage;