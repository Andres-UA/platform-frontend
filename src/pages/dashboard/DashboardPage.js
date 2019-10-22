import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';

class DashboardPage extends Component {
  render() {
    console.log('token: ' + localStorage.getItem('token'));
    return (
      <Aux>
        <Row>
          <Col>
            <Card title="Dashboard" isOption>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum."
              </p>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default DashboardPage;
