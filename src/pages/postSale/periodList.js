import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Button, Tooltip, Spin, Modal } from 'antd';
import styled from 'styled-components';
import Period from './period';
import { requestPeriod, requestDeletePeriod } from '../../state/periodLiqPV/action';
import {
  InfoStatus,
  Status,
  TitleTwo,
} from '../../components/shared';

const ContentTable = styled.div`
  margin: 50px auto 0;
  width: 95%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

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

const statusPeriods = [
  {
    key: 1,
    text: 'Sin Liquidar',
    color: ColorStatus.active,
  },
  {
    key: 2,
    text: 'Liquidado',
    color: ColorStatus.inactive,
  },
];


const confirm = Modal.confirm;

class PeriodList extends Component {
  state = {
    blnNewPeriod: false,
    blnPeriod: true,
    idForm: 0,
    flag: false,
    columns: [
      {
        title: '',
        dataIndex: 'Id',
        key: 'edit',
        render: (id, record) => (
          <Tooltip placement="left" title="Editar">
            <Button
              type="primary"
              size="large"
              ghost
              shape="circle"
              icon="edit"
              onClick={() => this.getUpdate(id, record)}
            />
          </Tooltip>
        ),
      }, {
        title: 'Periodo',
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
        render: (id, record) => (
          record.Flag &&
            (<Tooltip placement="left" title="Eliminar">
              <Button
                type="danger"
                size="large"
                ghost
                shape="circle"
                icon="delete"
                onClick={() => this.showDeleteConfirm(id, this.setDelete)}
              />
            </Tooltip>)
        ),
      },
    ],
  }

  componentDidMount() {
    this.props.requestPeriodList();
  }

  setDelete = async (id) => {
    this.props.requestPeriodDelete(id);
  }

  getUpdate = async (id, record) => {
    this.setState({
      blnNewPeriod: true,
      blnPeriod: false,
      idForm: id,
      flag: record.Flag,
    });
  }

  handleClickNewPeriod = () => {
    this.setState({
      blnNewPeriod: true,
      blnPeriod: true,
    });
  }

  handleReturnNewPeriod= () => {
    this.setState({
      blnNewPeriod: false,
    });
    this.props.requestPeriodList();
  }

  showDeleteConfirm = (id, setDelete) => {
    confirm({
      title: 'Estas seguro de eliminar este periodo de liquidación?',
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
    const { blnNewPeriod, blnPeriod, columns, idForm, flag } = this.state;
    const { loading, ltPeriod } = this.props;
    if (blnNewPeriod === true) {
      return (
        <Period
          onReturn={this.handleReturnNewPeriod}
          idForm={idForm}
          blnNewPeriod={blnPeriod}
          flag={!flag}
        />
      );
    }
    return (
      <ContentSpin spinning={loading}>
        <ContentTable>
          <Row>
            <Col span={24}>
              <TitleTwo text="Configuración de Periodos de Liquidación" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <TableStyled
                rowKey={record => record.uid}
                columns={columns}
                dataSource={ltPeriod}
                pagination
              />
              <InfoStatus
                status={statusPeriods}
              />
            </Col>
          </Row>
          <ContentButton>
            <Col span={24}>
              <Button type="primary" onClick={this.handleClickNewPeriod}>Nuevo</Button>
            </Col>
          </ContentButton>
        </ContentTable>
      </ContentSpin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.periodLiqPV.loading,
  ltPeriod: state.periodLiqPV.ltPeriod,
});

const mapDispatchToProps = dispatch => ({
  requestPeriodList: () => {
    dispatch(requestPeriod());
  },
  requestPeriodDelete: (id) => {
    dispatch(requestDeletePeriod(id, () => {
      dispatch(requestPeriod());
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeriodList);
