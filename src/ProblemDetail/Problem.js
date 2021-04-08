import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Chip,
  Divider,
  TextField,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Grid,
  Typography,
} from '@material-ui/core';
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

const StyledChallengeResult = styled.span`
  color: white;
  font-weight: 700;
  background-color: ${(props) => (props.code === 1 ? '#0057FF' : '#E94D00')};
  font-size: larger;
  padding: 0.5% 1%;
`;

const StyledChipContainer = withStyles({
  root: {
    padding: '0',
    '& ul': {
      listStyle: 'none',
      padding: '0',
      margin: '0 0',
    },
    '& ul > li': {
      listStyle: 'none',
      display: 'inline',
    },
  },
})(Container);

const StyledChip = withStyles({
  root: {
    fontSize: 'medium',
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
  const { problemKey } = props;

  const [problem, setProblem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchProblem = async () => {
    console.log(problemKey);
    try {
      const fetchedProblem = await ourFetchAndJson(
        `${serverAddress}/api/problems/${problemKey}`,
      );

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

  return isLoaded ? (
    <StyledGrid container direction="column" spacing={3}>
      <Grid container item direction="column" spacing={1}>
        <Grid container item direction="row" justify="flex-end">
          <Grid container item xs={3} direction="row" justify="space-around">
            <OurLink to={`/solutionForm/${problemKey}/${problem.title}`}>
              <Typography style={{ color: '#4995F2', fontSize: 'large' }}>
                문제 풀기
              </Typography>
            </OurLink>
            <OurLink to={`/solutions/${problemKey}/${problem.title}/1`}>
              <Typography style={{ color: '#4995F2', fontSize: 'large' }}>
                제출 현황
              </Typography>
            </OurLink>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" direction="row">
          <Grid item>
            <Typography style={{ fontSize: '50px' }}>
              {`${problemKey}번 ${problem.title}`}
            </Typography>
          </Grid>
          {problem.challengeCode !== 0
          && (problem.challengeCode === 1
            ? (
              <Grid item sm={5}>
                <StyledChallengeResult code={1}>성공</StyledChallengeResult>
              </Grid>
            ) : (
              <Grid item sm={5}>
                <StyledChallengeResult code={-1}>실패</StyledChallengeResult>
              </Grid>
            ))}
        </Grid>
        <Grid item>
          <Typography>
          <strong>{problem.ownerId}&nbsp;</strong>
          <span>
            {new Date(problem.uploadTime).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          </Typography>
        </Grid>
        <Grid item>
          <StyledChipContainer>
              <ul>
                <Grid container direction='row' spacing={1}>
                {problem.categories.map((category) => (
                  <Grid item>
                    <li>
                      <StyledChip label={category} color="primary" />
                    </li>
                  </Grid>
                ))}
                </Grid>
              </ul>
          </StyledChipContainer>
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Divider />
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
                  {`${problem.timeLimit / 1000}초`}
                </TableCell>
                <TableCell align="center">{`${problem.memoryLimit}MB`}</TableCell>
                <TableCell align="center">
                  {problem.submitCount === 0
                    ? '데이터 없음'
                    : `${(
                      (problem.solvedCount / problem.submitCount)
                        * 100).toFixed(2)}%`}
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <Grid container item direction="column" spacing={1}>
        <Grid item>
          <StyledItemTitle>문제 설명&nbsp;</StyledItemTitle>
        </Grid>
        <Grid item>
          <Paper
            className="ck-content"
            elevation={0}
            style={{ backgroundColor: pColor, padding: '1%', fontSize: 'large' }}
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid container item direction="column" spacing={2}>
        {problem.examples.map((example, index) => (
          <Grid container item direction="row" justify="space-between">
            <Grid item container sm={5} spacing={1} direction="column">
              <Grid item>
                <StyledItemTitle>예제 입력 {index + 1}</StyledItemTitle>
              </Grid>
              <Grid item>
                <StyledTextField
                  variant="outlined"
                  row={5}
                  maxRow={Infinity}
                  multiline
                  value={example.input}
                  InputProps={{
                    readOnly: true,
                  }}
                />
               </Grid>
            </Grid>
            <Grid item container sm={5} spacing={1} direction='column'>
              <Grid item>
                <StyledItemTitle>예제 출력 {index + 1}</StyledItemTitle>
              </Grid>
              <Grid item>
                <StyledTextField
                  variant="outlined"
                  row={5}
                  maxRow={Infinity}
                  multiline
                  value={example.output}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </StyledGrid>
  ) : (
    <div>Loading...</div>
  );
};

export default Problem;
