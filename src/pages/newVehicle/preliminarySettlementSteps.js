import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, Spin } from 'antd';
import styled from 'styled-components';
import { Card } from '../../components/shared/index';
import requestPeriod from '../../state/period/action';
import requestExistObjectives from '../../state/objective/action';
import Objectives from './objectives';
import PreliminarySettlementGeneration from './preliminarySettlementGeneration';

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

const ButtonCard = styled(Button)`
  margin-top: 15px;
  margin-left: 10px;
`;

const steps = [
  {
    index: 1,
    title: 'Período',
    content: () => (
      <Card title="Extranet SOFASA">
        <p>
          No existe período o ya existen liquidaciones posteriores
          a la preliminar ya realizada.
        </p>
        <ButtonCard type="primary" size="large">Aceptar</ButtonCard>
      </Card>
    ),
  },
  {
    index: 2,
    title: 'Objetivos concesionarios',
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
            <Objectives isPreliminary changeCurrent={() => changeCurrent(2)} />
          </div>
        );
      }
      return (
        <div>
          <h2>Período: {period.Name}</h2>
          <Card title="Extranet SOFASA">
            <p>Ya existen objetivos concesionarios. ¿Requiere ingresarlos nuevamente?</p>
            <ButtonCard type="primary" size="large" onClick={handleClickViewObjectives}>Si</ButtonCard>
            <ButtonCard type="primary" size="large" onClick={() => changeCurrent(2)}>No</ButtonCard>
          </Card>
        </div>
      );
    },
  },
  {
    index: 3,
    title: 'Generar liquidación preliminar',
    content: () => (
      <PreliminarySettlementGeneration />
    ),
  },
];

class PreliminarySettlementSteps extends Component {
  state = {
    currentStep: 0,
    viewObjectives: false,
  }

  componentDidMount() {
    this.props.requestPeriod();
  }

  componentWillReceiveProps = (nextProps) => {
    const { currentStep } = this.state;

    if (currentStep === 0 &&
      nextProps.period &&
      Object.prototype.hasOwnProperty.call(nextProps.period, 'Id') &&
      nextProps.period.Id > 0
    ) {
      this.props.requestExistObjectives(nextProps.period.Id);
      this.setState({
        currentStep: 1,
      });
    }
  }

  changeCurrent = (stepIndex) => {
    this.setState({
      currentStep: stepIndex,
    });
  }

  handleClickViewObjectives = () => {
    this.setState({
      viewObjectives: true,
    });
  }

  render() {
    const { currentStep, viewObjectives } = this.state;
    const { period, loading, existsObjectives } = this.props;

    return (
      <ContentStyled>
        <Spin spinning={loading}>
          <Steps current={currentStep}>
            {steps.map(step => <Steps.Step key={step.index} title={step.title} />)}
          </Steps>
          {currentStep < steps.length
            &&
              <ContentStep>
                {steps[currentStep].content({
                  period,
                  existsObjectives,
                  viewObjectives,
                  handleClickViewObjectives: this.handleClickViewObjectives,
                  changeCurrent: this.changeCurrent,
                })}
              </ContentStep>
          }
        </Spin>
      </ContentStyled>
    );
  }
}

const mapStateToProps = state => ({
  period: state.period.period,
  loading: (state.period.loading || state.objective.loading || state.preliminarySettlement.loading),
  existsObjectives: state.objective.existsObjectives,
});

const mapDispatchToProps = dispatch => ({
  requestPeriod: () => {
    dispatch(requestPeriod());
  },
  requestExistObjectives: (periodId) => {
    dispatch(requestExistObjectives(periodId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreliminarySettlementSteps);
