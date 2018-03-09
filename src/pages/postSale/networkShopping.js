import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, DatePicker, Button, Spin, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
import { DownloadLink, TitleTwo, Card } from '../../components/shared';
import requestNetworkShopping from '../../state/networkShoppingPV/action';

moment.locale('es');

const ContentInfoPreLiq = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const ContentDownload = styled.p`
padding: 10px 0 10px 0;
margin: 0 0 10px 0;
`;

const datenow = moment().format('DD/MM/YYYY');

const { RangePicker } = DatePicker;
const ContentRangePicker = styled(RangePicker)`
  width: 34%;
`;

const ContentButton = styled(Row)`
  margin-top: 10px;
`;

const ContentSpin = styled(Spin)`
left: 0;
`;

class NetworkShopping extends Component {
  state = {
    start: moment().subtract(1, 'months').format('DD/MM/YYYY'),
    end: moment().format('DD/MM/YYYY'),
    endOpen: false,
    loadLink: true,
    urlLink: false,
  }

  componentDidMount() {
    // this.requestDownload();
  }

  // seleccionar rango
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  }

  // Can not select days before today and today
  // deshabilitar fecha
  disabledDates = (current) => {
    const before = moment().subtract(5, 'years');
    const after = moment();
    return current && !current.isBetween(before, after);
  }

  showLinkDownload = () => {
    this.setState({
      urlLink: true,
    });
  }

  handleChange = (dates) => {
    if (moment(dates[1]).diff(moment(dates[0]), 'months') > 0) {
      this.setState({
        loadLink: false,
        urlLink: false,
      });
      message.warning('El rango no debe superar 1 mes.');
      return false;
    }
    if (moment(dates[0]).endOf('month') < moment(dates[1]).endOf('month')) {
      this.setState({
        loadLink: false,
        urlLink: false,
      });
      message.warning('Debe seleccionar el rango en el mismo mes.');
      return false;
    }
    const start = moment(dates[0]).format('DD/MM/YYYY');
    const end = moment(dates[1]).format('DD/MM/YYYY');
    this.setState({
      start,
      end,
      loadLink: true,
      urlLink: false,
    });
    return true;
  }

  handleClickDownload = () => {
    const { start, end } = this.state;
    this.props.requestDownload(start, end, this.showLinkDownload);
    return true;
  }

  render() {
    const { start, end } = this.state;
    const { loadLink } = this.state;
    const { urlLink } = this.state;
    const { loading } = this.props;
    const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_NETWORKSHOPPING_DOWNLOAD_EXCEL}?dInitialDate=${start}&dFinalDate=${end}`;
    return (
      <ContentInfoPreLiq>
        <ContentSpin spinning={loading}>
          <Row>
            <Col span={24}>
              <TitleTwo text="Informe Pre-liquidación sin Derogación Bono volumen Posventa" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title="Consideraciones" width={60}>
                <p><b>* La fecha limite para realizar la consulta es: {datenow}</b></p>
                <p><b>* El rango maximo de la consulta es de 1 mes</b></p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ContentRangePicker
                placeholder={['Fecha inicio facturación', 'Fecha fin facturación']}
                disabledDate={this.disabledDates}
                onChange={this.handleChange}
                defaultValue={[moment().startOf('months'), moment()]}
                format="YYYY-MM-DD"
              />
            </Col>
          </Row>
          {loadLink === true
            ? (
              <ContentButton>
                <Col span={24}>
                  <Button type="primary" loading={this.state.loading} onClick={this.handleClickDownload}>
                    Consultar
                  </Button>
                </Col>
              </ContentButton>
            ) : (
              null
            )
          }
          { this.props.state === true && urlLink === true
            ? (
              <Row>
                <Col span={24}>
                  <ContentDownload>
                    <DownloadLink href={urlDownload} text="Descargar informe" />
                  </ContentDownload>
                </Col>
              </Row>
            ) : (
              null
            )
          }
        </ContentSpin>
      </ContentInfoPreLiq>
    );
  }
}

const mapStateToProps = state => ({
  state: state.networkShoppingPV.state,
  loading: state.networkShoppingPV.loading,
  urlLink: true,
});

const mapDispatchToProps = dispatch => ({
  requestDownload: (start, end, callBack) => {
    dispatch(requestNetworkShopping(start, end, callBack));
  },
});

const FormNetworkShopping = Form.create()(NetworkShopping);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormNetworkShopping);
