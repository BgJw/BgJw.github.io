import { useRoutes } from "react-router-dom";
import { Suspense, lazy, memo } from "react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const FilterPage = lazy(() => import("../pages/FilterPage/FilterPage"));
const ComparePage = lazy(() => import("../pages/ComparePage/ComparePage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage/FavoritesPage"));
const CartPage = lazy(() => import("../pages/CartPage/CartPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const SingleProduct = lazy(() => import("../pages/SingleProductPage/SingleProduct"));

const Routes = memo(() => {
    const routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/compare', element: <ComparePage /> },
        { path: '/favorites', element: <FavoritesPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/product/:productId', element: <SingleProduct /> },
        { path: '/filter', element: <FilterPage /> },
        { path: '*', element: <NotFoundPage /> },
    ]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {routes}
        </Suspense>
    );
});

export default Routes;
