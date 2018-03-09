import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Form, Select, Checkbox, Button } from 'antd';

const Option = Select.Option;

const MarginTop = styled.div`
  margin-top: 1rem;
`;

const FormItem = styled(Form.Item)`
  .ant-form-item-label {
    text-align:right !important;
    margin-right: 1rem !important;
  }
  
  .ant-form-item-control {
    text-align:left !important;
  }
`;

const WrapFormItem = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 6,
  },
};

class EventualityForm extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
    const { idPeriod, idEventuality, returnToList, onSubmit } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const eventualityValues = {
          ...values,
          PeriodId: idPeriod,
        };
        delete eventualityValues.Range;

        if (idEventuality > 0) {
          eventualityValues.IdEventuality = idEventuality;
        }
        onSubmit(
          eventualityValues,
          () => returnToList(),
        );
      }
    });
  }

  render() {
    const { returnToList, columnOptions, operators, loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <FormItem label="Nombre Columna" {...WrapFormItem}>
          {getFieldDecorator('IdColumn', {
            rules: [
              { required: true, message: 'Por favor seleccione un nombre de columna.' },
            ],
          })(
            <Select>
              {columnOptions && columnOptions
                .filter(item => item.ApplyEventuality)
                .map(
                  item => <Option value={item.Id} key={item.Id}>{item.Name}</Option>,
                )}
            </Select>,
          )}
        </FormItem>
        <FormItem label="Signo" {...WrapFormItem}>
          {getFieldDecorator('Operand', {
            rules: [
              { required: true, message: 'Por favor seleccione un signo.' },
            ],
          })(
            <Select>
              {operators && operators.map(
                item => <Option value={item.symbol} key={item.symbol}>{item.name}</Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <FormItem label="Estado" {...WrapFormItem}>
          {getFieldDecorator('Status', {
            valuePropName: 'checked',
          })(
            <Checkbox />,
          )}
        </FormItem>
        <MarginTop>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >Guardar</Button>
          <span className="ant-breadcrumb-separator" />
          <Button
            ghost
            type="primary"
            onClick={returnToList}
          >Regresar</Button>
        </MarginTop>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => {
    const formValues = {};
    if (props.idEventuality > 0 && props.eventualityEdit) {
      if (props.eventualityEdit.IdColumn) {
        formValues.IdColumn = {};
        formValues.IdColumn.value = props.eventualityEdit.IdColumn;
      }

      if (props.eventualityEdit.Operand) {
        formValues.Operand = {};
        formValues.Operand.value = props.eventualityEdit.Operand;
      }

      if (props.eventualityEdit.Status) {
        formValues.Status = {};
        formValues.Status.value = props.eventualityEdit.Status;
      }
    } else {
      formValues.Status = {};
      formValues.Status.value = true;
    }
    return formValues;
  },
})(EventualityForm);
