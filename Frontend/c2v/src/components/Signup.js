import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../Signup.css";

export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/Home");
    } catch {
      console.error("Failed to create an account:", error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="wrapper" style={{ paddingTop: "200px" }}>
      <div className="flip-card__inner">
        <div className="flip-card__front">
          <div className="title">Sign Up</div>
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="password-confirm"
              className="flip-card__input"
              ref={passwordConfirmRef}
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
            <Link to="/Login" className="already_acc" style={{ color: "#fff" }}>
              Already have an account?
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
