import React, { Component } from 'react';
import API from '../../api';
import { Row, Col, Card, Button, Table, Modal, Container, Tab, Nav } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
import { Link } from 'react-router-dom';

class ShowServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: props.match.params.serviceId,
      service: {
        assets: [],
        participants: []
      },
      modal: false,
      modalType: 'assets',
      saveParticipants: false,
      saveAssets: false,
      listParticipants: false,
      listAssets: false,
      getParticipant: false,
      getAsset: false,
      updateParticipant: false,
      updateAsset: false
    };
    this.toggleParticipantsModal = this.toggleParticipantsModal.bind(this);
    this.toggleAssetsModal = this.toggleAssetsModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleParticipantsModal() {
    this.setState({
      modalType: 'participants',
      modal: !this.state.modal
    });
  }

  toggleAssetsModal() {
    this.setState({
      modalType: 'assets',
      modal: !this.state.modal
    });
  }

  render() {
    const participants = this.state.service.participants.map((participant, index) => {
      return (
        <Col xs={2} key={index}>
          <Card style={{ height: '20rem' }}>
            <Card.Header>
              <Card.Title as="h5">{participant.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul>
                {participant.data.map((input, index) => {
                  return <li key={index}>{input.name}</li>;
                })}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    const assets = this.state.service.assets.map((asset, index) => {
      return (
        <Col xs={2} key={index}>
          <Card style={{ height: '20rem' }}>
            <Card.Header>
              <Card.Title as="h5">{asset.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul>
                {asset.data.map((input, index) => {
                  return <li key={index}>{input.name}</li>;
                })}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <Aux>
        <Modal size="lg" show={this.state.modal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.modalType === 'assets' ? 'Activos' : 'Participantes'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={12}>
                  <h5>Atributos</h5>
                </Col>
                {this.state.modalType === 'assets' ? assets : participants}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.toggleModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  <b>{this.state.service.name}</b>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>{this.state.service.description}</p>
                <hr />
                <Row>
                  <Col md={6}>
                    <center>
                      <Button variant="dark" size="sm" onClick={this.toggleParticipantsModal}>
                        Ver Participantes
                      </Button>
                    </center>
                  </Col>
                  <Col md={6}>
                    <center>
                      <Button variant="dark" size="sm" onClick={this.toggleAssetsModal}>
                        Ver Activos
                      </Button>
                    </center>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4>
              <b>Mis transacciones</b>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Mis contratos inteligentes</Card.Title>
                <Link to={`/dashboard/services/${this.state.serviceId}/NewContract`}>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    style={{ float: 'right' }}
                    onClick={this.toggleAssetsModal}
                  >
                    Crear nuevo
                  </Button>
                </Link>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Contrato 1</th>
                      <td>Este contrato es de ejemplo...</td>
                      <td>
                        <Button variant="dark" size="sm" onClick={this.toggleAssetsModal}>
                          Ver
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />
        <Row>
          <Col>
            <h4>
              <b>Transacciones basicas disponibles</b>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Container>
              <Tab.Container defaultActiveKey="participants">
                <Row>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="participants">
                          <b>Participantes</b>
                        </Nav.Link>
                      </Nav.Item>
                      {this.state.service.participants.map((participant, index) => {
                        return (
                          <Nav.Item>
                            <Nav.Link eventKey={participant.name}>{participant.name}</Nav.Link>
                          </Nav.Item>
                        );
                      })}
                      <Nav.Item>
                        <Nav.Link eventKey="assets">
                          <b>Activos</b>
                        </Nav.Link>
                      </Nav.Item>
                      {this.state.service.assets.map((asset, index) => {
                        return (
                          <Nav.Item>
                            <Nav.Link eventKey={asset.name}>{asset.name}</Nav.Link>
                          </Nav.Item>
                        );
                      })}
                    </Nav>
                  </Col>
                  <Col sm={10}>
                    <Tab.Content>
                      <Tab.Pane eventKey="participants">
                        <p>
                          Aqui podras ver las transacciones basicas que estan disponibles para cada
                          tipo de usuario
                        </p>
                      </Tab.Pane>
                      {this.state.service.participants.map((participant, index) => {
                        return (
                          <Tab.Pane eventKey={participant.name}>
                            <h5>Guardar datos</h5>
                            <p>
                              Para guardar un participante de tipo <b>{participant.name}</b> debes
                              usar la siguiente ruta
                            </p>
                            <b>POST: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/participant/
                              {participant.name}
                            </code>
                            <hr />
                            <h5>Listar datos</h5>
                            <p>
                              Para consultar el listado de participantes de tipo{' '}
                              <b>{participant.name}</b> debes usar la siguiente ruta
                            </p>
                            <b>GET: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/participant/
                              {participant.name}
                            </code>
                            <hr />
                            <h5>Obtener un dato en particular</h5>
                            <p>
                              Para consultar un participante de tipo <b>{participant.name}</b> debes
                              usar la siguiente ruta
                            </p>
                            <b>GET: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/participant/
                              {participant.name}
                              /:id_participant
                            </code>
                            <hr />
                            <h5>Actualizar datos</h5>
                            <p>
                              Para actualizar un participante de tipo <b>{participant.name}</b>{' '}
                              debes usar la siguiente ruta
                            </p>
                            <b>PUT: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/participant/
                              {participant.name}/:id_participant
                            </code>
                            <hr />
                          </Tab.Pane>
                        );
                      })}
                      <Tab.Pane eventKey="assets">
                        <p>
                          Aqui podras ver las transacciones basicas que estan disponibles para cada
                          tipo de activo
                        </p>
                      </Tab.Pane>
                      {this.state.service.assets.map((asset, index) => {
                        return (
                          <Tab.Pane eventKey={asset.name}>
                            <h5>Guardar datos</h5>
                            <p>
                              Para guardar un activo de tipo <b>{asset.name}</b> debes usar la
                              siguiente ruta
                            </p>
                            <b>POST: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/asset/
                              {asset.name}
                            </code>
                            <hr />
                            <h5>Listar datos</h5>
                            <p>
                              Para consultar el listado de activos de tipo <b>{asset.name}</b> debes
                              usar la siguiente ruta
                            </p>
                            <b>GET: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/asset/
                              {asset.name}
                            </code>
                            <hr />
                            <h5>Obtener un dato en particular</h5>
                            <p>
                              Para consultar un activo de tipo <b>{asset.name}</b> debes usar la
                              siguiente ruta
                            </p>
                            <b>GET: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/asset/
                              {asset.name}
                              /:id_activo
                            </code>
                            <hr />
                            <h5>Actualizar datos</h5>
                            <p>
                              Para actualizar un activo de tipo <b>{asset.name}</b> debes usar la
                              siguiente ruta
                            </p>
                            <b>PUT: </b>{' '}
                            <code>
                              http://localhost:4000/service/{this.state.serviceId}/asset/
                              {asset.name}/:id_activo
                            </code>
                            <hr />
                          </Tab.Pane>
                        );
                      })}
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab.Container>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default ShowServicePage;
