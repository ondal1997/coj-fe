import { Link, useHistory } from 'react-router-dom';
import { Table, TableData, TableHeader, TableRow } from '../atoms/Table';
import BasicChip from '../atoms/BasicChip';

const ProblemTable = (props) => {
  const { problems } = props;
  const { urlSearchParams } = props;
  const history = useHistory();

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
          <TableData hover align="left" onClick={() => { history.push(`/problems/${problem.key}`); }}>
            {
              problem.challengeCode === 0 && (
              <div style={{ color: '#444444' }}>{problem.title}</div>)
            }
            {
              problem.challengeCode === 1 && (
              <div style={{ color: '#0057FF' }}>{problem.title}</div>)
            }
            {
              problem.challengeCode === -1 && (
              <div style={{ color: '#E94D00' }}>{problem.title}</div>)
            }
          </TableData>
          <TableData>
            {problem.categories.length === 0 ? (
              '-'
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                {problem.categories.map((category) => (
                  <BasicChip
                    size="small"
                    color="primary"
                    label={`${category}`}
                    handleClick={() => {
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
