import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AdminToolbar from '../adminToolbar';
import CompaniesList from '../companiesList';

export default class ListAllCompanies extends Component {
  constructor(props) {
    super(props)
    this.state = { isMobile: window.innerWidth <= 768 }
  }

  render() {
    return (
      <div>
        <AdminToolbar title="Admin > All companies" />
        <Paper zDepth={2} className="mainPaper" style={{width: '100%'}}>
          <CompaniesList isMobile={this.state.isMobile} />
        </Paper>
      </div>
    )
  }
}
