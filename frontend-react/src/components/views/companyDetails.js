import React, { Component } from 'react';
import AdminToolbar from '../adminToolbar';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Api from '../../utils/rest.js';

export default class companyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company: {},
      fixedHeader: true,
      showCheckboxes: false
    }
  }

  componentDidMount() {
    Api.getCompanyById( this.props.match.params.id ).then(response => {
      if ( response.status === 1 ) {
        this.setState({ company: response.data })
      }
    })
  }

  render() {
    return (
      <div>
        <AdminToolbar title={"Admin > Startups / Desenvolvedores >  " + this.state.company.title} />
        <Paper zDepth={2} className="mainPaper" style={{width: '100%'}}>
          <Table selectable={false}>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="2">
                  <h1>{this.state.company.title}</h1>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn colSpan="2" className="tableSessionHeader">
                  <h2>Informações básicas</h2>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Nome</TableRowColumn>
                <TableRowColumn>{this.state.company.owner_name}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Email</TableRowColumn>
                <TableRowColumn>{this.state.company.owner_email}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Celular</TableRowColumn>
                <TableRowColumn>{this.state.company.phone_number}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Número de funcionários</TableRowColumn>
                <TableRowColumn>{this.state.company.employees}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Tipo</TableRowColumn>
                <TableRowColumn>{this.state.company.type}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Site</TableRowColumn>
                <TableRowColumn>{this.state.company.site}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Rua</TableRowColumn>
                <TableRowColumn>{this.state.company.street}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Número</TableRowColumn>
                <TableRowColumn>{this.state.company.number}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Complemento</TableRowColumn>
                <TableRowColumn>{this.state.company.complement}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Bairro</TableRowColumn>
                <TableRowColumn>{this.state.company.neighborhood}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Cidade</TableRowColumn>
                <TableRowColumn>{this.state.company.city}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Estado</TableRowColumn>
                <TableRowColumn>{this.state.company.state}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan="2" className="tableSessionHeader">
                  <h2>Sobre</h2>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Tempo de dedicação do responsável</TableRowColumn>
                <TableRowColumn>{this.state.company.dedicationTime}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Breve resumo</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Por que é inovador?</TableRowColumn>
                <TableRowColumn>{this.state.company.whyIsInovating}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Maiores dificuldades no momento</TableRowColumn>
                <TableRowColumn>{this.state.company.biggerDificulties}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Estágio do projeto</TableRowColumn>
                <TableRowColumn>{this.state.company.projectStage}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Tipo de negócio</TableRowColumn>
                <TableRowColumn>{this.state.company.businessType}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Possui MVP</TableRowColumn>
                <TableRowColumn>{this.state.company.hasMVP}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Possui breve plano de negócios</TableRowColumn>
                <TableRowColumn>{this.state.company.hasBusinnesPlan}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Tem potencial para internacionalização</TableRowColumn>
                <TableRowColumn>{this.state.company.internationalizable}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Oferecido em mais de uma língua</TableRowColumn>
                <TableRowColumn>{this.state.company.multilanguage}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Interesse(s) atual(ais)</TableRowColumn>
                <TableRowColumn>{this.state.company.currentInterst}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan="2" className="tableSessionHeader">
                  <h2>Pessoas envolvidas</h2>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Nome e tempo de dedicação dos sócios</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Formação dos sócios</TableRowColumn>
                <TableRowColumn>{this.state.company.membersGraduation}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Área de atuação dos sócios</TableRowColumn>
                <TableRowColumn>{this.state.company.membersOccupation}</TableRowColumn>
              </TableRow>
              <TableRow colSpan="2">
                <TableRowColumn colSpan="2" className="tableSessionHeader">
                  <h2>Investimentos</h2>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Captando investimentos</TableRowColumn>
                <TableRowColumn>{this.state.company.gatheringInvestments}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Quanto pretende captar</TableRowColumn>
                <TableRowColumn>{this.state.company.desiredValue}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>O que pretende fazer com o valor</TableRowColumn>
                <TableRowColumn>{this.state.company.desiredAction}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Porcentagem que está disposto à ceder</TableRowColumn>
                <TableRowColumn>{this.state.company.percentageWantToOffer}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Prazo de retorno do investimento</TableRowColumn>
                <TableRowColumn>{this.state.company.timeToRefund}</TableRowColumn>
              </TableRow>
              <TableRow colSpan="2">
                <TableRowColumn colSpan="2" className="tableSessionHeader">
                  <h2>Dados financeiros</h2>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Regime de tributação</TableRowColumn>
                <TableRowColumn>{this.state.company.taxation}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Faturamento médio mensal</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Valor mensal pagamento</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Valor médio mensal das despesas</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Qual lucro médio</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }

}
