import {lazy, Suspense, useEffect, useState} from 'react';
import Header from './components/Header/Header';
import { useAppDispatch } from './Hooks/useDispatch_Selector';
import { fetchClothesForMan, fetchClothesForWoman } from './Slices/ProductSlice';
import { isCheckLocalStorage } from './Slices/BadgeSlice';
import Sidebar from './components/Sidebar/Sidebar';
import Routes from './routes';
import './app.scss';

const LazyFooter = lazy(() => import('./components/Footer/Footer'));
const LazyModal = lazy(() => import('./components/Modal/Modal'));

const App = () =>  {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

useEffect(()=> {
  dispatch(fetchClothesForMan());
  dispatch(fetchClothesForWoman());
  dispatch(isCheckLocalStorage()); 
}, []);
  
  return (

    <div className="app">
        
        <Header 
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar} 
        />       
        {showSidebar && <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}  /> }

        <Routes />
      <Suspense>
        <LazyModal />
        <LazyFooter />
      </Suspense>
    </div>

  );
}

export default App;
