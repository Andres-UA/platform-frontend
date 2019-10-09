import React, { Component } from 'react';
import API from '../../api';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';

class ShowServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: props.match.params.serviceId,
      service: {
        model_schema: []
      }
    };
  }

  componentDidMount() {
    API.get(`service/${this.state.serviceId}`)
      .then(res => {
        this.setState({ service: res.data });
      })
      .catch(err => {
        console.log('error: ' + err);
      });
  }

  render() {
    const inputs = this.state.service.model_schema.map((model, id) => {
      return (
        <tr key={id}>
          <th>
            <center>{model.name}</center>
          </th>
          <td>
            <center>{model.type}</center>
          </td>
          <td>
            <center>{model.isRequired ? 'Si' : 'No'}</center>
          </td>
          <td>
            <center>{model.default}</center>
          </td>
        </tr>
      );
    });

    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">{this.state.service.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>{this.state.service.description}</p>
                <br />
                <b>Modelo de datos</b>
                <br />
                <br />

                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        <center>Nombre del campo</center>
                      </th>
                      <th>
                        <center>Tipo de dato</center>
                      </th>
                      <th>
                        <center>Requerido?</center>
                      </th>
                      <th>
                        <center>Valor por defecto</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{inputs}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Contratos inteligentes disponibles</h5>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Guardar un dato</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras almacenar datos en la blockchain.</p>
                <p>POST: </p> <code>http://localhost:4000/service/{this.state.serviceId}</code>
                <br />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Consultar listado de datos</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
                <p>GET: </p> <code>http://localhost:4000/service/{this.state.serviceId}</code>
                <br />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Consultar un dato</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras consultar un dato en la blockchain dado su id.</p>
                <p>GET: </p> <code>http://localhost:4000/service/{this.state.serviceId}/:id_dato</code>
                <br />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default ShowServicePage;
