import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

// Styles
import "./register.css";
import "../../styles/bootstrap-5.3.1-dist/css/bootstrap.min.css";

// API
import { User } from "../../api/user.api.js"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, name);

    // Exemplo do isLoading
    setIsLoading(true);
    User.register(email, password, name)

      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setErrorMessage("");
        setSucessMessage('Conta registrada com sucesso!');
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
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
    <div className="register-container">

      <h1 className="register-title">Garden Register</h1>
      <Form onSubmit={handleSubmit} className="register-form">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEmail">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
        </Row>
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
              ></span>
              Registrando...
            </>
          ) : (
            "Registre-se"
          )}
        </Button>

        <p className="h6 text-danger mt-3 text-center">
          {errorMessage}
        </p>
        <p className="h6 text-success mt-3 text-center">
          {sucessMessage}
        </p>
      </Form>
      <div>
        <p>
          Já tem uma conta? <a href="/login">Entre</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
