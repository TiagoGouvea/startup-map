import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class adminToolbar extends Component {
  render () {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={this.props.title} />
        </ToolbarGroup>
        <ToolbarGroup>
          <Link to="/startups/admin/login.php?task=logout">
            <RaisedButton label="Logout" primary />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
