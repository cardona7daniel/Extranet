import React, { Component } from 'react';
import { Table, Button } from 'antd/lib/index';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Status, InfoStatus } from '../../components/shared';
import * as actions from '../../state/eventuality/action';
import EventualityForm from '../../components/newVehicle/EventualityForm';
import { operators } from '../../utils/formats';

const TableStyled = styled(Table)`
  margin: 0 auto;
  max-width: 800px;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

const ColorStatus = {
  activo: '#7ad179',
  inactivo: '#eb675a',
};

const ColumnsTable = [
  {
    title: 'Editar',
    dataIndex: '',
    key: 'e',
  }, {
    title: 'Nombre Columna',
    dataIndex: 'ColumnName',
    key: 'ColumnName',
  }, {
    title: 'Signo',
    dataIndex: 'Operand',
    key: 'Operand',
    render: value => (
      <div>
        { operators.find(operator => operator.symbol.trim() === value.trim()).name }({value})
      </div>
    ),
  }, {
    title: 'Estado',
    dataIndex: 'Status',
    key: 'Status',
    render: value => (
      <div>
        <Status
          size="small"
          color={value === true ? ColorStatus.activo : ColorStatus.inactivo}
        />
      </div>
    ),
  },
];

const statusExclusions = [
  {
    key: 1,
    text: 'Activo',
    color: ColorStatus.activo,
  },
  {
    key: 2,
    text: 'Inactivo',
    color: ColorStatus.inactivo,
  },
];

class EventualitiesList extends Component {
  state = {
    visibleEditNew: false,
    idEventuality: null,
  }

  componentDidMount() {
    this.requestList();
    this.props.requestEventualitiesColumns();
  }

  requestList = () => {
    const { period } = this.props;
    this.props.requestEventualities(period.Id);
  }

  showVisibleNewEdit = (idEventuality = null) => {
    const id = isNaN(idEventuality) ? null : idEventuality;

    this.setState(
      {
        visibleEditNew: true,
        idEventuality: id,
      },
      () => this.props.requestEventuality(id),
    );
  }

  hideVisibleNewEdit = () => {
    this.setState({
      visibleEditNew: false,
      idEventuality: null,
    }, () => {
      this.requestList();
      this.props.emptyEventuality();
    });
  }

  render() {
    const {
      eventualities,
      columns,
      period,
      eventualityEdit,
      columnsAssigned,
      loading,
    } = this.props;
    const { visibleEditNew, idEventuality } = this.state;

    if (visibleEditNew === true) {
      let IdColumnEdited = null;
      if (idEventuality > 0) {
        IdColumnEdited = eventualities.filter(
          eventuality => eventuality.IdEventuality === idEventuality,
        );
        IdColumnEdited = (IdColumnEdited && IdColumnEdited[0].IdColumn) || null;
      }

      const filterColumns = columns.filter(
        column => columnsAssigned.indexOf(column.Id) === -1 || IdColumnEdited === column.Id,
      );

      return (
        <EventualityForm
          loading={loading}
          idEventuality={idEventuality}
          idPeriod={period.Id}
          columnOptions={filterColumns}
          operators={operators}
          eventualityEdit={eventualityEdit}
          returnToList={this.hideVisibleNewEdit}
          onSubmit={this.props.eventualitiesSaveOrUpdate}
        />
      );
    }

    ColumnsTable[0].render = (val, record) => (
      <Button
        type="primary"
        size="large"
        ghost
        shape="circle"
        icon="edit"
        onClick={() => this.showVisibleNewEdit(record.IdEventuality)}
      />
    );

    return (
      <div>
        <TableStyled
          rowKey={record => record.IdEventuality}
          columns={ColumnsTable}
          dataSource={eventualities}
          loading={loading}
        />
        <InfoStatus
          status={statusExclusions}
        />
        <Button
          type="primary"
          size="large"
          onClick={this.showVisibleNewEdit}
        >Nuevo</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.eventuality.loading,
  eventualities: state.eventuality.eventualities,
  eventualityEdit: state.eventuality.eventualityEdit,
  columnsAssigned: state.eventuality.columnsAssigned,
  columns: state.eventuality.columns,
  period: state.period.period,
});

export default connect(
  mapStateToProps,
  actions,
)(EventualitiesList);
