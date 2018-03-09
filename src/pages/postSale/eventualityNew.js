import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Radio, Spin, Select } from 'antd';
import { TitleTwo } from '../../components/shared/';

import {
  requestParameter,
  requestColumns,
} from '../../state/parameterPV/action';

import {
  requestSaveEventuality,
  requestGetUpdate,
  requestGetSegmentColumns,
} from '../../state/eventualityPV/action';

const ContentPeriods = styled.div`
  margin: 6px auto 0;
  width: 95%;
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
const { Option, OptGroup } = Select;

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
  PeriodId: null,
  Name: null,
  Status: null,
  OperatorId: null,
  ColumnId: null,
};

class EventualityNew extends Component {
  state={
    idForm: 0,
  };

  componentWillMount() {
    const { idForm } = this.props;
    if (idForm && idForm !== 0) {
      this.setState({
        idForm,
      });
      this.props.requestGetUpdate(idForm);
    }
  }

  componentDidMount() {
    const { periodId } = this.props;
    this.props.requestParameterList('OPERACION');
    this.props.requestParameterColumn();
    this.props.requestGetSegmentColumns(periodId);
  }

  componentWillUnmount() {
    this.setState({
      idForm: 0,
    });
  }

  onReturn = () => {
    const { onReturn } = this.props;
    this.setState({
      idForm: 0,
    }, onReturn);
  };

  handleClickSave = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      const { onReturn, periodId, ltParams, ltColumns, ltColumnSegment } = this.props;
      const { idForm } = this.state;
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        dataForm.Id = idForm;
        dataForm.PeriodId = periodId;
        dataForm.Name = values.Name;
        dataForm.Status = values.Status;

        if (idForm > 0) {
          let dataOperator = null;
          if (!isNaN(values.Operator)) {
            dataOperator = ltParams.filter(val => val.Id.toString() === values.Operator.toString());
          } else {
            dataOperator = ltParams.filter(val => val.Name === values.Operator);
          }

          let dataColumn = null;
          let dataColumnSegment = null;
          if (!isNaN(values.Column)) {
            dataColumn = ltColumns.filter(val => val.Id.toString() === values.Column.toString());
          } else {
            dataColumn = ltColumns.filter(val => val.Value === values.Column);
            dataColumnSegment =
              ltColumnSegment
                .find(x => x.OptionId === values.Column || x.OptionName === values.Column);
          }
          if (values.Column.toString().includes('-')) {
            dataForm.ColumnId = dataColumnSegment.ColumnId;
            dataForm.SegmentId = dataColumnSegment.SegmentId;
          } else {
            dataForm.ColumnId = dataColumn[0].Id;
            dataForm.SegmentId = null;
          }
          dataForm.OperatorId = dataOperator[0].Id;
        } else if (values.Column.includes('-')) {
          dataForm.OperatorId = values.Operator;
          dataForm.ColumnId = values.Column.split('-')[0];
          dataForm.SegmentId = values.Column.split('-')[1];
        } else {
          dataForm.ColumnId = values.Column;
          dataForm.OperatorId = values.Operator;
          dataForm.SegmentId = null;
        }
        this.props.requestSave(dataForm, () => {
          onReturn();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, ltParams, ltColumns, ltColumnSegment } = this.props;
    return (
      <ContentPeriods>
        <ContentSpin spinning={loading}>
          <Row>
            <Col span={24}>
              <TitleTwo
                text="Configurar las eventualidades"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ContentForm layout="horizontal">
                <Row>
                  <Col span={24}>
                    <FormItem label="Columna que se afectara" {...formItemLayout}>
                      {getFieldDecorator('Column', {
                        rules:
                          [
                            {
                              required: true, message: 'Seleccione la columna es requerida',
                            },
                          ],
                      })(
                        <Select placeholder="-- Seleccione --">
                          <OptGroup label="Bono Volumen">
                            {
                              ltColumns
                                .map(opt => (
                                  <Option
                                    key={opt.Id.toString()}
                                  >
                                    {opt.Value.toString()}
                                  </Option>
                                ))
                            }
                          </OptGroup>
                          <OptGroup label="Segmentos">
                            {
                              ltColumnSegment
                                .filter(opt => opt.Format === 'S')
                                .map(opt => (
                                  <Option
                                    key={opt.OptionId.toString()}
                                  >
                                    {opt.OptionName.toString()}
                                  </Option>
                                ))
                            }
                          </OptGroup>
                          <OptGroup label="Segmentos Sin Objetivos">
                            {
                              ltColumnSegment
                                .filter(opt => opt.Format === 'O')
                                .map(opt => (
                                  <Option
                                    key={opt.OptionId.toString()}
                                  >
                                    {opt.OptionName.toString()}
                                  </Option>
                                ))
                            }
                          </OptGroup>
                        </Select>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem label="Nombre Eventualidad" {...formItemLayout}>
                      {getFieldDecorator('Name', {
                        rules:
                          [
                            {
                              required: true, message: 'El nombre del periodo de liquidación es requerido',
                            },
                            {
                              max: 50, message: 'El nombre de la eventualidad no puede ser mayor a 50 caracteres',
                            },
                          ],
                      })(
                        <Input />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem label="Operación" {...formItemLayout}>
                      {getFieldDecorator('Operator', {
                        rules:
                        [
                          {
                            required: true, message: 'Seleccione la operación es requerida',
                          },
                        ],
                      })(
                        <Select placeholder="-- Seleccione --">
                          {
                            ltParams
                              .map(opt => (
                                <Option
                                  key={opt.Id.toString()}
                                >
                                  {opt.Name.toString()}
                                </Option>
                              ))
                          }
                        </Select>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem label="Estado" {...formItemLayout}>
                      {getFieldDecorator('Status', {
                        initialValue: 1,
                      })(
                        <RadioGroup>
                          <Radio value={1}>Activo</Radio>
                          <Radio value={0}>Inactivo</Radio>
                        </RadioGroup>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </ContentForm>
            </Col>
          </Row>
          <ContentButton>
            <Col span={24}>
              <Button type="primary" onClick={this.handleClickSave} htmlType="submit">Guardar</Button>
              <Separator />
              <Button type="primary" ghost onClick={this.onReturn}>Regresar</Button>
            </Col>
          </ContentButton>
        </ContentSpin>
      </ContentPeriods>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.parameterPV.loading || state.eventualityPV.loading,
  ltParams: state.parameterPV.ltParams,
  ltColumns: state.parameterPV.ltColumns,
  ltColumnSegment: state.eventualityPV.ltColumnSegment,
  aDataForm: state.eventualityPV.aDataForm,
});

const mapDispatchToProps = dispatch => ({
  requestParameterList: (type) => {
    dispatch(requestParameter(type));
  },
  requestParameterColumn: () => {
    dispatch(requestColumns());
  },
  requestSave: (data, next) => {
    dispatch(requestSaveEventuality(data, next));
  },
  requestGetUpdate: (id) => {
    dispatch(requestGetUpdate(id));
  },
  requestGetSegmentColumns: (id) => {
    dispatch(requestGetSegmentColumns(id));
  },
});

const FormEventuality = Form.create({
  mapPropsToFields(props) {
    let objectUpdate = {};
    if (!props.blnNewData &&
      props.aDataForm.Name !== undefined &&
      props.ltParams.length > 0 &&
      props.ltColumns.length > 0 &&
      props.ltColumnSegment.length > 0
    ) {
      const status = props.aDataForm.Status ? 1 : 0;
      const dataOperator = props.ltParams.filter(val => val.Id === props.aDataForm.OperatorId);
      const dataColumn = props.ltColumns.filter(val => val.Id === props.aDataForm.ColumnId);
      // console.log(props);
      if (props.aDataForm.SegmentId === null) {
        objectUpdate = {
          Name: { value: props.aDataForm.Name },
          Operator: { value: dataOperator[0].Name },
          Column: { value: dataColumn[0].Value },
          Status: { value: status },
        };
      } else {
        const dataColumnSegment =
          props.ltColumnSegment
            .find(x => x.ColumnId === props.aDataForm.ColumnId
              && x.SegmentId === props.aDataForm.SegmentId);
        objectUpdate = {
          Name: { value: props.aDataForm.Name },
          Operator: { value: dataOperator[0].Name },
          Column: { value: dataColumnSegment.OptionName },
        };
      }
    }
    return objectUpdate;
  },
})(EventualityNew);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventuality);
