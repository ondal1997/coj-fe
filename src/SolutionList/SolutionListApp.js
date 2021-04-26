import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Pagination } from '@material-ui/lab';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { fetchAndJson } from '../OurLink';
import judgeState from './judgeState';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';

const StyledState = styled.span`
  font-weight: 600;
  color: white;
  background-color: ${({ color }) => color || '#F23434'};
  border-radius: 500px;
  padding: 4px;
  font-size: 12px;
`;

const validatePositiveInteger = (anything) => {
  const parsedNumber = Number.parseInt(anything, 10);
  if (Number.isNaN(parsedNumber) || parsedNumber < 1) {
    return 1;
  }
  return parsedNumber;
};

const SolutionListApp = (props) => {
  const query = queryString.parse(props.location.search);
  const problemKey = query.problemNo;
  const page = validatePositiveInteger(query.page);
  const limitCount = validatePositiveInteger(query.limitCount || 15);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [solutions, setSolutions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      let result = await fetchAndJson(`/api/problems/${problemKey}`);
      setTitle(result.problem.title); // 중간에 set State하면 어떻게 되는지 함 보자

      result = await fetchAndJson(`/api/problems/${problemKey}/solutions?pos=${(page - 1) * limitCount}&count=${limitCount}`);

      _handleFetchRes(result.status, setError, () => {
        setIsLoaded(true);
        setSolutions(result.solutions);
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
      {
        solutions.length ? (
          <Grid container direction='column' alignItems='center' spacing={1}>
            <Grid item container justify='space-around' spacing={10}>
              <Grid item>
                <Typography variant='h4'>{problemKey}. {title}</Typography>
              </Grid>
              <Grid item>
                <Button color='primary' variant='outlined'
                  onClick={() => { props.history.push(`/problem/${problemKey}`); }}
                >
                  문제로 이동
              </Button>
              </Grid>
            </Grid>

            <Grid item container direction='column' lg={9}>
              <Grid item>
                <TableContainer>
                  <Table size="small">
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
                          onClick={() => { props.history.push(`/solution/${solution.key}`); }}
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
                page={Number.parseInt(page, 10)}
                onChange={(event, p) => {
                  props.history.push(`/solutions?problemNo=${problemKey}&page=${p}`);
                }}
              />
            </Grid>

            <Grid item></Grid>
          </Grid>
        ) : (
          <Grid container direction='column' alignItems='center' spacing={4}>
            <Grid item container justify='space-around' spacing={10}>
              <Grid item>
                <Typography variant='h4'>{problemKey}. {title}</Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Grid item>
              <Typography>
                대응하는 솔루션 데이터가 없습니다.
              </Typography>
            </Grid>

            <Grid item>
              <Button color='primary' variant='outlined'
                onClick={() => { props.history.push(`/problem/${problemKey}`); }}
              >
                문제로 이동
              </Button>
            </Grid>

            <Grid item>
            </Grid>
          </Grid>
        )
      }
    </>
  );
};

export default SolutionListApp;