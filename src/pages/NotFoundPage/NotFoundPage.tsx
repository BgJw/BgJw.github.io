import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import './NotFoundPage.scss';

const NotFoundPage = () => {
    return (
        <div className="errorPage">
            <Helmet>
                <title>Not Found Page</title>
            </Helmet>
            <div>
                <p>404, pls return to Home Page</p>
                <Link to={'/'}>
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;