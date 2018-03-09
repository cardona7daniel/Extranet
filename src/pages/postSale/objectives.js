import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Select, Form, Button, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import {
  requestObjectivePeriod,
  requestSaveObjectiveWarrantyPeriod,
  requestGetObjectiveWarrantyPeriod,
  requestDataObjectivePeriodClear,
} from '../../state/nonDerogateLiquidation/action';
import {
  TitleTwo,
  Card,
} from '../../components/shared';


const Option = Select.Option;
const FormItem = Form.Item;

const ContentObjectives = styled.div`
  text-align: center;
`;

const ContentSelect = styled(Select)`
  width: 15% !important;
`;

const ContentFormItem = styled(FormItem)`
  text-align: left;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const ContentButton = styled(Row)`
  margin-top: 25px;
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

class Objectives extends Component {
  state = {
    months: [],
    year: null,
    month: null,
  };

  componentDidMount() {
    const { periodId } = this.props;
    this.props.requestObjectivePeriod();
    this.props.requestGetObjectivePeriod(periodId, 'O');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      nextProps.objectiveWarrantyPeriod &&
      nextProps.objectiveWarrantyPeriod.Year > 0 &&
      nextProps.ltObjectivePeriod &&
      nextProps.ltObjectivePeriod.length > 0 &&
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
      nextProps.ltObjectivePeriod &&
      nextProps.ltObjectivePeriod.length > 0 &&
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

  handleClickSaveObjective = (e) => {
    e.preventDefault();
    const { afterObjective, periodId } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.requestDataObjectivePeriodClear();
        this.props.requestSaveObjectiveWarrantyPeriod(fieldsValue.ObjectiveYear, fieldsValue.ObjectiveMonth, periodId, 'O',
          () => { afterObjective(1); },
        );
      }
    });
  };

  loadMonths = (year) => {
    const { ltObjectivePeriod } = this.props;
    const { month } = this.state;
    let months = ltObjectivePeriod
      .filter(x => x.Year.toString() === year.toString())
      .map(x => x.Month);
    months = months.filter((v, i, a) => a.indexOf(v) === i);
    this.setState({
      months,
      year,
    }, () => {
      this.props.form.setFieldsValue({
        ObjectiveYear: year === '0' ? undefined : year.toString(),
      });
      if (months.indexOf(month) >= 0) {
        this.props.form.setFieldsValue({
          ObjectiveMonth: month.toString(),
        });
      } else {
        this.props.form.setFieldsValue({
          ObjectiveMonth: undefined,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { ltObjectivePeriod, loading } = this.props;
    const { months } = this.state;
    const objectiveYears = ltObjectivePeriod
      .map(x => x.Year)
      .filter((elem, index, array) => array.indexOf(elem) === index);
    return (
      <ContentSpin spinning={loading}>
        <ContentObjectives>
          <Row>
            <Col span={24}>
              <TitleTwo text="Objetivos" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card width={150} background="#e9e9e9 !important">
                <p>
                  Por favor selecione el año y el mes a
                  tener en cuenta en los objetivos para aplicar esta liquidación.
                </p>
                <p>
                  En caso de que no exista información del mes y año requerido,
                  por favor dirijase a la opción de Extranet:
                </p>
                <p>
                  <i>{'"Cargar objetivos"'}</i> para cargar de forma masiva los objetivos del mes deseado.
                </p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ContentForm layout="horizontal">
                <Row>
                  <Col span={24} offset={4}>
                    <ContentFormItem label="Año Objetivos" {...formItemLayout}>
                      {getFieldDecorator('ObjectiveYear', {
                        rules:
                        [
                          {
                            required: true, message: 'El año de objetivo es requerido',
                          },
                        ],
                      })(
                        <ContentSelect
                          placeholder="Seleccionar"
                          onChange={this.loadMonths}
                        >
                          {
                            objectiveYears
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
                    <ContentFormItem label="Mes Objetivos" {...formItemLayout}>
                      {getFieldDecorator('ObjectiveMonth', {
                        rules:
                        [
                          {
                            required: true, message: 'El mes del objetivo es requerido',
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
                                  key={(opt).toString()}
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
                    <Button type="primary" onClick={this.handleClickSaveObjective} htmlType="submit">Guardar</Button>
                  </Col>
                </ContentButton>
              </ContentForm>
            </Col>
          </Row>
        </ContentObjectives>
      </ContentSpin>
    );
  }
}


const mapStateToProps = state => ({
  loading: state.nonDerogateLiquidation.loading,
  ltObjectivePeriod: state.nonDerogateLiquidation.ltObjectivePeriod,
  objectiveWarrantyPeriod: state.nonDerogateLiquidation.objectiveWarrantyPeriod,
});

const mapDispatchToProps = dispatch => ({
  requestObjectivePeriod: () => {
    dispatch(requestObjectivePeriod());
  },
  requestSaveObjectiveWarrantyPeriod: (year, month, periodId, type, next) => {
    dispatch(requestSaveObjectiveWarrantyPeriod(year, month, periodId, type, next));
  },
  requestGetObjectivePeriod: (periodId, type) => {
    dispatch(requestGetObjectiveWarrantyPeriod(periodId, type));
  },
  requestDataObjectivePeriodClear: () => {
    dispatch(requestDataObjectivePeriodClear());
  },
});


const FormObjectives = Form.create()(Objectives);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormObjectives);
