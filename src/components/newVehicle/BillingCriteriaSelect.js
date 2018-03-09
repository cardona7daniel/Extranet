import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, Button } from 'antd';

const TableStyled = styled(Table)`
  max-width: 350px;
  margin: 0 auto;
`;

const ButtonStyled = styled(Button)`
  margin: 15px;
`;

class BillingCriteriaSelect extends Component {
  state = {
    selectedRowKeys: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && typeof nextProps.selected === 'object') {
      this.setState({
        selectedRowKeys: nextProps.selected,
      });
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handlerClickSave = () => {
    const { selectedRowKeys } = this.state;
    const { onSave } = this.props;
    onSave(selectedRowKeys);
  }

  render() {
    const { billingCriteria, columns } = this.props;
    const { selectedRowKeys } = this.state;

    return (
      <div>
        <TableStyled
          rowKey="Id"
          dataSource={billingCriteria || []}
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: this.onSelectChange,
          }}
          pagination={false}
          bordered
        />
        <ButtonStyled
          type="primary"
          size="large"
          onClick={this.handlerClickSave}
        >
          Guardar
        </ButtonStyled>
      </div>
    );
  }
}

BillingCriteriaSelect.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
    }),
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  billingCriteria: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number,
      Name: PropTypes.string,
    }),
  ),
  selected: PropTypes.arrayOf(PropTypes.number),
};

BillingCriteriaSelect.defaultProps = {
  billingCriteria: [],
  selected: null,
};

export default BillingCriteriaSelect;
