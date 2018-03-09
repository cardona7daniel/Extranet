import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportComponent from '../../components/newVehicle/ReportComponent';
import { requestPeriodsEventualities } from '../../state/period/action';
import * as actions from '../../state/eventuality/action';

class ReportEventualities extends Component {
  state = {
    idPeriod: null,
  }

  componentDidMount() {
    this.props.requestPeriodsEventualities();
  }

  handlerChange = (idPeriod) => {
    this.setState({
      idPeriod,
    });
  }

  handlerClick = () => {
    this.props.getListLogEventuality(this.state.idPeriod);
  }

  render() {
    const { idPeriod } = this.state;
    const { periods, generateLiq, urlDownload, loading } = this.props;
    return (
      <ReportComponent
        idPeriod={idPeriod}
        title="Reporte de Eventualidades"
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
  periods: state.period.periodsEventualities,
  generateLiq: state.eventuality.generateLiq,
  urlDownload: state.eventuality.urlDownload,
  loading: state.period.loading,
});

export default connect(
  mapStateToProps,
  {
    requestPeriodsEventualities,
    getListLogEventuality: actions.getListLogEventuality,
  },
)(ReportEventualities);
