import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Col,
  Card,
  Spin,
  message,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Button,
  Transfer,
} from 'antd';
import { TitleTwo, TitleContent } from '../shared';
import TransferFamilyVehicle from './TransferFamilyVehicle';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

// region Styled-Components

const ColLeft = styled(Col)`
  text-align:left;
`;

const FormItemLeft = styled(FormItem)`
  text-align:left;
`;

const FormItemOrder = styled(FormItem)`
  .ant-form-explain {
    display: block;
    text-align: center;
  }
`;

const CardContent = styled(Card)`
  width: 30%;
  margin: 0 auto;
`;

const OptionRange = styled.div`
  padding-top:1rem;
`;

const TransferStyle = styled(Transfer)`
  .ant-transfer-operation .ant-btn {
    width: 30px;
    height: 26px;
  }
  .ant-transfer-list-header {
    text-align:left;
  }
  .ant-transfer-list-content-item {
    text-align:left;
  }
`;

const SpinStyled = styled(Spin)`
  width: auto !important;
`;

// endregion

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

class ExclusionBonusCriteriaForm extends Component {
  state = {
    range: 1,
    families: [],
    targetKeysFamilies: [],
    vehicles: [],
    targetKeysVehicles: [],
    columns: [],
    targetKeysColumns: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vehicles.length > 0) {
      if (nextProps.families.length > 0) {
        let editExclusion = {};
        let targetFamily = this.state.targetKeysFamilies;
        if (nextProps.exclusionEdit &&
          nextProps.exclusionEdit.Id > 0 &&
          this.props.exclusionEdit &&
          nextProps.exclusionEdit.Id !== this.props.exclusionEdit.Id
        ) {
          const {
            Family = this.state.targetKeysFamilies,
            Vehicle = this.state.targetKeysVehicles,
            Column = this.state.targetKeysColumns,
            Apply = false,
          } = (nextProps.exclusionEdit || {});

          targetFamily = Family !== null ? Family.map(f => f.Family) : [];

          editExclusion = {
            targetKeysFamilies: targetFamily,
            targetKeysVehicles: Vehicle ? Vehicle.map(v => v.Vehicle) : [],
            targetKeysColumns: Column ? Column.map(c => c.ColumnId) : [],
            range: Apply && Apply === true ? 2 : 1,
          };
        }

        this.setState({
          families: nextProps.families,
          vehicles: nextProps.vehicles,
          columns: nextProps.columns,
          ...editExclusion,
        }, () => this.handleChangeFamilies(targetFamily));
      }
    }
  }

  onChangeRangeRadio = (e) => {
    this.setState({
      range: e.target.value,
    });
  }

  submitForm = (e) => {
    const { submitForm, returnToList, idExclusion } = this.props;
    const {
      targetKeysFamilies,
      targetKeysVehicles,
      targetKeysColumns,
    } = this.state;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.validateEmptyTransfers()) {
        const excludeValues = {
          ...values,
          Families: targetKeysFamilies,
          Vehicles: targetKeysVehicles,
          Columns: targetKeysColumns,
        };

        if (idExclusion > 0) {
          excludeValues.Id = idExclusion;
        }

        submitForm(
          excludeValues,
          () => {
            returnToList();
          },
        );
      }
    });
  }

  validateEmptyTransfers() {
    const {
      targetKeysFamilies,
      targetKeysVehicles,
      targetKeysColumns,
    } = this.state;

    let boolVal = true;

    if (targetKeysColumns.length === 0) {
      message.error('Debe seleccionar una o más columnas que afecta.');
      boolVal = false;
    }

    if (targetKeysFamilies.length === 0 && targetKeysVehicles.length === 0) {
      message.error('Debe seleccionar una o más familias o vehículos');
      boolVal = false;
    }

    return boolVal;
  }

  handleChangeFamilies = (targetKeysFamilies) => {
    const { vehicles } = this.props;
    const { targetKeysVehicles } = this.state;

    const newVehicles = vehicles.filter(
      // eslint-disable-next-line no-underscore-dangle
      vehicle => targetKeysFamilies.indexOf(vehicle._FamilyId) === -1,
    );

    const idsVehicles = vehicles.filter(
      // eslint-disable-next-line no-underscore-dangle
      vehicle => targetKeysFamilies.indexOf(vehicle._FamilyId) !== -1,
    ).map(vehicle => vehicle.Id);

    const newTargetKeysVehicles = targetKeysVehicles.filter(Id => idsVehicles.indexOf(Id) === -1);

    this.setState({
      targetKeysFamilies:
        !targetKeysFamilies ? this.state.targetKeysFamilies : targetKeysFamilies,
      vehicles: newVehicles,
      targetKeysVehicles: newTargetKeysVehicles,
    });
    return true;
  }

  handleChangeVehicles = (targetKeysVehicles) => {
    this.setState({ targetKeysVehicles });
  }

  handleChangeColumns = (targetKeysColumns) => {
    this.setState({ targetKeysColumns });
  }

  checkRange = (rule, value, callback) => {
    const form = this.props.form;
    if (value && form.getFieldValue('StartRange') && value < form.getFieldValue('StartRange')) {
      callback('El % Inicial debe ser menor que % Final.');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { returnToList, loading } = this.props;
    const {
      range,
      families,
      vehicles,
      columns,
      targetKeysColumns,
      targetKeysFamilies,
      targetKeysVehicles,
    } = this.state;

    return (
      <div>
        <TitleTwo text="GRUPO DE VEHÍCULOS EXCLUIDOS" />
        <Form onSubmit={this.submitForm}>
          <FormItemLeft label="Nombre Exclusión" {...formItemLayout}>
            <ColLeft span={10}>
              {getFieldDecorator('Name', {
                rules: [
                  { required: true, message: 'Por favor ingrese el nombre de la Exclusión' },
                  { max: 50, message: 'El Nombre debe ser menor o igual a 50 caracteres' },
                ],
              })(
                <Input />,
              )}
            </ColLeft>
            <ColLeft span={13} offset={1}>
              {getFieldDecorator('Flag', {
                valuePropName: 'checked',
              })(
                <Checkbox>Activo</Checkbox>,
              )}
            </ColLeft>
          </FormItemLeft>

          <SpinStyled spinning={loading}>
            <TransferFamilyVehicle
              families={families}
              vehicles={vehicles}
              handleChangeFamilies={this.handleChangeFamilies}
              handleChangeVehicles={this.handleChangeVehicles}
              targetKeysFamilies={targetKeysFamilies}
              targetKeysVehicles={targetKeysVehicles}
            />

            <TitleContent text="Rango de cumplimiento" width="70%" />
            <div>
              <RadioGroup
                size="large"
                onChange={this.onChangeRangeRadio}
                value={range}
              >
                <Radio value={1}>Aplica a todo</Radio>
                <Radio value={2}>Aplica a rango</Radio>
              </RadioGroup>
              {range === 2 && (
                <OptionRange>
                  <CardContent bodyStyle={{ textAlign: 'center' }}>
                    <Col span={6} offset={5}>
                      <FormItem label="% Inicial" >
                        {getFieldDecorator('StartRange', {
                          rules: [{ required: true, message: 'Por favor ingrese el % Inicial.' }],
                        })(
                          <InputNumber min={0} />,
                        )}
                      </FormItem>
                    </Col>
                    <Col span={6} offset={1}>
                      <FormItem label="% Final" >
                        {getFieldDecorator('EndRange', {
                          rules: [{
                            required: true, message: 'Por favor ingrese el % Final.',
                          }, {
                            validator: this.checkRange,
                          }],
                        })(
                          <InputNumber min={0} />,
                        )}
                      </FormItem>
                    </Col>
                  </CardContent>
                </OptionRange>
              )}
            </div>

            <TitleContent text="Columnas que afecta" width="70%" />
            <TransferStyle
              rowKey={record => record.Id}
              dataSource={columns.filter(item => item.ApplyExclusion)}
              targetKeys={targetKeysColumns}
              showSearch
              listStyle={{
                width: 350,
                height: 300,
              }}
              titles={['Disponibles', 'Asignados']}
              render={record => record.Name}
              onChange={this.handleChangeColumns}
              filterOption={
                (text, option) => option.Name.toLowerCase().includes(text.toLowerCase())
              }
            />
          </SpinStyled>
          <FormItemOrder label="Observación">
            <Col span={8} offset={8}>
              {getFieldDecorator('Observation', {
                rules: [
                  { max: 150, message: 'La Observación debe ser menor o igual a 150 caracteres' },
                ],
              })(
                <TextArea
                  cols={10}
                  autosize={{ minRows: 4, maxRows: 6 }}
                />,
              )}
            </Col>
          </FormItemOrder>

          <FormItem>
            <Button type="primary" htmlType="submit" loading={loading}>
              Guardar
            </Button>
            <span className="ant-breadcrumb-separator" />
            <Button
              ghost
              type="primary"
              onClick={returnToList}
            >Regresar</Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => {
    const formValues = {};

    if (props.idExclusion > 0 && props.exclusionEdit) {
      if (props.exclusionEdit.Name) {
        formValues.Name = {};
        formValues.Name.value = props.exclusionEdit.Name;
      }

      if (props.exclusionEdit.Flag) {
        formValues.Flag = {};
        formValues.Flag.value = props.exclusionEdit.Flag;
      }
      // Se agrega diferente de undefined porque 
      // sino cuando el valor llegue cero, no se pintará en el campo el valor.
      if (props.exclusionEdit.StartRange !== undefined) {
        formValues.StartRange = {};
        formValues.StartRange.value = props.exclusionEdit.StartRange;
      }

      if (props.exclusionEdit.EndRange !== undefined) {
        formValues.EndRange = {};
        formValues.EndRange.value = props.exclusionEdit.EndRange;
      }

      if (props.exclusionEdit.Observation) {
        formValues.Observation = {};
        formValues.Observation.value = props.exclusionEdit.Observation;
      }
    } else {
      formValues.Flag = {};
      formValues.Flag.value = true;
    }

    return formValues;
  },
})(ExclusionBonusCriteriaForm);
