import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Radio, DatePicker, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import { TitleTwo, TitleContent } from '../../components/shared/';
import {
  requestSavePeriod,
  requestGetUpdatePeriod,
  requestVerifyNps,
} from '../../state/periodLiqPV/action';
import {
  requestGetStatePeriod,
  requestSetStatePeriod,
} from '../../state/nonDerogateLiquidation/action';

moment.locale('es');

const ContentPeriods = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const ContentForm = styled(Form)`
  text-align: center;
`;

const ContentButton = styled(Row)`
  margin-top: 25px;
`;

const Separator = styled.span`
  margin-right: 20px;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const dataForm = {
  Id: 0,
  Name: null,
  ApplyNps: null,
  InitialDate: null,
  FinalDate: null,
  Flag: null,
  StateId: null,
  PeriodObjective: null,
  PeriodWarranty: null,
  Eventuality: null,
};

class Period extends Component {
  state={
    disabled: false,
    idForm: 0,
  };

  componentWillMount() {
    const { idForm, flag } = this.props;
    if (idForm && idForm !== 0) {
      this.setState({
        disabled: flag,
        idForm,
      });
      this.props.requestGetUpdatePeriod(idForm);
    }
  }

  componentDidMount() {
    this.props.requestGetStatePeriod();
  }

  componentWillReceiveProps() {
    if (this.props.blnNewPeriod) {
      this.setState({
        disabled: false,
        idForm: 0,
      });
    }
  }

  handleClickSavePeriod = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      const { onReturn, ltStatePeriod, bNps } = this.props;
      const { idForm } = this.state;
      if (!err) {
        const rangeValue = fieldsValue.rangePeriod;
        const values = {
          ...fieldsValue,
          rangePeriod: [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        dataForm.Id = idForm;
        dataForm.Name = values.Name;
        dataForm.ApplyNps = values.ApplyNps;
        dataForm.InitialDate = values.rangePeriod[0];
        dataForm.FinalDate = values.rangePeriod[1];
        dataForm.Flag = true;
        this.props.requestSavePeriod(dataForm, () => {
          if (idForm !== 0) {
            const stateId = ltStatePeriod
              .filter(opt => opt.Id === parseInt(idForm, 10))
              .map(opt => opt.StateId);
            if (values.ApplyNps === 0 && stateId[0] === 4) {
              this.props.requestSetStatePeriod(idForm, 5);
            } else if (!bNps && values.ApplyNps === 1 && stateId[0] === 5) {
              this.props.requestSetStatePeriod(idForm, 4);
            }
          }
          onReturn();
        });
      }
    });
  };

  changeStatePeriod = (value) => {
    const { idForm, ltStatePeriod } = this.props;
    const stateId = ltStatePeriod
      .filter(opt => opt.Id === parseInt(idForm, 10))
      .map(opt => opt.StateId);
    if (value.target.value === 1 && stateId[0] === 5) {
      this.props.requestVerifyNps(idForm);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { onReturn, loading, loadingDataForm } = this.props;
    const { disabled } = this.state;
    return (
      <ContentPeriods>
        <ContentSpin spinning={loadingDataForm || loading}>
          <Row>
            <Col span={24}>
              <TitleTwo
                text="Configuración de Periodos de Liquidación"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ContentForm layout="horizontal">
                <Row>
                  <Col span={24}>
                    <FormItem label="Nombre Periodo" {...formItemLayout}>
                      {getFieldDecorator('Name', {
                        rules:
                        [
                          {
                            required: true, message: 'El nombre del periodo de liquidación es requerido',
                          },
                          {
                            max: 30, message: 'El nombre del periodo de liquidación no puede ser mayor a 30 caracteres',
                          },
                        ],
                      })(
                        <Input disabled={disabled} />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem label="Aplica Criterio NPS" {...formItemLayout}>
                      {getFieldDecorator('ApplyNps', {
                        initialValue: 0,
                      })(
                        <RadioGroup onChange={this.changeStatePeriod}>
                          <Radio disabled={disabled} value={0}>No</Radio>
                          <Radio disabled={disabled} value={1}>Si</Radio>
                        </RadioGroup>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <TitleContent
                      width="60%"
                      text="Rango de fechas Facturación repuestos a tener en cuenta dentro del periodo"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} offset={8}>
                    <FormItem {...formItemLayout} >
                      {getFieldDecorator('rangePeriod', {
                        rules: [{ required: true, message: 'Seleccione un rango de fecha para el periodo de liquidación' }],
                      })(
                        <RangePicker
                          placeholder={['Fecha Inicio', 'Fecha Fin']}
                          format={dateFormat}
                          disabled={disabled}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </ContentForm>
            </Col>
          </Row>
          <ContentButton>
            <Col span={24}>
              <Button type="primary" disabled={disabled} onClick={this.handleClickSavePeriod} htmlType="submit">Guardar</Button>
              <Separator />
              <Button type="primary" ghost onClick={onReturn}>Regresar</Button>
            </Col>
          </ContentButton>
        </ContentSpin>
      </ContentPeriods>
    );
  }
}

const mapStateToProps = state => ({
  ltPeriod: state.periodLiqPV.ltPeriod,
  periodData: state.periodLiqPV.periodData,
  loading: state.periodLiqPV.loading,
  loadingDataForm: state.periodLiqPV.loadingDataForm,
  ltStatePeriod: state.nonDerogateLiquidation.ltStatePeriod,
  bNps: state.periodLiqPV.bNps,
});

const mapDispatchToProps = dispatch => ({
  requestSavePeriod: (data, next) => {
    dispatch(requestSavePeriod(data, next));
  },
  requestGetUpdatePeriod: (id) => {
    dispatch(requestGetUpdatePeriod(id));
  },
  requestGetStatePeriod: () => {
    dispatch(requestGetStatePeriod());
  },
  requestSetStatePeriod: (periodId, idx) => {
    dispatch(requestSetStatePeriod(periodId, idx));
  },
  requestVerifyNps: (periodId) => {
    dispatch(requestVerifyNps(periodId));
  },
});

const FormPeriod = Form.create({
  mapPropsToFields(props) {
    let objectUpdate = {};
    if (!props.blnNewPeriod && props.periodData) {
      const nps = props.periodData.ApplyNps ? 1 : 0;
      objectUpdate = {
        Name: { value: props.periodData.Name },
        ApplyNps: { value: nps },
        rangePeriod:
        {
          value:
          [
            moment(props.periodData.InitialDate, dateFormat),
            moment(props.periodData.FinalDate, dateFormat),
          ],
        },
      };
    }
    return objectUpdate;
  },
})(Period);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPeriod);
