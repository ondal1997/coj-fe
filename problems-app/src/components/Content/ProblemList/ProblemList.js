import React from 'react';
import ProblemItem from './ProblemItem';

const ProblemList = ({ problems }) => (
  <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th>문제 번호</th>
      <th>문제명</th>
    </tr>
  </thead>
  <tbody>
  {problems.map((problem) => <ProblemItem info={problem}/>)}
  </tbody>
  </table>
);

export default ProblemList;