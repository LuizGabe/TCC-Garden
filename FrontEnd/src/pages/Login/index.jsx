import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Form } from "react-bootstrap";

import VerifyEmailAndPassword from "../../utils/verifyEmailAndPassword.js";
import { User } from "../../api/user.api.js"
import { UserContext } from "../../context/UserContext.jsx";

import "../../styles/bootstrap-5.3.1-dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const { updateUserContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // para mostrar o spinner
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!VerifyEmailAndPassword({ email, password })) {
      setErrorMessage('Email ou senha inválidos');
      return
    }

    // Exemplo do isLoading
    setIsLoading(true);
    User.login(email, password)
      .then((response) => {
        updateUserContext(response.data.id, response.data.token, response.data.userData);
        console.log(response.data);
        setIsLoading(false);
        setErrorMessage('');
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.response) {
          setErrorMessage(error.response.data.error);
          return
        }
        setErrorMessage('Ocorreu um erro inesperado');
      });
  };

  return (
    <div className="login-container">
      <img src="" alt="" style={{ width: 100, marginBottom: 20 }} />
      <h1 className="login-title">Garden Login</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary" block disabled={isLoading}>
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <p className="h6 text-danger mt-3 text-center">
          {errorMessage}
        </p>
      </Form>
      <div>
        <p>
          Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;