import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import styled from 'styled-components';
import Card from './Card';

const CircleInst = styled(Avatar)`
 vertical-align: top;
 background-color: #F7BD01 !important;
`;

const ContentNote = styled.div`
  padding-top: 10px;
  border-top: 1px solid #F7BD01;
  &:hover {
    background-color: #ebebeb;
  }
`;

const TextInst = styled.div`
  display: inline-block;
  width: 90%;
  text-align: justify;
  margin-left: 30px;
  margin-bottom: 20px;
`;

function Instructions({ dataInstructions, width, note }) {
  return (
    <Card title="Instrucciones" width={width}>
      { dataInstructions.map(data => (
        <div key={data.index}>
          <CircleInst>{data.index}</CircleInst><TextInst>{data.text()}</TextInst>
        </div>
      ))}
      {
        note && (
          <ContentNote>
            <CircleInst>Nota</CircleInst><TextInst>{note}</TextInst>
          </ContentNote>
        )
      }
    </Card>
  );
}

Instructions.propTypes = {
  dataInstructions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.func,
      index: PropTypes.number,
    }),
  ).isRequired,
  width: PropTypes.string.isRequired,
  note: PropTypes.string,
};

Instructions.defaultProps = {
  note: null,
};

export default Instructions;
