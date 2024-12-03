import { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { useAppDispatch } from './Hooks/useDispatch_Selector';
import { isCheckLocalStorage } from './Slices/BadgeSlice';
import Routes from './routes';
import LazyLoadImages from './components/LazyLoadImages';
import './app.scss';

const LazyFooter = lazy(() => import('./components/Footer/Footer'));
const LazyModal = lazy(() => import('./components/Modal/Modal'));
const LazySidebar = lazy(() => import('./components/Sidebar/Sidebar')); 

const App = () => {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    dispatch(isCheckLocalStorage());
  }, [dispatch]);

  return (
    <div className="app">
      <Header 
        setShowSidebar={setShowSidebar} 
        showSidebar={showSidebar} 
      />

      <Suspense fallback={<div>Loading Sidebar...</div>}>
        {showSidebar && <LazySidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />}
      </Suspense>

      <Routes />
      <LazyLoadImages />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyModal />
        <LazyFooter />
      </Suspense>
    </div>
  );
}

export default App;
