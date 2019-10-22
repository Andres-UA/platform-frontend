import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import Aux from '../../hoc/_Aux';
import API from '../../api';
import 'react-toastify/dist/ReactToastify.css';

class NewUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      email: '',
      password: '',
      type: '',
      nameError: false,
      idError: false,
      emailError: false,
      passwordError: false,
      typeError: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleNameChange(event) {
    this.setState({ name: event.target.value, nameError: false });
  }

  handleIdChange(event) {
    this.setState({ id: event.target.value, idError: false });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, emailError: false });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value, passwordError: false });
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value, typeError: false });
  }

  onSubmit(event) {
    event.preventDefault();

    let isCorrect = true;

    if (this.state.name === '' || this.state.name.length <= 6) {
      isCorrect = false;
      toast.error('Es necesario que el usuario tenga un nombre de más de 6 caracteres.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
      });
      this.setState({
        nameError: true
      });
    }

    if (this.state.id === '' || this.state.id.length <= 6) {
      isCorrect = false;
      toast.error('Es necesario que el usuario tenga una identificación de más de 6 caracteres.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
      });
      this.setState({
        idError: true
      });
    }

    if (this.state.email === '' || this.state.email.length <= 6) {
      isCorrect = false;
      toast.error(
        'Es necesario que el usuario tenga un correo electronico de más de 6 caracteres.',
        {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false
        }
      );
      this.setState({
        emailError: true
      });
    }

    if (this.state.type === 'Seleccione una opción') {
      isCorrect = false;
      toast.error('Es necesario que el usuario tenga un tipo de usuario definido.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
      });
      this.setState({
        typeError: true
      });
    }

    if (this.state.password === '' || this.state.password.length <= 6) {
      isCorrect = false;
      toast.error('Es necesario que el usuario tenga una contraseña de más de 6 caracteres.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
      });
      this.setState({
        passwordError: true
      });
    }

    if (isCorrect) {
      API.post(`user/`, {
        name: this.state.name,
        identification: this.state.id,
        email: this.state.email,
        type: this.state.type,
        password: this.state.password
      })
        .then(res => {
          // const _id = res.data.id;
          this.context.router.history.push(`/dashboard/users/`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <h3>Nuevo Usuario</h3>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Datos Basicos</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                      isInvalid={this.state.nameError}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Documento de identidad</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.id}
                      onChange={this.handleIdChange}
                      isInvalid={this.state.idError}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Correo electronico</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      isInvalid={this.state.emailError}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tipo de usuario</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      value={this.state.type}
                      onChange={this.handleTypeChange}
                      isInvalid={this.state.typeError}
                    >
                      <option>Seleccione una opción</option>
                      <option value="admin">Administrador</option>
                      <option value="user">Usuario</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      isInvalid={this.state.passwordError}
                      required
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <center>
                  <Button variant="primary" onClick={this.onSubmit}>
                    Crear
                  </Button>
                </center>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
        />
      </Aux>
    );
  }
}

export default NewUserPage;
