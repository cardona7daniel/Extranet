import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Spin,
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox,
  message,
} from 'antd';
import { TitleTwo } from '../shared';
import TransferFamilyVehicle from './TransferFamilyVehicle';

const FormItem = Form.Item;

const FormItemLeft = styled(FormItem)`
  text-align:left;
`;

const MarginTop = styled.div`
  margin-top: 1rem;
`;

const SpinStyled = styled(Spin)`
  width: auto !important;
`;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 6 },
};

class BillingCriteriaBonusCriteriaForm extends Component {
  state = {
    families: [],
    targetKeysFamilies: [],
    vehicles: [],
    targetKeysVehicles: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.vehicles.length > 0) {
      if (nextProps.families.length > 0) {
        let editBillingCriteria = {};
        let targetFamily = this.state.targetKeysFamilies;

        if (nextProps &&
          nextProps.billingCriteriaEdit &&
          nextProps.billingCriteriaEdit !== null &&
          Object.hasOwnProperty.call(nextProps.billingCriteriaEdit, 'Id') &&
          nextProps.billingCriteriaEdit.Id > 0
        ) {
          const {
            Family = this.state.targetKeysFamilies,
            Vehicle = this.state.targetKeysVehicles,
          } = (nextProps.billingCriteriaEdit || {});

          targetFamily = Family !== null ? Family.map(f => f.FamilyId) : [];

          editBillingCriteria = {
            targetKeysFamilies: targetFamily,
            targetKeysVehicles: Vehicle ? Vehicle.map(v => v.VehicleId) : [],
          };
        }

        this.setState({
          families: nextProps.families,
          vehicles: nextProps.vehicles,
          ...editBillingCriteria,
        }, () => this.handleChangeFamilies(targetFamily));
      }
    }
  }

  submitForm = (e) => {
    const { submitForm, returnToList, idBillingCriteria } = this.props;
    const {
      targetKeysFamilies,
      targetKeysVehicles,
    } = this.state;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.validateEmptyTransfers()) {
        const billingCriteriaValues = {
          ...values,
          Families: targetKeysFamilies,
          Vehicles: targetKeysVehicles,
        };

        if (idBillingCriteria > 0) {
          billingCriteriaValues.Id = idBillingCriteria;
        }

        submitForm(
          billingCriteriaValues,
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
    } = this.state;

    let boolVal = true;

    if (targetKeysFamilies.length === 0 && targetKeysVehicles.length === 0) {
      message.error('Debe seleccionar una o más familias o vehículos');
      boolVal = false;
    }

    return boolVal;
  }

  handleChangeVehicles = (targetKeysVehicles) => {
    this.setState({ targetKeysVehicles });
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

    this.setState(state => ({
      targetKeysFamilies:
        !targetKeysFamilies ? state.targetKeysFamilies : targetKeysFamilies,
      vehicles: newVehicles,
      targetKeysVehicles: newTargetKeysVehicles,
    }));
    return true;
  }

  returnToList = (e) => {
    e.preventDefault();
    const { returnToList } = this.props;
    this.setState({
      families: [],
      targetKeysFamilies: [],
      vehicles: [],
      targetKeysVehicles: [],
    }, returnToList);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const {
      families,
      vehicles,
      targetKeysFamilies,
      targetKeysVehicles,
    } = this.state;

    return (
      <div>
        <TitleTwo text="CRITERIOS DE FACTURACIÓN" />
        <Form onSubmit={this.submitForm}>
          <FormItem label="Nombre del criterio" {...formItemLayout}>
            {getFieldDecorator('Name', {
              rules: [
                { required: true, message: 'Por favor ingrese el nombre del criterio.' },
                { max: 50, message: 'El Nombre debe ser menor o igual a 50 caracteres' },
              ],
            })(
              <Input />,
            )}
          </FormItem>

          <FormItemLeft label="Cantidad facturada" {...formItemLayout}>
            {getFieldDecorator('InvoicedAmount', {
              rules: [
                { required: true, message: 'Por favor ingrese la cantidad facturada.' },
                { type: 'integer', message: 'Debe ser un número entero.' },
              ],
            })(
              <InputNumber min={1} />,
            )}
          </FormItemLeft>

          <FormItemLeft label="Cantidad adicional" {...formItemLayout}>
            {getFieldDecorator('AdditionalQuantity', {
              rules: [
                { required: true, message: 'Por favor ingrese la cantidad adicional.' },
                { type: 'integer', message: 'Debe ser un número entero.' },
              ],
            })(
              <InputNumber min={1} />,
            )}
          </FormItemLeft>

          <FormItemLeft label="Estado" {...formItemLayout}>
            {getFieldDecorator('Flag', {
              valuePropName: 'checked',
            })(
              <Checkbox />,
            )}
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
          </SpinStyled>

          <MarginTop>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={loading}>
                Guardar
              </Button>
              <span className="ant-breadcrumb-separator" />
              <Button
                ghost
                type="primary"
                onClick={this.returnToList}
              >Regresar</Button>
            </FormItem>
          </MarginTop>

        </Form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => {
    const formValues = {};

    if (props.idBillingCriteria > 0 && props.billingCriteriaEdit) {
      if (props.billingCriteriaEdit.Name) {
        formValues.Name = {};
        formValues.Name.value = props.billingCriteriaEdit.Name;
      }

      if (props.billingCriteriaEdit.Flag) {
        formValues.Flag = {};
        formValues.Flag.value = props.billingCriteriaEdit.Flag;
      }

      if (props.billingCriteriaEdit.InvoicedAmount) {
        formValues.InvoicedAmount = {};
        formValues.InvoicedAmount.value = props.billingCriteriaEdit.InvoicedAmount;
      }

      if (props.billingCriteriaEdit.AdditionalQuantity) {
        formValues.AdditionalQuantity = {};
        formValues.AdditionalQuantity.value = props.billingCriteriaEdit.AdditionalQuantity;
      }
    } else {
      formValues.Flag = {};
      formValues.Flag.value = true;
    }

    return formValues;
  },
})(BillingCriteriaBonusCriteriaForm);
