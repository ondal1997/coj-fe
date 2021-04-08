import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Pagination } from '@material-ui/lab';
import { Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { DoneOutline, PriorityHigh } from '@material-ui/icons';
import { ourFetchAndJson, ourHref } from '../OurLink';
import { serverAddress } from '../config';

const validatePositiveInteger = (anything) => {
  const parsedNumber = Number.parseInt(anything, 10);
  if (Number.isNaN(parsedNumber) || parsedNumber < 1) {
    return 1;
  }
  return parsedNumber;
};

const ProblemList = (props) => {
  const query = queryString.parse(props.location.search);
  const page = validatePositiveInteger(query.page);
  const limitCount = validatePositiveInteger(query.limitCount || 20);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [problems, setProblems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      let result;
      try {
        result = await ourFetchAndJson(`${serverAddress}/api/problems?pos=${(page - 1) * limitCount}&count=${limitCount}`);
      } catch (err) {
        setIsLoaded(true);
        setError(err);
        return;
      }
      console.log(result.problems);
      setIsLoaded(true);
      setProblems(result.problems);
      setTotalCount(result.totalCount);
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
        <Grid item>
          <Typography variant='h4' color='primary'>문제 리스트</Typography>
        </Grid>

        <Grid item container direction='column' md={9}>
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'><strong>번호</strong></TableCell>
                    <TableCell align='left'><strong>문제명</strong></TableCell>
                    <TableCell align='left'><strong>카테고리</strong></TableCell>
                    <TableCell align='right'><strong>AC</strong></TableCell>
                    <TableCell align='right'><strong>제출</strong></TableCell>
                    <TableCell align='right'><strong>정답률</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {problems.map((problem) => (
                    <TableRow hover key={problem.key} onClick={() => { ourHref(`/problem/${problem.key}`, props.history); }}>
                      <TableCell align='right' component='th' scope='row'>
                        <Grid container justify='flex-end' alignItems='center' spacing={1}>
                          <Grid item>
                            {
                              problem.challengeCode === 1 ? (
                                <DoneOutline color='primary' />
                              ) : (
                                null
                              )
                            }
                            {
                              problem.challengeCode === -1 ? (
                                <PriorityHigh color='secondary' />
                              ) : (
                                null
                              )
                            }
                          </Grid>
                          <Grid item>
                            <strong>{problem.key}</strong>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align='left'>
                        <strong>{problem.title}</strong>
                      </TableCell>
                      <TableCell align='left'>
                        {problem.categories.length
                          ? (
                            <Grid container spacing={1} justify='left'>
                              {problem.categories.map((category) => (
                                <Grid item key={category}>
                                  <Chip size='small' color='primary' label={`#${category}`} />
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            '-'
                          )
                        }
                      </TableCell>
                      <TableCell align='right'>{problem.solvedCount}</TableCell>
                      <TableCell align='right'>{problem.submitCount}</TableCell>
                      <TableCell align='right'>
                        {problem.submitCount
                          ? (
                            `${((problem.solvedCount / problem.submitCount) * 100).toFixed(2)}%`
                          ) : (
                            '-'
                          )
                        }
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
              ourHref(`/problems?${queryString.stringify({ ...query, page: p })}`, props.history);
            }}
          />
        </Grid>

        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default ProblemList;