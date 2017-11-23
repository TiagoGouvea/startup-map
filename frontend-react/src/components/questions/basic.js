import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import TextField from 'material-ui/TextField';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox'

import { updateField } from '../../actions/index';

class basicQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = { currentInterest: [] }
  }

  handleCurrentInterest = (ev) => {
    const interest = this.state.currentInterest
    if (interest.includes(ev.target.value)) {
      const index = interest.indexOf(ev.target.value);
      interest.splice(index, 1)
    } else {
      interest.push(ev.target.value)
    }
    this.props.updateField('currentInterest', interest)
  }

  handleTextChange = (fieldName, event) => {
    this.props.updateField(fieldName, event.target.value)
  }

  render() {
    return (
      <Grid fluid>
        <h2>Dados da Startup</h2>
        <TextField
          onChange={this.handleTextChange.bind(this, 'dedicationTime')}
          value={this.props.common.dedicationTime}
          floatingLabelText="Qual seu tempo de dedicação a startup?"
          floatingLabelFixed
          fullWidth
        />

        <TextField
          onChange={this.handleTextChange.bind(this, 'startupDescription')}
          value={this.props.common.startupDescription}
          floatingLabelText="Breve resumo do que a startup faz no máximo 3 linhas"
          floatingLabelFixed
          multiLine
          fullWidth
        />

        <TextField
          onChange={this.handleTextChange.bind(this, 'whyIsInovating')}
          value={this.props.common.whyIsInovating}
          floatingLabelText="Porque é inovador?"
          floatingLabelFixed
          fullWidth
        />

        <TextField
          onChange={this.handleTextChange.bind(this, 'bigDifficulties')}
          value={this.props.common.bigDifficulties}
          floatingLabelText="Quais são suas maiores dificuldades no momento?"
          floatingLabelFixed
          fullWidth
        />

        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <List>
              <Subheader>Qual o estágio do projeto?</Subheader>
              <RadioButtonGroup onChange={this.handleTextChange.bind(this, 'projectStage')} name="projectStage">
                <RadioButton value="ideia" label="Ainda é uma ideia" />
                <RadioButton value="prototipo" label="Possuo um protótipo/MVP" />
                <RadioButton value="comercializado" label="Já está sendo comercializado no mercado" />
              </RadioButtonGroup>
            </List>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <List>
              <Subheader>Tipo de negócio</Subheader>
              <RadioButtonGroup onChange={this.handleTextChange.bind(this, 'businessType')} name="businessType">
                <RadioButton value="B2B" label="B2B" />
                <RadioButton value="B2C" label="B2C" />
                <RadioButton value="B2G" label="B2G" />
              </RadioButtonGroup>
            </List>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Subheader>Tem potencial para internacionalização?</Subheader>
            <RadioButtonGroup onChange={this.handleTextChange.bind(this, 'internationalizable')} name="internationalizable">
              <RadioButton value={1} label="Sim" />
              <RadioButton value={0} label="Não" />
            </RadioButtonGroup>
          </Col>
          { (this.props.common.internationalizable === 1) ?
          <Col xs={12} sm={12} md={6} lg={6}>
            <Subheader>O produto já é disponibilizado em mais de uma língua?</Subheader>
            <RadioButtonGroup
              onChange={this.handleChange.bind(this, 'multilanguage')}
              name="multilanguage"
            >
              <RadioButton value={1} label="Sim" />
              <RadioButton value={0} label="Não" />
            </RadioButtonGroup>
          </Col> : null }
          <Col xs={12} sm={12} md={6} lg={6}>
            <Subheader>Possui um breve plano de negócios?</Subheader>
            <RadioButtonGroup onChange={this.handleTextChange.bind(this, 'hasBusinessPlan')} name="hasBusinessPlan">
              <RadioButton value={1} label="Sim" />
              <RadioButton value={0} label="Não" />
            </RadioButtonGroup>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <List>
              <Subheader>Qual seu interesse atual?</Subheader>
              <Checkbox onCheck={this.handleCurrentInterest} value="Incubação" label="Incubação" />
              <Checkbox onCheck={this.handleCurrentInterest} value="Mentoria" label="Mentoria" />
              <Checkbox onCheck={this.handleCurrentInterest} value="Aceleração" label="Aceleração" />
            </List>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps({ common }) {
  return { common }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(basicQuestions)
