import React, { Component } from 'react';
import API from '../../api';
import { Row, Col, Card, Button, Collapse, Modal, Container, Form } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';

class ShowServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: props.match.params.serviceId,
      service: {
        assets: [],
        participants: [],
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
      updateAsset: false,
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
      modal: !this.state.modal,
    });
  }

  toggleParticipantsModal() {
    this.setState({
      modalType: 'participants',
      modal: !this.state.modal,
    });
  }

  toggleAssetsModal() {
    this.setState({
      modalType: 'assets',
      modal: !this.state.modal,
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

    const transactionsToSaveParticipants = this.state.service.participants.map(
      (participant, index) => {
        return (
          <Col md={6} xl={4} key={index}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  Guardar un participante de tipo <b>{participant.name}</b>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras almacenar datos en la blockchain.</p>
                <p>POST: </p>{' '}
                <code>
                  http://localhost:4000/service/{this.state.serviceId}/participant/
                  {participant.name}
                </code>
                <br />
              </Card.Body>
            </Card>
          </Col>
        );
      },
    );

    const transactionsToSaveAssets = this.state.service.assets.map((asset, index) => {
      return (
        <Col md={6} xl={4} key={index}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                Guardar un participante de tipo <b>{asset.name}</b>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Con esta ruta podras almacenar datos en la blockchain.</p>
              <p>POST: </p>{' '}
              <code>
                http://localhost:4000/service/{this.state.serviceId}/asset/{asset.name}
              </code>
              <br />
            </Card.Body>
          </Card>
        </Col>
      );
    });

    const transactionsToListParticipants = this.state.service.participants.map(
      (participant, index) => {
        return (
          <Col md={6} xl={4} key={index}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  Consultar el listado de participantes de tipo <b>{participant.name}</b>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
                <p>GET: </p>{' '}
                <code>
                  http://localhost:4000/service/{this.state.serviceId}/participant/
                  {participant.name}
                </code>
                <br />
              </Card.Body>
            </Card>
          </Col>
        );
      },
    );

    const transactionsToListAssets = this.state.service.assets.map((asset, index) => {
      return (
        <Col md={6} xl={4} key={index}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                Consultar el listado de participantes de tipo <b>{asset.name}</b>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
              <p>GET: </p>{' '}
              <code>
                http://localhost:4000/service/{this.state.serviceId}/asset/
                {asset.name}
              </code>
              <br />
            </Card.Body>
          </Card>
        </Col>
      );
    });

    const transactionsToGetParticipant = this.state.service.participants.map(
      (participant, index) => {
        return (
          <Col md={6} xl={4} key={index}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  Consultar un participante de tipo <b>{participant.name}</b>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
                <p>GET: </p>{' '}
                <code>
                  http://localhost:4000/service/{this.state.serviceId}/participant/
                  {participant.name}
                  /:id_participant
                </code>
                <br />
              </Card.Body>
            </Card>
          </Col>
        );
      },
    );

    const transactionsToGetAsset = this.state.service.assets.map((asset, index) => {
      return (
        <Col md={6} xl={4} key={index}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                Consultar un activo de tipo <b>{asset.name}</b>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
              <p>GET: </p>{' '}
              <code>
                http://localhost:4000/service/{this.state.serviceId}/asset/{asset.name}/:id_activo
              </code>
              <br />
            </Card.Body>
          </Card>
        </Col>
      );
    });

    const transactionsToUpdateParticipant = this.state.service.participants.map(
      (participant, index) => {
        return (
          <Col md={6} xl={4} key={index}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  Actualizar un participante de tipo <b>{participant.name}</b>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
                <p>PUT: </p>{' '}
                <code>
                  http://localhost:4000/service/{this.state.serviceId}/participant/
                  {participant.name}/:id_participant
                </code>
                <br />
              </Card.Body>
            </Card>
          </Col>
        );
      },
    );

    const transactionsToUpdateAsset = this.state.service.assets.map((asset, index) => {
      return (
        <Col md={6} xl={4} key={index}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                Actualizar un activo de tipo <b>{asset.name}</b>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Con esta ruta podras consultar los datos almacenados en la blockchain.</p>
              <p>PUT: </p>{' '}
              <code>
                http://localhost:4000/service/{this.state.serviceId}/asset/{asset.name}/:id_activo
              </code>
              <br />
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
                    <Button variant="success" onClick={this.toggleParticipantsModal}>
                      Ver Participantes
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button variant="success" onClick={this.toggleAssetsModal}>
                      Ver Activos
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />
        <Row>
          <Col>
            <h5>Transacciones basicas disponibles</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card text="danger">
              <Card.Header>
                <Card.Title as="h5">Transacciones para guardar nuevos participantes</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ saveParticipants: !this.state.saveParticipants })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.saveParticipants}>
          <Row>{transactionsToSaveParticipants}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Transacciones para guardar nuevos activos</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ saveAssets: !this.state.saveAssets })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.saveAssets}>
          <Row>{transactionsToSaveAssets}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  Transacciones para obtener un listado de participantes
                </Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ listParticipants: !this.state.listParticipants })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.listParticipants}>
          <Row>{transactionsToListParticipants}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Transacciones para obtener un listado de activos</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ listAssets: !this.state.listAssets })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.listAssets}>
          <Row>{transactionsToListAssets}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Transacciones para obtener un participante</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ getParticipant: !this.state.getParticipant })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.getParticipant}>
          <Row>{transactionsToGetParticipant}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Transacciones para obtener un activo</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ getAsset: !this.state.getAsset })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.getAsset}>
          <Row>{transactionsToGetAsset}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Transacciones para actualizar un participante</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() =>
                    this.setState({ updateParticipant: !this.state.updateParticipant })
                  }
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.updateParticipant}>
          <Row>{transactionsToUpdateParticipant}</Row>
        </Collapse>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Transacciones para actualizar un activo</Card.Title>
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={() => this.setState({ updateAsset: !this.state.updateAsset })}
                >
                  Ver
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Collapse in={this.state.updateAsset}>
          <Row>{transactionsToUpdateAsset}</Row>
        </Collapse>
      </Aux>
    );
  }
}

export default ShowServicePage;
