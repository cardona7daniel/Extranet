import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import {
  InfoStatus,
  Status,
  TitleTwo,
} from '../../components/shared';
import {
  requestAllBillingCriteria,
  requestFamilyVehicle,
  saveOrUpdateBillingCriteria,
  emptyBillingCriteria,
} from '../../state/billingCriteria/action';
import BillingCriteriaBonusCriteriaForm from '../../components/newVehicle/BillingCriteriaBonusCriteriaForm';

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

const ColumnsBillingCriteriaBonusCriteria = [
  {
    title: 'Editar',
    dataIndex: '',
    key: 'e',
  }, {
    title: 'Nombre Criterio',
    dataIndex: 'Name',
    key: 'Name',
  }, {
    title: 'Cantidad Facturada',
    dataIndex: 'InvoicedAmount',
    key: 'InvoicedAmount',
  }, {
    title: 'Cantidad Adicional',
    dataIndex: 'AdditionalQuantity',
    key: 'AdditionalQuantity',
  }, {
    title: 'Estado',
    dataIndex: 'Flag',
    key: 'Flag',
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

class BillingCriteriaBonusCriteriaList extends Component {
  state = {
    visibleEditNew: false,
    idBillingCriteria: null,
    list: [],
  }

  componentDidMount() {
    this.props.requestBillingCriteria();
  }

  showVisibleNewEdit = (idBillingCriteria = null) => {
    const id = isNaN(idBillingCriteria) ? null : idBillingCriteria;

    this.setState(
      {
        visibleEditNew: true,
        idBillingCriteria: id,
      },
      () => this.props.requestFamilyVehicle(id),
    );
  }

  hideVisibleNewEdit = () => {
    this.setState({
      visibleEditNew: false,
      idBillingCriteria: null,
    }, () => {
      this.props.requestBillingCriteria();
      this.props.emptyBillingCriteria();
    });
  }

  render() {
    const { billingCriteria, families, vehicles, billingCriteriaEdit, loading } = this.props;
    const { visibleEditNew, idBillingCriteria } = this.state;

    if (visibleEditNew === true) {
      return (
        <BillingCriteriaBonusCriteriaForm
          loading={loading}
          idBillingCriteria={idBillingCriteria}
          families={families}
          vehicles={vehicles}
          billingCriteriaEdit={billingCriteriaEdit}
          returnToList={this.hideVisibleNewEdit}
          submitForm={this.props.saveOrUpdateBillingCriteria}
        />
      );
    }

    ColumnsBillingCriteriaBonusCriteria[0].render = (val, record) => (
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
        <TitleTwo text="CRITERIOS DE FACTURACIÓN" />
        <TableStyled
          rowKey={record => record.Id}
          columns={ColumnsBillingCriteriaBonusCriteria}
          dataSource={billingCriteria}
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
  billingCriteria: state.billingCriteria.billingCriteria,
  families: state.billingCriteria.families,
  vehicles: state.billingCriteria.vehicles,
  billingCriteriaEdit: state.billingCriteria.billingCriteriaEdit,
  loading: state.billingCriteria.loading,
});

const mapDispatchToProps = dispatch => ({
  requestBillingCriteria: () => {
    dispatch(requestAllBillingCriteria());
  },
  requestFamilyVehicle: (id) => {
    dispatch(requestFamilyVehicle(id));
  },
  saveOrUpdateBillingCriteria: (params, next) => {
    dispatch(saveOrUpdateBillingCriteria(params, next));
  },
  emptyBillingCriteria: () => {
    dispatch(emptyBillingCriteria());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingCriteriaBonusCriteriaList);
