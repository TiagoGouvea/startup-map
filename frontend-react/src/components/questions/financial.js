import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { updateField } from '../../actions/index';

class financial extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleTextChange = (fieldName, event) => {
    this.props.updateField(fieldName, event.target.value)
  }

  render() {
    return (
      <div>
        <h2>Dados financeiros</h2>
        <List>
          <Subheader>Regime de tributação</Subheader>
          <RadioButtonGroup
            onChange={this.handleTextChange.bind(this, 'taxation')}
            name="taxation">
            <RadioButton value="lucroReal" label="Lucro Real" />
            <RadioButton value="lucroPresumido" label="Lucro Presumido" />
            <RadioButton value="simplesNacional" label="Simples Nacional" />
          </RadioButtonGroup>

          <TextField
            style={{width: '100%'}}
            onChange={this.handleTextChange.bind(this, 'monthlyBilling')}
            value={this.state.monthlyBilling}
            floatingLabelText="Qual faturamento médio mensal?"
            floatingLabelFixed={true}
          />

          <TextField
            style={{width: '100%'}}
            onChange={this.handleTextChange.bind(this, 'monthlySalaryPayment')}
            value={this.state.monthlySalaryPayment}
            floatingLabelText="Qual valor mensal da folha de pagamento?"
            floatingLabelFixed={true}
          />

          <TextField
            style={{width: '100%'}}
            onChange={this.handleTextChange.bind(this, 'monthlyCosts')}
            value={this.state.monthlyCosts}
            floatingLabelText="Qual valor médio mensal dos custos e despesas? "
            floatingLabelFixed={true}
          />

          <TextField
            style={{width: '100%'}}
            onChange={this.handleTextChange.bind(this, 'monthlyProfit')}
            value={this.state.monthlyProfit}
            floatingLabelText="Qual lucro liquido médio mensal? "
            floatingLabelFixed={true}
          />
        </List>
      </div>
    )
  }
}

function mapStateToProps({ common }) {
  return { common }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(financial)

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ updateField }, dispatch)
// }

// export default connect(null, mapDispatchToProps)(financial)
