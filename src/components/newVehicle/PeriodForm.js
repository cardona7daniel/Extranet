import React, { PureComponent } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Form, Input, DatePicker, Checkbox, Button } from 'antd';
import { DATE_FORMAT } from '../../utils/formats';

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

class PeriodForm extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
    const { idPeriod, returnToList, onSubmit } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const periodValues = {
          ...values,
          StartDate: values.Range[0].format(DATE_FORMAT),
          EndDate: values.Range[1].format(DATE_FORMAT),
        };
        delete periodValues.Range;

        if (idPeriod > 0) {
          periodValues.Id = idPeriod;
        }
        onSubmit(
          periodValues,
          () => returnToList(),
        );
      }
    });
  }

  render() {
    const { returnToList, loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <FormItem label="Descripción periodo" {...WrapFormItem}>
          {getFieldDecorator('Name', {
            rules: [
              { required: true, message: 'Por favor ingrese la descripción.' },
              { max: 50, message: 'Debe ser menor o igual a 50 caracteres' },
            ],
          })(
            <Input maxLength="50" />,
          )}
        </FormItem>
        <FormItem label="Vigencia" {...WrapFormItem}>
          {getFieldDecorator('Range', {
            rules: [
              { required: true, message: 'Por favor ingrese la Vigencia' },
            ],
          })(
            <DatePicker.RangePicker />,
          )}
        </FormItem>
        <FormItem label="¿Realiza criterio NPS?" {...WrapFormItem}>
          {getFieldDecorator('NPSCriterion', {
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
    const fields = {};
    if (props.periodEdit && props.periodEdit.Id > 0) {
      if (props.periodEdit.Name) {
        fields.Name = { value: props.periodEdit.Name };
      }

      if (props.periodEdit.StartDate && props.periodEdit.EndDate) {
        fields.Range = { value: [
          moment(props.periodEdit.StartDate, DATE_FORMAT),
          moment(props.periodEdit.EndDate, DATE_FORMAT),
        ] };
      }

      if (props.periodEdit.NPSCriterion) {
        fields.NPSCriterion = { value: props.periodEdit.NPSCriterion };
      }
    }
    return fields;
  },
})(PeriodForm);
