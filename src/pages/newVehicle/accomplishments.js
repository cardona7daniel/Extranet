import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Form, Icon, Button, InputNumber, Spin, Row, Col, message as messageAnt,
} from 'antd';
import { TitleTwo } from '../../components/shared';
import * as actions from '../../state/accomplishments/action';

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
    width: 76%;
    margin-left: 15%;
    background: #f7bd01;
    font-weight: 500;
    padding: 9px;
    margin-bottom: 21px;
    color: rgba(0, 0, 0, 0.85);
    border-radius: 4px 4px 0 0;
`;

const FormItem = Form.Item;

const isEmpty = value => (
  value === undefined || value === null || value === ''
);

const MAX_VALUE = 99999;

class Accomplishments extends Component {
  state = {
    onEdit: [],
    noDeleteAndEditValues: [
      0,
      MAX_VALUE,
    ],
  };

  componentDidMount() {
    this.props.requestAllAccomplishments();
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
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;

    if (this.validateInitialZero() === false) {
      this.props.validateMessage('1');
    } else if (this.validateFinalValue() === false) {
      this.props.validateMessage('2');
    } else {
      form.validateFieldsAndScroll({ force: true }, (err, fields) => {
        if (!err) {
          const ranges = fields.keys.map(key => ({
            InitialPercentage: fields[key][0],
            FinalPercentage: fields[key][1],
            BonusPercentage: fields[key][2],
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

  validateInitialZero = () => {
    const { getFieldsValue } = this.props.form;
    const dataForm = getFieldsValue();
    return dataForm.keys.filter(key => dataForm[key][0] === 0).length > 0;
  }

  validateFinalValue = () => {
    const { getFieldsValue } = this.props.form;
    const dataForm = getFieldsValue();
    return dataForm.keys.filter(key => dataForm[key][1] >= MAX_VALUE).length > 0;
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

  validateRanges = (value, arrValues) => (
    arrValues
      .filter(item => value >= item[0] && value <= item[1])
      .length === 0
  )

  validateRangesRule = (rule, value, callback) => {
    if (isEmpty(value) === true) {
      callback();
      return;
    }
    const { getFieldsValue } = this.props.form;
    const dataForm = getFieldsValue();
    const filterDataForm = dataForm.keys
      .filter(data => !rule.field.includes(data))
      .map(data => dataForm[data]);

    if (this.validateRanges(value, filterDataForm) === false) {
      callback('Porcentaje se encuentra entre un rango existente');
    }
    callback();
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { accomplishments, loading } = this.props;
    const { noDeleteAndEditValues } = this.state;
    const formItemLayout = {
      xs: { span: 17, offset: 4 },
      sm: { span: 17, offset: 4 },
      lg: { span: 17, offset: 4 },
    };

    getFieldDecorator('keys', {
      initialValue: (accomplishments
        && accomplishments.length > 0) ?
        accomplishments.map(accomplishment => accomplishment.Id)
        : [1, 2],
    });

    const keys = getFieldValue('keys');

    const formItems = accomplishments.map(element => (
      <Col {...formItemLayout} key={element.Id}>
        <FormItem>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[0]`, {
                initialValue: element.InitialPercentage,
                rules: [
                  { required: true, message: 'Debe ingresar porcentaje inicial.' },
                  { validator: this.validateMaxMin },
                  { validator: this.validateInitialMinFinal },
                  { validator: this.validateRangesRule },
                ],
              })(
                <InputNumber
                  min={0}
                  max={MAX_VALUE}
                  step={0.1}
                  precision={1}
                  style={{ width: '80%' }}
                  placeholder="Porcentaje Inicial"
                  disabled={noDeleteAndEditValues.indexOf(element.InitialPercentage) >= 0}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[1]`, {
                initialValue: element.FinalPercentage,
                rules: [
                  { required: true, message: 'Debe ingresar porcentaje final.' },
                  { validator: this.validateMaxMin },
                  { validator: this.validateFinalMaxInitial },
                  { validator: this.validateRangesRule },
                ],
              })(
                <InputNumber
                  min={0}
                  max={MAX_VALUE}
                  step={0.1}
                  precision={1}
                  style={{ width: '80%' }}
                  placeholder="Porcentaje Final"
                  disabled={noDeleteAndEditValues.indexOf(element.FinalPercentage) >= 0}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`${element.Id}[2]`, {
                initialValue: element.BonusPercentage,
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
          <Col span={1}>
            {noDeleteAndEditValues.indexOf(element.InitialPercentage) === -1 &&
            noDeleteAndEditValues.indexOf(element.FinalPercentage) === -1
              ? (
                <Icon
                  style={iconX}
                  className="dynamic-delete-button"
                  type="close-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(element.Id)}
                />
              ) : (<div style={{ width: 2, height: 40 }} />)}
          </Col>
        </FormItem>
      </Col>
    ));

    return (
      <ContentTabs>
        <SpinStyled spinning={loading}>
          <br />
          <TitleTwo text="PORCENTAJES DE CUMPLIMIENTO BONO" />
          <ContentTable className="gutter-example">
            <Row>
              <Col span={8}>
                <div className="gutter-box">Porcentaje Inicial</div>
              </Col>
              <Col span={5}>
                <div className="gutter-box">Porcentaje Final</div>
              </Col>
              <Col span={6} offset={1}>
                <div className="gutter-box">Porcentaje Bono</div>
              </Col>
            </Row>
          </ContentTable>
          <Form
            onSubmit={this.handleSubmit}
            layout="vertical"
          >
            <Row gutter={16}>
              {formItems}
            </Row>
            <FormItem span={24}>
              <Button type="dashed" onClick={this.add} style={{ marginTop: '10px' }}>
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
  accomplishments: state.accomplishments.accomplishments,
  originalData: state.accomplishments.originalData,
  deleteItems: state.accomplishments.delteItems,
  validationMessage: state.accomplishments.validationMessage,
  loading: state.accomplishments.loading,
});

const mapDispatchToProps = dispatch => ({
  requestAllAccomplishments: () => {
    dispatch(actions.requestAllAccomplishments());
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
    dispatch(actions.saveAccomplishments(params));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Accomplishments));
