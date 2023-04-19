import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import FilterPage from "../pages/FilterPage/FilterPage";
import ComparePage from "../pages/ComparePage/ComparePage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SingleProduct from "../pages/SingleProductPage/SingleProduct";

const Routes = () => {
    const routes = useRoutes([
        { path: '/*', element: <HomePage /> },
        { path: '/compare', element: <ComparePage /> },
        { path: '/favorites',element: <FavoritesPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/product/:productId', element: <SingleProduct /> },
        { path: '/filter', element: <FilterPage /> },
        { path: '*', element: <NotFoundPage /> },
    ]);

    return routes;
};

export default Routes;