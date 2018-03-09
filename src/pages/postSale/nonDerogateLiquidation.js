import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Steps, Row, Col, Select, Spin, Modal } from 'antd';
import Objectives from './objectives';
import Warranty from './warrantyLiq';
import PerformConsolidated from './performConsolidated';
import NpsLiq from './npsLiq';
import Eventuality from './eventuality';
import NonDerogateLiquidationGeneration from './nonDerogateLiquidationGeneration';
import {
  requestNamesPeriod,
  requestSetStatePeriod,
  requestGetStatePeriod,
  requestDataObjectivePeriodClear,
  requestGetObjectiveWarrantyPeriod,
  verifyDataLiquidation,
} from '../../state/nonDerogateLiquidation/action';
import {
  TitleTwo,
} from '../../components/shared';

const Option = Select.Option;

const ContentSteps = styled.div`
  margin-top: 1rem;
  border: 1px solid #e9e9e9;
  padding: 24px;
  border-radius: 6px;
  background-color: #fafafa;
  text-align: center;
`;

const ContentStyled = styled.div`
  padding: 1rem;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const ContentSelect = styled(Select)`
  width: 15% !important;
`;

const MarginRow = styled(Row)`
  margin-top: 2%;
`;

class NonDerogateLiquidation extends Component {
  state = {
    current: -1,
    currentState: null,
    periodId: null,
    steps: [{
      index: 0,
      title: 'Objetivos',
      status: 'wait',
      component: ({ periodId }) =>
        (<Objectives
          periodId={periodId}
          afterObjective={this.changeCurrent}
        />),
    }, {
      index: 1,
      title: 'Garantías',
      status: 'wait',
      component: ({ periodId }) =>
        (<Warranty
          periodId={periodId}
          afterWarranty={this.changeCurrent}
        />),
    }, {
      index: 2,
      title: 'Realización Consolidado',
      status: 'wait',
      component: ({ periodId }) =>
        (<PerformConsolidated
          periodId={periodId}
          afterConsolidated={this.changeCurrent}
          indexStep={3}
        />),
    }, {
      index: 3,
      title: 'NPS',
      status: 'wait',
      component: ({ periodId }) =>
        (<NpsLiq
          periodId={periodId}
          afterNps={this.changeCurrent}
          indexStep={4}
        />),
    }, {
      index: 4,
      title: 'Eventualidades',
      status: 'wait',
      component: ({ periodId }) =>
        (<Eventuality
          periodId={periodId}
          afterEventuality={this.changeCurrent}
        />),
    }, {
      index: 5,
      title: 'Liquidación sin Derogaciones',
      status: 'wait',
      component: ({ periodId }) =>
        (<NonDerogateLiquidationGeneration
          periodId={periodId}
        />),
    }],
  };

  componentDidMount() {
    this.props.requestGetStatePeriod();
    this.props.requestNamesPeriod();
  }

  choosePeriod = (value) => {
    this.props.requestGetStatePeriod();
    this.props.requestNamesPeriod();
    const { steps, current } = this.state;
    this.setState(() => {
      const { ltNamesPeriod, ltStatePeriod } = this.props;
      if (current === 0) {
        this.props.requestGetObjectiveWarrantyPeriod(value, 'O');
      } else if (current === 1) {
        this.props.requestGetObjectiveWarrantyPeriod(value, 'W');
      } else if (current === 5) {
        this.props.verifyDataLiquidation(value);
      }
      const stateId = ltStatePeriod
        .filter(opt => opt.Id === parseInt(value, 10))
        .map(opt => opt.StateId);
      const applyNps = ltNamesPeriod
        .filter(x => x.Id === parseInt(value, 10))
        .map(x => x.ApplyNps);
      const indexConsolidado = steps.findIndex(x => x.title.toLocaleLowerCase().trim() === 'realización consolidado');
      steps[indexConsolidado].component = ({ periodId }) =>
        (<PerformConsolidated
          periodId={periodId}
          afterConsolidated={this.changeCurrent}
          indexStep={3}
        />);
      if (stateId[0] === null) {
        let i = 0;
        while (i < steps.length) {
          steps[i].status = 'wait';
          i += 1;
        }
        steps[0].status = 'process';
        this.props.requestSetStatePeriod(value, 1);
        if (!applyNps[0]) {
          steps[indexConsolidado].component = ({ periodId }) =>
            (<PerformConsolidated
              periodId={periodId}
              afterConsolidated={this.changeCurrent}
              indexStep={4}
            />);
          return {
            current: 0,
            currentState: 0,
            periodId: value,
            steps,
          };
        }
        return {
          current: 0,
          currentState: 0,
          periodId: value,
          steps,
        };
      }
      let i = 0;
      while (i < steps.length) {
        steps[i].status = 'wait';
        i += 1;
      }
      i = 0;
      while (i < stateId[0]) {
        steps[i].status = 'finish';
        i += 1;
      }
      steps[stateId[0] - 1].status = 'process';
      return {
        current: stateId[0] - 1,
        currentState: stateId[0] - 1,
        periodId: value,
        steps,
      };
    });
  };

  info = () => {
    Modal.info({
      title: 'Al crear este periodo a liquidar, se ha seleccionado que no aplica' +
      ' para el criterio NPS.',
      content: (
        <div>
          <p>Si es correcto, por favor hacer clic en el botón {'"Continuar"'}, de lo
            contrario, por favor dirijase a la opción de creación del periodo y
            seleccione que si aplica para NPS</p>
        </div>
      ),
      onOk() {},
    });
  };

  changeCurrent = (stepIndex, manual = false) => {
    const { current, periodId, currentState, steps } = this.state;
    const { ltNamesPeriod } = this.props;
    const applyNps = ltNamesPeriod
      .filter(x => x.Id === parseInt(periodId, 10))
      .map(x => x.ApplyNps);
    const indexNps = steps.findIndex(x => x.title.toLocaleLowerCase().trim() === 'nps');
    if ((current === -1 || periodId === null)) {
      return;
    }
    let i = 0;
    while (i < steps.length) {
      steps[i].status = 'wait';
      i += 1;
    }
    switch (manual) {
      case true: {
        if ((!applyNps[0] && stepIndex === indexNps) || stepIndex > currentState) {
          if (stepIndex === indexNps && stepIndex < currentState) {
            this.info();
          }
        } else {
          i = 0;
          while (i <= currentState) {
            steps[i].status = 'finish';
            i += 1;
          }
          steps[stepIndex].status = 'process';
          if (stepIndex < current) {
            this.setState({
              current: stepIndex,
            }, () => {
              this.props.requestDataObjectivePeriodClear();
            });
            return;
          }
          if (stepIndex <= currentState) {
            if (!applyNps[0] && stepIndex === indexNps) {
              return;
            }
            this.setState({
              current: stepIndex,
            }, () => {
              this.props.requestDataObjectivePeriodClear();
            });
          }
        }
        break;
      }
      case false: {
        let currentStep;
        if (!applyNps[0] && ((stepIndex === indexNps || stepIndex === indexNps + 1))) {
          currentStep = stepIndex + 1;
        } else {
          currentStep = stepIndex;
        }
        if (stepIndex > 0) {
          i = 0;
          while (i <= currentState) {
            steps[i].status = 'finish';
            i += 1;
          }
          steps[currentStep].status = 'process';
          this.setState({
            current: currentStep,
          });
        }
        const indexLiquidacion = steps.findIndex(x => x.title.toLocaleLowerCase().trim() === 'liquidación sin derogaciones');
        if (indexLiquidacion === currentState) {
          return;
        }
        if (stepIndex > 0 && (currentState === null || currentStep >= currentState)) {
          this.setState(() => {
            if (!applyNps[0] && (stepIndex + 1 === indexNps || stepIndex === indexNps)) {
              this.props.requestSetStatePeriod(periodId, currentState + 2);
              return {
                currentState: stepIndex + 1,
              };
            }
            this.props.requestSetStatePeriod(periodId, currentState + 2);
            return {
              currentState: stepIndex,
            };
          });
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { current, steps, periodId } = this.state;
    const { ltNamesPeriod, loading, loadingVerify } = this.props;
    return (
      <ContentSpin spinning={loading || loadingVerify}>
        <ContentStyled>
          <Row>
            <Col span={24}>
              <TitleTwo text="Generar Liquidación sin Derogaciones" />
            </Col>
          </Row>
          <Row>
            <Col span={24} offset={9}>
              <span>Seleccione un periodo: </span>
              <ContentSelect
                placeholder="Seleccionar"
                onChange={this.choosePeriod}
              >
                {
                  ltNamesPeriod
                    .filter(opt => opt.Flag)
                    .map(opt => (
                      <Option key={opt.Id.toString()}>{opt.Name.toString()}</Option>
                    ))
                }
              </ContentSelect>
            </Col>
          </Row>
          <MarginRow>
            <Col span={24}>
              <Steps current={current}>
                {steps.map((item, idx) => (
                  <Steps.Step
                    key={item.title}
                    title={item.title}
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.changeCurrent(idx, true)}
                    status={item.status}
                  />
                ))}
              </Steps>
              {
                current !== -1 && (
                  <ContentSteps>{steps[current].component({ periodId })}</ContentSteps>
                )
              }
            </Col>
          </MarginRow>
        </ContentStyled>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.nonDerogateLiquidation.loading,
  ltNamesPeriod: state.nonDerogateLiquidation.ltNamesPeriod,
  ltStatePeriod: state.nonDerogateLiquidation.ltStatePeriod,
  loadingVerify: state.nonDerogateLiquidation.loadingVerify,
});

const mapDispatchToProps = dispatch => ({
  requestNamesPeriod: () => {
    dispatch(requestNamesPeriod());
  },
  requestSetStatePeriod: (value, index) => {
    dispatch(requestSetStatePeriod(value, index));
  },
  requestGetStatePeriod: () => {
    dispatch(requestGetStatePeriod());
  },
  requestDataObjectivePeriodClear: () => {
    dispatch(requestDataObjectivePeriodClear());
  },
  requestGetObjectiveWarrantyPeriod: (periodId, type) => {
    dispatch(requestGetObjectiveWarrantyPeriod(periodId, type));
  },
  verifyDataLiquidation: (periodId) => {
    dispatch(verifyDataLiquidation(periodId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NonDerogateLiquidation);
