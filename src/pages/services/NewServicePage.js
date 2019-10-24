import React, { Component } from 'react';
import API from '../../api';
import { Row, Col, Button, Card, Form, Modal, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Aux from '../../hoc/_Aux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTypes: ['Número', 'Texto', 'Logico'],
      name: '',
      description: '',
      inputs: [{ name: '', type: 'Numero', isRequired: false, default: '' }],
      assets: [],
      participants: [],
      modal: false,
      modalType: '',
      tableName: '',
      editMode: false,
      indexEdit: null,
      nameIsInvalid: false,
      nameError: false,
      descriptionError: false,
    };
    this.handleServiceNameChange = this.handleServiceNameChange.bind(this);
    this.handleServiceDescriptionChange = this.handleServiceDescriptionChange.bind(this);
    this.handleInputsNameChange = this.handleInputsNameChange.bind(this);
    this.handleInputsTypeChange = this.handleInputsTypeChange.bind(this);
    this.handleInputsRequiredChange = this.handleInputsRequiredChange.bind(this);
    this.handleInputsDefaultChange = this.handleInputsDefaultChange.bind(this);

    this.handleTableNameChange = this.handleTableNameChange.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleParticipantModal = this.toggleParticipantModal.bind(this);
    this.toggleAssetModal = this.toggleAssetModal.bind(this);

    this.onAddInput = this.onAddInput.bind(this);
    this.onRemoveInput = this.onRemoveInput.bind(this);

    this.onRemoveParticipant = this.onRemoveParticipant.bind(this);
    this.onRemoveAsset = this.onRemoveAsset.bind(this);

    this.onAddModel = this.onAddModel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  notify() {
    toast.success('Wow so easy!', {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  }

  toggleParticipantModal() {
    this.setState({
      modalType: 'participant',
      modal: !this.state.modal,
      tableName: '',
      inputs: [
        {
          name: '',
          type: 'Numero',
          isRequired: false,
          default: '',
        },
      ],
    });
  }

  toggleAssetModal() {
    this.setState({
      modalType: 'asset',
      modal: !this.state.modal,
      tableName: '',
      inputs: [
        {
          name: '',
          type: 'Numero',
          isRequired: false,
          default: '',
        },
      ],
    });
  }

  toggleModal() {
    this.setState({
      modalType: '',
      modal: !this.state.modal,
    });
  }

  handleServiceNameChange(event) {
    this.setState({ name: event.target.value, nameError: false });
  }

  handleServiceDescriptionChange(event) {
    this.setState({ description: event.target.value, descriptionError: false });
  }

  handleTableNameChange(event) {
    this.setState({ tableName: event.target.value, nameIsInvalid: false });
  }

  handleInputsNameChange = index => event => {
    const inputs = this.state.inputs.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, name: event.target.value };
    });
    this.setState({ inputs });
  };

  handleInputsTypeChange = index => event => {
    const inputs = this.state.inputs.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, type: event.target.value };
    });
    this.setState({ inputs });
  };

  handleInputsRequiredChange = index => event => {
    const inputs = this.state.inputs.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, isRequired: event.target.checked };
    });
    this.setState({ inputs });
  };

  handleInputsDefaultChange = index => event => {
    const inputs = this.state.inputs.map((input, idx) => {
      if (index !== idx) return input;
      return { ...input, default: event.target.value };
    });
    this.setState({ inputs });
  };

  onRemoveInput = index => event => {
    const inputs = this.state.inputs.filter((input, idx) => {
      return index !== idx;
    });
    this.setState({ inputs });
  };

  onRemoveParticipant = index => event => {
    const participants = this.state.participants.filter((input, idx) => {
      return index !== idx;
    });
    this.setState({ participants });
  };

  onRemoveAsset = index => event => {
    const assets = this.state.assets.filter((input, idx) => {
      return index !== idx;
    });
    this.setState({ assets });
  };

  onEditParticipant = index => event => {
    const participants = this.state.participants.filter((asset, idx) => {
      return index === idx;
    });
    const participant = participants[0];
    this.setState({
      inputs: participant.data,
      tableName: participant.name,
      modal: true,
      modalType: 'participant',
      editMode: true,
      indexEdit: index,
    });
  };

  onEditAsset = index => event => {
    const assets = this.state.assets.filter((asset, idx) => {
      return index === idx;
    });
    const asset = assets[0];
    this.setState({
      inputs: asset.data,
      tableName: asset.name,
      modal: true,
      modalType: 'asset',
      editMode: true,
      indexEdit: index,
    });
  };

  onAddInput() {
    this.setState(state => {
      const inputs = state.inputs.concat({
        name: '',
        type: 'Numero',
        isRequired: false,
        default: '',
      });
      return {
        inputs,
      };
    });
  }

  onAddModel() {
    this.setState(state => {
      let isCorrect = true;

      if (state.tableName === '') {
        isCorrect = false;
        toast.error('El campo nombre debe no pude ser vacio.', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        return { nameIsInvalid: true };
      }

      if (state.inputs.length === 0) {
        isCorrect = false;
        toast.error('El modelo debe tener almenos algun atributo.', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        return { nameIsInvalid: true };
      }

      if (state.inputs[0].name === '') {
        isCorrect = false;
        toast.error('El modelo debe tener almenos algun atributo valido.', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        return { nameIsInvalid: true };
      }

      if (isCorrect) {
        const inputTypes = this.state.inputTypes.concat(this.state.tableName);
        if (state.modalType === 'participant') {
          let newData = state.participants;

          if (state.editMode) {
            newData[state.indexEdit] = { name: state.tableName, data: state.inputs };
          } else {
            newData = newData.concat({
              name: state.tableName,
              data: state.inputs,
            });
          }
          toast.success('Participante agregado correctamente.', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          return {
            participants: newData,
            inputs: [
              {
                name: '',
                type: 'Numero',
                isRequired: false,
                default: '',
              },
            ],
            tableName: '',
            modal: false,
            modalType: '',
            editMode: false,
            indexEdit: null,
            nameIsInvalid: false,
            inputTypes,
          };
        } else {
          let newData = state.assets;

          if (state.editMode) {
            newData[state.indexEdit] = { name: state.tableName, data: state.inputs };
          } else {
            newData = newData.concat({
              name: state.tableName,
              data: state.inputs,
            });
          }
          toast.success('Activo agregado correctamente.', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          return {
            assets: newData,
            inputs: [
              {
                name: '',
                type: 'Numero',
                isRequired: false,
                default: '',
              },
            ],
            tableName: '',
            modal: false,
            modalType: '',
            editMode: false,
            indexEdit: null,
            nameIsInvalid: false,
            inputTypes,
          };
        }
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let isCorrect = true;

    if (this.state.assets < 1) {
      isCorrect = false;
      toast.error('Para la red es necesario tener al menos 1 activo.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }

    if (this.state.participants < 1) {
      isCorrect = false;
      toast.error('Para la red es necesario tener al menos 1 participante.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }

    if (this.state.name === '' || this.state.name.length <= 6) {
      isCorrect = false;
      toast.error('Para la red es necesario tener un nombre de más de 6 caracteres.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      this.setState({
        nameError: true,
      });
    }

    if (this.state.description === '') {
      isCorrect = false;
      toast.error('Para la red es necesario tener una descripción.', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      this.setState({
        descriptionError: true,
      });
    }

    if (isCorrect) {
      API.post(`service/`, {
        name: this.state.name,
        description: this.state.description,
        participants: this.state.participants,
        assets: this.state.assets,
      })
        .then(res => {
          const _id = res.data.id;
          this.context.router.history.push(`/dashboard/services/${_id}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const inputs = this.state.inputs.map((input, index) => {
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
                onChange={this.handleInputsNameChange(index)}
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
                onChange={this.handleInputsTypeChange(index)}
              >
                {this.state.inputTypes.map((element, index) => {
                  return <option key={index}>{element}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={2}>
            <center>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  name={`required-${index}`}
                  id={`required-${index}`}
                  data-context="input"
                  checked={input.isRequired}
                  onChange={this.handleInputsRequiredChange(index)}
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
                onChange={this.handleInputsDefaultChange(index)}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button variant="danger" onClick={this.onRemoveInput(index)}>
              <b>-</b>
            </Button>
          </Col>
        </Row>
      );
    });

    const participants = this.state.participants.map((participant, index) => {
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
            <Card.Footer>
              <Button variant="danger" size="sm" onClick={this.onRemoveParticipant(index)}>
                X
              </Button>
              <Button variant="warning" size="sm" onClick={this.onEditParticipant(index)}>
                -
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    });

    const assets = this.state.assets.map((asset, index) => {
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
            <Card.Footer>
              <Button variant="danger" size="sm" onClick={this.onRemoveAsset(index)}>
                X
              </Button>

              <Button variant="warning" size="sm" onClick={this.onEditAsset(index)}>
                -
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    });

    return (
      <Aux>
        <Row>
          <Col>
            <h3>Nuevo Servicio</h3>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Datos Basicos</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nombre del servicio</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.name}
                      onChange={this.handleServiceNameChange}
                      isInvalid={this.state.nameError}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Descripcion del servicio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={this.state.description}
                      onChange={this.handleServiceDescriptionChange}
                      isInvalid={this.state.descriptionError}
                      required
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Modelo de Datos</Card.Title>
              </Card.Header>
              <Card.Body>
                Ahora necesitamos los compoenentes de la red participantes y activos
              </Card.Body>
            </Card>
            <h3>Participantes</h3>
            <Row>
              {participants}
              <Col xs={2}>
                <Card
                  style={{
                    height: '20rem',
                  }}
                  onClick={this.toggleParticipantModal}
                >
                  <Card.Body
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <center>
                      <Button variant="success" onClick={this.toggleParticipantModal}>
                        Nuevo Participante
                      </Button>
                    </center>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <h3>Activos</h3>
            <Row>
              {assets}
              <Col xs={2}>
                <Card style={{ height: '20rem' }}>
                  <Card.Body
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <center>
                      <Button variant="success" onClick={this.toggleAssetModal}>
                        Nuevo Activo
                      </Button>
                    </center>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card>
              <Card.Header>
                <Card.Title as="h5">Para finalizar</Card.Title>
              </Card.Header>
              <Card.Body>Revisa todos tus datos... Ten en cuenta que ...</Card.Body>
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

        <Modal size="lg" show={this.state.modal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Nuevo {this.state.modalType === 'participant' ? 'Participante' : 'Activo'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      Nombre del{' '}
                      {this.state.modalType === 'participant' ? 'Participante' : 'Activo'}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.tableName}
                      onChange={this.handleTableNameChange}
                      isInvalid={this.state.nameIsInvalid}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <h5>Atributos</h5>
                </Col>
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

                <Col md={2}>
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
            </Container>
            <center>
              <Button variant="success" onClick={this.onAddInput}>
                Nuevo Campo
              </Button>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.onAddModel}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
        />
      </Aux>
    );
  }
}

export default NewServicePage;
