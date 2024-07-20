import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import VisitorsReport from './Pages/VisitorsReport';
import ManagersLogin from './Pages/ManagersLogin';
import VisitorsSign from './Pages/VisitorsSign';
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage';
import SideNav from './Component/SideNav';
import Managers from './Pages/Managers';




function  App (){
  return (
    <div className="App">
    <BrowserRouter>
    <SideNav/>
        <Routes>
      
        
        <Route path='Main'element={<MainLayout/>}/>
        <Route path='/'element={<HomePage/>}/>
        <Route path='visit' element={<VisitorsSign/>}/>
        <Route path='visitor' element={<VisitorsReport/>}/>
        <Route path='manager'element={<ManagersLogin/>}/>
        <Route path='managers' element={<Managers/>}/>
      
        
               
         </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App



