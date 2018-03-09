import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Button, Tooltip, Spin, Modal } from 'antd';
import styled from 'styled-components';
import Exclusion from './exclusion';
import { requestExclusion, requestDeleteExclusion } from '../../state/exclusionPV/action';
import {
  InfoStatus,
  Status,
  TitleTwo,
} from '../../components/shared';

const ContentButton = styled(Row)`
  margin-top: 25px;
`;

const ContentSpin = styled(Spin)`
  left: 0;
`;

const TableStyled = styled(Table)`
  margin: 0 auto;
  max-width: 60%;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

const ColorStatus = {
  active: '#7ad179',
  inactive: '#eb675a',
};

const statusExclusions = [
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

class ExclusionList extends Component {
  state = {
    blnNewExclusion: false,
    blnExclusion: true,
    idForm: 0,
    columns: [
      {
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
        title: 'Exclusión',
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
  };

  componentDidMount() {
    this.props.requestExclusionList();
  }

  setDelete = async (id) => {
    this.props.requestExclusionDelete(id);
  }

  getUpdate = async (id) => {
    this.setState({
      blnNewExclusion: true,
      blnExclusion: false,
      idForm: id,
    });
  }

  handleClickNewExclusion = () => {
    this.setState({
      blnNewExclusion: true,
      blnExclusion: true,
    });
  }

  handleReturnNewExclusion = () => {
    this.setState({
      blnNewExclusion: false,
    });
    this.props.requestExclusionList();
  }

  showDeleteConfirm = (id, setDelete) => {
    confirm({
      title: 'Estas seguro de eliminar esta exclusión?',
      content: '',
      okText: 'Yes',
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
    const { blnNewExclusion, blnExclusion, columns, idForm } = this.state;
    const { loading, ltExcl } = this.props;
    if (blnNewExclusion === true) {
      return (
        <Exclusion
          onReturn={this.handleReturnNewExclusion}
          idForm={idForm}
          blnNewExclusion={blnExclusion}
        />
      );
    }
    return (
      <ContentSpin spinning={loading}>
        <Row>
          <Col span={24}>
            <TitleTwo text="Exclusiones para repuestos" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TableStyled
              rowKey={record => record.uid}
              columns={columns}
              dataSource={ltExcl}
              pagination
            />
            <InfoStatus
              status={statusExclusions}
            />
          </Col>
        </Row>
        <ContentButton>
          <Col span={24}>
            <Button type="primary" onClick={this.handleClickNewExclusion}>Nueva</Button>
          </Col>
        </ContentButton>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.exclusionPV.loading,
  ltExcl: state.exclusionPV.ltExcl,
});

const mapDispatchToProps = dispatch => ({
  requestExclusionList: () => {
    dispatch(requestExclusion());
  },
  requestExclusionDelete: (id) => {
    dispatch(requestDeleteExclusion(id, () => {
      dispatch(requestExclusion());
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExclusionList);
