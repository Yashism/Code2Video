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
import Home from "./Home";
import Create from "./Create";
// import Hello from "./hello";
import Projects from "./Projects";
import UserSettings from "./Settings";
import { useAuth } from "../contexts/AuthContext";


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
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<DefaultComponent />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* <Route path="/Create" element={<Create />} />
              <Route path="/Projects" element={<Projects />} /> */}
              <Route path="/settings" element={<UserSettings />} />


              {/* Use PrivateRoute within a Route */}
              <Route
                path="/create"
                element={<PrivateRoute element={<Create />} />}
                // element={<PrivateRoute element={<Hello />} />}
              />
              <Route
                path="/projects"
                element={<PrivateRoute element={<Projects />} />}
              />
              {/* <Route
                path="/home"
                element={<PrivateRoute element={<Home />} />}
              /> */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
