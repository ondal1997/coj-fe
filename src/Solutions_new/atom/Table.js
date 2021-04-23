import styled from 'styled-components';

const Tr = styled.tr`
  &:nth-child(2n) {
    background-color: whitesmoke;
  }
`;

const Th = styled.th`
  margin: 0px;
  padding: 16px 8px;
  border: 1px solid lightgray;
  white-space: nowrap;
  text-align: center;
`;

const Td = styled.td`
  margin: 0px;
  padding: 0px 8px;
  height: 32px;
  border: 1px solid lightgray;
  white-space: nowrap;
  text-align: center;
`;

const Table = (props) => (
  <div style={{ overflow: 'auto', color: '#444444', width: '90%' }}>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>{props.children}</table>
  </div>
);

const TableRow = (props) => <Tr>{props.children}</Tr>;

const TableHeader = (props) => (
  <Th style={{ width: props.width }}>{props.children}</Th>
);

const TableData = (props) => (
  <Td style={{ textAlign: props.align }}>{props.children}</Td>
);

export { Table, TableRow, TableHeader, TableData };
