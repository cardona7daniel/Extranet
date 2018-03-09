import React, { PureComponent } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';

const UploadFileStyled = styled.div`
  display: inline-block;
  
  & > span {
    display: inline-block;
    vertical-align: top;
  }
  
  & > button {
    margin-left: 15px;
  }
`;

class UploadFile extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
  }

  genericUploadFiles = async () => {
    const { action, nextSuccess, beforeUploadFile,
      afterCharge, indexStep, onChargeFileEventuality } = this.props;
    const { fileList } = this.state;
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
    try {
      if (beforeUploadFile) {
        const blResult = beforeUploadFile();
        if (blResult === false) {
          this.setState({
            uploading: false,
            fileList: [],
          });
          return false;
        }
      }

      const result = await axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      this.setState({
        uploading: false,
        fileList: [],
      });

      if (nextSuccess) {
        nextSuccess(result);
        if (indexStep !== undefined && afterCharge !== undefined && result.data.Message.Flag) {
          afterCharge(indexStep);
        }
        if (onChargeFileEventuality !== undefined && result.data.Message.Flag) {
          onChargeFileEventuality();
        }
      } else {
        message.success('Archivo cargado con exito.');
      }
    } catch (e) {
      this.setState({
        uploading: false,
      });
      message.error('Error al cargar el archivo.');
    }
    return true;
  }

  render() {
    const {
      filesTypes,
      messageErrorType,
      action,
      handleUpload = this.genericUploadFiles,
    } = this.props;
    const { uploading, fileList } = this.state;

    return (
      <UploadFileStyled>
        <Upload
          action={action}
          fileList={fileList}
          beforeUpload={(file) => {
            if (!filesTypes.find(type => type === file.type)) {
              message.error(messageErrorType);
              return false;
            }
            this.setState({
              fileList: [file],
            });
            return false;
          }}
          onRemove={(file) => {
            this.setState((currentState) => {
              const index = currentState.fileList.indexOf(file);
              const newFileList = currentState.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          }}
        >
          <Button>
            <Icon type="upload" /> Selecciona el archivo
          </Button>
        </Upload>
        <Button
          type="primary"
          disabled={fileList.length === 0}
          loading={uploading}
          onClick={handleUpload}
        >
          {uploading ? 'Cargando' : 'Comenzar carga' }
        </Button>
      </UploadFileStyled>
    );
  }
}

UploadFile.propTypes = {
  filesTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  messageErrorType: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  handleUpload: PropTypes.func,
  nextSuccess: PropTypes.func,
  afterCharge: PropTypes.func,
  indexStep: PropTypes.number,
};

UploadFile.defaultProps = {
  handleUpload: undefined,
  nextSuccess: undefined,
  afterCharge: undefined,
  indexStep: undefined,
};

export default UploadFile;
