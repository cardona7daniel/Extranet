import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Radio, Spin, message } from 'antd';
import { TitleTwo } from '../../components/shared/';
import Transfer from '../../components/shared/Transfer';
import { requestGroupSegmentExclusion } from '../../state/exclusionPV/action';
import { requestSave, requestGetUpdate, requestUpdate, requestDataClear } from '../../state/segmentPV/action';

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
  margin-top: -25px;
`;

const Separator = styled.span`
  margin-right: 20px;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const FormItemLeft = styled(FormItem)`
  text-align:left;
`;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 6 },
};

const dataForm = {
  Id: 0,
  Name: null,
  Description: null,
  Objective: null,
  Flag: null,
  Type: null,
  GroupSegment: [],
};

class Segment extends Component {
  state={
    idForm: 0,
    dataTransferSegment: [],
    aTargetKeysTranSegment: [],
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
    const { idForm } = this.props;
    this.props.requestSegmentList(idForm);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.segmentData &&
      !this.props.blnNewData &&
      this.props.segmentData
    ) {
      if ((nextProps.segmentData.Id &&
          nextProps.segmentData.Id !== this.props.segmentData.Id)
      ) {
        const dataTargetKeysTranSegment = [];
        nextProps.segmentData.GroupSegment.forEach((element) => {
          dataTargetKeysTranSegment.push(element.ParMod);
        });
        this.setState({
          aTargetKeysTranSegment: dataTargetKeysTranSegment,
          dataTransferSegment: dataTargetKeysTranSegment,
        });
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      idForm: 0,
    });
    this.props.requestDataClear();
  }

  onReturn = () => {
    const { onReturn } = this.props;
    this.setState({
      idForm: 0,
    }, onReturn);
  };

  getDataTransferSegment = (dataTransferSegment) => {
    this.setState({
      dataTransferSegment,
      aTargetKeysTranSegment: [],
    });
  }

  handleClickSave = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      const { onReturn, blnNewData } = this.props;
      const { idForm, dataTransferSegment } = this.state;
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        dataForm.Id = idForm;
        dataForm.Name = values.Name;
        dataForm.Description = values.Description;
        dataForm.Objective = values.Objective;
        dataForm.Flag = values.Status;

        if (dataTransferSegment.length === 0) {
          message.warning('Seleccione los segmentos para el grupo.');
          return false;
        }

        const aTransferSegment = [];
        dataTransferSegment.forEach((element) => {
          aTransferSegment.push({ ParMod: element });
        });
        dataForm.GroupSegment = aTransferSegment;

        if (idForm && idForm !== 0 && !blnNewData) {
          dataForm.Id = idForm;
          this.props.requestUpdate(dataForm, () => {
            onReturn();
          });
        } else {
          this.props.requestSave(dataForm, () => {
            onReturn();
          });
        }
      }
      return false;
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { aTargetKeysTranSegment } = this.state;
    const { loading, exSegment } = this.props;
    const dataSegment = exSegment.map(s => s.Segment);
    return (
      <ContentPeriods>
        <ContentSpin spinning={loading}>
          <Row>
            <Col span={24}>
              <TitleTwo
                text="Administrar Grupo De Segmentos Repuestos"
              />
            </Col>
          </Row>
          <ContentForm layout="horizontal">
            <FormItemLeft label="Estado del Grupo" {...formItemLayout}>
              {getFieldDecorator('Status', {
                initialValue: 1,
                rules:
                  [
                    {
                      required: true, message: 'El estado del grupo es requerido',
                    },
                  ],
              })(
                <RadioGroup>
                  <Radio value={1}>Activo</Radio>
                  <Radio value={0}>Inactivo</Radio>
                </RadioGroup>,
              )}
            </FormItemLeft>
            <FormItem label="Nombre del Grupo" {...formItemLayout}>
              {getFieldDecorator('Name', {
                rules:
                  [
                    {
                      required: true, message: 'El nombre del grupo es requerido',
                    },
                    {
                      max: 50, message: 'El nombre del grupo no puede ser mayor a 50 caracteres',
                    },
                  ],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem label="Descripción Grupo" {...formItemLayout}>
              {getFieldDecorator('Description', {
                rules:
                  [
                    {
                      max: 50, message: 'La descripción del grupo no puede ser mayor a 50 caracteres',
                    },
                  ],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItemLeft label="¿Tiene Objetivo?" {...formItemLayout}>
              {getFieldDecorator('Objective', {
                initialValue: 1,
                rules:
                  [
                    {
                      required: true, message: 'El campo es requerido',
                    },
                  ],
              })(
                <RadioGroup>
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </RadioGroup>,
              )}
            </FormItemLeft>
          </ContentForm>
          <FormItem>
            {getFieldDecorator('Segment')(
              <Transfer
                dataSource={dataSegment}
                dataTargetKeys={aTargetKeysTranSegment}
                titles={['Disponibles', 'Asignados']}
                listStyle={{ width: 350, height: 300 }}
                showSearch
                searchPlaceholder="Buscar Segmentos"
                dataTransfer={this.getDataTransferSegment}
              />,
            )}
          </FormItem>
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
  loading: state.exclusionPV.loading || state.segmentPV.loading,
  exSegment: state.exclusionPV.exSegment,
  segmentData: state.segmentPV.segmentData,
});

const mapDispatchToProps = dispatch => ({
  requestSegmentList: (idForm) => {
    dispatch(requestGroupSegmentExclusion(idForm));
  },
  requestSave: (data, next) => {
    dispatch(requestSave(data, next));
  },
  requestGetUpdate: (id) => {
    dispatch(requestGetUpdate(id));
  },
  requestUpdate: (data, next) => {
    dispatch(requestUpdate(data, next));
  },
  requestDataClear: () => {
    dispatch(requestDataClear());
  },
});

const FormSegment = Form.create({
  mapPropsToFields(props) {
    let objectUpdate = {};

    if (!props.blnNewData && props.segmentData) {
      objectUpdate = {
        Name: { value: props.segmentData.Name },
        Description: { value: props.segmentData.Description },
        Objective: { value: props.segmentData.Objective ? 1 : 0 },
        Status: { value: props.segmentData.Flag ? 1 : 0 },
      };
    }

    return objectUpdate;
  },
})(Segment);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormSegment);
