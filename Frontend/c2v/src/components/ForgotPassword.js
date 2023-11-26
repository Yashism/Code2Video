import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../ForgotPassword.css";

export default function ForgotPassword() {
  const emailRef = useRef(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current) {
      const email = emailRef.current.value;

      try {
        setMessage("");
        setError("");
        setLoading(true);
        await resetPassword(email);
        setMessage("Check your inbox for further instructions");
      } catch (error) {
        setError("Failed to reset password: ");
        console.error("Error message: " + error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="flip-card__inner">
        <div className="flip-card__front">
          <div className="title">Reset Password</div>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit} className="flip-card__form">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="flip-card__input"
              ref={emailRef}
              required
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="flip-card__btn"
              disabled={loading}
            >
              Confirm
            </button>
          </form>
          <div className="link-container">
            <Link
              to="/signup"
              className="already_acc"
              style={{ color: "#fff" }}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="already_acc"
              style={{
                color: "#fff",
                textAlign: "center",
                margin: "20px 0 20px 0",
                width: " 220px",
                height: "50px ",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
