import React, { useEffect, useState } from 'react';
import { Container, Paper, Chip, Divider, TextField, withStyles,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { OurLink, ourFetchAndJson } from '../OurLink';
import { insertNextline } from './utils';
import './reset.css';

const serverAddress = 'http://192.168.0.100:3000';

const pColor = '#F8F8F8';

const StyledGrid = withStyles({
  root: {
    padding: '5% 20%',
    backgroundColor: 'white',
  },
})(Grid);

const StyledItemTitle = styled.span`
  font-weight: 700;
  font-size: 23px;
`;

// const StyledChallengeResult = styled.span`
//   color: white;
//   font-weight: 700;
//   background-color: ${(props) => (props.code === 1 ? '#0057FF' : '#EA1721')};
//   font-size: larger;
//   padding: 0.5% 1%;
// `;

const StyledChipContainer = withStyles({
  root: {
    padding: '0',
    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
    '& ul > li': {
      listStyle: 'none',
      display: 'inline',
    },
    display: 'inline',
  },
})(Container);

const StyledChip = withStyles({
  root: {
    fontSize: 'medium',
    marginRight: '1%',
    backgroundColor: '#4995F2',
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
})(Chip);

const StyledTextField = withStyles({
  root: {
    width: '100%',
    marginTop: '1%',
    '& label.Mui-focused': {
      color: '#4995F2',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4995F2',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#4995F2',
      },
    },
  },
})(TextField);

const Problem = (props) => {
  const problemKey = props.problemKey || 1009; // 임시

  const [problem, setProblem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchProblem = async () => {
    console.log(problemKey);
    try {
      const fetchedProblem = await ourFetchAndJson(`${serverAddress}/api/problems/${problemKey}`);

      console.log(fetchedProblem);
      setProblem(fetchedProblem);
      setIsLoaded(true);
      insertNextline();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  return (isLoaded ? (
    <StyledGrid container direction='column' spacing={3}>
      <Grid item container direction='column'>
        <Grid item container direction='row' alignItems='center' justify='space-between'>
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item>
                    <Typography variant='h4'>
                      {`${problemKey}번 ${problem.title}`}
                    </Typography>
                  </Grid>

                  <Grid item>
                    {problem.challengeCode !== 0
                    && (problem.challengeCode === 1
                      ? <Typography code={1}>성공</Typography>
                      : <Typography code={-1}>실패</Typography>
                    )
                    }
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <strong>{problem.ownerId}&nbsp;</strong>
                <span>{(new Date(problem.uploadTime)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <StyledChipContainer>
                  <ul>
                    {problem.categories.map((category) => <li><StyledChip label={category} color="primary"/></li>)}
                  </ul>
                </StyledChipContainer>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <OurLink to={`/solutionForm/${problemKey}/${problem.title}`}>
                  <span style={{ color: '#4995F2', fontSize: 'larger' }}>
                  문제 풀기
                  </span>
                </OurLink>
              </Grid>
              <Grid item>
                <OurLink to={`/solutions/${problemKey}/${problem.title}/1`}>
                  <span style={{ color: '#4995F2', fontSize: 'larger' }}>
                  제출 현황
                  </span>
                </OurLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
      <Grid container item direction='column'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">시간 제한</TableCell>
                <TableCell align="center">메모리 제한</TableCell>
                <TableCell align="center">정답률</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableCell align="center">
                  {`${problem.timeLimit / 1000}초`}</TableCell>
                <TableCell align="center">
                  {`${problem.memoryLimit}MB`}</TableCell>
                <TableCell align="center">
                  {problem.submitCount === 0 ? '데이터 없음'
                    : `${((problem.solvedCount / problem.submitCount) * 100).toFixed(2)}%`}
                </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container item direction='column'>
        <StyledItemTitle>문제 설명&nbsp;</StyledItemTitle>
        <div style={{ fontSize: '20px' }}>
        <Paper className='ck-content' elevation={2} style={{ backgroundColor: pColor, padding: '1%', marginTop: '1%' }}
          dangerouslySetInnerHTML={{ __html: problem.description }} />
        </div>
      </Grid>
      <Grid container item direction='column'>
        <Divider />
      </Grid>
      <Grid container item direction='column' spacing={2}>
      {problem.examples.map((example, index) => <Grid container item direction='row'
      justify='space-between'>
        <Grid container item sm={5}>
          <div>
          <StyledItemTitle>예제 입력 {index + 1}</StyledItemTitle>
          </div>
          <StyledTextField variant='outlined' row={5}
                maxRow={Infinity} multiline
                value={example.input}
                InputProps={{
                  readOnly: true,
                }}
                />
        </Grid>
        <Grid container item sm={5}>
          <div>
          <StyledItemTitle>예제 출력 {index + 1}</StyledItemTitle>
          </div>
          <StyledTextField variant='outlined' row={5}
                maxRow={Infinity} multiline
                value={example.output}
                InputProps={{
                  readOnly: true,
                }}
                />
        </Grid>
      </Grid>)}
      </Grid>
  </StyledGrid>
  ) : (
    <div>Loading...</div>
  ));
};

export default Problem;