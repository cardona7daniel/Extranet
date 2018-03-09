export const operators = [
  {
    name: 'Suma',
    symbol: '+',
  },
  {
    name: 'Resta',
    symbol: '-',
  },
  {
    name: 'Multiplica',
    symbol: '*',
  },
  {
    name: 'Divide',
    symbol: '/',
  },
];

export const FilesTypesUpload = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const ColumnsErrorLog = [{
  title: 'Fila',
  width: 60,
  dataIndex: 'RowNumber',
  key: 'RowNumber',
}, {
  title: 'Tipo',
  width: 60,
  dataIndex: 'Type',
  key: 'Type',
}, {
  title: 'Id Grupo',
  width: 80,
  dataIndex: 'Id',
  key: 'Id',
}, {
  title: 'Nombre',
  dataIndex: 'Name',
  key: 'Name',
}, {
  title: 'Mensaje',
  dataIndex: 'Message',
  key: 'Message',
}];

export const ColumnsErrorLogGeneric = [{
  title: 'Columna Excel',
  dataIndex: 'Column',
  key: 'Column',
}, {
  title: 'Fila Excel',
  dataIndex: 'Row',
  key: 'Row',
}, {
  title: 'Descripción Error',
  dataIndex: 'Description',
  key: 'Description',
}, {
  title: 'Valor',
  dataIndex: 'Value',
  key: 'Value',
}];

export const GROUPS_TYPE_DEALER = 'GC';
export const GROUPS_TYPE_ROOM = 'GS';

export const PARAMETERS_TYPES = {
  numeric: 'NUMERICO',
  float: 'REAL',
};

export const DATE_FORMAT = 'YYYY-MM-DD';
