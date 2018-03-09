import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Select, Form, Button, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import {
  requestWarrantyPeriod,
  requestGetObjectiveWarrantyPeriod,
  requestSaveObjectiveWarrantyPeriod,
} from '../../state/nonDerogateLiquidation/action';
import requestPeriod from '../../state/periodPV/action';
import {
  TitleTwo,
  Card,
} from '../../components/shared';


const Option = Select.Option;
const FormItem = Form.Item;

const ContentWarranty = styled.div`
  text-align: center;
`;

const ContentSelect = styled(Select)`
  width: 15% !important;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const ContentFormItem = styled(FormItem)`
  text-align: left;
`;

const ContentButton = styled(Row)`
  margin-top: 25px;
`;

const TitleLoadFile = styled(Row)`
  margin: 10px 0 10px 0;
`;

const ContentForm = styled(Form)`
  text-align: center;
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

class WarrantyLiq extends Component {
  state = {
    months: [],
    textInfo: null,
    month: null,
  }

  componentDidMount() {
    const { periodId } = this.props;
    this.props.requestPeriod(() => {
      this.formatDate();
    });
    this.props.requestWarrantyPeriod();
    this.props.requestGetObjectiveWarrantyPeriod(periodId, 'W');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      nextProps.objectiveWarrantyPeriod &&
      nextProps.objectiveWarrantyPeriod.Year > 0 &&
      nextProps.ltWarrantyPeriod &&
      nextProps.ltWarrantyPeriod.length > 0 &&
      this.state.month === null &&
      (this.state.year === null ||
      this.state.month !== nextProps.objectiveWarrantyPeriod.Month)
    ) {
      this.setState({
        year: nextProps.objectiveWarrantyPeriod.Year,
        month: nextProps.objectiveWarrantyPeriod.Month,
      }, () => {
        this.loadMonths(nextProps.objectiveWarrantyPeriod.Year.toString());
      });
    }

    if (nextProps &&
      nextProps.objectiveWarrantyPeriod &&
      nextProps.objectiveWarrantyPeriod.Year === 0 &&
      nextProps.ltWarrantyPeriod &&
      nextProps.ltWarrantyPeriod.length > 0 &&
      nextProps.objectiveWarrantyPeriod !== this.props.objectiveWarrantyPeriod &&
      (this.state.year === null ||
        this.state.month !== nextProps.objectiveWarrantyPeriod.Month)
    ) {
      this.setState({
        year: undefined,
        month: undefined,
      }, () => {
        this.loadMonths(nextProps.objectiveWarrantyPeriod.Year.toString());
      });
    }
  }

  handleClickSaveWarranty = (e) => {
    e.preventDefault();
    const { periodId, afterWarranty } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.requestSaveObjectiveWarrantyPeriod(fieldsValue.WarrantyYear, parseInt(fieldsValue.WarrantyMonth, 10), periodId, 'W',
          () => {
            afterWarranty(2);
          });
      }
    });
  }

  formatDate() {
    const { periodData } = this.props;
    const momentWarranty = moment(periodData.WarrantyDate, 'Y-MM-DDTHH:mm:ss.SS');
    const dayLastLoad = momentWarranty.format('DD');
    const monthLastLoad = momentWarranty.format('MMMM');
    const yearLastLoad = momentWarranty.format('YYYY');
    const HourLastLoad = momentWarranty.format('HH:mm');
    const month = moment({ month: (periodData.Month - 1) }).format('MMMM');
    const monthSelected = month.toUpperCase();
    const yearSelected = periodData.Year;
    const text = `Último archivo cargado: ${dayLastLoad} de ${monthLastLoad} ${yearLastLoad} a las ${HourLastLoad} para el mes 
    ${monthSelected} y año ${yearSelected}`;
    this.setState({
      textInfo: text,
    });
  }

  loadMonths = (year) => {
    const { ltWarrantyPeriod } = this.props;
    const { month } = this.state;
    let months = ltWarrantyPeriod
      .filter(x => x.Year.toString() === year)
      .map(x => x.Month);
    months = months.filter((v, i, a) => a.indexOf(v) === i);
    this.setState({
      months,
      year,
    }, () => {
      this.props.form.setFieldsValue({
        WarrantyYear: year === '0' ? undefined : year.toString(),
      });
      if (months.indexOf(month) >= 0) {
        this.props.form.setFieldsValue({
          WarrantyMonth: month.toString(),
        });
      } else {
        this.props.form.setFieldsValue({
          WarrantyMonth: undefined,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { ltWarrantyPeriod, loading } = this.props;
    const { months, textInfo } = this.state;
    const warrantyYears = ltWarrantyPeriod
      .map(x => x.Year)
      .filter((elem, index, array) => array.indexOf(elem) === index);
    return (
      <ContentSpin spinning={loading}>
        <ContentWarranty>
          <Row>
            <Col span={24}>
              <TitleTwo text="Cifra de Garantías" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card width={150} background="#e9e9e9 !important">
                <p>
                  Por favor selecione el año y el mes que
                  corresponde al cierre de garantías para aplicar a esta liquidación.
                </p>
                <p>
                  En caso de que no exista información del mes y año requerido,
                  por favor dirijase a la opción de Extranet:
                </p>
                <p>
                  <i>{'"Cargar Cifra de Garantias"'}</i> para cargar de forma masiva las cifras del mes y año deseado.
                </p>
              </Card>
            </Col>
          </Row>
          <TitleLoadFile>
            <Col span={24}>
              <b>{textInfo}</b>
            </Col>
          </TitleLoadFile>
          <ContentForm layout="horizontal">
            <Row>
              <Col span={24} offset={4}>
                <ContentFormItem label="Año Garantías" {...formItemLayout}>
                  {getFieldDecorator('WarrantyYear', {
                    rules:
                    [
                      {
                        required: true, message: 'El año de garantías es requerido',
                      },
                    ],
                  })(
                    <ContentSelect
                      placeholder="Seleccionar"
                      onChange={this.loadMonths}
                    >
                      {
                        warrantyYears
                          .map(opt => (
                            <Option
                              key={opt.toString()}
                            >{opt.toString()}</Option>
                          ))
                      }
                    </ContentSelect>,
                  )}
                </ContentFormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} offset={4}>
                <ContentFormItem label="Mes Garantías" {...formItemLayout}>
                  {getFieldDecorator('WarrantyMonth', {
                    rules:
                    [
                      {
                        required: true, message: 'El mes de garantías es requerido',
                      },
                    ],
                  })(
                    <ContentSelect
                      placeholder="Seleccionar"
                    >
                      {
                        months
                          .map(opt => (
                            <Option
                              key={opt.toString()}
                            >{capitalizeFirstLetter(moment().month(opt - 1).format('MMMM'))}</Option>
                          ))
                      }
                    </ContentSelect>,
                  )}
                </ContentFormItem>
              </Col>
            </Row>
            <ContentButton>
              <Col span={24}>
                <Button type="primary" onClick={this.handleClickSaveWarranty} htmlType="submit">Guardar</Button>
              </Col>
            </ContentButton>
          </ContentForm>
        </ContentWarranty>
      </ContentSpin>
    );
  }
}


const mapStateToProps = state => ({
  loading: state.nonDerogateLiquidation.loading,
  ltWarrantyPeriod: state.nonDerogateLiquidation.ltWarrantyPeriod,
  periodData: state.periodPV.periodData,
  objectiveWarrantyPeriod: state.nonDerogateLiquidation.objectiveWarrantyPeriod,
});

const mapDispatchToProps = dispatch => ({
  requestPeriod: (next) => {
    dispatch(requestPeriod(next));
  },
  requestWarrantyPeriod: () => {
    dispatch(requestWarrantyPeriod());
  },
  requestSaveObjectiveWarrantyPeriod: (year, month, periodId, type, next) => {
    dispatch(requestSaveObjectiveWarrantyPeriod(year, month, periodId, type, next));
  },
  requestGetObjectiveWarrantyPeriod: (periodId, type) => {
    dispatch(requestGetObjectiveWarrantyPeriod(periodId, type));
  },
});

const FormWarranty = Form.create()(WarrantyLiq);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormWarranty);
