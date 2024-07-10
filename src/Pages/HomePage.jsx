import React from 'react';
import './HomePage.css';
import img002 from './../asset/images/build1.jpeg';         

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <marquee>Welcome Visitors to Our University</marquee>
      </header>
      <section className="homepage-content">
        <p>The suza visitors management system </p>
        <p>A Visitor Management System (VMS) is a digital tool that streamlines the process of registering, tracking, and managing visitors to our facility. </p>
      </section>
      <div className="home_img">
      <img src={img002} alt='build1'></img>                                                                                                                                     '
      </div>
      <footer className="homepage-footer">
        <marquee>© 2024 Suza Visitors Management </marquee>
      </footer>
    </div>
  );
};

export default HomePage;