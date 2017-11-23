import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Dialog from 'material-ui/Dialog';

import { updateField } from '../../actions/index';

import BasicQuestions from './basic';
import Financial from './financial';
import Investments from './investments';
import EngagedPeople from './engagedPeople';

import Api from '../../utils/rest';

class questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
      isMobile: window.innerWidth <= 768,
      dialogOpen: false
    }
  }

  handlePrev = () => {
    this.setState({
      stepIndex: this.state.stepIndex - 1
    })
  }

  handleNext = () => {
    const {stepIndex} = this.state
    Api.sendCompanyData(this.props.common).then(response => {
      console.debug('handleNext', response);
      if (Number(response.status) === 0) {
        this.setState({
          snackMessage: response.message,
          snackOpen: true
        })
      } else if (Number(response.status) === 1) {
        console.log('STEP INDEX', stepIndex)
        if (stepIndex < 3) {
          this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3
          })
        } else {
          this.setState({ dialogOpen: true });
        }
      }
    });
  }

  getStepContent(stepIndex) {
    var component;
    switch (stepIndex) {
      case 0: component = <BasicQuestions />; break;
      case 1: component = <EngagedPeople />; break;
      case 2: component = <Investments />; break;
      case 3: component = <Financial />; break;
      default: component = <BasicQuestions />; break;
    }
    return component;
  }

  renderContent() {
    const { stepIndex, isMobile } = this.state
    const stepsData = ( !isMobile ) ? this.getStepContent(stepIndex) : null

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            { stepsData }
          </Col>
        </Row>
        <Row between="xs">
          {/* <Col xs={6} sm={6} md={6} lg={6}>
            <Row start="xs">
              <FlatButton
                label="Voltar"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
              />
            </Row>
          </Col> */}
          <Col xs={6} sm={6} md={6} lg={6}>
            <Row end="xs">
              <RaisedButton
                label={stepIndex === 3 ? 'Finalizar' : 'Próximo'}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }

  renderMobile() {
    return (
      <Stepper activeStep={this.state.stepIndex} orientation="vertical">
        <Step>
          <StepLabel>Dados da Startup</StepLabel>
          <StepContent>
            <BasicQuestions />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Pessoas envolvidas</StepLabel>
          <StepContent>
            <EngagedPeople />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Investimentos</StepLabel>
          <StepContent>
            <Investments />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Dados financeiros</StepLabel>
          <StepContent>
           <Financial />
          </StepContent>
        </Step>
      </Stepper>
    )
  }

  renderBigScreens() {
    return (
      <Stepper activeStep={this.state.stepIndex} orientation="horizontal">
        <Step>
          <StepLabel>Dados da Startup</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pessoas envolvidas</StepLabel>
        </Step>
        <Step>
          <StepLabel>Investimentos</StepLabel>
        </Step>
        <Step>
          <StepLabel>Dados financeiros</StepLabel>
        </Step>
      </Stepper>
    )
  }

  render() {
    return (
      <Paper zDepth={2} className="mainPaper">
        { ( this.state.isMobile ) ? this.renderMobile() : this.renderBigScreens() }
        <ExpandTransition open={true}>
          {this.renderContent()}
        </ExpandTransition>
        <Dialog
          title="Dados enviados"
          actions={<RaisedButton label="Finalizar" primary onTouchTap={() => { window.location.href = '@@baseUrl'} } />}
          modal={true}
          open={this.state.dialogOpen}
        >
          Seus dados serão aprovados em breve e sua startup entrará no mapa.
        </Dialog>
      </Paper>
    )
  }
}

function mapStateToProps({ common }) {
  return { common }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (questions)
