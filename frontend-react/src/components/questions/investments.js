import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { updateField } from '../../actions/index';

class investments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gatheringInvestments: 0
    }
  }

  handleChange = (event, index, value) => {
    this.setState({gatheringInvestments: value})
    this.props.updateField('gatheringInvestments', value)
  }

  handleTextChange = (fieldName, event) => {
    this.props.updateField([fieldName], event.target.value)
  }

  render() {
    const extraQuestions = (
      <div>
        <TextField
          onChange={this.handleTextChange.bind(this, 'intendedValue')}
          value={this.state.intendedValue}
          floatingLabelText="Quanto pretende captar?"
          floatingLabelFixed={true}
        />
        <TextField
          onChange={this.handleTextChange.bind(this, 'intendedAction')}
          value={this.state.intendedAction}
          floatingLabelText="O que pretende fazer com o valor captado?"
          floatingLabelFixed={true}
          style={{width: '100%'}}
        />
        <TextField
          onChange={this.handleTextChange.bind(this, 'percentageWantToOffer')}
          value={this.state.percentageWantToOffer}
          floatingLabelText="Que porcentagem está disposto(a) a ceder pelo investimento?"
          floatingLabelFixed={true}
          style={{width: '100%'}}
        />
        <TextField
          onChange={this.handleTextChange.bind(this, 'timeToRefund')}
          value={this.state.timeToRefund}
          floatingLabelText="Qual será o prazo de retorno do investimento?"
          floatingLabelFixed={true}
          style={{width: '100%'}}
        />
      </div>
    );

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h2>Investimentos</h2>
            <Subheader>A startup está captando investimentos neste momento?</Subheader>
            <RadioButtonGroup
              style={{width:'100%'}}
              onChange={this.handleChange.bind(this, 'gatheringInvestments')}
              name="gatheringInvestments"
              defaultSelected={this.state.gatheringInvestments}
            >
              <RadioButton value={1} label="Sim" />
              <RadioButton value={0} label="Não" />
            </RadioButtonGroup>
            { (this.state.gatheringInvestments) ? extraQuestions : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(investments)

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ updateField }, dispatch)
// }

// export default investments = connect(null, mapDispatchToProps) (investments)
