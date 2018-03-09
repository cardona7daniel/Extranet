import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Checkbox, Radio, Button, Select, message, Spin } from 'antd';
import styled from 'styled-components';
import Transfer from '../../components/shared/Transfer';
import Card from '../../components/shared/Card';
import CardCheckbox from '../../components/shared/CardCheckbox';
import {
  TitleContent,
  TitleTwo,
} from '../../components/shared';
import {
  requestRangeExclusion,
  requestSegmentExclusion,
  requestLiquidationExclusion,
  requestFamilyExclusion,
  requestSaveExclusion,
  requestGetUpdateExclusion,
  requestUpdateExclusion,
  requestDataExclusionClear,
} from '../../state/exclusionPV/action';

const ContentExclusions = styled.div`
  border-radius: 6px;
  width: 70%;
  text-align: center;
  display: inline-block;
`;

const ContentActive = styled(Row)`
  margin-left: -50% !important;
`;

const ContentColRange = styled(Col)`
  margin-right: 5px;
`;

const ContentBtnReturn = styled(Button)`
  margin-left: 10px;
`;

const ContentButton = styled(Row)`
  margin-top: 15px;
`;

const RadioGroup = Radio.Group;
const ContentRadioGroup = styled(RadioGroup)`
  display: block !important;
  width: 20px;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const dataForm = {
  Id: 0,
  Name: null,
  Description: null,
  Flag: null,
  ParameterId: null,
  SegmentId: null,
  FinalRange: null,
  InitialRange: null,
  GroupSegment: [],
  Segment: [],
  Family: [],
  Reference: [],
  LiqParameter: [],
};

const { TextArea } = Input;

class Exclusion extends Component {
  state = {
    valueAplica: 1,
    checkedList: [],
    checkedListLiquidation: [],
    dataTransferSegment: [],
    dataTransferFamily: [],
    dataTransferReference: [],
    aTargetKeysTranSegment: [],
    aTargetKeysTranFamily: [],
    aTargetKeysTranRef: [],
    aGroupSegment: [],
    defaultCheckedSegment: [],
    aLiqParameter: [],
    defaultCheckedParameter: [],
  };

  componentWillMount() {
    const { idForm } = this.props;
    this.props.requestRangeList();
    this.props.requestLiquidationtList();
    if (idForm && idForm !== 0) {
      this.props.requestExclusionGetUpdate(idForm);
    }
  }

  componentDidMount() {
    this.props.requestSegmentList();
    this.props.requestFamilyList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groupSegment) {
      const { aGroupSegment } = this.state;
      const defaultSegment = [];
      nextProps.groupSegment.forEach((valueGroupSeg) => {
        aGroupSegment.forEach((element) => {
          if (element === valueGroupSeg.Id) {
            defaultSegment.push(valueGroupSeg.Name);
          }
        });
      });
      this.setState({
        defaultCheckedSegment: defaultSegment,
        checkedList: defaultSegment,
      });
    }

    if (nextProps.groupLiquidation) {
      const { aLiqParameter } = this.state;
      const defaultData = [];
      nextProps.groupLiquidation.forEach((valueGroupSeg) => {
        aLiqParameter.forEach((element) => {
          if (element === valueGroupSeg.Id) {
            if (valueGroupSeg.Value !== 'Todos') {
              defaultData.push(valueGroupSeg.Value);
            }
          }
        });
      });
      this.setState({
        defaultCheckedParameter: defaultData,
        checkedListLiquidation: defaultData,
      });
    }

    if (nextProps.exclusionData &&
      !this.props.blnNewExclusion
    ) {
      if ((nextProps.exclusionData.Id &&
          nextProps.exclusionData.Id !== this.props.exclusionData.Id)
      ) {
        const dataTargetKeysTranSegment = [];
        nextProps.exclusionData.Segment.forEach((element) => {
          dataTargetKeysTranSegment.push(element.Segment);
        });
        const dataTargetKeysTranFamily = [];
        nextProps.exclusionData.Family.forEach((element) => {
          dataTargetKeysTranFamily.push(element.Family);
        });
        const dataTargetKeysTranRef = [];
        nextProps.exclusionData.Reference.forEach((element) => {
          dataTargetKeysTranRef.push(`${element.Reference} - ${element.Description}`);
        });
        const dataGroupSegment = [];
        nextProps.exclusionData.GroupSegment.forEach((element) => {
          dataGroupSegment.push(element.SegmentId);
        });
        const dataLiqParameter = [];
        nextProps.exclusionData.LiqParameter.forEach((element) => {
          dataLiqParameter.push(element.ParameterId);
        });
        this.setState({
          valueAplica: nextProps.exclusionData.ParameterId,
          aTargetKeysTranSegment: dataTargetKeysTranSegment,
          dataTransferSegment: dataTargetKeysTranSegment,
          aTargetKeysTranFamily: dataTargetKeysTranFamily,
          dataTransferFamily: dataTargetKeysTranFamily,
          aTargetKeysTranRef: dataTargetKeysTranRef,
          dataTransferReference: dataTargetKeysTranRef,
          aGroupSegment: dataGroupSegment,
          aLiqParameter: dataLiqParameter,
        });
      }
      if (nextProps.exclusionData.Id !== this.props.exclusionData.Id) {
        this.props.requestRangeList();
      }
    }
  }

  componentWillUnmount() {
    this.props.requestDataExclusionClear();
  }

  getCheckedListLiquidation = (checkedListLiquidation) => {
    this.setState({
      checkedListLiquidation,
    });
  }

  getCheckedListSegments = (checkedList) => {
    this.setState({
      checkedList,
    });
  }

  getDataTransferSegment = (dataTransferSegment) => {
    this.setState({
      dataTransferSegment,
      aTargetKeysTranSegment: [],
    });
  }

  getDataTransferFamily = (dataTransferFamily) => {
    this.setState({
      dataTransferFamily,
      aTargetKeysTranFamily: [],
    });
  }

  getDataTransferReference = (dataTransferReference) => {
    this.setState({
      dataTransferReference,
      aTargetKeysTranRef: [],
    });
  }

  handleChangeRadioGroup = (e) => {
    this.setState({
      valueAplica: e.target.value,
    });
  }

  validateDecimal = (rules, value, isValid) => {
    if (value !== undefined) {
      if (value.indexOf(',') !== -1) {
        return /^(\d+)(,\d+)?$/.test(value) && value.length <= 11 ? isValid() : isValid(false);
      }
      return /^(\d+)$/.test(value) && value.length <= 10 ? isValid() : isValid(false);
    }
    return isValid(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      checkedList,
      checkedListLiquidation,
      valueAplica,
      dataTransferSegment,
      dataTransferFamily,
      dataTransferReference,
    } = this.state;
    const { groupSegment, groupLiquidation, onReturn, idForm, blnNewExclusion } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dataForm.Name = values.Name;
        dataForm.Description = values.Description;
        dataForm.Flag = values.Flag;
        dataForm.ParameterId = valueAplica;

        const dataSegment = [];
        if (valueAplica === 2) {
          if (checkedList.length > 0) {
            groupSegment.forEach((segment) => {
              checkedList.forEach((element) => {
                if (segment.Name === element) {
                  dataSegment.push({ SegmentId: segment.Id });
                }
              });
            });
          } else {
            message.warning('Seleccione un rango de cumplimiento.');
            return false;
          }
          dataForm.GroupSegment = dataSegment;
        } else if (valueAplica === 3) {
          if (values.SegmentId === undefined) {
            message.warning('Seleccione una opción para el rango de cumplimiento.');
            return false;
          } else if (values.InitialRange === undefined || values.FinalRange === undefined) {
            message.warning('Ingrese el porcentage inicial y final para el rango de cumplimiento.');
            return false;
          }

          if (parseInt(values.InitialRange, 10) > parseInt(values.FinalRange, 10)) {
            message.warning('El porcentaje del rango inicial debe ser menor que el rango final');
            return false;
          }

          dataForm.SegmentId = values.SegmentId;
          dataForm.InitialRange = values.InitialRange;
          dataForm.FinalRange = values.FinalRange;
        }

        if (dataTransferSegment.length === 0 &&
          dataTransferFamily.length === 0 &&
          dataTransferReference.length === 0
        ) {
          message.warning('Seleccione segmento, familia o referencia que se excluirán.');
          return false;
        }
        const aTransferSegment = [];
        dataTransferSegment.forEach((element) => {
          aTransferSegment.push({ Segment: element });
        });
        dataForm.Segment = aTransferSegment;

        const aTransferFamily = [];
        dataTransferFamily.forEach((element) => {
          aTransferFamily.push({ Family: element });
        });
        dataForm.Family = aTransferFamily;

        const aTransferReference = [];
        dataTransferReference.forEach((element) => {
          const res = element.split('-');
          aTransferReference.push({
            Reference: res[0].trim(),
            Description: res[1].trim(),
          });
        });
        dataForm.Reference = aTransferReference;

        const dataLiquidation = [];
        if (checkedListLiquidation.length > 0) {
          groupLiquidation.forEach((segment) => {
            checkedListLiquidation.forEach((element) => {
              if (segment.Value === element) {
                dataLiquidation.push({ ParameterId: segment.Id });
              }
            });
          });
          dataForm.LiqParameter = dataLiquidation;
        } else {
          message.warning('Seleccione un campo de la liquidación al cual se le aplicará la exclusión.');
          return false;
        }
        if (idForm && idForm !== 0 && !blnNewExclusion) {
          dataForm.Id = idForm;
          this.props.requestUpdateExclusion(dataForm, () => {
            onReturn();
          });
        } else {
          this.props.requestSaveExclusion(dataForm, () => {
            onReturn();
          });
        }
      }
      return false;
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      groupSegment,
      groupLiquidation,
      onReturn,
      exSegment,
      exFamily,
      loadingDataForm,
    } = this.props;
    const {
      valueAplica,
      aTargetKeysTranSegment,
      aTargetKeysTranFamily,
      aTargetKeysTranRef,
      defaultCheckedSegment,
      defaultCheckedParameter,
    } = this.state;
    const dataPlainOptions = groupSegment.map(plainOption => (
      plainOption.Name
    ));
    const dataLiquidationOptions = groupLiquidation.map(plainOption => (
      plainOption.Value
    ));
    dataLiquidationOptions.splice(0, 1);
    const dataSegment = exSegment.map(s => s.Segment);
    const dataFamily = exFamily.map(f => f.Family);
    return (
      <ContentExclusions>
        <ContentSpin spinning={loadingDataForm}>
          <Row>
            <Col span="24">
              <TitleTwo text="Exclusiones para Repuestos" />
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col span={20}>
                    <FormItem label="Nombre Exclusión" {...formItemLayout}>
                      {getFieldDecorator('Name', {
                        rules: [
                          { required: true, message: 'Nombre de la Exclusión es obligatorio.' },
                          { max: 50, message: 'Nombre de la Exclusión no puede ser mayor a 50 caracteres.' },
                        ],
                      })(
                        <Input />,
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <ContentActive>
                      <FormItem {...formItemLayout}>
                        {getFieldDecorator('Flag', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox >
                            Activa
                          </Checkbox>,
                        )}
                      </FormItem>
                    </ContentActive>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <FormItem label="Descripción" {...formItemLayout}>
                      {getFieldDecorator('Description', {
                        rules: [
                          { max: 120, message: 'Descripción de la Exclusión no puede ser mayor a 120 caracteres.' },
                        ],
                      })(
                        <TextArea
                          rows={4}
                          autosize={{ minRows: 4, maxRows: 6 }}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <FormItem label="Aplica a:" {...formItemLayout}>
                      {getFieldDecorator('ParameterId', {
                        initialValue: valueAplica,
                      })(
                        <ContentRadioGroup
                          onChange={this.handleChangeRadioGroup}
                        >
                          <Radio value={1}>
                            Todos los rangos de la cifra de negocio y de los grupos de segmentos.
                          </Radio>
                          <Radio value={2}>Todos los rangos de:</Radio>
                          <Radio value={3}>Solo a un rango de cumplimiento.</Radio>
                        </ContentRadioGroup>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {valueAplica === 2
                      ? (
                        <div>
                          <TitleContent
                            width="70%"
                            text="Todos los rangos de:"
                          />
                          <CardCheckbox
                            textAll="Todos"
                            width="50%"
                            defaultCheckedList={defaultCheckedSegment}
                            plainOptions={dataPlainOptions}
                            getCheckedList={this.getCheckedListSegments}
                          />
                        </div>
                      ) : (
                        null
                      )
                    }
                    {valueAplica === 3
                      ? (
                        <div>
                          <TitleContent
                            width="70%"
                            text="Solo a un rango de cumplimiento"
                            IconName="info-circle"
                            titleTooltip="Recuerde que la separación de decimales es con una coma"
                          />
                          <Card width="60%">
                            <Row>
                              <ContentColRange span={11}>
                                <FormItem label="Aplica para">
                                  {getFieldDecorator('SegmentId')(
                                    <Select placeholder="-- Seleccione --">
                                      {
                                        groupSegment
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
                              </ContentColRange>
                              <ContentColRange span={6}>
                                <FormItem label="% Inicial">
                                  {getFieldDecorator('InitialRange', {
                                    rules: [
                                      { validator: this.validateDecimal, message: 'Campo númerico. Ingrese máximo 10 números' },
                                    ],
                                  })(
                                    <Input />,
                                  )}
                                </FormItem>
                              </ContentColRange>
                              <Col span={6}>
                                <FormItem label="% Final">
                                  {getFieldDecorator('FinalRange', {
                                    rules: [
                                      { validator: this.validateDecimal, message: 'Campo númerico. Ingrese máximo 10 números' },
                                    ],
                                  })(
                                    <Input />,
                                  )}
                                </FormItem>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      ) : (
                        null
                      )
                    }
                  </Col>
                </Row>
                <TitleContent
                  width="70%"
                  text="Seleccione los segmentos que se excluirán"
                />
                <Row>
                  <Col span={24}>
                    <FormItem>
                      {getFieldDecorator('Segment')(
                        <Transfer
                          dataSource={dataSegment}
                          dataTargetKeys={aTargetKeysTranSegment}
                          titles={['Disponibles', 'Asignados']}
                          listStyle={{ width: 250, height: 261 }}
                          showSearch
                          searchPlaceholder="Buscar Segmentos"
                          dataTransfer={this.getDataTransferSegment}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <TitleContent
                  text="Seleccione las familias que se excluirán"
                  width="70%"
                />
                <Row>
                  <Col span={24}>
                    <FormItem>
                      {getFieldDecorator('Family')(
                        <Transfer
                          dataSource={dataFamily}
                          dataTargetKeys={aTargetKeysTranFamily}
                          titles={['Disponibles', 'Asignados']}
                          listStyle={{ width: 250, height: 261 }}
                          showSearch
                          searchPlaceholder="Buscar Familias"
                          dataTransfer={this.getDataTransferFamily}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <TitleContent
                  text="Seleccione las referencias que se excluirán"
                  width="70%"
                />
                <Row>
                  <Col span={24}>
                    <FormItem>
                      {getFieldDecorator('Reference')(
                        <Transfer
                          dataSource={aTargetKeysTranRef}
                          dataTargetKeys={aTargetKeysTranRef}
                          titles={['Disponibles', 'Asignados']}
                          listStyle={{ width: 250, height: 261 }}
                          showSearch
                          showSearchExternal
                          searchPlaceholder="Buscar Referencia"
                          placeholderExternal="Referencia"
                          dataTransfer={this.getDataTransferReference}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <TitleContent
                      width="70%"
                      text="Por favor seleccione los campos de la liquidación a los cuales les aplicará la Exclusión"
                    />
                    <CardCheckbox
                      cardTitle=""
                      textAll="Todos"
                      width="60%"
                      plainOptions={dataLiquidationOptions}
                      defaultCheckedList={defaultCheckedParameter}
                      getCheckedList={this.getCheckedListLiquidation}
                    />
                  </Col>
                </Row>
                <ContentButton>
                  <Col span={24}>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                    <ContentBtnReturn type="primary" ghost onClick={onReturn}>Regresar</ContentBtnReturn>
                  </Col>
                </ContentButton>
              </Form>
            </Col>
          </Row>
        </ContentSpin>
      </ContentExclusions>
    );
  }
}

const mapStateToProps = state => ({
  groupSegment: state.exclusionPV.groupSegment,
  exSegment: state.exclusionPV.exSegment,
  groupLiquidation: state.exclusionPV.groupLiquidation,
  exFamily: state.exclusionPV.exFamily,
  loadingDataForm: state.exclusionPV.loadingDataForm,
  exclusionData: state.exclusionPV.exclusionData,
});

const mapDispatchToProps = dispatch => ({
  requestRangeList: () => {
    dispatch(requestRangeExclusion());
  },
  requestSegmentList: () => {
    dispatch(requestSegmentExclusion());
  },
  requestFamilyList: () => {
    dispatch(requestFamilyExclusion());
  },
  requestLiquidationtList: () => {
    dispatch(requestLiquidationExclusion());
  },
  requestSaveExclusion: (data, next) => {
    dispatch(requestSaveExclusion(data, next));
  },
  requestExclusionGetUpdate: (id) => {
    dispatch(requestGetUpdateExclusion(id));
  },
  requestUpdateExclusion: (data, next) => {
    dispatch(requestUpdateExclusion(data, next));
  },
  requestDataExclusionClear: () => {
    dispatch(requestDataExclusionClear());
  },
});

const FormExclusion = Form.create({
  mapPropsToFields(props) {
    let objectUpdate = {};

    if (!props.blnNewExclusion && props.exclusionData) {
      objectUpdate = {
        Name: { value: props.exclusionData.Name },
        Flag: { value: props.exclusionData.Flag },
        Description: { value: props.exclusionData.Description },
        ParameterId: {
          value: props.exclusionData.ParameterId,
        },
      };

      if (props.exclusionData.SegmentId) {
        objectUpdate.SegmentId = {};
        objectUpdate.SegmentId.value = props.exclusionData.SegmentId.toString();
      }
      if (props.exclusionData.InitialRange) {
        objectUpdate.InitialRange = {};
        objectUpdate.InitialRange.value = props.exclusionData.InitialRange.toString();
      }
      if (props.exclusionData.FinalRange) {
        objectUpdate.FinalRange = {};
        objectUpdate.FinalRange.value = props.exclusionData.FinalRange.toString();
      }
    }

    return objectUpdate;
  },
})(Exclusion);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormExclusion);
