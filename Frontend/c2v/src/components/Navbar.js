// Navbar.js
import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../Navbar.css"; // Import the CSS
import logoImage from "./image1.png";


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
               <svg
                  style={{ color: 'rgb(58, 253, 195)', marginRight: '5px' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-play-btn-fill"
                  viewBox="0 0 18 18"
               >
                  <path
                     d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                     fill="#3afdc3"
                  ></path>
               </svg>

               Code2Video
            </Navbar.Brand>
            <Nav.Link as={Link} to="/Home">
               Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Projects">
               Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/Create" style={{ paddingRight: '140px' }}>
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
