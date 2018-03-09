import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import {
  InfoStatus,
  Status,
  TitleTwo,
} from '../../components/shared';
import ExclusionBonusCriteriaForm from '../../components/newVehicle/ExclusionBonusCriteriaForm';
import {
  requestAllExclusion,
  requestFamilyVehicleColumnsExclusion,
  saveOrUpdateExclusion,
} from '../../state/exclusion/action';

const TableStyled = styled(Table)`
  margin: 0 auto;
  max-width: 400px;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

const ColorStatus = {
  vigente: '#7ad179',
  historico: '#eb675a',
};

const ColumnsExcludedVehiclesBonusCriteria = [
  {
    title: 'Editar',
    dataIndex: '',
    key: 'e',
  }, {
    title: 'Descripción',
    dataIndex: 'Name',
    key: 'Name',
  }, {
    title: 'Estado',
    dataIndex: 'Flag',
    key: 'Flag',
    render: value => (
      <div>
        <Status
          size="small"
          color={value === true ? ColorStatus.vigente : ColorStatus.historico}
        />
      </div>
    ),
  },
];

const statusExclusions = [
  {
    key: 1,
    text: 'Vigente',
    color: ColorStatus.vigente,
  },
  {
    key: 2,
    text: 'Histórico',
    color: ColorStatus.historico,
  },
];

class ExclusionBonusCriteriaList extends Component {
  state = {
    visibleEditNew: false,
    idExclusion: null,
    list: [],
  }

  componentDidMount() {
    this.props.requestAllExclusion();
  }

  showVisibleNewEdit = (idExclusion = null) => {
    const id = isNaN(idExclusion) ? null : idExclusion;
    this.setState(
      {
        visibleEditNew: true,
        idExclusion: id,
      },
      () => this.props.requestFamilyVehicleColumnsExclusion(id),
    );
  }

  hideVisibleNewEdit = () => {
    this.setState({
      visibleEditNew: false,
      idExclusion: null,
    },
    this.props.requestAllExclusion);
  }

  render() {
    const { exclusion, families, vehicles, columns, exclusionEdit, loading } = this.props;
    const { visibleEditNew, idExclusion } = this.state;

    if (visibleEditNew === true) {
      return (
        <ExclusionBonusCriteriaForm
          loading={loading}
          idExclusion={idExclusion}
          families={families}
          vehicles={vehicles}
          columns={columns}
          exclusionEdit={exclusionEdit}
          returnToList={this.hideVisibleNewEdit}
          submitForm={this.props.saveOrUpdateExclusion}
        />
      );
    }

    ColumnsExcludedVehiclesBonusCriteria[0].render = (val, record) => (
      <Button
        type="primary"
        size="large"
        ghost
        shape="circle"
        icon="edit"
        onClick={() => this.showVisibleNewEdit(record.Id)}
      />
    );

    return (
      <div>
        <TitleTwo text="GRUPO DE VEHÍCULOS EXCLUIDOS" />
        <TableStyled
          rowKey={record => record.Id}
          columns={ColumnsExcludedVehiclesBonusCriteria}
          dataSource={exclusion}
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
  exclusion: state.exclusion.exclusion,
  families: state.exclusion.families,
  familiesExclusion: state.exclusion.familiesExclusion,
  vehicles: state.exclusion.vehicles,
  vehiclesExclusion: state.exclusion.vehiclesExclusion,
  columns: state.exclusion.columns,
  columnsExclusion: state.exclusion.columnsExclusion,
  exclusionEdit: state.exclusion.exclusionEdit,
  loading: state.exclusion.loading,
});

const mapDispatchToProps = dispatch => ({
  requestAllExclusion: () => {
    dispatch(requestAllExclusion());
  },
  requestFamilyVehicleColumnsExclusion: (idExclusion) => {
    dispatch(requestFamilyVehicleColumnsExclusion(idExclusion));
  },
  saveOrUpdateExclusion: (params, next) => {
    dispatch(saveOrUpdateExclusion(params, next));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExclusionBonusCriteriaList);
