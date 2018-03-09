import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Form, Input, Button, Select, Spin } from 'antd';
import { requestConsolidated, requestSaveConsolidated } from '../../state/consolidatedPV/action';
import TitleTwo from '../../components/shared/TitleTwo';

const ContentButton = styled(Row)`
  margin-top: 25px;
`;

const Separator = styled.span`
  margin-right: 20px;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const ContentSelect = styled(Select)`
  width: 60% !important;
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const formItemLayout2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
};

const FormItem = Form.Item;
const Option = Select.Option;

const ContentItem = styled(FormItem)`
  right: -36% !important;
`;

class Consolidated extends Component {
  state = {
    disabled: true,
  };

  componentDidMount() {
    this.handlerRequest();
  }

  handlerRequest = () => {
    this.props.requestConsolidatedList();
  }

  handleClickEditConsolidated = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  handleClickSaveConsolidated = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          disabled: !this.state.disabled,
        },
        this.props.requestConsolidatedSave(
          values,
          () => this.handlerRequest(),
        ));
      }
    });
  }

  validateDecimal = (rules, value, isValid) => {
    if (value.indexOf(',') !== -1) {
      return /^(\d+)(,\d+)?$/.test(value) && value.length <= 11 ? isValid() : isValid(false);
    }
    return /^(\d+)$/.test(value) && value.length <= 10 ? isValid() : isValid(false);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { ltConsolidated } = this.props;
    const { loading } = this.props;
    return (
      <ContentSpin spinning={loading}>
        <Row>
          <Col span="24">
            <TitleTwo
              text="Regla para el Cumplimiento Consolidado"
              IconName="info-circle"
              titleTooltip="Recuerde que la separación de decimales es con una coma"
            />
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <Form layout="horizontal">
              <Row>
                <Col span={18}>
                  <ContentItem label="Si el % de Cumplimiento es " {...formItemLayout}>
                    {getFieldDecorator('Operator')(
                      <ContentSelect>
                        {
                          ltConsolidated
                            .filter(opt => opt.Type === 'OPERADOR')
                            .map(opt => (
                              <Option key={opt.Id.toString()}>{opt.Name.toString()}</Option>
                            ))
                        }
                      </ContentSelect>,
                    )}
                  </ContentItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('fulfillmentConsolidated', {
                      rules:
                      [
                        { required: true,
                          message: 'Campo númerico. Ingrese máximo 10 números',
                          validator: this.validateDecimal,
                        },
                      ],
                    })(
                      <Input disabled={this.state.disabled} addonAfter="%" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="Entonces, se le dará a los concesionarios un % adicional sobre la realización del mes del: " {...formItemLayout2}>
                    {getFieldDecorator('AdicionalConsolidated', {
                      rules:
                      [
                        { required: true,
                          message: 'Campo númerico. Ingrese máximo 10 números',
                          validator: this.validateDecimal,
                        },
                      ],
                    })(
                      <Input disabled={this.state.disabled} addonAfter="%" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <ContentButton>
          <Col span={24}>
            <Button type="primary" disabled={!this.state.disabled} onClick={this.handleClickEditConsolidated}>Editar</Button>
            <Separator />
            <Button type="primary" disabled={this.state.disabled} onClick={this.handleClickSaveConsolidated} htmlType="submit">Guardar</Button>
          </Col>
        </ContentButton>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.consolidatedPV.loading,
  ltConsolidated: state.consolidatedPV.ltConsolidated,
});

const mapDispatchToProps = dispatch => ({
  requestConsolidatedList: () => {
    dispatch(requestConsolidated());
  },
  requestConsolidatedSave: (data, next) => {
    dispatch(requestSaveConsolidated(data, next));
  },
});

const FormConsolidated = Form.create({
  mapPropsToFields(props) {
    return {
      Operator: {
        value: props.ltConsolidated[0] !== undefined
          ? props.ltConsolidated[6].Value : undefined },
      fulfillmentConsolidated: { value: props.ltConsolidated[1] !== undefined ? props.ltConsolidated[7].Value : '' },
      AdicionalConsolidated: { value: props.ltConsolidated[2] !== undefined ? props.ltConsolidated[8].Value : '' },
    };
  },
})(Consolidated);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormConsolidated);
