import { Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Table, TableData, TableHeader, TableRow } from '../atom/Table';

const ProblemTable = (props) => {
  const { problems } = props;
  const { urlSearchParams } = props;

  return (
    <Table>
      <TableRow>
        <TableHeader width="4%">번호</TableHeader>
        <TableHeader width="40%">제목</TableHeader>
        <TableHeader width="40%">분류</TableHeader>
        <TableHeader width="4%">AC</TableHeader>
        <TableHeader width="4%">제출</TableHeader>
        <TableHeader width="8%">정답률</TableHeader>
      </TableRow>
      {problems.map((problem) => (
        <TableRow key={problem.key}>
          <TableData>{problem.key}</TableData>
          <TableData align="left">
            {
              problem.challengeCode === 0 && (
              <Link style={{ color: '#444444' }} to={`/problem/${problem.key}`}>{problem.title}</Link>)
            }
            {
              problem.challengeCode === 1 && (
              <Link style={{ color: '#0057FF' }} to={`/problem/${problem.key}`}>{problem.title}</Link>)
            }
            {
              problem.challengeCode === -1 && (
              <Link style={{ color: '#E94D00' }} to={`/problem/${problem.key}`}>{problem.title}</Link>)
            }
          </TableData>
          <TableData>
            {problem.categories.length === 0 ? (
              '-'
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                {problem.categories.map((category) => (
                  <Chip
                    size="small"
                    color="primary"
                    label={`${category}`}
                    onClick={() => {
                      urlSearchParams.set('query', category);
                      urlSearchParams.set('page', 1);
                      props.history.push(`?${urlSearchParams.toString()}`);
                    }}
                  />
                ))}
              </div>
            )}
          </TableData>
          <TableData>{problem.solvedCount}</TableData>
          <TableData>{problem.submitCount}</TableData>
          <TableData>
            {problem.submitCount === 0 ? '-' : `${((problem.solvedCount / problem.submitCount) * 100).toFixed(2)}%`}
          </TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default ProblemTable;
