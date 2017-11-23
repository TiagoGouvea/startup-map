import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';

import CompanyListItem from './companyListItem';
import Api from '../utils/rest.js';

export default class CompaniesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      colWidth: '220px',
      orderAsc: true
    }
  }

  componentDidMount() {
    Api.getAllCompanies().then(response => {
      if ( response.status === 1 ) {
        this.setState({ companies: response.data })
      }
    })
  }

  handleHeaederClick = (e) => {
    const orderBy = e.target.id
    const c = this.state.companies
    c.sort((a, b) => {
      let keyA = (this.state.orderBy) ? a[orderBy] : b[orderBy]
      let keyB = (this.state.orderBy) ? b[orderBy] : a[orderBy]
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })

    this.setState({
      companies: c,
      orderBy: !this.state.orderBy
    })
  }

  render() {
    const companyList = this.state.companies.map((item, i) => {
      let striped = (i % 2 === 0);
      if ( item.type === 'startup' || item.type === 'developer' ) {
        return (
          <CompanyListItem
            key={item.id}
            company={item}
            striped={striped}
            colWidth={this.state.colWidth}
            isMobile={this.props.isMobile} />
        )
      } else {
        return false
      }
    })

    if (!this.props.isMobile) {
      return (
        <div>
          <Table style={{width: 'auto'}}>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false} >
              <TableRow
                onClick={this.handleHeaederClick}
                style={{ display: 'flex', alignItems: 'center' }} >
                <TableHeaderColumn
                  id="title"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Empresa
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="type"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Tipo
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="owner_name"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Responsável
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="start_date"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Data da início
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="hasCNPJ"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Possui CNPJ
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="product_ready"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Está comercializando
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="businessType"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Tipo de negócio
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="hasBusinnesPlan"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Possui plano de negócios
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="hasMVP"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Possui MVP
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="currentInterst"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Interesse atual
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="gatheringInvestments"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Captando investimentos
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="desiredValue"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Quanto pretende captar
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="percentageWantToOffer"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Disposto à ceder
                </TableHeaderColumn>
                <TableHeaderColumn
                  id="timeToRefund"
                  style={{width: this.state.colWidth, height: 'auto'}}>
                  Prazo de retorno
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { companyList }
            </TableBody>
          </Table>
        </div>
      )
    }

    if (this.props.isMobile) {
      return (
        <div>
          { companyList }
        </div>
      )
    }

  }
}
