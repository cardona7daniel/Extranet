import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, message } from 'antd';
import styled from 'styled-components';
import { requestReference } from '../../state/exclusionPV/action';

const SearchInput = Input.Search;

const SearchInputStyle = styled(SearchInput)`
  width: 50% !important;
`;

class Search extends Component {
  getReference = (value) => {
    const { requestReferenceList, dataSearch } = this.props;
    const valorSinEspacios = value.trim();
    if (valorSinEspacios && valorSinEspacios.length <= 15) {
      requestReferenceList(valorSinEspacios, (data) => {
        dataSearch(data);
      });
    } else {
      message.warning('La el valor de la referencia no puede ser mayor de 15 caracteres.');
    }
  }

  render() {
    const { placeholderExternal } = this.props;
    return (
      <span>
        <span>Referencia: </span>
        <SearchInputStyle
          placeholder={placeholderExternal}
          onSearch={value => this.getReference(value)}
        />
      </span>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.exclusionPV.loading,
  exReference: state.exclusionPV.exReference,
});

const mapDispatchToProps = dispatch => ({
  requestReferenceList: (value, next) => {
    dispatch(requestReference(value, next));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

