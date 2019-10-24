import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

//import ChatList from './ChatList';
import Aux from '../../../../../hoc/_Aux';
import DEMO from '../../../../../store/constant';

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import API from '../../../../../api';

class NavRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      name: '',
    };
    this.onLogout = this.onLogout.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      API.post(
        `auth/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(res => {
          if (res.data.success) {
            this.setState({ name: res.data.user.name });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onLogout() {
    localStorage.setItem('token', '');
    localStorage.removeItem('token');
    this.context.router.history.push(`/auth/login`);
  }

  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          {/*
          <li>
            <Dropdown alignRight={!this.props.rtlLayout}>
              <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                <i className="icon feather icon-bell" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="notification">
                <div className="noti-head">
                  <h6 className="d-inline-block m-b-0">Notifications</h6>
                  <div className="float-right">
                    <a href={DEMO.BLANK_LINK} className="m-r-10">
                      mark as read
                    </a>
                    <a href={DEMO.BLANK_LINK}>clear all</a>
                  </div>
                </div>
                <ul className="noti-body">
                  <li className="n-title">
                    <p className="m-b-0">NEW</p>
                  </li>
                  <li className="notification">
                    <div className="media">
                      <img className="img-radius" src={Avatar1} alt="Generic placeholder" />
                      <div className="media-body">
                        <p>
                          <strong>John Doe</strong>
                          <span className="n-time text-muted">
                            <i className="icon feather icon-clock m-r-10" />
                            30 min
                          </span>
                        </p>
                        <p>New ticket Added</p>
                      </div>
                    </div>
                  </li>
                  <li className="n-title">
                    <p className="m-b-0">EARLIER</p>
                  </li>
                  <li className="notification">
                    <div className="media">
                      <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                      <div className="media-body">
                        <p>
                          <strong>Joseph William</strong>
                          <span className="n-time text-muted">
                            <i className="icon feather icon-clock m-r-10" />
                            30 min
                          </span>
                        </p>
                        <p>Prchace New Theme and make payment</p>
                      </div>
                    </div>
                  </li>
                  <li className="notification">
                    <div className="media">
                      <img className="img-radius" src={Avatar3} alt="Generic placeholder" />
                      <div className="media-body">
                        <p>
                          <strong>Sara Soudein</strong>
                          <span className="n-time text-muted">
                            <i className="icon feather icon-clock m-r-10" />
                            30 min
                          </span>
                        </p>
                        <p>currently login</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="noti-footer">
                  <a href={DEMO.BLANK_LINK}>show all</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
            */}
          {/* <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => {this.setState({listOpen: true});}}><i className="icon feather icon-mail"/></a>
                    </li>*/}
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img src={Avatar1} className="img-radius" alt="User Profile" />
                  <span>{this.state.name}</span>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="dud-logout"
                    title="Logout"
                    onClick={this.onLogout}
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                      <i className="feather icon-settings" /> Configuración
                    </a>
                  </li>
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                      <i className="feather icon-user" /> Perfil
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        {/*<ChatList
          listOpen={this.state.listOpen}
          closed={() => {
            this.setState({ listOpen: false });
          }}
        />
         */}
      </Aux>
    );
  }
}

export default NavRight;
