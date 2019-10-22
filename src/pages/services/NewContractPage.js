import React, { Component } from 'react';

import { Row, Col, Card, Button } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';

class NewContractPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: props.match.params.serviceId
    };
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  <b>Nuevo contrato inteligente</b>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Texto...</p>
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
      </Aux>
    );
  }
}

export default NewContractPage;
