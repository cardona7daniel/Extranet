import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportComponent from '../../components/newVehicle/ReportComponent';
import { requestPeriodsLiquidation } from '../../state/period/action';
import * as actions from '../../state/derogateLiquidation/action';

class ReportDerogateLiquidation extends Component {
  state = {
    idPeriod: null,
  }

  componentDidMount() {
    this.props.requestPeriodsLiquidation();
  }

  handlerChange = (idPeriod) => {
    this.setState({
      idPeriod,
    });
  }

  handlerClick = () => {
    console.log(this.state.idPeriod);
    this.props.exportNonDerogateLiquidation(this.state.idPeriod);
    this.setState();
  }

  render() {
    const { idPeriod } = this.state;
    const { periods, generateLiq, urlDownload, loading } = this.props;
    return (
      <ReportComponent
        idPeriod={idPeriod}
        title="Reporte de Liquidación Sin Derogación"
        options={periods}
        loading={loading}
        onChange={this.handlerChange}
        onClick={this.handlerClick}
        generateLiq={generateLiq}
        urlDownload={urlDownload}
      />
    );
  }
}

const mapStateToProps = state => ({
  periods: state.period.periodsLiquidations,
  generateLiq: state.NDLiquidation.generateLiq,
  urlDownload: state.NDLiquidation.urlDownload,
  loading: state.period.loading,
});

export default connect(
  mapStateToProps,
  {
    requestPeriodsLiquidation,
    exportNonDerogateLiquidation: actions.exportNonDerogateLiquidation,
  },
)(ReportDerogateLiquidation);
