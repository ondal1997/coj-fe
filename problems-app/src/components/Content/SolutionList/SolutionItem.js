import React from 'react';
import styled from 'styled-components';

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
    <td>
    {info.state === 0
      ? <StyledState state='#265DEA'>대기 중...</StyledState>
      : info.state !== 1
        ? <StyledState state='#265DEA'>채점 중...</StyledState>
        : <StyledState>Try again!</StyledState>
      }
      {/* {info.testcaseHitCount === info.testcaseSize
        ? <StyledState state='#265DEA'>Solve!</StyledState>
        : <StyledState>Try again!</StyledState>
      } */}
    </td>
    <td>{info.uploadTime}</td>
  </tr>
);

export default SolutionItem;