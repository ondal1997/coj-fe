import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@material-ui/core';
import SolutionItem from './SolutionItem';

const SolutionList = ({ solutions }) => (
    <TableContainer component={Paper} elevation={0} style={{ overflow: 'hidden' }}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">제출 번호</TableCell>
          <TableCell align="center">아이디</TableCell>
          <TableCell align="center">문제 번호</TableCell>
          <TableCell align="center">언어</TableCell>
          <TableCell align="center">결과</TableCell>
          <TableCell align="center">제출 시간</TableCell>
        </TableRow>
      </TableHead>
    <TableBody>
      {solutions.map((solution) => <SolutionItem info={solution}/>)}
      </TableBody>
    </Table>
    </TableContainer>
);

export default SolutionList;