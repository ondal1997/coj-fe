import React from 'react';
import SolutionItem from './SolutionItem';

const SolutionList = ({ solutions }) => (
<table style={{ width: '100%', fontSize: '18px', textAlign: 'center', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th>제출 번호</th>
        <th>아이디</th>
        <th>문제 번호</th>
        <th>언어</th>
        <th>결과</th>
        <th>제출시간</th>
      </tr>
    </thead>
    <tbody>
    {solutions.map((solution) => <SolutionItem info={solution}/>)}
    </tbody>
    </table>
);

export default SolutionList;