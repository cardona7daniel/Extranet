import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Icon, Button, InputNumber, Spin, Row, Col, Select,
  message as messageAnt } from 'antd';
import { TitleTwo } from '../../components/shared';
import * as actions from '../../state/rangePV/action';
import { requestRangeExclusion } from '../../state/exclusionPV/action';
import { requestColors } from '../../state/parameterPV/action';
import { requestGroupSegment } from '../../state/segmentPV/action';

const ContentTabs = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const SpinStyled = styled(Spin) `
width: auto !important;
`;

const iconX = {
  cursor: 'pointer',
  position: 'relative',
  top: '4px',
  fontSize: '30px',
  color: '#999',
  transition: 'all .3s',
};

const ContentTable = styled.div`
    width: 79%;
    margin-left: 11%;
    background: #f7bd01;
    font-weight: 500;
    padding: 9px;
    margin-bottom: 21px;
    color: rgba(0, 0, 0, 0.85);
    border-radius: 4px 4px 0 0;
`;

const ContentFields = styled(Row)`
  margin-bottom: 20px;
`;

const FormItem = Form.Item;
const Option = Select;

const isEmpty = value => (
  value === undefined || value === null || value === ''
);

const MAX_VALUE = 99999;

class Ranges extends Component {
  state = {
    onEdit: [],
    blnButton: false,
  };

  componentDidMount() {
    this.props.requestAllAccomplishments();
    this.props.requestRangeList();
    this.props.requestColorsList();
    this.props.requestGroupSegment();
  }

  add = () => {
    const { accomplishments, form } = this.props;

    let maxId = 1;
    if (accomplishments.length > 0) {
      maxId = Math.max(...accomplishments.map(accomplishment => accomplishment.Id));
    }

    const newKeyId = maxId * 3;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.concat(newKeyId),
    });
    this.props.onAddAccomplishments(newKeyId);

    this.setState(prevState => ({
      onEdit: [...prevState.onEdit, newKeyId],
      blnButton: true,
    }));
  }

  validateEmpty = () => {
    const { getFieldsValue } = this.props.form;
    const dataForm = getFieldsValue();
    return dataForm.keys.filter(key => dataForm[key][0] === null ||
      dataForm[key][0] === undefined).length > 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, Colors, ltsGroupSegment } = this.props;
    if (this.validateEmpty() === true) {
      this.props.validateMessage('1');
    } else {
      form.validateFieldsAndScroll({ force: true }, (err, fields) => {
        if (!err) {
          const ranges = fields.keys.map(key => ({
            InitialRange: fields[key][0],
            FinalRange: fields[key][1],
            BonusRange: fields[key][2],
            SegmentId: ltsGroupSegment.filter(g => fields[key][3] === g.Name)[0].Id,
            ColorId: Colors.filter(c => fields[key][4] === c.Name)[0].Id,
          }));

          this.props.saveAllAccomplishments(ranges);
          this.setState({
            onEdit: [],
          });
          this.props.form.resetFields();
        }
      });
    }
  }

  remove = (Id) => {
    const { form } = this.props;
    const { onEdit } = this.state;
    const keys = form.getFieldValue('keys');

    const deleteRow = () => {
      const indexEle = onEdit.indexOf(Id);
      form.setFieldsValue({
        keys: keys.filter(key => key !== Id),
      });
      if (indexEle >= 0) {
        this.setState(prevState => ({
          onEdit: prevState.onEdit.filter(edit => edit !== indexEle),
        }));
      } else {
        messageAnt.warning('Recuerde que para finalizar la eliminación debe guardar los cambios.');
      }
    };
    if (keys.length === 1) {
      return;
    }
    this.props.onRemoveAccomplishments(
      Id,
      deleteRow,
    );
  }

  validateMaxMin = (rule, value, callback) => {
    if (value < 0) {
      callback('Número negativo');
    }

    if (value > MAX_VALUE) {
      callback(`Debe ser menor o igual que ${MAX_VALUE}`);
    }
    callback();
  }

  validateInitialMinFinal = (rule, value, callback) => {
    if (isEmpty(value) === true) {
      callback();
      return;
    }
    const { getFieldValue } = this.props.form;
    const finalValue = getFieldValue(rule.field.replace(/\[[0-9]\]/ig, '[1]'));
    if (isEmpty(finalValue) !== true && value >= finalValue) {
      callback('Porcentaje Inicial es mayor o igual al porcentaje Final');
    }
    callback();
  }

  validateFinalMaxInitial = (rule, value, callback) => {
    if (isEmpty(value) === true) {
      callback();
      return;
    }
    const { getFieldValue } = this.props.form;
    const initialValue = getFieldValue(rule.field.replace(/\[[0-9]\]/ig, '[0]'));
    if (isEmpty(initialValue) !== true && value <= initialValue) {
      callback('Porcentaje final es menor o igual al porcentaje inicial');
    }
    callback();
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { accomplishments, loading, groupSegment, Colors } = this.props;
    const formItemLayout = {
      xs: { span: 19, offset: 3 },
      sm: { span: 19, offset: 3 },
      lg: { span: 19, offset: 3 },
    };

    getFieldDecorator('keys', {
      initialValue: (accomplishments
        && accomplishments.length > 0) ?
        accomplishments.map(accomplishment => accomplishment.Id)
        : [],
    });

    const keys = getFieldValue('keys');

    const formItems = accomplishments.map(element => (
      <Col {...formItemLayout} key={element.Id}>
        <FormItem>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[3]`, {
                initialValue: element.Segment,
                rules: [
                  { required: true, message: 'Debe seleccionar el segmento.' },
                ],
              })(
                <Select
                  placeholder="-- Seleccione --"
                  style={{ width: '92%' }}
                >
                  {
                    groupSegment
                      .map(opt => (
                        <Option
                          key={opt.Name.toString()}
                          value={opt.Name.toString()}
                        >
                          {opt.Name.toString()}
                        </Option>
                      ))
                  }
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[0]`, {
                initialValue: element.InitialRange,
                rules: [
                  { required: true, message: 'Debe ingresar porcentaje inicial.' },
                  { validator: this.validateMaxMin },
                  { validator: this.validateInitialMinFinal },
                ],
              })(
                <InputNumber
                  min={0}
                  max={MAX_VALUE}
                  step={0.1}
                  precision={2}
                  style={{ width: '80%' }}
                  placeholder="Porcentaje Inicial"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[1]`, {
                initialValue: element.FinalRange,
                rules: [
                  { required: true, message: 'Debe ingresar porcentaje final.' },
                  { validator: this.validateMaxMin },
                  { validator: this.validateFinalMaxInitial },
                ],
              })(
                <InputNumber
                  min={0}
                  max={MAX_VALUE}
                  step={0.1}
                  precision={2}
                  style={{ width: '80%' }}
                  placeholder="Porcentaje Final"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[2]`, {
                initialValue: element.BonusRange,
                rules: [
                  { required: true, message: 'Debe ingresar porcentaje bono.' },
                  { validator: this.validateMaxMin },
                ],
              })(
                <InputNumber
                  min={0}
                  max={MAX_VALUE}
                  step={0.01}
                  precision={2}
                  style={{ width: '80%' }}
                  placeholder="Porcentaje Bono"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[4]`, {
                initialValue: element.colorName,
                rules: [
                  { required: true, message: 'Debe seleccionar el color.' },
                ],
              })(
                <Select placeholder="-- Seleccione --">
                  {
                    Colors
                      .map(opt => (
                        <Option
                          key={opt.Name.toString()}
                          value={opt.Name.toString()}
                        >
                          {opt.Name.toString()}
                        </Option>
                      ))
                  }
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={1}>
            {keys.length > 1 ? (
              <Icon
                style={iconX}
                className="dynamic-delete-button"
                type="close-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(element.Id)}
              />
            ) : null}
          </Col>
        </FormItem>
      </Col>
    ));

    return (
      <ContentTabs>
        <SpinStyled spinning={loading}>
          <br />
          <TitleTwo text="Configurar porcentajes de cumplimiento Bono PV" />
          <ContentTable className="gutter-example">
            <Row>
              <Col span={3} offset={2}>
                <div className="gutter-box">Aplica para</div>
              </Col>
              <Col span={2} offset={2}>
                <div className="gutter-box">% Inicial</div>
              </Col>
              <Col span={2} offset={2}>
                <div className="gutter-box">% Final</div>
              </Col>
              <Col span={2} offset={2}>
                <div className="gutter-box">% Gana</div>
              </Col>
              <Col span={3} offset={2}>
                <div className="gutter-box">Color</div>
              </Col>
            </Row>
          </ContentTable>
          <Form
            onSubmit={this.handleSubmit}
            layout="vertical"
          >
            <ContentFields gutter={16}>
              {formItems}
            </ContentFields>
            <FormItem span={24}>
              <Button type="dashed" onClick={this.add} style={{ marginTop: '8px' }}>
                <Icon type="plus" /> Agregar Porcentaje
              </Button>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Guardar</Button>
            </FormItem>
          </Form>
        </SpinStyled>
      </ContentTabs>);
  }
}
const mapStateToProps = state => ({
  accomplishments: state.rangesPVApp.accomplishments,
  originalData: state.rangesPVApp.originalData,
  deleteItems: state.rangesPVApp.delteItems,
  validationMessage: state.rangesPVApp.validationMessage,
  loading: state.rangesPVApp.loading,
  groupSegment: state.exclusionPV.groupSegment,
  Colors: state.parameterPV.ltColors,
  ltsGroupSegment: state.segmentPV.ltsGroupSegment,
});

const mapDispatchToProps = dispatch => ({
  requestAllAccomplishments: () => {
    dispatch(actions.requestAllRanges());
  },
  onRemoveAccomplishments: (item, next) => {
    dispatch(actions.removeAccomplishment(item, next));
  },
  onAddAccomplishments: (Id) => {
    dispatch(actions.filterItemsOnAdd(Id));
  },
  validateMessage: (type) => {
    dispatch(actions.validationMessage(type));
  },
  saveAllAccomplishments: (params) => {
    dispatch(actions.saveRanges(params));
  },
  requestRangeList: () => {
    dispatch(requestRangeExclusion());
  },
  requestColorsList: () => {
    dispatch(requestColors());
  },
  requestGroupSegment: () => {
    dispatch(requestGroupSegment());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Ranges));
