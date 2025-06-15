import React from 'react';
import logo from '../../images/logo.png';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="xxl" className="sticky-top" style={{ backgroundColor: 'white', padding: '10px 0', height: '80px' }}>
      <Container fluid className="px-5 d-flex justify-content-between align-items-center">

        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Athena Agency" height="70px" />
        </Link>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-4">
            <a className="nav-link text-dark" href="#home">Home</a>
            <a className="nav-link text-dark" href="#about">About</a>
            <a className="nav-link text-dark" href="#services">Services</a>
            <a className="nav-link text-dark" href="#pricing">Pricing</a>
            
            {/* Login Button */}
            <button className="global-btn" onClick={handleLoginClick}>
              Login
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;