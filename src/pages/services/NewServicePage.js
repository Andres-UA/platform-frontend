import React, { Component } from 'react';
import API from '../../api';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Aux from '../../hoc/_Aux';

class NewServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      inputsValues: [{ name: '', type: 'Numero', isRequired: false, default: '' }]
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.handleInputNameChange = this.handleInputNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInputTypeChange = this.handleInputTypeChange.bind(this);
    this.handleInputRequiredChange = this.handleInputRequiredChange.bind(this);
    this.handleInputDefaultChange = this.handleInputDefaultChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleInputNameChange = index => event => {
    const newInputsValues = this.state.inputsValues.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, name: event.target.value };
    });
    this.setState({ inputsValues: newInputsValues });
  };

  handleInputTypeChange = index => event => {
    const newInputsValues = this.state.inputsValues.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, type: event.target.value };
    });
    this.setState({ inputsValues: newInputsValues });
  };

  handleInputRequiredChange = index => event => {
    const newInputsValues = this.state.inputsValues.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, isRequired: event.target.checked };
    });
    this.setState({ inputsValues: newInputsValues });
  };

  handleInputDefaultChange = index => event => {
    const newInputsValues = this.state.inputsValues.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, default: event.target.value };
    });
    this.setState({ inputsValues: newInputsValues });
  };

  onAddItem() {
    this.setState(state => {
      const inputsValues = state.inputsValues.concat({ name: '', type: 'Numero', isRequired: false, default: '' });
      return {
        inputsValues
      };
    });
  }

  onSubmit(event) {
    event.preventDefault();

    API.post(`service/`, { name: this.state.name, description: this.state.description, model_schema: this.state.inputsValues })
      .then(res => {
        const _id = res.data.id;
        this.context.router.history.push(`/dashboard/services/${_id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const inputs = this.state.inputsValues.map((input, index) => {
      return (
        <Row key={index}>
          <Col md={3}>
            <Form.Group>
              <Form.Control
                type="text"
                name={`name-${index}`}
                id={`name-${index}`}
                data-context="input"
                value={input.name}
                onChange={this.handleInputNameChange(index)}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Control
                as="select"
                type="text"
                name={`type-${index}`}
                id={`type-${index}`}
                data-context="input"
                value={input.type}
                onChange={this.handleInputTypeChange(index)}
              >
                <option>Numero</option>
                <option>Cadena</option>
                <option>Fecha</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={3}>
            <center>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  name={`required-${index}`}
                  id={`required-${index}`}
                  data-context="input"
                  checked={input.isRequired}
                  onChange={this.handleInputRequiredChange(index)}
                />
              </Form.Group>
            </center>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Control
                type="text"
                name={`default-${index}`}
                id={`default-${index}`}
                data-context="input"
                value={input.default}
                onChange={this.handleInputDefaultChange(index)}
              />
            </Form.Group>
          </Col>
        </Row>
      );
    });

    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Nuevo servicio</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nombre del servicio</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.handleNameChange} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Descripcion del servicio</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.description} onChange={this.handleDescriptionChange} />
                  </Form.Group>

                  <p>Modelo de datos</p>

                  <Row>
                    <Col md={3}>
                      <center>
                        <Form.Group>
                          <Form.Label>Nombre del campo</Form.Label>
                        </Form.Group>
                      </center>
                    </Col>
                    <Col md={3}>
                      <center>
                        <Form.Group>
                          <Form.Label>Tipo de dato del campo</Form.Label>
                        </Form.Group>
                      </center>
                    </Col>

                    <Col md={3}>
                      <center>
                        <Form.Group>
                          <Form.Label>Es requerido?</Form.Label>
                        </Form.Group>
                      </center>
                    </Col>

                    <Col md={3}>
                      <center>
                        <Form.Group>
                          <Form.Label>Valor por defecto</Form.Label>
                        </Form.Group>
                      </center>
                    </Col>
                  </Row>
                  {inputs}

                  <Button variant="success" onClick={this.onAddItem}>
                    Nuevo campo
                  </Button>
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
        <Row></Row>
      </Aux>
    );
  }
}

export default NewServicePage;
