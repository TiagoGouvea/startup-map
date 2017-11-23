import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader } from 'material-ui/Card';

import Tools from '../utils/tools.js';

export default class companyListItem extends Component {
  yesOrNo(option) {
    return (option === 1) ? 'Sim' : 'Não'
  }

  handleRowClick = (e) => {
    const id = ( this.props.company.id )
    window.location.href = `/startups/admin/dashboard/list/${id}`
  }

  render() {
    if (this.props.isMobile) {
      return (
        <div>
          <Card>
            <CardHeader title='Title' subtitle='' />
            <CardActions>
              <Link to={`/startups/admin/dashboard/list/${this.props.company.id}`}>
                <RaisedButton label='Detahes' primary />
              </Link>
            </CardActions>
          </Card>
        </div>
      )
    }

    if (!this.props.isMobile) {
      return (
        <TableRow
          striped={ this.props.striped }
          hoverable={true}
          onClick={this.handleRowClick}
          style={{ display: 'flex', alignItems: 'center' }} >
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.title }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.type }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.owner_name }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { Tools.timestampToDate(this.props.company.start_date) }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.yesOrNo(0) }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.product_ready }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.businessType }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.hasBusinnesPlan}
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.hasMVP }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.currentInterst }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.gatheringInvestments }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.desiredValue }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.percentageWantToOffer }
          </TableRowColumn>
          <TableRowColumn
            style={{ width: this.props.colWidth, height: 'auto' }}>
            { this.props.company.timeToRefund }
          </TableRowColumn>
        </TableRow>
      )
    }
  }
}
