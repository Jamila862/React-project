import React, { useState } from 'react';
import './HomePage.css';
import img002 from './../asset/images/build1.jpeg';
import img003 from './../asset/images/build2.jpeg'; 
import img004 from './../asset/images/build.jpeg'; 

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(img002); 

  
  const handleMouseEnter = () => {
    setCurrentImage(img003);
  };

  
  const handleMouseLeave = () => {
    setCurrentImage(img002);
  };

  
  const handleClick = () => {
    setCurrentImage(currentImage === img002 ? img004 : img002);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <marquee>Welcome Visitors to Our University</marquee>
      </header>
      <section className="homepage-content">
        <p>The Suza Visitors Management System</p>
        <p>A Visitor Management System (VMS) is a digital tool that streamlines the process of registering, tracking, and managing visitors to our facility.</p>
      </section>
      <div className="home_img" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src={currentImage} alt='Building' />
      </div>
      <footer className="homepage-footer">
        <marquee>© 2024 Suza Visitors Management</marquee>
      </footer>
    </div>
  );
};

export default HomePage;
