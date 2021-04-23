import { Table, TableData, TableHeader, TableRow } from '../atom/Table';

const SolutionTable = (props) => {
  const { solutions } = props;
  // const { urlSearchParams } = props;

  return (
    <Table>
      <TableRow>
        <TableHeader width="10%">식별자</TableHeader>
        <TableHeader width="10%">제출자</TableHeader>
        <TableHeader width="10%">문제</TableHeader>
        <TableHeader width="20%">상태</TableHeader>
        <TableHeader width="10%">언어</TableHeader>
        <TableHeader width="10%">시간</TableHeader>
        <TableHeader width="10%">메모리</TableHeader>
        <TableHeader width="20%">제출 시간</TableHeader>
      </TableRow>
      {solutions.map((solution) => (
        <TableRow key={solution.key}>
          <TableData>{solution.key}</TableData>
          <TableData>{solution.ownerId}</TableData>
          <TableData>{solution.problemKey}</TableData>
          <TableData>{solution.state}</TableData>
          <TableData>{solution.language}</TableData>
          <TableData>{`${solution.maxTime}ms`}</TableData>
          <TableData>{`${solution.maxMemory}MB`}</TableData>
          <TableData>{new Date(solution.uploadTime).toLocaleTimeString('ko-KR', {
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
