import React, { Component } from 'react';
import { Row, Col, Form, DatePicker, message, Modal, Table } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
import {
  DownloadLink,
  UploadFile,
} from '../../components/shared';
import { ColumnsErrorLogGeneric } from '../../utils/formats';

moment.locale('es');

const ContentDownload = styled.p`
  padding: 10px 0 10px 0;
  margin: 0 0 10px 0;
`;

const ContentForm = styled(Form)`
  text-align: center;
`;

const FormItem = Form.Item;

const FilesTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const formItemLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 4 },
};

const modal = Modal.error;

class LoadFile extends Component {
  state = {
    year: null,
    month: null,
    textInfo: null,
  }

  showLog = (dataSource) => {
    modal({
      title: 'Errores en el cargue de archivo',
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
    const { blnDate } = this.props;
    this.props.form.validateFields((err) => {
      if (!err) {
        return true;
      }
      return false;
    });
    if (year === null && month === null && blnDate === true) {
      return false;
    }
    return true;
  }

  handleNextSuccess = (result) => {
    if (result) {
      console.log('handleNextSuccess', result.data);
      if (result.data.Message.Flag === false) {
        if (result.data.ModelData.length === 0) {
          message.error(result.data.Message.Message);
        } else {
          this.showLog(result.data.ModelData);
        }
      } else {
        message.success(result.data.Message.Message);
      }
    }
  }

  handlerDate = (momentDate) => {
    if (momentDate !== null) {
      const year = momentDate.format('Y');
      const month = momentDate.format('MM');
      this.setState({
        year,
        month,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { year, month } = this.state;
    const { urlDownload,
      urlUpLoad, blnDate, afterCharge = undefined, indexStep = undefined, title = 'Fecha:', onChargeFileEventuality } = this.props;
    let urlBaseUpLoad = '';
    if (blnDate === true) {
      urlBaseUpLoad = `${urlUpLoad}?year=${year}&month=${month}`;
    } else {
      urlBaseUpLoad = `${urlUpLoad}`;
    }
    return (
      <div>
        <Row>
          <Col span={24}>
            <ContentDownload>
              <DownloadLink href={urlDownload} text="Descargar plantilla" />
            </ContentDownload>
          </Col>
        </Row>
        {blnDate
          && (
            <Row>
              <Col span={24}>
                <ContentForm onSubmit={this.handleSubmit} layout="horizontal">
                  <Form>
                    <FormItem label={title} {...formItemLayout} >
                      {getFieldDecorator('month', {
                        rules: [{ required: true, message: 'Por favor seleccione la fecha' }],
                      })(
                        <DatePicker.MonthPicker
                          placeholder="Seleccione fecha"
                          disabledDate={this.disabledDates}
                          onChange={this.handlerDate}
                          format="Y-MMMM"
                        />,
                      )}
                    </FormItem>
                  </Form>
                </ContentForm>
              </Col>
            </Row>
          )
        }
        <Row>
          <Col span={24}>
            <UploadFile
              filesTypes={FilesTypes}
              messageErrorType="Debe ser un archivo de Excel."
              action={urlBaseUpLoad}
              nextSuccess={this.handleNextSuccess}
              beforeUploadFile={this.handleBeforeUploadFile}
              afterCharge={afterCharge}
              indexStep={indexStep}
              onChargeFileEventuality={onChargeFileEventuality}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const FormLoadFile = Form.create()(LoadFile);
export default FormLoadFile;
