// Navbar.js
import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../Navbar.css"; // Import the CSS

const HomeIcon = (
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
   </svg>
);

const ProjectsIcon = (
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
   </svg>
);

const CreateIcon = (
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
   </svg>
);

const NavBtnLink = ({ to, children, ...rest }) => (
   <Link to={to} className="nav-btn-link" {...rest}>
      {children}
   </Link>
);

const CustomNavbar = () => {
   const { currentUser } = useAuth();

   return (
      <Navbar className="full-width">
         <Nav className="mr-auto">
            <Navbar.Brand
               as={Link}
               to="/"
               className="d-flex align-items-center"
               style={{ paddingRight: '290px', paddingLeft: '20px' }}
            >

               Code2Video
            </Navbar.Brand>
            <Nav.Link as={Link} to="/Home">
               {HomeIcon}
               <span style={{ marginLeft: '5px' }}></span>
               Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Projects">
               {ProjectsIcon}
               <span style={{ marginLeft: '5px' }}></span>
               Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/Create" style={{ paddingRight: '140px' }}>
               {CreateIcon}
               <span style={{ marginLeft: '5px' }}></span>
               Create
            </Nav.Link>
            {currentUser ? (
               <>
                  <Nav.Link as={Link} to="/Settings">
                     {currentUser.email}
                  </Nav.Link>
                  <NavBtnLink to='/Logout' className="nav-btn-link-logout">
                     Logout
                  </NavBtnLink>
               </>
            ) : (
               <>
                  <Nav.Link as={Link} to="/Signup">
                     Sign Up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Login" style={{ paddingRight: '10px' }}>
                     Log In
                  </Nav.Link>
               </>
            )}
         </Nav>
      </Navbar>
   );
};

export default CustomNavbar;
