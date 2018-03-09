import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import styled from 'styled-components';
import { requestNps, requestSaveNps } from '../../state/npsPV/action';
import TitleTwo from '../../components/shared/TitleTwo';

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

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 6 },
  },
};


class Nps extends Component {
  state = {
    disabled: true,
  };

  componentDidMount() {
    this.handlerRequest();
  }

  handleClickEditNps = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  handlerRequest = () => {
    this.props.requestNpsList();
  }

  handleClickSaveNps = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          disabled: !this.state.disabled,
        },
        this.props.requestNpsSave(
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
    const { loading } = this.props;
    const { disabled } = this.state;
    return (
      <ContentSpin spinning={loading}>
        <Row>
          <Col span="24">
            <TitleTwo
              text="Configuración NPS"
              IconName="info-circle"
              titleTooltip="Recuerde que la separación de decimales es con una coma"
            />
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <ContentForm onSubmit={this.handleClickSaveNps} layout="horizontal">
              <Row>
                <Col span={22} offset={6}>
                  <FormItem label="% Media País Objetivo" {...formItemLayout}>
                    {getFieldDecorator('Average', {
                      rules:
                      [
                        {
                          required: true,
                          message: 'Campo númerico. Ingrese máximo 10 números',
                          validator: this.validateDecimal,
                        },
                      ],
                    })(
                      <Input disabled={disabled} addonAfter="%" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={22} offset={6}>
                  <FormItem label="Ranking de Mejores Concesionarios" {...formItemLayout}>
                    {getFieldDecorator('BestRanking', {
                      rules: [{ required: true, pattern: /^\d{1,3}$/, message: 'Por favor ingrese un número entre 1 y 3 dígitos' }],
                    })(
                      <Input disabled={disabled} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={22} offset={6}>
                  <FormItem label="Ranking de Peores Concesionarios" {...formItemLayout}>
                    {getFieldDecorator('WorseRanking', {
                      rules: [{ required: true, pattern: /^\d{1,3}$/, message: 'Por favor ingrese un número entre 1 y 3 dígitos' }],
                    })(
                      <Input disabled={disabled} />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={22} offset={6}>
                  <FormItem label="% Descuento al Bono Ganado" {...formItemLayout}>
                    {getFieldDecorator('BonusDiscount', {
                      rules:
                      [
                        {
                          required: true,
                          message: 'Campo númerico. Ingrese máximo 10 números',
                          validator: this.validateDecimal,
                        },
                      ],
                    })(
                      <Input disabled={disabled} addonAfter="%" />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </ContentForm>
          </Col>
        </Row>
        <ContentButton>
          <Col span={24}>
            <Button type="primary" disabled={!disabled} onClick={this.handleClickEditNps}>Editar</Button>
            <Separator />
            <Button type="primary" disabled={disabled} onClick={this.handleClickSaveNps} htmlType="submit">Guardar</Button>
          </Col>
        </ContentButton>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.npsPV.loading,
  ltNps: state.npsPV.ltNps,
});

const mapDispatchToProps = dispatch => ({
  requestNpsList: () => {
    dispatch(requestNps());
  },
  requestNpsSave: (data, next) => {
    dispatch(requestSaveNps(data, next));
  },
});

const FormNps = Form.create({
  mapPropsToFields(props) {
    return {
      Average: { value: props.ltNps[0] !== undefined ? props.ltNps[0].Value : '' },
      BestRanking: { value: props.ltNps[1] !== undefined ? props.ltNps[1].Value : '' },
      WorseRanking: { value: props.ltNps[2] !== undefined ? props.ltNps[2].Value : '' },
      BonusDiscount: { value: props.ltNps[3] !== undefined ? props.ltNps[3].Value : '' },
    };
  },
})(Nps);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormNps);
