import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Button, Tooltip, Spin } from 'antd';
import styled from 'styled-components';
import Segment from './segment';
import { requestGroupSegment } from '../../state/segmentPV/action';
import {
  InfoStatus,
  Status,
  TitleTwo,
} from '../../components/shared';

const ContentExclusions = styled.div`
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
  margin-left: 10%;
  margin: 0 auto;
  margin-top: 10px;
  max-width: 50%;
  
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

class SegmentList extends Component {
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
      title: 'Nombre Grupo',
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
    },
    ],
  }

  componentDidMount() {
    this.props.requestGroupSegment();
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
    this.setState({
      blnViewNew: false,
    });
    this.props.requestGroupSegment();
  }

  render() {
    const { blnViewNew, blnNewData, columns, idForm } = this.state;
    const { loading, ltsGroupSegment } = this.props;
    if (blnViewNew === true) {
      return (
        <Segment
          onReturn={this.handleReturnNew}
          idForm={idForm}
          blnNewData={blnNewData}
        />
      );
    }
    return (
      <ContentExclusions>
        <ContentSpin spinning={loading}>
          <Row>
            <Col span={24}>
              <TitleTwo text="Administrar Grupo De Segmentos Repuestos" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <TableStyled
                rowKey={record => record.uid}
                columns={columns}
                dataSource={ltsGroupSegment}
                pagination
              />
              <InfoStatus
                status={statusTable}
              />
            </Col>
          </Row>
          <ContentButton>
            <Col span={24}>
              <Button type="primary" onClick={this.handleClickNew}>Nuevo</Button>
            </Col>
          </ContentButton>
        </ContentSpin>
      </ContentExclusions>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.segmentPV.loading,
  ltsGroupSegment: state.segmentPV.ltsGroupSegment,
});

const mapDispatchToProps = dispatch => ({
  requestGroupSegment: () => {
    dispatch(requestGroupSegment());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SegmentList);
