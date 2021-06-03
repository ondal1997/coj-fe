import { Link, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { CheckCircle as CheckIcon, Error as WrongIcon } from '@material-ui/icons';
import { Table, TableData, TableHeader, TableRow } from '../atoms/Table';
import BasicChip from '../atoms/BasicChip';
import { getLevelColor, Level } from './LevelSelector';

// '#0057FF' : '#E94D00'

const Check = ({ challengeCode }) => {
  switch (challengeCode) {
    case 1:
      return <CheckIcon style={{ fontSize: '0.75rem', color: '#0057FF' }} />;
    case -1:
      return <WrongIcon style={{ fontSize: '0.75rem', color: '#E94D00' }} />;
    case 0:
    default:
      return null;
  }
};

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
          <TableData
            hover
            align="left"
            onClick={() => {
              history.push(`/problems/${problem.key}`);
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 430, color: getLevelColor(problem.level) }}>
              {problem.title} <Check challengeCode={problem.challengeCode} />
            </div>
          </TableData>
          <TableData>
            {problem.categories.length === 0 ? (
              '-'
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
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
            {(() => {
              if (problem.submitCount === 0) return '-';

              return `${(
                problem.solvedCount / problem.submitCount / 0.01
              ).toFixed(2)}%`;
            })()}
          </TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default ProblemTable;
