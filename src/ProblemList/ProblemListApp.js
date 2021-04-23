import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Pagination } from '@material-ui/lab';
import { Radio, InputAdornment, TextField, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Search, DoneOutline, PriorityHigh } from '@material-ui/icons';
import { fetchAndJson } from '../OurLink';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';

const validatePositiveInteger = (anything) => {
  const parsedNumber = Number.parseInt(anything, 10);
  if (Number.isNaN(parsedNumber) || parsedNumber < 1) {
    return 1;
  }
  return parsedNumber;
};

const ProblemListApp = (props) => {
  const query = queryString.parse(props.location.search);
  const page = validatePositiveInteger(query.page);
  const limitCount = validatePositiveInteger(query.limitCount || 15);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [problems, setProblems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedSearchType, setSelectedSearchType] = useState('title');

  useEffect(() => {
    (async () => {
      const result = await fetchAndJson(`/api/problems?${queryString.stringify({ ...query, pos: (page - 1) * limitCount, count: limitCount })}`);

      _handleFetchRes(result.status, setError, () => {
        setIsLoaded(true);
        setProblems(result.problems);
        setTotalCount(result.totalCount);
        window.scrollTo(0, 0);
      });
    })();
  }, [props]);

  if (error) {
    return <Error error={error} />;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container direction='column' alignItems='center' spacing={2}>\
        <Grid item container justify='space-between' alignItems='center' lg={9} spacing={10}>
          <Grid item>
            <Typography variant='h4'>문제 리스트</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Grid container container alignItems='center'>
                  <Grid item>
                    <Radio
                      size='small'
                      checked={selectedSearchType === 'title'}
                      color='primary'
                      onChange={(event) => { setSelectedSearchType(event.target.value); }}
                      value={'title'}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      onClick={() => { setSelectedSearchType('title'); }}
                    >
                      문제명
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container container alignItems='center'>
                  <Grid item>
                    <Radio
                      size='small'
                      checked={selectedSearchType === 'category'}
                      color='primary'
                      onChange={(event) => { setSelectedSearchType(event.target.value); }}
                      value={'category'}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      onClick={() => { setSelectedSearchType('category'); }}
                    >
                      카테고리
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                placeholder='검색어를 입력하세요'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(e) => { if (e.charCode === 13) props.history.push(`/problems?${selectedSearchType}=${e.target.value.replace(/\+/g, '%2B')}`); }}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction='column' lg={9}>
          <Grid item>
            <TableContainer>
              <Table size="small">
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
                    <TableRow hover key={problem.key} onClick={() => { props.history.push(`/problem/${problem.key}`); }}>
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
              props.history.push(`/problems?${queryString.stringify({ ...query, page: p })}`);
            }}
          />
        </Grid>

        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default ProblemListApp;