import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  Spin,
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Transfer,
} from 'antd';
import { TitleTwo, TitleContent } from '../shared';

const FormItem = Form.Item;

const FormItemLeft = styled(FormItem)`
  text-align:left;
`;

const MarginTop = styled.div`
  margin-top: 1rem;
`;

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

const SpinStyled = styled(Spin)`
  width: auto !important;
`;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 6 },
};

class GroupForm extends PureComponent {
  state = {
    data: [],
    targetKeysData: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length > 0) {
      let editGroup = {};
      let targetDealerShip = this.state.targetKeysData;
      let targetRooms = this.state.targetKeysData;

      if (nextProps &&
        this.state.targetKeysData.length === 0 &&
        nextProps.groupsEdit &&
        nextProps.groupsEdit !== null &&
        Object.hasOwnProperty.call(nextProps.groupsEdit, 'Id') &&
        nextProps.groupsEdit.Id > 0
      ) {
        const {
          GroupDealerShip = this.state.targetKeysData,
          GroupRoom = this.state.targetKeysData,
        } = (nextProps.groupsEdit || {});

        targetDealerShip = GroupDealerShip !== null ? GroupDealerShip.map(f => f.DealerShipId) : [];
        targetRooms = GroupRoom !== null ? GroupRoom.map(f => f.RoomId) : [];
        editGroup = {
          targetKeysData: targetDealerShip.concat(targetRooms),
        };
      }

      this.setState(
        {
          data: nextProps.data,
          ...editGroup,
        },
        () => this.handleChangeGroup(editGroup.targetKeysData),
      );
    }
  }

  submitForm = (e) => {
    const { submitForm, returnToList, paramsByType, idGroup } = this.props;
    const {
      targetKeysData,
    } = this.state;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.validateEmptyTransfers()) {
        const tmpValues = {
          ...values,
          Rooms: [],
          DealerShips: [],
        };

        tmpValues[paramsByType.keyForm] = targetKeysData;

        if (idGroup > 0) {
          tmpValues.Id = idGroup;
        }

        submitForm(
          tmpValues,
          () => {
            returnToList();
          },
        );
      }
    });
  }

  validateEmptyTransfers = () => {
    const { paramsByType } = this.props;
    const {
      targetKeysData = [],
    } = this.state;

    let boolVal = true;

    if (targetKeysData.length === 0) {
      message.error(`Debe seleccionar ${paramsByType.titleTransfer}`);
      boolVal = false;
    }

    return boolVal;
  }

  handleChangeGroup = (targetGroup) => {
    this.setState(state => ({
      targetKeysData: targetGroup || state.targetKeysData,
    }));
    return true;
  }

  returnToList = (e) => {
    e.preventDefault();
    const { returnToList } = this.props;
    this.setState({
      data: [],
      targetKeysData: [],
    }, returnToList);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { paramsByType, loading } = this.props;
    const {
      data,
      targetKeysData,
    } = this.state;

    return (
      <div>
        <TitleTwo text={paramsByType.title} />
        <Form onSubmit={this.submitForm}>
          <FormItem label="Nombre del grupo" {...formItemLayout}>
            {getFieldDecorator('Name', {
              rules: [
                { required: true, message: 'Por favor ingrese el nombre del grupo.' },
                { max: 50, message: 'El Nombre debe ser menor o igual a 50 caracteres' },
              ],
            })(
              <Input />,
            )}
          </FormItem>

          <FormItemLeft label="Estado" {...formItemLayout}>
            {getFieldDecorator('Flag', {
              valuePropName: 'checked',
            })(
              <Checkbox />,
            )}
          </FormItemLeft>

          <SpinStyled spinning={loading}>
            <TitleContent text={paramsByType.titleTransfer} width="80%" />
            <TransferStyle
              rowKey={record => record[paramsByType.IdKey]}
              dataSource={data}
              targetKeys={targetKeysData}
              showSearch
              listStyle={{
                width: 350,
                height: 300,
              }}
              titles={['Disponibles', 'Asignados']}
              render={record => record.Name}
              onChange={this.handleChangeGroup}
              filterOption={
                (text, option) => option.Name.toLowerCase().includes(text.toLowerCase())
              }
            />
          </SpinStyled>

          <MarginTop>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={loading}>
                Guardar
              </Button>
              <span className="ant-breadcrumb-separator" />
              <Button
                ghost
                type="primary"
                onClick={this.returnToList}
              >Regresar</Button>
            </FormItem>
          </MarginTop>

        </Form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => {
    const formValues = {};

    if (props.idGroup > 0 && props.groupsEdit) {
      if (props.groupsEdit.Name) {
        formValues.Name = {};
        formValues.Name.value = props.groupsEdit.Name;
      }

      if (props.groupsEdit.Flag) {
        formValues.Flag = {};
        formValues.Flag.value = props.groupsEdit.Flag;
      }
    } else {
      formValues.Flag = {};
      formValues.Flag.value = true;
    }

    return formValues;
  },
})(GroupForm);
