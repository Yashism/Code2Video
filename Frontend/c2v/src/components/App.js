import React from "react";
import { Container } from "react-bootstrap";
import "../App.css"; // Import the CSS
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Create from "./Create";
import Projects from "./Projects";
import { useAuth } from "../contexts/AuthContext";


function DefaultComponent() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Navigate to="/Projects" replace />
  ) : (
    <Navigate to="/Login" replace />
  );
}

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<DefaultComponent />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/Projects" element={<Projects />} />

              {/* Use PrivateRoute within a Route */}
              <Route
                path="/Home"
                element={<PrivateRoute element={<Home />} />}
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
