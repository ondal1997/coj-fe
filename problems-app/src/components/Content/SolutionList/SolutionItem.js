import React from 'react';
import styled from 'styled-components';
import JudgeState from '../../../JudgeState';

const StyledState = styled.span`
  font-weight: 700;
  color: ${({ state }) => state || '#F23434'}
`;

const SolutionItem = ({ info }) => (
<tr style={{ textAlign: 'center', border: '1px solid gray' }}>
    <td>{info.key}</td>
    <td>{info.ownerId}</td>
    <td>{info.problemKey}</td>
    <td>{info.language}</td>
    <td> {/* if 문으로 변경해서 작성 */}
    {info.state !== 1
      ? <StyledState state={JudgeState[info.state].color}>
        {JudgeState[info.state].name}</StyledState>
      : <StyledState state={JudgeState[info.state].color}>
        {`${JudgeState[info.state].name}
        (${Math.floor((info.testcaseHitCount / info.testcaseSize) * 100)}%)`}</StyledState>
      }
    </td>
    <td>{info.uploadTime}</td>
  </tr>
);

export default SolutionItem;