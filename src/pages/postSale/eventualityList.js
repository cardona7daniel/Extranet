import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Button, Tooltip, Spin, Modal } from 'antd';
import styled from 'styled-components';
import EventualityNew from './eventualityNew';

import {
  requestEventuality,
  requestDeleteEventuality,
} from '../../state/eventualityPV/action';

import {
  InfoStatus,
  Status,
} from '../../components/shared';

const ContentButton = styled(Row)`
  margin-top: 25px;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const TableStyled = styled(Table)`
  margin-left: 10%;
  margin: 0 auto;
  margin-top: 10px;
  max-width: 70%;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

const ColorStatus = {
  active: '#7ad179',
  inactive: '#eb675a',
};

const statusTable = [
  {
    key: 1,
    text: 'Activo',
    color: ColorStatus.active,
  },
  {
    key: 2,
    text: 'Inactivo',
    color: ColorStatus.inactive,
  },
];


const confirm = Modal.confirm;

class EventualityList extends Component {
  state = {
    blnViewNew: false,
    blnNewData: true,
    idForm: 0,
    columns: [{
      title: '',
      dataIndex: 'Id',
      key: 'edit',
      render: id => (
        <Tooltip placement="left" title="Editar">
          <Button
            type="primary"
            size="large"
            ghost
            shape="circle"
            icon="edit"
            onClick={() => this.getUpdate(id)}
          />
        </Tooltip>
      ),
    }, {
      title: 'Eventualidad',
      dataIndex: 'Name',
      key: 'Name',
    }, {
      title: 'Estado',
      dataIndex: 'Status',
      key: 'Status',
      render: value => (
        <div>
          <Status
            size="small"
            color={value === true ? ColorStatus.active : ColorStatus.inactive}
          />
        </div>
      ),
    }, {
      title: 'Eliminar',
      dataIndex: 'Id',
      key: 'delete',
      render: id => (
        <Tooltip placement="left" title="Eliminar">
          <Button
            type="danger"
            size="large"
            ghost
            shape="circle"
            icon="delete"
            onClick={() => this.showDeleteConfirm(id, this.setDelete)}
          />
        </Tooltip>
      ),
    },
    ],
  }

  componentDidMount() {
    const { periodId } = this.props;
    this.props.requestEventuality(periodId);
  }

  setDelete = async (id) => {
    const { periodId } = this.props;
    this.props.requestEventualityDelete(id, periodId);
  }

  getUpdate = async (id) => {
    this.setState({
      blnViewNew: true,
      blnNewData: false,
      idForm: id,
    });
  }

  handleClickNew = () => {
    this.setState({
      blnViewNew: true,
      blnNewData: true,
      idForm: 0,
    });
  }

  handleReturnNew = () => {
    const { periodId } = this.props;
    this.setState({
      blnViewNew: false,
    });
    this.props.requestEventuality(periodId);
  }

  showDeleteConfirm = (id, setDelete) => {
    confirm({
      title: 'Está seguro de eliminar esta eventualidad?',
      content: '',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { blnViewNew, blnNewData, columns, idForm } = this.state;
    const { loading, ltData, periodId } = this.props;
    if (blnViewNew === true) {
      return (
        <EventualityNew
          onReturn={this.handleReturnNew}
          idForm={idForm}
          blnNewData={blnNewData}
          periodId={periodId}
        />
      );
    }
    return (
      <ContentSpin spinning={loading}>
        <Row>
          <Col span={24}>
            <TableStyled
              rowKey={record => record.uid}
              columns={columns}
              dataSource={ltData}
              pagination
            />
            <InfoStatus
              status={statusTable}
            />
          </Col>
        </Row>
        <ContentButton>
          <Col span={24}>
            <Button type="primary" onClick={this.handleClickNew}>Nueva</Button>
          </Col>
        </ContentButton>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.eventualityPV.loading,
  ltData: state.eventualityPV.ltsEventuality,
});

const mapDispatchToProps = dispatch => ({
  requestEventuality: (periodId) => {
    dispatch(requestEventuality(periodId));
  },
  requestEventualityDelete: (id, periodId) => {
    dispatch(requestDeleteEventuality(id, () => {
      dispatch(requestEventuality(periodId));
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventualityList);
