import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Transfer,
} from 'antd';

import { TitleContent } from '../shared';

const TransferStyle = styled(Transfer)`
  .ant-transfer-operation .ant-btn {
    width: 30px;
    height: 26px;
  }
  .ant-transfer-list-header {
    text-align:left;
  }
  .ant-transfer-list-content-item {
    text-align:left;
  }
`;

class TransferFamilyVehicle extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      families,
      vehicles,
      targetKeysFamilies,
      targetKeysVehicles,
    } = this.props;

    if (families.length !== nextProps.families.length ||
      vehicles.length !== nextProps.vehicles.length ||
      targetKeysFamilies.length !== nextProps.targetKeysFamilies.length ||
      targetKeysVehicles.length !== nextProps.targetKeysVehicles.length
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      families,
      vehicles,
      handleChangeFamilies,
      handleChangeVehicles,
      targetKeysFamilies,
      targetKeysVehicles,
    } = this.props;

    return (
      <div>
        <TitleContent text="Familia de vehículos" width="70%" />
        <TransferStyle
          rowKey={record => record.Id}
          dataSource={families}
          targetKeys={targetKeysFamilies}
          showSearch
          listStyle={{
            width: 350,
            height: 300,
          }}
          titles={['Disponibles', 'Asignados']}
          render={record => record.Name}
          onChange={handleChangeFamilies}
          filterOption={
            (text, option) => option.Name.toLowerCase().includes(text.toLowerCase())
          }
        />

        <TitleContent text="Vehículos" width="70%" />
        <TransferStyle
          rowKey={record => record.Id}
          dataSource={vehicles}
          targetKeys={targetKeysVehicles}
          showSearch
          listStyle={{
            width: 350,
            height: 300,
          }}
          titles={['Disponibles', 'Asignados']}
          render={record => `${record.Id} - ${record.Name}`}
          onChange={handleChangeVehicles}
          filterOption={
            (text, option) => (`${option.Id}${option.Name}`).toLowerCase().includes(text.toLowerCase())
          }
        />
      </div>
    );
  }
}

export default TransferFamilyVehicle;
