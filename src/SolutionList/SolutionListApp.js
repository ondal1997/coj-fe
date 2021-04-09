import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Pagination } from '@material-ui/lab';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ourFetchAndJson, ourHref } from '../OurLink';
import { serverAddress } from '../config';
import judgeState from './judgeState';

const StyledState = styled.span`
  font-weight: 600;
  color: white;
  background-color: ${({ color }) => color || '#F23434'};
  border-radius: 500px;
  padding: 8px;
  font-size: medium;
`;

const validatePositiveInteger = (anything) => {
  const parsedNumber = Number.parseInt(anything, 10);
  if (Number.isNaN(parsedNumber) || parsedNumber < 1) {
    return 1;
  }
  return parsedNumber;
};

const SolutionListApp = (props) => {
  const { problemNo, problemTitle, page } = props;
  const problemKey = problemNo;

  console.log(props.location);
  const query = queryString.parse(props.location.search);
  // const page = validatePositiveInteger(query.page);
  const limitCount = validatePositiveInteger(query.limitCount || 20);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      let result;
      try {
        result = await ourFetchAndJson(`${serverAddress}/api/problems/${problemKey}/solutions?pos=${(page - 1) * limitCount}&count=${limitCount}`);
      } catch (err) {
        setIsLoaded(true);
        setError(err);
        return;
      }
      console.log(result.solutions);
      setIsLoaded(true);
      setSolutions(result.solutions);
      setTotalCount(result.totalCount);

      window.scrollTo(0, 0);
    })();
  }, [props]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container direction='column' alignItems='center' spacing={1}>
        <Grid item container justify='space-around' spacing={10}>
            <Grid item>
              <Typography variant='h4'>{problemNo}. {problemTitle}</Typography>
            </Grid>
            <Grid item>
              <Button color='primary' variant='outlined'
                onClick={() => { ourHref(`/problem/${problemKey}`, props.history); }}
              >
                문제로 이동
              </Button>
            </Grid>
        </Grid>

        <Grid item container direction='column' md={9}>
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'><strong>제출 번호</strong></TableCell>
                    <TableCell align='center'><strong>제출자</strong></TableCell>
                    <TableCell align='center'><strong>문제 번호</strong></TableCell>
                    <TableCell align='center'><strong>언어</strong></TableCell>
                    <TableCell align='center'><strong>결과</strong></TableCell>
                    <TableCell align='right'><strong>시간</strong></TableCell>
                    <TableCell align='right'><strong>메모리</strong></TableCell>
                    <TableCell align='center'><strong>제출 일시</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {solutions.map((solution) => (
                    <TableRow hover key={solution.key}
                      onClick={() => { ourHref(`/solution/${solution.key}`, props.history); }}
                    >
                      <TableCell align='center' component='th' scope='row'><strong>{solution.key}</strong></TableCell>
                      <TableCell align='center'><strong>{solution.ownerId}</strong></TableCell>
                      <TableCell align='center'><strong>{solution.problemKey}</strong></TableCell>
                      <TableCell align='center'>{solution.language}</TableCell>
                      <TableCell align='center'>
                        <StyledState color={judgeState[solution.state].color}>
                          {judgeState[solution.state].name}</StyledState>
                      </TableCell>
                      <TableCell align='right'>
                        {solution.state === '2' ? `${solution.maxTime}ms` : '-'}
                      </TableCell>
                      <TableCell align='right'>
                        {solution.state === '2' ? `${solution.maxMemory}MB` : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {new Date(solution.uploadTime).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid item>
          <Pagination
            shape='rounded'
            variant='outlined'
            color='primary'
            size='large'
            siblingCount={2}
            boundaryCount={2}
            count={Math.ceil(totalCount / limitCount)}
            page={page}
            onChange={(event, p) => {
              ourHref(`/solutions/${problemKey}/${problemTitle}/${p}?${queryString.stringify({ ...query, page: p })}`, props.history);
            }}
          />
        </Grid>

        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default SolutionListApp;