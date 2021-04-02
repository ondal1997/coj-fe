import React from 'react';
import { TableRow, TableCell, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import judgeState from './judgeState';

const StyledTableCell = withStyles({
  root: {
    fontSize: 'larger',
    overflow: 'hidden',
  },
})(TableCell);

const StyledState = styled.span`
  font-weight: 600;
  color: white;
  background-color: ${({ color }) => color || '#F23434'};
  border-radius: 500px;
  padding: 2% 3%;
  font-size: medium;
`;

const SolutionItem = ({ info }) => (
<TableRow style={{ textAlign: 'center', border: '1px solid gray' }}>
    <StyledTableCell align="center">{info.key}</StyledTableCell>
    <StyledTableCell align="center">{info.ownerId}</StyledTableCell>
    <StyledTableCell align="center">{info.problemKey}</StyledTableCell>
    <StyledTableCell align="center">{info.language}</StyledTableCell>
    <StyledTableCell align="center"> {/* if 문으로 변경해서 작성 */}
    {info.state !== 1
      ? <StyledState color={judgeState[info.state].color}>
        {judgeState[info.state].name}</StyledState>
      : <StyledState state={judgeState[info.state].color}>
        {`${judgeState[info.state].name}
        (${Math.floor((info.testcaseHitCount / info.testcaseSize) * 100)}%)`}</StyledState>
      }
    </StyledTableCell>
    <StyledTableCell align="center">{info.uploadTime}</StyledTableCell>
  </TableRow>
);

export default SolutionItem;