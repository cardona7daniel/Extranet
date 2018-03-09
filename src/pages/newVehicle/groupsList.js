import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import {
  InfoStatus,
  Status,
  TitleTwo,
  ContentWrap,
} from '../../components/shared';
import {
  requestGroups,
  requestGroupInfo,
  emptyGroupsInfo,
  saveOrUpdateGroup,
} from '../../state/groups/action';
import GroupForm from '../../components/newVehicle/GroupForm';
import { GROUPS_TYPE_DEALER } from '../../utils/formats';

const TableStyled = styled(Table)`
  margin: 0 auto;
  max-width: 800px;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

const ColorStatus = {
  activo: '#7ad179',
  inactivo: '#eb675a',
};

const ColumnsDealerGroups = [
  {
    title: 'Editar',
    dataIndex: '',
    key: 'e',
  }, {
    title: 'Nombre',
    dataIndex: 'Name',
    key: 'Name',
  }, {
    title: 'Estado',
    dataIndex: 'Flag',
    key: 'Flag',
    render: value => (
      <div>
        <Status
          size="small"
          color={value === true ? ColorStatus.activo : ColorStatus.inactivo}
        />
      </div>
    ),
  },
];

const statusExclusions = [
  {
    key: 1,
    text: 'Activo',
    color: ColorStatus.activo,
  },
  {
    key: 2,
    text: 'Inactivo',
    color: ColorStatus.inactivo,
  },
];

const paramsByType = {
  GC: {
    title: 'GRUPO CONCESIONARIOS',
    titleTransfer: 'Concesionarios',
    IdKey: 'Id',
    keyForm: 'DealerShips',
  },
  GS: {
    title: 'GRUPO SALAS',
    titleTransfer: 'Salas',
    IdKey: 'RoomId',
    keyForm: 'Rooms',
  },
};

class GroupsList extends Component {
  state = {
    visibleEditNew: false,
    idGroup: null,
    list: [],
  }

  componentDidMount() {
    this.getRequestGroup();
  }

  getType = () => {
    const { type = GROUPS_TYPE_DEALER } = this.props.match.params;
    return type;
  }

  getRequestGroup = () => {
    const type = this.getType();
    if (Object.hasOwnProperty.call(paramsByType, type)) {
      this.props.requestGroups(type);
    }
  }

  showVisibleNewEdit = (idGroup = null) => {
    const id = isNaN(idGroup) ? null : idGroup;
    const type = this.getType();
    this.setState(
      {
        visibleEditNew: true,
        idGroup: id,
      },
      () => this.props.requestGroupInfo(type, id),
    );
  }

  hideVisibleNewEdit = () => {
    this.setState({
      visibleEditNew: false,
      idGroup: null,
    }, () => {
      this.getRequestGroup();
      this.props.emptyGroupsInfo();
    });
  }

  render() {
    const { groups, groupsEdit, dealerShips, rooms, loading } = this.props;
    const { visibleEditNew, idGroup } = this.state;
    const type = this.getType();

    if (!Object.hasOwnProperty.call(paramsByType, type)) {
      return null;
    }

    const data = type === GROUPS_TYPE_DEALER ? dealerShips : rooms;

    if (visibleEditNew === true) {
      return (
        <ContentWrap>
          <GroupForm
            loading={loading}
            data={data}
            idGroup={idGroup}
            groupsEdit={groupsEdit}
            returnToList={this.hideVisibleNewEdit}
            submitForm={this.props.saveOrUpdateGroup}
            paramsByType={paramsByType[type]}
          />
        </ContentWrap>
      );
    }

    ColumnsDealerGroups[0].render = (val, record) => (
      <Button
        type="primary"
        size="large"
        ghost
        shape="circle"
        icon="edit"
        onClick={() => this.showVisibleNewEdit(record.Id)}
      />
    );

    return (
      <ContentWrap>
        <TitleTwo text={paramsByType[type].title} />
        <TableStyled
          rowKey={record => record.Id}
          columns={ColumnsDealerGroups}
          dataSource={groups}
          loading={loading}
        />
        <InfoStatus
          status={statusExclusions}
        />
        <Button
          type="primary"
          size="large"
          onClick={this.showVisibleNewEdit}
        >Nuevo</Button>
      </ContentWrap>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups.groups,
  groupsEdit: state.groups.groupsEdit,
  dealerShips: state.groups.dealerShips,
  rooms: state.groups.rooms,
  loading: state.groups.loading,
});

const mapDispatchToProps = {
  requestGroups,
  requestGroupInfo,
  emptyGroupsInfo,
  saveOrUpdateGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupsList);
