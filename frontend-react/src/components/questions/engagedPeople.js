import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import { updateField } from '../../actions/index';

class engagedPeople extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleTextChange = (fieldName, event) => {
    this.props.updateField(fieldName, event.target.value)
  }

  render() {
    return (
      <Grid fluid style={{width: '100%'}}>
        <h2>Pessoas envolvidas</h2>
        <TextField
          onChange={this.handleTextChange.bind(this, 'members')}
          value={this.state.members}
          floatingLabelText="Nome dos sócios e tempo de dedicação semanal para a empresa"
          fullWidth
          multiLine
          floatingLabelFixed
        />

        <TextField
          onChange={this.handleTextChange.bind(this, 'membersGraduation')}
          value={this.state.membersGraduation}
          floatingLabelText="Qual a formação de cada sócio?"
          fullWidth
          multiLine
          floatingLabelFixed
        />

        <TextField
          onChange={this.handleTextChange.bind(this, 'membersOccupation')}
          value={this.state.membersOccupation}
          floatingLabelText="Qual área de atuação de cada sócio no projeto?"
          fullWidth
          multiLine
          floatingLabelFixed
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(engagedPeople)

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ updateField }, dispatch)
// }

// export default connect(null, mapDispatchToProps)(engagedPeople)
