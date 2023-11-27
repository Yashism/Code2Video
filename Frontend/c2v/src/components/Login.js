import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { signInWithGoogle } from "../Firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../Login.css";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/Projects");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Login succesful");
      navigate("/Projects");
    } catch (error) {
      console.error("Failed to sign in: ", error.message);
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="wrapper" style={{ paddingTop: "200px" }}>
      <div className="flip-card__inner">
        <div className="flip-card__front">
          <div className="title">Login</div>
          <form onSubmit={handleSubmit} className="flip-card__form">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="flip-card__input"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="flip-card__input"
              ref={passwordRef}
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
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </form>

          <div className="link-container">
            <Link
              onClick={signInWithGoogle}
              type="submit"
              className="already_acc"
              disabled={loading}
            >
              Sign In With Google
            </Link>
            <Link
              to="/Signup"
              className="already_acc"
              style={{ color: "#fff" }}
            >
              Sign Up
            </Link>
            <Link
              to="/ForgotPassword"
              className="already_acc"
              style={{
                color: "#fff",
                textAlign: "center",
                margin: "20px 0 20px 0",
                width: " 220px",
                height: "50px ",
              }}
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
