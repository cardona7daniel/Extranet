import React, { Component } from 'react';
import { Transfer as TransferAntd, message } from 'antd';
import styled from 'styled-components';
import Search from './Search';

const ContentTransfer = styled.div`
  display: inline-block;
  margin: 0 auto 25px auto;
`;

const TransferStyle = styled(TransferAntd)`
  text-align: justify;
  margin-top: 15px;
  
  .ant-transfer-operation .ant-btn {
    width: 30px;
    height: 26px;
  }
`;

class Transfer extends Component {
  state = {
    ltData: [],
    targetKeys: [],
  }

  componentWillReceiveProps(nextProps) {
    const { targetKeys } = this.state;
    if (nextProps.dataSource && nextProps.dataSource.length > 0) {
      this.getData(nextProps.dataSource);
      if (nextProps.dataTargetKeys &&
        nextProps.dataTargetKeys.length > 0 && targetKeys.length === 0) {
        const aDataKeys = [];
        nextProps.dataSource.forEach((valueDataSource, index) => {
          nextProps.dataTargetKeys.forEach((element) => {
            const dataTarget = valueDataSource.trim();
            if (dataTarget === element) {
              aDataKeys.push(index + 1);
            }
          });
        });
        this.setState({
          targetKeys: aDataKeys,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dataSource, dataTargetKeys } = this.props;
    const { targetKeys, ltData } = this.state;
    if (nextProps.dataSource.length !== dataSource.length ||
      nextProps.dataTargetKeys.length !== dataTargetKeys.length ||
      nextState.targetKeys.length !== targetKeys.length ||
      nextState.ltData.length !== ltData.length
    ) {
      return true;
    }
    return false;
  }

  getData = (dataSource) => {
    const ltData = [];
    if (dataSource !== undefined) {
      dataSource.forEach((data, i) => {
        ltData.push({
          key: i + 1,
          data,
        });
        this.setState({ ltData });
      });
    }
  }

  filterOption = (inputValue, option) => (
    option.data.toLowerCase().includes(inputValue.toLowerCase())
  );
  dataSearch = (value) => {
    const { ltData } = this.state;
    const ltDataConcat = [];
    let cont = 0;
    let aux = '';
    ltData.forEach((data) => {
      if (typeof data.key === 'number') {
        aux = data.data.split('-')[0].trim();
        if (aux === value[0].Reference.toString().trim()) {
          cont = 1;
        }
      } else if (data.key.toString().trim() === value[0].Reference.toString().trim()) {
        cont = 1;
      }
      if (cont === 0) {
        ltDataConcat.push({
          key: data.key,
          data: data.data,
        });
      }
    });
    if (cont === 0) {
      const reference = `${value[0].Reference} - ${value[0].Description}`;
      ltDataConcat.push({
        key: value[0].Reference.trim(),
        data: reference,
      });
    }
    if (cont === 1) {
      message.warning('La referencia ya fue encontrada');
      this.setState({ ltData });
    } else {
      this.setState({ ltData: ltDataConcat });
    }
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
    const { ltData } = this.state;
    const { dataTransfer } = this.props;
    const dataSubmit = [];
    ltData.forEach((value) => {
      targetKeys.forEach((element) => {
        if (value.key === element) {
          dataSubmit.push(value.data.trim());
        }
      });
    });
    dataTransfer(dataSubmit);
  }

  render() {
    const { ltData, targetKeys } = this.state;
    const
      {
        titles,
        listStyle,
        showSearch,
        searchPlaceholder,
        showSearchExternal,
        placeholderExternal,
      } = this.props;
    return (
      <ContentTransfer>
        {
          showSearchExternal
          && (
            <Search
              placeholderExternal={placeholderExternal}
              dataSearch={this.dataSearch}
            />
          )
        }
        <TransferStyle
          rowKey={record => record.key}
          dataSource={ltData}
          titles={titles}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          listStyle={listStyle}
          filterOption={this.filterOption}
          targetKeys={targetKeys}
          onChange={this.handleChange}
          render={item => item.data}
          lazy={false}
        />
      </ContentTransfer>
    );
  }
}

Transfer.defaultProps = {
  listStyle: { width: 300, height: 300 },
};

export default Transfer;
