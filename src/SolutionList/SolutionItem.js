import React from 'react';
import { TableRow, TableCell, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import JudgeState from './JudgeState';

const StyledTableCell = withStyles({
  root: {
    width: '10px',
    height: '40px',
    fontSize: '20px',
  },
})(TableCell);

const StyledState = styled.span`
  font-weight: 700;
  color: ${({ state }) => state || '#F23434'}
`;

const SolutionItem = ({ info }) => (
<TableRow style={{ textAlign: 'center', border: '1px solid gray' }}>
    <StyledTableCell align="center">{info.key}</StyledTableCell>
    <StyledTableCell align="center">{info.ownerId}</StyledTableCell>
    <StyledTableCell align="center">{info.problemKey}</StyledTableCell>
    <StyledTableCell align="center">{info.language}</StyledTableCell>
    <StyledTableCell align="center"> {/* if 문으로 변경해서 작성 */}
    {info.state !== 1
      ? <StyledState state={JudgeState[info.state].color}>
        {JudgeState[info.state].name}</StyledState>
      : <StyledState state={JudgeState[info.state].color}>
        {`${JudgeState[info.state].name}
        (${Math.floor((info.testcaseHitCount / info.testcaseSize) * 100)}%)`}</StyledState>
      }
    </StyledTableCell>
    <StyledTableCell align="center">{info.uploadTime}</StyledTableCell>
  </TableRow>
);

export default SolutionItem;