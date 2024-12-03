import MainContent from "../../components/MainContent/MainContent";
import PreviewGallery from "../../components/PreviewGallery/PreviewGallery";

import { Helmet } from "react-helmet";
const HomePage = () => {


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