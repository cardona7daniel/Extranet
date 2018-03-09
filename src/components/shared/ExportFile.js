import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
// import styled from 'styled-components';

class ExportFile extends PureComponent {
  state = {
    downloading: false,
  };

  genericExportFiles = async () => {
    const { action, nextSuccess } = this.props;
    this.setState({
      downloading: true,
    });
    await axios.get(action)
      .then(() => {
        this.setState({
          downloading: false,
        });
        nextSuccess();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          downloading: false,
        });
      });
  };

  render() {
    const { downloading } = this.state;
    const { text, type } = this.props;
    return (
      <Button
        type={type}
        loading={downloading}
        onClick={this.genericExportFiles}
      >
        {downloading ? 'Espere un momento' : text }
      </Button>
    );
  }
}

ExportFile.propTypes = {
  action: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  nextSuccess: PropTypes.func,
  type: PropTypes.string,
};

ExportFile.defaultProps = {
  nextSuccess: null,
  type: 'primary',
};

export default ExportFile;
