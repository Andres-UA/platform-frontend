import React, { Component } from 'react';
import API from '../../api';
import { Row, Col, Button, Card } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
//import Card from '../../App/components/MainCard';
import { Link } from 'react-router-dom';

class ServicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    API.get(`service/`)
      .then(res => {
        this.setState({ services: res.data });
      })
      .catch(err => {
        console.log('error: ' + err);
      });
  }

  render() {
    const services = this.state.services.map((service, id) => {
      return (
        <Col md={6} xl={4} key={id}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{service.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>{service.description}</p>
              <hr />
              <Link to={`/dashboard/services/${service._id}`}>
                <Button variant="primary">Ver</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <p>Hola, aquí estan los servicios que has creado</p>
                <hr />
                <Link to="/dashboard/services/new">
                  <Button variant="success">Agregar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>{services}</Row>
      </Aux>
    );
  }
}

export default ServicesPage;
