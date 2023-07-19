import {useEffect, useState} from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useAppDispatch } from './Hooks/useDispatch_Selector';
import { fetchClothesForMan, fetchClothesForWoman } from './Slices/ProductSlice';
import { isCheckLocalStorage } from './Slices/BadgeSlice';
import Sidebar from './components/Sidebar/Sidebar';
import Routes from './routes';
import './app.scss';
import Modal from './components/Modal/Modal';

const App = () =>  {
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

useEffect(()=> {
  dispatch(fetchClothesForMan());
  dispatch(fetchClothesForWoman());
  dispatch(isCheckLocalStorage()); 
}, []);
  console.log('render app');
  
  return (

    <div className="app">
        
        <Header 
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar} 
        />       
        {showSidebar && <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}  /> }

        <Routes />

        <Footer />
        <Modal />
    </div>

  );
}

export default App;
