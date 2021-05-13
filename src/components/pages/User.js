import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grade from '@material-ui/icons/Grade';
import styled from 'styled-components';
import { Divider, Paper, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PageTemplate from '../templates/PageTemplate';
import Solutions from '../organisms/SolutionTable';
import AuthenticationContext from '../../contexts/authentication';
import ErrorContext from '../../contexts/error';
import { OurLink, pureFetchAndJson } from '../../OurLink';
import { getGrade } from '../../utils';
import judgeState from '../../judgeState';

const StyledHuman = styled.img`
  width: 100px;
  position: absolute;
  z-index: 999;
  font-weight: 800;
  top: -20px;
  left: ${(props) => `calc(${props.percentage}% - 55px);`};
`;

const StyledSpan = styled.span`
  position: absolute;
  z-index: 999;
  font-weight: 800;
  left: ${(props) => `calc(${props.percentage}% - 50px);`};
`;

const cols = [
  '모든 제출',
  '맞았습니다',
  '틀렸습니다',
  '컴파일 에러',
  '런타임 에러',
  '시간 초과',
  '메모리 초과',
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  children: {
    [theme.breakpoints.down('md')]: {
      margin: '4% 0',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '2% 0',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '2% 0',
    },
  },
  title: {
    wordBreak: 'keep-all',
    fontWeight: 600,
    fontSize: '20px',
  },
  menu: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProblemLabel = ({ problemKey, isAc }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useContext(ErrorContext);
  const color = isAc ? '#0057FF' : '#E94D00';

  useEffect(async () => {
    try {
      const result = await pureFetchAndJson(`/api/problems/${problemKey}`);
      if (result.status === 200) {
        setTitle(result.problem.title);
      } else if (result.status === 404) {
        setTitle('삭제된 문제');
      } else {
        throw result.status;
      }
    } catch (err) {
      setError(err);
      return;
    }
  }, []);

  return (<Tooltip title={title}>
    <Link to={`/problems/${problemKey}`} style={{ color: color, textDecoration: 'none', whiteSpace: 'nowrap' }} >
      {problemKey}
    </Link>
  </Tooltip>);
};

function SelectedListItem() {
  const classes = useStyles();
  const [userId] = useContext(AuthenticationContext);

  return (
    <div className={classes.menu}>
      <List component="nav">
        {judgeState
          .filter((state, index) => index > 1 && index < 8)
          .map(({ name }, index) => (
          <Link
            to={`/solutions?userId=${userId}&state=${index + 2}`}
            style={{ color: 'black', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <ListItem button >
              <ListItemText primary={name} />
            </ListItem>
          </Link>
          ))}
      </List>
    </div>
  );
}

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 40,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
}))(LinearProgress);

function CustomizedProgressBars({ value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={value} />
    </div>
  );
}

const User = ({ match }) => {
  const classes = useStyles();

  const [grade, setGrade] = useState({});

  const userId = match.params.id;
  const [error, setError] = useContext(ErrorContext);

  const [ac, setAc] = useState(0);
  const { level, start, target } = grade;
  const [solvedResult, setSolvedResult] = useState({
    accepted: [],
    notAccepted: [],
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    try {
      const result = await pureFetchAndJson(
        `/api/problemNumbers?${new URLSearchParams({
          id: userId,
        }).toString()}`,
      );

      const { status, accepted, notAccepted } = result;

      if (status === 200) {
        const acRes = accepted.length;
        setAc(acRes);
        setGrade(getGrade(acRes));
        setSolvedResult({
          accepted,
          notAccepted,
        });
        setIsLoaded(true);
      } else {
        throw result.status;
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <PageTemplate
      content={
        !isLoaded ? (
          <div>loading...</div>
        )
          : (
        <Grid container direction="row" justify="space-between">
          <Grid
            className={classes.children}
            item
            container
            xs={12}
            direction="row"
            alignItems="center"
          >
            <Grid
              container
              style={{ position: 'relative', width: 50 }}
              justify="center"
              alignItems="center"
            >
              <Grade color="primary" style={{ fontSize: 50 }} />
              <Typography
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  fontWeight: 700,
                  color: 'white',
                }}
                variant="strong"
              >
                {level}
              </Typography>
            </Grid>
            <Typography variant="h4">{match.params.id}</Typography>
          </Grid>
          <Grid container justify="center" xs={12}>
            <StyledSpan>다음 레벨까지 {start + target - ac}문제</StyledSpan>
          </Grid>
          <Grid
            className={classes.children}
            item
            xs={12}
            style={{ position: 'relative' }}
          >
            <StyledHuman
              src="/5Q0v.gif"
              percentage={((ac - start) / target) * 100}
            />
            <CustomizedProgressBars value={((ac - start) / target) * 100} />
            <Grid container justify="space-between">
              <span>{start}</span>
              <span>{start + target}</span>
            </Grid>
          </Grid>
          <Grid className={classes.children} item xs={2}>
            <SelectedListItem />
          </Grid>
          <Grid className={classes.children} item container xs={8} sm={9} direction="column">
            <Grid item className={classes.children}>
              <Typography className={classes.title}>
                맞은 문제({solvedResult.accepted.length})
              </Typography>
              <Divider />
              <Paper
                className={classes.children}
                elevation={0}
                style={{
                  backgroundColor: '#F8F8F8',
                  padding: '10px',
                  wordWrap: 'break-word',
                }}
              >
                {solvedResult.accepted.map((key) => (
                <>
                  <ProblemLabel problemKey={key} isAc/>
                  &nbsp;
                </>
                ))}
              </Paper>
            </Grid>
            <Grid item className={classes.children}>
              <Typography className={classes.title}>
                시도했지만 틀린 문제({solvedResult.notAccepted.length})
              </Typography>
              <Divider />
              <Paper
                className={classes.children}
                elevation={0}
                style={{
                  backgroundColor: '#F8F8F8',
                  padding: '10px',
                  wordBreak: 'break-word', // Link요소 하나가 word
                }}
              >
                {solvedResult.notAccepted.map((key) => (
                <>
                  <ProblemLabel problemKey={key}/>
                  &nbsp;
                </>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
          )
      }
    />
  );
};

export default User;
