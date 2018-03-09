import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, Spin, message } from 'antd';
import styled from 'styled-components';
import { Card } from '../../components/shared/index';
import requestPeriod from '../../state/period/action';
import requestExistObjectives from '../../state/objective/action';
import {
  requestBillingCriteria,
  saveBillingCriteriaPeriod,
} from '../../state/billingCriteria/action';
import Objectives from './objectives';
import Eventualities from './eventualityTabs';
import BillingCriteriaSelect from '../../components/newVehicle/BillingCriteriaSelect';
import NonDerogateLiquidationGeneration from './derogateLiquidationGeneration';

const ContentStyled = styled.div`
  padding: 2rem;
`;

const ContentStep = styled.div`
  margin-top: 1rem;
  border: 1px solid #e9e9e9;
  padding: 24px;
  border-radius: 6px;
  background-color: #fafafa;
  text-align: center;
`;

const ButtonCard = styled(Button) `
  margin-top: 15px;
  margin-left: 10px;
`;

const columnsBillingCriteria = [
  {
    title: 'Nombre',
    dataIndex: 'Name',
  },
];

const steps = [
  {
    index: 1,
    title: 'Objetivos Concesionarios',
    content: ({
      period,
      existsObjectives,
      viewObjectives,
      handleClickViewObjectives,
      changeCurrent,
    }) => {
      if (viewObjectives === true || existsObjectives === false) {
        return (
          <div>
            <h2>Período: {period.Name}</h2>
            <Objectives changeCurrent={() => changeCurrent(1)} />
          </div>
        );
      }
      return (
        <div>
          <h2>Período: {period.Name}</h2>
          <Card title="Extranet SOFASA">
            <p>Ya existen objetivos concesionario. ¿Requiere ingresarlos nuevamente?</p>
            <ButtonCard type="primary" size="large" onClick={handleClickViewObjectives}>Si</ButtonCard>
            <ButtonCard type="primary" size="large" onClick={() => changeCurrent(1)}>No</ButtonCard>
          </Card>
        </div>
      );
    },
  },
  {
    index: 2,
    title: 'Eventualidades',
    content: ({ period, changeCurrent }) => (
      <div>
        <h2>Período: {period.Name}</h2>
        <Eventualities changeCurrent={changeCurrent} />
      </div>
    ),
  },
  {
    index: 3,
    title: 'Criterios Facturación',
    content: ({ period,
      onSaveBillingCriteria,
      billingCriteria = [],
      selectedBillingCriteria = null,
    }) => (
      <div>
        <h2>Período: {period.Name}</h2>
        <BillingCriteriaSelect
          billingCriteria={billingCriteria}
          columns={columnsBillingCriteria}
          onSave={onSaveBillingCriteria}
          selected={selectedBillingCriteria}
        />
      </div>
    ),
  },
  {
    index: 4,
    title: 'Generar Liquidación',
    content: () => (
      <NonDerogateLiquidationGeneration />
    ),
  },
];

function ValidateRenderSteps({ currentStep, loading, period,
  existsObjectives, changeCurrent, children,
}) {
  if (loading === false && (!period || !Object.prototype.hasOwnProperty.call(period, 'Id'))) {
    return (
      <ContentStyled>
        <ContentStep>
          <Card title="Extranet SOFASA">
            <p>No existe periodo con estado: <strong>&quot;No Liquidado&quot;</strong></p>
            {/* <ButtonCard type="primary" size="large">Aceptar</ButtonCard> */}
          </Card>
        </ContentStep>
      </ContentStyled>
    );
  }

  if (currentStep > 0 && existsObjectives === false) {
    return (
      <ContentStyled>
        <ContentStep>
          <Card title="Extranet SOFASA">
            <p>No existe objetivos concesionarios, favor ingresarlos.</p>
            <ButtonCard type="primary" size="large" onClick={() => changeCurrent(0, true)}>
              Aceptar
            </ButtonCard>
          </Card>
        </ContentStep>
      </ContentStyled>
    );
  }

  return children;
}

class SettlementSteps extends Component {
  state = {
    currentStep: 0,
    viewObjectives: false,
  }

  componentDidMount() {
    this.props.requestPeriod();
  }

  componentWillReceiveProps = (nextProps) => {
    const { existsObjectives } = this.props;
    const { currentStep } = this.state;
    if (currentStep === 0 &&
      nextProps.period &&
      Object.prototype.hasOwnProperty.call(nextProps.period, 'Id') &&
      nextProps.period.Id > 0 &&
      existsObjectives === null
    ) {
      this.props.requestExistObjectives(nextProps.period.Id);
    }
  }

  onSaveBillingCriteria = (idsBillingCriteria = []) => {
    const { period, billingCriteria } = this.props;
    if (billingCriteria.length > 0 && idsBillingCriteria.length === 0) {
      message.error('Debe seleccionar al menos un criterio.');
    } else {
      this.props.saveBillingCriteriaPeriod(
        idsBillingCriteria,
        period.Id,
        () => this.changeCurrent(3),
      );
    }
  }

  changeCurrent = (stepIndex, manual = false) => {
    const { period } = this.props;
    const { currentStep } = this.state;

    if ((steps.length - 1) === stepIndex && manual === true) {
      return;
    }
    if ((manual && currentStep === 0 && stepIndex > currentStep) ||
    (manual && currentStep === 3 && stepIndex < currentStep)) {
      return;
    }
    // Cambia de paso si existe periodo
    if (period &&
      Object.prototype.hasOwnProperty.call(period, 'Id') &&
      period.Id > 0
    ) {
      const getDataBySteps = () => {
        if (stepIndex === 2 &&
          period &&
          Object.prototype.hasOwnProperty.call(period, 'Id') &&
          period.Id > 0
        ) {
          this.props.requestBillingCriteria(period.Id);
        }
      };

      this.setState({
        currentStep: stepIndex,
      }, getDataBySteps);
    }
  }

  handleClickViewObjectives = () => {
    this.setState({
      viewObjectives: true,
    });
  }

  render() {
    const { currentStep, viewObjectives } = this.state;
    const {
      period,
      loading,
      existsObjectives,
      billingCriteria,
      selectedBillingCriteria,
    } = this.props;
    let idsBillingCriteria = null;

    if (selectedBillingCriteria &&
      selectedBillingCriteria.length > 0
    ) {
      idsBillingCriteria = selectedBillingCriteria.map(billingCriteriaPeriod => (
        billingCriteriaPeriod.BillingCriteriaId
      ));
    }

    const options = {
      period,
      existsObjectives,
      viewObjectives,
      handleClickViewObjectives: this.handleClickViewObjectives,
      changeCurrent: this.changeCurrent,
      billingCriteria,
      onSaveBillingCriteria: this.onSaveBillingCriteria,
      selectedBillingCriteria: idsBillingCriteria,
      currentStep,
      loading,
    };

    return (
      <ContentStyled>
        <Spin spinning={loading}>
          <Steps current={currentStep}>
            {steps.map((step, idx) => (
              <Steps.Step
                key={step.index}
                title={step.title}
                style={{ cursor: 'pointer' }}
                onClick={() => this.changeCurrent(idx, true)}
              />
            ))}
          </Steps>
          {currentStep < steps.length
            &&
            <ValidateRenderSteps {...options}>
              <ContentStep>
                {steps[currentStep].content(options)}
              </ContentStep>
            </ValidateRenderSteps>
          }
        </Spin>
      </ContentStyled>
    );
  }
}

const mapStateToProps = state => ({
  period: state.period.period,
  loading: (
    state.period.loading ||
    state.objective.loading ||
    state.preliminarySettlement.loading ||
    state.billingCriteria.loading ||
    state.NDLiquidation.loading
  ),
  existsObjectives: state.objective.existsObjectives,
  billingCriteria: state.billingCriteria.billingCriteria,
  selectedBillingCriteria: state.billingCriteria.selectedBillingCriteria,
});

const mapDispatchToProps = dispatch => ({
  requestPeriod: () => {
    // False para LSC false
    dispatch(requestPeriod(false));
  },
  requestExistObjectives: (periodId) => {
    dispatch(requestExistObjectives(periodId));
  },
  requestBillingCriteria: (periodId) => {
    dispatch(requestBillingCriteria(periodId));
  },
  saveBillingCriteriaPeriod: (ids, periodId, next) => {
    dispatch(saveBillingCriteriaPeriod(ids, periodId, next));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettlementSteps);
