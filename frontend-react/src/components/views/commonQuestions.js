import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import { updateField } from '../../actions/index';
import Questions from '../../components/questions/questions';

import Api from '../../utils/rest.js';

class commonQuestions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      types: [
        {id: 'startup', name: 'Startup'},
        {id: 'incubator', name: 'Incubadora'},
        {id: 'developer', name: 'Desenvolvedor(a)'},
        {id: 'coworking', name: 'Coworking'},
        {id: 'service', name: 'Consultoria'},
        {id: 'jrcompany', name: 'Empresa Jr'},
        {id: 'community', name: 'Comunidade'}
      ],
      dialogOpen: false,
      snackOpen: false,
      snackMessage: '',
      wishToParticipate: false,
      showAddress: false,
      typeValue: 'startup',
      loading: false
    }
  }

  handleChange = (name, event, index, value) => {
    this.setState({typeValue: value})
    this.props.updateField('type', value)
  }

  handleTextChange = (fieldName, event) => {
    this.props.updateField(fieldName, event.target.value )
  }

  handleCEP = () => {
    const cep = this.refs.cepField.input.value;
    if (cep.length === 8 || cep.length === 9) {
      Api.getAddress(cep).then(address => {
        if (address) {
          this.props.updateField('neighborhood', address.bairro)
          this.props.updateField('street', address.logradouro)
          this.props.updateField('city', address.cidade)
          this.props.updateField('state', address.estado)
        } else {
          this.setState({
            snackOpen: true,
            snackMessage: 'CEP não encontrado'
          })
        }
        this.setState({ showAddress: true })
        this.forceUpdate();
  		})
    } else {
      this.setState({
        snackOpen: true,
        snackMessage: 'Formato inválido de CEP'
      })
    }
  }

  handleSnackRequestClose = (e) => {
    this.setState({ snackOpen: false })
  }

  handleCommonQuestions = () => {
    this.setState({ dialogOpen: true })
  }

  sendData = () => {
    this.setState({ dialogOpen: false })
    Api.sendCompanyData(this.props.common).then(response => {
      console.debug('Save common questions\' responses', response)
      if (response.status === 1) {
        this.setState({ dialogOpen: true });
      } else {
        this.setState({
          snackMessage: response.message,
          snackOpen: true
        })
      }
    })
  }

  wishToParticipate = () => {
    Api.sendCompanyData(this.props.common).then(response => {
      console.debug('wishToParticipate', response);
      this.setState({ dialogOpen: false });
      if (Number(response.status) === 0) {
        this.setState({
          snackMessage: response.message,
          snackOpen: true
        })
      } else if (Number(response.status) === 1) {
        this.setState({ wishToParticipate: true });
      }
    });
  }

  searchInArray = (key) => {
    let result = this.props.common.filter(function(obj) {
      return (Object.keys(obj)[0] === key) ? key : null;
    });

    let resp = null;

    if (result.length) {
      resp = Object.values(result[0])[0];
      return resp;
    }
  }

  render() {
    console.debug('\nRendering common questions');

    var types = this.state.types.map((item, i) => {
      return <MenuItem value={item.id} primaryText={item.name} key={item.id} />
    })

    if ( ['startup','incubator','coworking','service','jrcompany','community'].includes(this.state.typeValue) ) {
      var companyName =
        <Col xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            onChange={this.handleTextChange.bind(this, 'companyName')}
            value={this.props.common.companyName}
            floatingLabelText="Nome da empresa"
            floatingLabelFixed />
        </Col>

      var date =
      <Col xs={12} md={6} lg={4}>
        <TextField
          fullWidth
          onChange={this.handleTextChange.bind(this, 'date')}
          value={this.props.common.date}
          floatingLabelText="Quando sua empresa teve início ?"
          floatingLabelFixed />
      </Col>

      var description =
        <Col xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            onChange={this.handleTextChange.bind(this, 'description')}
            value={this.props.common.description}
            rows={2} floatingLabelText="Resuma seu negócio em 150 caracteres"
            floatingLabelFixed />
        </Col>
    } else {
      companyName = date = description = null
    }

    if ( ['startup','incubator','coworking','service','jrcompany'].includes(this.state.typeValue) ) {
      var employeeQtt = <Col xs={12} md={6} lg={4}>
        <TextField
          fullWidth
          onChange={this.handleTextChange.bind(this, 'employeeQtt')}
          value={this.props.common.employeeQtt}
          floatingLabelText="Número de funcionários"
          floatingLabelFixed />
        </Col>
    } else {
      employeeQtt = null
    }

    if ( ['startup'].includes(this.state.typeValue) ) {
      var combos = <div className="combos">
          <Col xs={12} md={12} lg={12}>
            Estágio da startup
            <Checkbox onCheck={this.handleTextChange.bind(this, 'ckbxEarning')} label="Já está faturando" />
            <Checkbox onCheck={this.handleTextChange.bind(this, 'ckbxSelling')} label="Produto já foi comercializado" />
            <Checkbox onCheck={this.handleTextChange.bind(this, 'ckbxInvesting')} label="Já recebeu investimento" />
          </Col>
        </div>
    } else {
      combos = null
    }

    var actions = [
      <FlatButton label="Não participar" primary onTouchTap={this.sendData} />,
      <FlatButton label="Desejo participar" primary onTouchTap={this.wishToParticipate} />
    ]

    if ( this.state.wishToParticipate ) {
        return <Questions />
    }

    return (
      <Paper zDepth={2} className="mainPaper">
        <Grid fluid>
          <Row between="xs">
            <Col xs={12} sm={12} md={6} lg={4}>
              <TextField
                fullWidth
                onChange={this.handleTextChange.bind(this, 'name')}
                value={this.props.common.state}
                floatingLabelText="Seu nome"
                floatingLabelFixed
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <TextField
                fullWidth
                onChange={this.handleTextChange.bind(this, 'email')}
                value={this.props.common.email}
                floatingLabelText="Seu email"
                floatingLabelFixed
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <TextField
                fullWidth
                onChange={this.handleTextChange.bind(this, 'celular')}
                value={this.props.common.celular}
                floatingLabelText="Seu número de celular"
                floatingLabelFixed
              />
            </Col>
          </Row>
          <Row between="xs">
            <Col xs={12}>
              <SelectField floatingLabelText="Tipo"
                fullWidth
                floatingLabelFixed
                value={this.props.common.type || this.state.typeValue}
                onChange={this.handleChange.bind(this, 'type')}
                >
                { types }
              </SelectField>
            </Col>
          </Row>

          <Row between="xs">
            { companyName }
            <Col xs={12} sm={12} md={6} lg={4}>
              <TextField
                fullWidth
                floatingLabelFixed
                onChange={this.handleTextChange.bind(this, 'site')}
                floatingLabelText="Site"
                hintText="https://"
              />
            </Col>
          </Row>

          <Row middle="xs">
            <Col xs={12} sm={12} md={6} lg={4}>
              <TextField
                fullWidth
                floatingLabelFixed
                onChange={this.handleTextChange.bind(this, 'cep')}
                ref='cepField'
                floatingLabelText="CEP"
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <RaisedButton
                label="Verificar CEP"
                primary
                onTouchTap={this.handleCEP.bind(this)}
              />
            </Col>
          </Row>
          { (this.state.showAddress) ?
            <Row between="xs">
              <Col xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  floatingLabelFixed
                  onChange={this.handleTextChange.bind(this, 'street')}
                  value={this.searchInArray('street')}
                  floatingLabelText="Logradouro"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  floatingLabelFixed
                  onChange={this.handleTextChange.bind(this, 'number')}
                  value={this.props.common.number}
                  floatingLabelText="Número"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  floatingLabelFixed
                  onChange={this.handleTextChange.bind(this, 'complement')}
                  value={this.props.common.complement}
                  floatingLabelText="Complemento"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  floatingLabelFixed
                  onChange={this.handleTextChange.bind(this, 'neighborhood')}
                  value={this.searchInArray('neighborhood')}
                  floatingLabelText="Bairro"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  floatingLabelFixed
                  onChange={this.handleTextChange.bind(this, 'city')}
                  value={this.searchInArray('city')}
                  floatingLabelText="Cidade"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  floatingLabelFixed
                  onChange={this.handleTextChange.bind(this, 'state')}
                  value={this.searchInArray('state')}
                  floatingLabelText="Estado"
                />
              </Col>
            </Row>
            : null
          }
            <Row>
              { date }
              { employeeQtt }
            </Row>
            <Row>{ description }</Row>
            <Row>{ combos }</Row>
            <Row between="xs">
              <Col xs={6} sm={6} md={6} lg={6}>
                <Row start="xs">
                  <RaisedButton label="Voltar" />
                </Row>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Row end="xs">
                  <RaisedButton
                    label="Avançar"
                    primary={true}
                    onTouchTap={this.handleCommonQuestions}
                  />
                </Row>
              </Col>
            </Row>
          </Grid>
          <Dialog
            title="Investimentos"
            actions={actions}
            modal={true}
            open={this.state.dialogOpen}
          >
          Estamos auxiliando duas aceleradoras a identificar possíveis startups para aceleração em Juiz de Fora. Se desejar ter suas informações visíveis para elas você deverá preencher mais 14 perguntas, com informações detalhadas sobre seu negócio. 
          <br /><br />Deseja participar?
          </Dialog>
          <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackRequestClose}
          />
        </Paper>
    );
  }
}

function mapStateToProps({ common }) {
  return { common }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(commonQuestions)
