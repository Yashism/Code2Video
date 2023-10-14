// import React, { useRef, useState } from "react";
// import { Form, Button, Card } from "react-bootstrap";
// import { signInWithGoogle } from "../Firebase";
// import { useAuth } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";
// import "../Login.css";

// export default function Login() {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const { login } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setError("");
//       setLoading(true);
//       await login(emailRef.current.value, passwordRef.current.value);
//       console.log("Login succesful");
//     } catch {
//       setError("Failed to sign in");
//       console.log("Failed to sign in");
//     }
//     setLoading(false);
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Login</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Button className="w-100" type="submit">
//               Login
//             </Button>
//             <Button className="w-100" onClick={signInWithGoogle}>
//               Sign In With Google
//             </Button>
//           </Form>
//           <div className="w-100 text-center mt-3">
//             <Link to="/ForgotPassword">Forgot Password?</Link>
//           </div>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Need an account? <Link to="/Signup">Sign Up</Link>
//       </div>
//     </>
//   );
// }
