import React from 'react';
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import judgeState from '../../judgeState';

const StyledLink = styled(Link)`
  color: ${(props) => (props.color ? props.color : '#000000')};
  text-decoration: none;
  &:hover {
    opacity: 0.5;
  };
`;

// 재활용하기
// 문제 infrom 보여주는 컴포넌트 테이블
const SolutionInform = (props) => {
  const { solution } = props;

  return (<TableContainer>
      <Table style={{ whiteSpace: 'nowrap' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">제출 번호</TableCell>
            <TableCell align="center">제출자</TableCell>
            <TableCell align="center">문제 번호</TableCell>
            <TableCell align="center">채점 결과</TableCell>
            <TableCell align="center">시간</TableCell>
            <TableCell align="center">메모리</TableCell>
            <TableCell align="center">제출 시간</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">{`${solution.key}`}</TableCell>
            <TableCell align="center">
              <StyledLink color='#5DADE2' to={`/users/${solution.ownerId}`}>
                {`${solution.ownerId}`}
              </StyledLink>
            </TableCell>
            <TableCell align="center">
              <StyledLink color='#444444' to={`/problems/${solution.problemKey}`}>
                {`${solution.problemKey}`}
              </StyledLink>
            </TableCell>
            <TableCell align="center">
              <span style={{
                color: judgeState[parseInt(solution.state, 10)].color,
                fontWeight: 600 }}>
                {judgeState[parseInt(solution.state, 10)].name}
              </span>
            </TableCell>
            <TableCell align="center">{solution.state === '2' ? `${solution.maxTime}ms` : '-'}</TableCell>
            <TableCell align="center">{solution.state === '2' ? `${solution.maxMemory}MB` : '-'}</TableCell>
            <TableCell align="center">
            {new Date(solution.uploadTime).toLocaleTimeString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</TableCell>
          </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
  );
};

export default SolutionInform;