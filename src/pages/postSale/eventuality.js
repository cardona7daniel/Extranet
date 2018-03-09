import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Switch, Button, Collapse, message } from 'antd';
import styled from 'styled-components';
import {
  TitleTwo,
} from '../../components/shared';
import EventualityList from './eventualityList';
import EventualityLoad from './eventualityLoad';
import { requestSaveStateEventuality, requestEventuality, validateDataEventuality } from '../../state/eventualityPV/action';
import { requestGetStatePeriod, requestNamesPeriod } from '../../state/nonDerogateLiquidation/action';

const Panel = Collapse.Panel;

const ContentTabs = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const ContentButton = styled(Row)`
  margin-top: 12px;
`;

const ContentTitle = styled.div`
  margin-bottom: 40px;
`;

const ContentCollapse = styled(Collapse)`
  background-color: #fafafa !important;
`;

const ItemPanel = styled(Panel)`
  background-color: #ebebeb !important;
  
  .ant-collapse-header:hover {
    background-color: #ebebeb !important;
  }
  
  .ant-collapse-content {
    background-color: #fafafa !important;
  }
`;

const customPanelStyle = {
  background: '#fafafa',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

class Eventuality extends Component {
  state = {
    btnSwitch: false,
    file: false,
  };

  componentDidMount() {
    const { periodId } = this.props;
    this.props.GetStatePeriodLiquidation();
    this.props.requestNamesPeriod();
    this.props.requestEventuality(periodId);
    this.props.validateDataEventuality(periodId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.ltStatePeriod.length > 0
    && nextProps.ltStatePeriod !== this.props.ltStatePeriod) {
      this.setState(() => {
        const eventuality = nextProps.ltStatePeriod
          .filter(opt => opt.Id.toString() === nextProps.periodId.toString())
          .map(opt => opt.Eventuality);
        return {
          btnSwitch: eventuality[0],
        };
      });
    }
  }

  onChangeView = (checked) => {
    this.setState({
      btnSwitch: checked,
    });
  };

  onChargeFile = () => {
    this.setState({
      file: true,
    });
  }

  continue = () => {
    const { btnSwitch, file } = this.state;
    const { periodId, ltDataEventuality, dataValidateEventuality } = this.props;
    const state = btnSwitch === null ? false : btnSwitch;
    if (!state
    || (ltDataEventuality.length > 0
        && dataValidateEventuality.length > 0)
      || file) {
      this.props.requestSaveStateEventuality(state, periodId);
      this.props.afterEventuality(5);
    } else {
      message.warning('Primero debe crear una eventualidad y/o cargar un archivo con las eventualidades.');
    }
  };

  render() {
    const { btnSwitch } = this.state;
    const { periodId } = this.props;
    return (
      <ContentTabs>
        <Row>
          <Col span={24}>
            <TitleTwo text="Eventualidades" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ContentTitle>
              Aplicar eventualidades a este periodo <Switch checkedChildren="Si" unCheckedChildren="No" onChange={this.onChangeView} checked={btnSwitch} />
            </ContentTitle>
          </Col>
        </Row>
        {btnSwitch
          ? (
            <Row>
              <Col span={20} offset={2}>
                <ContentCollapse bordered={false}>
                  <ItemPanel header="1. Crear los tipos de eventualidades" key="1" style={customPanelStyle}>
                    <EventualityList periodId={periodId} />
                  </ItemPanel>
                  <ItemPanel header="2. Cargar archivo de eventualidades" key="2" style={customPanelStyle}>
                    <EventualityLoad
                      periodId={periodId}
                      onChargeFileEventuality={this.onChargeFile}
                    />
                  </ItemPanel>
                </ContentCollapse>
              </Col>
            </Row>
          ) : (
            null
          )
        }
        <ContentButton>
          <Col span={24}>
            <Button type="primary" ghost onClick={this.continue}>Continuar</Button>
          </Col>
        </ContentButton>
      </ContentTabs>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.nonDerogateLiquidation.loading,
  ltStatePeriod: state.nonDerogateLiquidation.ltStatePeriod,
  ltNamesPeriod: state.nonDerogateLiquidation.ltNamesPeriod,
  ltDataEventuality: state.eventualityPV.ltsEventuality,
  dataValidateEventuality: state.eventualityPV.dataValidateEventuality,
});

const mapDispatchToProps = dispatch => ({
  requestSaveStateEventuality: (eventualityState, PeriodId) => {
    dispatch(requestSaveStateEventuality(eventualityState, PeriodId));
  },
  GetStatePeriodLiquidation: () => {
    dispatch(requestGetStatePeriod());
  },
  requestNamesPeriod: () => {
    dispatch(requestNamesPeriod());
  },
  requestEventuality: (periodId) => {
    dispatch(requestEventuality(periodId));
  },
  validateDataEventuality: (periodId) => {
    dispatch(validateDataEventuality(periodId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Eventuality);

