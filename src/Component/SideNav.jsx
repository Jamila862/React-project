import React, { useState } from 'react';
import './SideNav.css';

const SideNav = () => {
  const [navWidth, setNavWidth] = useState(0);

  const openNav = () => {
    setNavWidth(250);
  };

  const closeNav = () => {
    setNavWidth(0);
  };

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: navWidth }}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="/">HomePage</a>
        <a href="Visit">VisitorsSign</a>
        <a href="manager">ManagersLogin</a>
        <a href="visitor">VisitorsReport</a>
        
        
      </div>
      <span className="openbtn" onClick={openNav}>
        &#9776;
      </span>
    </div>
  );
};

export default SideNav;

