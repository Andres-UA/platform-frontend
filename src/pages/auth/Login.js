import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import API from '../../api';

import './../../assets/scss/style.scss';
import Breadcrumb from './../../App/layout/AdminLayout/Breadcrumb';
import Aux from './../../hoc/_Aux/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identification: '',
      password: ''
    };
    this.handleIdentificationChange = this.handleIdentificationChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleIdentificationChange(event) {
    this.setState({ identification: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    API.post(`auth/login`, {
      identification: this.state.identification,
      password: this.state.password
    })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', res.data.user);
          this.context.router.history.push(`/dashboard/`);
        } else {
          console.log('ERROR!');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Bienvenido</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.identification}
                    onChange={this.handleIdentificationChange}
                    placeholder="Identificación"
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    placeholder="Contraseña"
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {' '}
                      Guardar datos
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary shadow-2 mb-4" onClick={this.onSubmit}>
                  Entrar
                </button>
                <p className="mb-2 text-muted">
                  ¿Olvidó su contraseña? <NavLink to="/auth/reset-password-1">Recuperar</NavLink>
                </p>
                <p className="mb-0 text-muted">
                  ¿No tiene una cuenta? <b>Hable con el administrador del sitio</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Login;
