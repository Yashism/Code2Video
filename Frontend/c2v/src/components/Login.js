import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { signInWithGoogle } from "../Firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../Login.css";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Login succesful");
    } catch {
      setError("Failed to sign in");
      console.log("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <div className="wrapper">
            <div className="card-switch">
              <label className="switch">
                <input className="toggle" type="checkbox" />
                <span className="slider"></span>
                <span className="card-side"></span>
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <div className="title">Log in</div>
                    <Form>
                      <Form.Group controlId="email">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          ref={emailRef}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passwordRef}
                          required
                        />
                      </Form.Group>
                      <Button className="flip-card__btn" type="submit">
                        Let`s go!
                      </Button>
                      <Link to="/ForgotPassword">Forgot Password?</Link>
                      <Link to="/Signup">Sign Up</Link>
                    </Form>
                  </div>
                  <div className="flip-card__back">
                    <div className="title">Sign up</div>
                    <Form>
                      <Form.Group controlId="name">
                        <Form.Control type="name" placeholder="Name" required />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          ref={emailRef}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passwordRef}
                          required
                        />
                      </Form.Group>
                      <Button className="flip-card__btn">Confirm!</Button>
                    </Form>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
