import React from "react";
import "../App.css";
// import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

function Navigation() {
  return (
    <div className="  ">

    
    <Navbar
      collapseOnSelect
      className=" navigation"
      expand="lg"
      bg="none"
      variant="dark"
      
    >
      <div className="container">
      <Navbar.Brand className="myLogo" href="/"><i class="fab fa-youtube"></i> YouTube</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link style={{}}  className="aboutLink" href="/">My uploads</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
    </div>
  );
}

export default Navigation;