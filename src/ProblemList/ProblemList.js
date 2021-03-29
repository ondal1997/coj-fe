import React from 'react';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@material-ui/core';
import ProblemItem from './ProblemItem';

const ProblemList = ({ problems }) => (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">문제 번호</TableCell>
            <TableCell align="center">문제명</TableCell>
            <TableCell align="center">문제 푼 사람</TableCell>
          </TableRow>
        </TableHead>
       <TableBody>
        {problems.map((problem) => <ProblemItem info={problem}/>)}
        </TableBody>
      </Table>
    </TableContainer>
);

export default ProblemList;