import React from 'react';
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer } from '@material-ui/core';
import styled from 'styled-components';
import judgeState from '../SolutionList/judgeState';

const StyledState = styled.span`
  font-weight: 600;
  color: white;
  background-color: ${({ color }) => color || '#F23434'};
  border-radius: 500px;
  padding: 2% 3%;
  font-size: medium;
`;

const SolutionInform = (props) => {
  const { solution } = props;

  return (<TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">제출 번호</TableCell>
            <TableCell align="center">제출자</TableCell>
            <TableCell align="center">문제 번호</TableCell>
            <TableCell align="center">시간</TableCell>
            <TableCell align="center">메모리</TableCell>
            <TableCell align="center">채점 결과</TableCell>
            <TableCell align="center">업로드 시간</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align="center">{`${solution.key}`}</TableCell>
          <TableCell align="center">{`${solution.ownerId}`}</TableCell>
          <TableCell align="center">{`${solution.problemKey}`}</TableCell>
          <TableCell align="center">{solution.state === '2' ? `${solution.maxTime}ms` : '-'}</TableCell>
          <TableCell align="center">{solution.state === '2' ? `${solution.maxMemory}MB` : '-'}</TableCell>
          <TableCell align="center">
            <StyledState color={judgeState[parseInt(solution.state, 10)].color}>
              {judgeState[parseInt(solution.state, 10)].name}
            </StyledState>
          </TableCell>
          <TableCell align="center">
          {new Date(solution.uploadTime).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</TableCell>
        </TableBody>
        </Table>
      </TableContainer>
  );
};

export default SolutionInform;