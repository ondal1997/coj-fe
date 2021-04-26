import { Link } from 'react-router-dom';
import { Table, TableData, TableHeader, TableRow } from '../atom/Table';
import judgeState from './judgeState';

const SolutionTable = (props) => {
  const { solutions } = props;
  const { urlSearchParams } = props;
  const highlight = urlSearchParams.get('highlight');

  return (
    <Table>
      <TableRow>
        <TableHeader width="7%">번호</TableHeader>
        <TableHeader width="13%">제출자</TableHeader>
        <TableHeader width="7%">문제</TableHeader>
        <TableHeader width="13%">상태</TableHeader>
        <TableHeader width="10%">언어</TableHeader>
        <TableHeader width="10%">시간</TableHeader>
        <TableHeader width="10%">메모리</TableHeader>
        <TableHeader width="10%">코드</TableHeader>
        <TableHeader width="20%">제출 시간</TableHeader>
      </TableRow>
      {solutions.map((solution) => (
        <TableRow key={solution.key} style={ highlight === solution.ownerId ? { backgroundColor: '#DDEEFF' } : {}}>
          <TableData>{solution.key}</TableData>
          <TableData>{solution.ownerId}</TableData>
          <TableData>
            <Link style={{ color: '#444444' }} to={`/problem/${solution.problemKey}`}>{solution.problemKey}</Link>
          </TableData>
          <TableData>
            <strong style={{ color: judgeState[solution.state].color }}>
              {judgeState[solution.state].name}
            </strong>
          </TableData>
          <TableData>{solution.language}</TableData>
          <TableData>
            {
              +solution.state === 2 ? (
                `${solution.maxTime}ms`
              ) : (
                '-'
              )
            }
          </TableData>
          <TableData>
            {
              +solution.state === 2 ? (
                `${solution.maxMemory}MB`
              ) : (
                '-'
              )
            }
          </TableData>
          <TableData>
            {
              solution.accessable ? (
                <Link style={{ color: '#0057FF' }} to={`/solution/${solution.key}`}>
                  {solution.byteLength}B
                </Link>
              ) : (
                `${solution.byteLength}B`
              )
            }
          </TableData>
          <TableData>
            {new Date(solution.uploadTime).toLocaleTimeString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default SolutionTable;
