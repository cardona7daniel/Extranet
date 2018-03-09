import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Popconfirm } from 'antd';
import PeriodList from '../../components/newVehicle/PeriodList';
import {
  InfoStatus,
  Status,
  TitleTwo,
  ContentWrap,
} from '../../components/shared';
import PeriodForm from '../../components/newVehicle/PeriodForm';
import * as actions from '../../state/period/action';

const ColorStatus = {
  liquidado: '#7ad179',
  noliquidado: '#eb675a',
};

const renderStatus = value => (
  <div>
    <Status
      size="small"
      color={value === true ? ColorStatus.liquidado : ColorStatus.noliquidado}
    />
  </div>
);

const renderDate = value => (
  <span>
    {value.split('T')[0]}
  </span>
);

const columns = [
  {
    title: 'Periodo',
    dataIndex: 'Name',
    key: 'Name',
  }, {
    title: 'Fecha inicial',
    dataIndex: 'StartDate',
    key: 'StartDate',
    render: renderDate,
  }, {
    title: 'Fecha final',
    dataIndex: 'EndDate',
    key: 'EndDate',
    render: renderDate,
  }, {
    title: 'Criterio NPS',
    dataIndex: 'NPSCriterion',
    key: 'NPSCriterion',
    width: 100,
    render: value => (
      <Icon
        style={{ fontSize: 24, color: value === true ? '#6acc85' : '#747474' }}
        type={value === true ? 'check-square-o' : 'square-o'}
      />
    ),
  }, {
    title: 'E_LSD',
    dataIndex: 'LSDStatus',
    key: 'LSDStatus',
    width: 80,
    render: renderStatus,
  }, {
    title: 'E_LCD',
    dataIndex: 'LCDStatus',
    key: 'LCDStatus',
    width: 80,
    render: renderStatus,
  }, {
    title: 'Acciones',
    dataIndex: '',
    key: 'e',
    width: 100,
  },
];

const statusPeriod = [
  {
    key: 1,
    text: 'Liquidado',
    color: ColorStatus.liquidado,
  },
  {
    key: 2,
    text: 'No liquidado',
    color: ColorStatus.noliquidado,
  },
];

class Period extends Component {
  state = {
    visibleEditNew: false,
    idPeriod: null,
  }

  componentDidMount() {
    this.props.requestPeriods();
  }

  showVisibleNewEdit = (idPeriod = null) => {
    const id = isNaN(idPeriod) ? null : idPeriod;

    this.setState(
      {
        visibleEditNew: true,
        idPeriod: id,
      },
      () => this.props.requestPeriodById(id),
    );
  }

  hideVisibleNewEdit = () => {
    this.setState({
      visibleEditNew: false,
      idPeriod: null,
    }, () => {
      this.props.requestPeriods();
      this.props.emptyPeriodEdit();
    });
  }

  deletePeriod = (id) => {
    this.props.periodRemove(
      id,
      () => this.props.requestPeriods(),
    );
  }

  renderActions = (val, record) => (
    <div>
      <Button
        type="primary"
        size="large"
        ghost
        shape="circle"
        icon="edit"
        disabled={!(record.LSDStatus === false && record.LCDStatus === false)}
        onClick={() => this.showVisibleNewEdit(record.Id)}
      />
      <span className="ant-divider" />
      <Popconfirm
        title="¿Esta seguro de eliminar el periodo?"
        onConfirm={() => this.deletePeriod(record.Id)}
      >
        <Button
          type="danger"
          size="large"
          ghost
          shape="circle"
          icon="trash"
          disabled={!(record.LSDStatus === false && record.LCDStatus === false)}
        />
      </Popconfirm>
    </div>
  )

  render() {
    const { periods, periodEdit, PeriodsaveOrUpdate, loading } = this.props;
    const { visibleEditNew, idPeriod } = this.state;
    const title = 'PERIODOS DE LIQUIDACIÓN';

    if (visibleEditNew === true) {
      return (
        <ContentWrap>
          <TitleTwo text={title} />
          <PeriodForm
            idPeriod={idPeriod}
            onSubmit={PeriodsaveOrUpdate}
            loading={loading}
            periodEdit={periodEdit}
            returnToList={this.hideVisibleNewEdit}
          />
        </ContentWrap>
      );
    }

    columns[columns.length - 1].render = this.renderActions;
    return (
      <ContentWrap>
        <TitleTwo text={title} />
        <PeriodList
          columns={columns}
          data={periods}
          loading={loading}
        />
        <InfoStatus
          status={statusPeriod}
        />
        <Button
          type="primary"
          size="large"
          onClick={this.showVisibleNewEdit}
        >Nuevo</Button>
      </ContentWrap>
    );
  }
}

const mapStateToProps = state => ({
  periodEdit: state.period.periodEdit,
  periods: state.period.periods,
  loading: state.period.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(Period);
