import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Popconfirm, Input, message } from 'antd';
import ParameterList from '../../components/newVehicle/ParameterList';
import * as actions from '../../state/parameters/action';
import { PARAMETERS_TYPES } from '../../utils/formats';

const InputStyled = styled(Input)`
  max-width: 100px;
`;

class parameterListPage extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.props.requestParameters();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.parameters.length > 0 &&
      this.state.data.length === 0) ||
      nextProps.parameters !== this.props.parameters
    ) {
      this.setState({
        data: [...nextProps.parameters.map(item => ({ ...item }))],
      });
    }
  }

  ColumnsParameterList = [{
    title: 'Descripción',
    dataIndex: 'Name',
    key: 'Name',
  }, {
    title: 'Valor',
    dataIndex: 'Value',
    key: 'Value',
    width: 130,
    render: (text, record) => this.renderEditableField(text, record),
  }, {
    title: 'Editar',
    dataIndex: '',
    key: 'e',
    width: 250,
    render: (text, record) => {
      const { editable } = record;
      return (
        <div className="editable-row-operations">
          {editable ?
            <span>
              <Button
                type="primary"
                ghost
                onClick={() => this.save(record.Id)}
              >Guardar</Button>
              <span className="ant-divider" />
              <Popconfirm title="¿Seguro que desea cancelar?" onConfirm={() => this.cancel(record.Id)}>
                <Button
                  type="danger"
                  ghost
                >Cancelar</Button>
              </Popconfirm>
            </span>
            : <Button
              type="primary"
              size="large"
              ghost
              shape="circle"
              icon="edit"
              onClick={() => this.edit(record.Id)}
            />
          }
        </div>
      );
    },
  }];

  edit(key) {
    const { data } = this.state;
    const newData = [...data];
    const target = newData.filter(item => key === item.Id)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  cancel(key) {
    const { parameters } = this.props;
    const { data } = this.state;
    const newData = [...data];
    const target = newData.filter(item => key === item.Id)[0];
    if (target) {
      Object.assign(target, parameters.filter(item => key === item.Id)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  handlerOnchange = (value, record) => {
    const { data } = this.state;
    const newData = [...data];
    const target = newData.filter(item => record.Id === item.Id)[0];
    if (target) {
      target.Value = value;
      this.setState({ data: newData });
    }
  }

  save = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.Id)[0];
    if (target && this.validateParameter(target)) {
      this.props.updateParameters(target, () => this.props.requestParameters());
      delete target.editable;
    } else {
      message.error(`El valor es requerido y debe ser ${target.Type} y máximo ${target.Length} caracteres.`);
    }
  }

  validateParameter = (record) => {
    let result = true;
    if (record.Value.trim() === '') {
      result = false;
    }
    const length = record.Type === PARAMETERS_TYPES.float
      ? record.Length + 1
      : record.Length;

    if (record.Length && record.Value && record.Value.length > length) {
      result = false;
    }

    if (record.Type === PARAMETERS_TYPES.numeric &&
        !Number.isInteger(record.Value * 1)
    ) {
      result = false;
    } else if (record.Type === PARAMETERS_TYPES.float &&
      isNaN(record.Value * 1) &&
      !((record.Value * 1) % 1)
    ) {
      result = false;
    }

    return result;
  }

  renderEditableField = (text, record) => {
    const { editable } = record;
    if (!editable) {
      return record.Value;
    }

    return (
      <InputStyled
        value={record.Value}
        onChange={e => this.handlerOnchange(e.target.value, record)}
      />
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <ParameterList
        columns={this.ColumnsParameterList}
        data={this.state.data}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  parameters: state.parameter.parameters,
  parameterEdit: state.parameter.parameterEdit,
  loading: state.parameter.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(parameterListPage);
