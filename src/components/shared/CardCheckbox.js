import React, { Component } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import Card from './Card';

const ContentAll = styled.div`
  border-bottom: 1px solid #E9E9E9;
  padding-bottom: 5px;
`;

const ContentGroup = styled.div`
  box-sizing: border-box;
  text-align:left;
  margin: 0 auto;
  .ant-checkbox-group-item {
    min-width: 45%;
  }
`;

const CheckboxGroup = Checkbox.Group;

class CardCheckbox extends Component {
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
  };

  componentWillReceiveProps(nextProps) {
    const { checkedList, indeterminate } = this.state;
    if (nextProps.plainOptions && nextProps.plainOptions.length > 0) {
      if (nextProps.defaultCheckedList &&
        nextProps.defaultCheckedList.length > 0 && checkedList.length === 0 &&
        indeterminate === true
      ) {
        this.setState({
          checkedList: nextProps.defaultCheckedList,
          checkAll: nextProps.defaultCheckedList.length === nextProps.plainOptions.length,
        });
      }
    }
  }

  onChange = (checkedList) => {
    const { plainOptions, getCheckedList } = this.props;
    this.setState(
      {
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
        checkAll: checkedList.length === plainOptions.length,
      },
      () => getCheckedList(checkedList),
    );
  }

  onCheckAllChange = (e) => {
    const { plainOptions, getCheckedList } = this.props;
    const arrDataChecked = e.target.checked ? plainOptions : [];
    this.setState(
      {
        checkedList: arrDataChecked,
        indeterminate: false,
        checkAll: e.target.checked,
      },
      () => getCheckedList(arrDataChecked),
    );
  }

  render() {
    const { cardTitle, width, plainOptions, textAll } = this.props;
    return (
      <Card title={cardTitle} width={width}>
        <ContentAll>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            {textAll}
          </Checkbox>
        </ContentAll>
        <br />
        <ContentGroup>
          <CheckboxGroup
            options={plainOptions}
            value={this.state.checkedList}
            onChange={this.onChange}
          />
        </ContentGroup>
      </Card>
    );
  }
}

export default CardCheckbox;
