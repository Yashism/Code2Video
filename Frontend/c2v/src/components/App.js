import React from "react";
import { Container } from "react-bootstrap";
import "../App.css"; // Import the CSS
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
// import Home from "./Home";
import Create from "./Create";
// import Hello from "./hello";
import Projects from "./Projects";
import UserSettings from "./Settings";
import { useAuth } from "../contexts/AuthContext";
import CustomNavbar from "./Navbar";


function DefaultComponent() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Navigate to="/projects" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomNavbar /> {/* Navbar at the top of the page */}
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Routes>
              <Route path="/" element={<DefaultComponent />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/create"
                element={<PrivateRoute element={<Create />} />}
              />
              <Route
                path="/projects"
                element={<PrivateRoute element={<Projects />} />}
              />
              <Route path="/settings" element={<UserSettings />} />
            </Routes>
          </div>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
