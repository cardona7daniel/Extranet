import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, DatePicker, message, Modal, Table } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
import requestPeriod from '../../state/periodPV/action';
import {
  DownloadLink,
  Instructions,
  UploadFile,
  TitleTwo,
} from '../../components/shared';
import { ColumnsErrorLogGeneric } from '../../utils/formats';

moment.locale('es');

const ContentWarranty = styled.div`
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

const TitleLoadFile = styled(Row)`
  margin: 10px 0 10px 0;
`;

const ContentForm = styled(Form)`
  text-align: center;
`;

const FormItem = Form.Item;

const FilesTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const dataInstructions = [
  {
    index: 1,
    text: () => (
      <div>
        <p><b>Diligencie la plantilla:</b> Al descargar la plantilla, en el Excel se muestran las
          siguientes columnas:</p>
        <p><b>* Columna A - Código Garantías:</b> Debe porner el código de garantías
          del concesionario.</p>
        <p><b>* Columna B - Referencias:</b> Corresponde a la referencia del repuesto.</p>
        <p><b>* Columna C - Valor:</b> Corresponde al valor valido del repuesto para la factura.</p>
      </div>
    ),
  },
  {
    index: 2,
    text: () => (
      <div>
        <p><b>Cargar el archivo:</b> Seleccione el año y mes para el cual aplicaran las garantías
        que se cargaran dentro del archivo, luego adjunte el Excel diligenciado y haga clic
          en el botón: Cargar Archivo.</p>
      </div>
    ),
  },
];

const note = 'Cada Vez que se vuelva a cargar la plantilla para un mismo mes y año que ya se tenía ' +
  'datos, el sistema la reemplazará y dejara los últimos valores que se carguen';

const formItemLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 4 },
};

const modal = Modal.error;

class Warranty extends Component {
  state = {
    year: null,
    month: null,
    textInfo: null,
  }

  componentDidMount() {
    this.props.requestPeriod(() => {
      this.formatDate();
    });
  }

  showLog = (dataSource) => {
    modal({
      title: 'Errores en el cargue de garantías',
      content: (
        <div>
          <Table dataSource={dataSource} columns={ColumnsErrorLogGeneric} />
        </div>
      ),
      okText: 'Regresar',
      width: '80%',
    });
  }

  disabledDates = (current) => {
    const before = moment().subtract(2, 'years');
    const after = moment().add(1, 'years');
    return current && !current.isBetween(before, after);
  }

  handleBeforeUploadFile = () => {
    const { year, month } = this.state;
    this.props.form.validateFields((err) => {
      if (!err) {
        return true;
      }
      return false;
    });
    if (year === null && month === null) {
      return false;
    }
    return true;
  }

  handleNextSuccess = (result) => {
    if (result) {
      if (result.data.Message.Flag === false) {
        this.showLog(result.data.ModelData);
      } else {
        message.success(result.data.Message.Message);
        this.props.requestPeriod(() => {
          this.formatDate();
        });
      }
      console.log(result);
    }
  }

  handlerDateWarranty = (momentDate) => {
    if (momentDate != null) {
      const year = momentDate.format('Y');
      const month = momentDate.format('MM');
      this.setState({
        year,
        month,
      });
    }
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { year, month, textInfo } = this.state;
    const URL_BASE = process.env.REACT_APP_PATH_API_POST_SALES;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_WARRANTY_DOWNLOAD_EXCEL}`;
    const urlUpLoad = `${URL_BASE}${process.env.REACT_APP_WARRANTY_UPLOAD_EXCEL}?year=${year}&month=${month}`;
    return (
      <ContentWarranty>
        <Row>
          <Col span={24}>
            <TitleTwo text="Carga masiva de la carga de garantías" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Instructions dataInstructions={dataInstructions} width="68%" note={note} />
          </Col>
        </Row>
        <TitleLoadFile>
          <Col span={24}>
            <b>{textInfo}</b>
          </Col>
        </TitleLoadFile>
        <Row>
          <Col span={24}>
            <ContentDownload>
              <DownloadLink href={urlDownload} text="Descargar plantilla" />
            </ContentDownload>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ContentForm onSubmit={this.handleSubmit} layout="horizontal">
              <Form>
                <FormItem label="Fecha Garantías" {...formItemLayout} >
                  {getFieldDecorator('monthWarranty', {
                    rules: [{ required: true, message: 'Por favor seleccione la fecha de garantía' }],
                  })(
                    <DatePicker.MonthPicker
                      placeholder="Seleccione fecha"
                      disabledDate={this.disabledDates}
                      onChange={this.handlerDateWarranty}
                      format="Y-MMMM"
                    />,
                  )}
                </FormItem>
              </Form>
            </ContentForm>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <UploadFile
              filesTypes={FilesTypes}
              messageErrorType="Debe ser un archivo de Excel."
              action={urlUpLoad}
              nextSuccess={this.handleNextSuccess}
              beforeUploadFile={this.handleBeforeUploadFile}
            />
          </Col>
        </Row>
      </ContentWarranty>
    );
  }
}

const mapStateToProps = state => ({
  periodData: state.periodPV.periodData,
});

const mapDispatchToProps = dispatch => ({
  requestPeriod: (next) => {
    dispatch(requestPeriod(next));
  },
});

const FormWarranty = Form.create()(Warranty);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormWarranty);
