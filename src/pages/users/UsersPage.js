import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';

import API from '../../api';
import Aux from '../../hoc/_Aux';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    API.get(`user/`)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log('error: ' + err);
      });
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <th>{user.name}</th>
          <td>{user.email}</td>
          <td>{user.type}</td>
          <td>
            <Button variant="dark" size="sm" onClick={this.toggleAssetsModal}>
              Ver
            </Button>
            <Button variant="warning" size="sm" onClick={this.toggleAssetsModal}>
              Editar
            </Button>
            <Button variant="danger" size="sm" onClick={this.toggleAssetsModal}>
              Eliminar
            </Button>
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
                <Card.Title as="h5">Usuarios</Card.Title>
                <Link to={`/dashboard/users/new`}>
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
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>{users}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default UsersPage;
