import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CodeViewer from './CodeViewer';
import SolutionInform from './SolutionInform';
import 'codemirror/keymap/sublime';
import { fetchAndJson } from '../OurLink';
import judgeState from '../SolutionList/judgeState';
import Error from '../Error/Error';
import _handleFetchRes from '../Error/utils';
import './codeViewer.css';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 0',
      padding: '0 1%',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 0',
      padding: '0 15%',
    },
  },
  children: {
    [theme.breakpoints.down('xs')]: {
      margin: '1% 0',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '1% 0',
    },
  },
}));

const SolutionDetailApp = (props) => {
  const classes = useStyles();

  const { solutionKey } = props.match.params;
  const [solution, setSolution] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchSolutions = async () => {
    const result = await fetchAndJson(`/api/solutions/${solutionKey}`);

    _handleFetchRes(result.status, setError, () => {
      setSolution(result.solution);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  if (error) return <Error error={error}/>;

  return isLoaded
    ? (<Grid className={classes.root} container direction='column' xs={12}>
        <Grid className={classes.children} container item xs={12} justify='flex-end'>
          <Grid item>
            <Button color='primary' variant='outlined' size='large'
              onClick={() => { props.history.push(`/problem/${solution.problemKey}`); }}>
            문제로 이동
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.children} item xs={12}>
          <Typography variant='h3'>
            제출 정보
          </Typography>
          <SolutionInform solution={solution}/>
        </Grid>
        <Grid className={classes.children} item xs={12}>
          <Typography variant='h3'>
            제출 코드
          </Typography>
          <Grid className='CodeViewer' item
            style={{ border: '1px solid #E0E0E0' }}>
            <CodeViewer
            code={solution.sourceCode || '이 정보를 조회할 수 있는 조건이 만족되지 않았습니다.'} />
          </Grid>
        </Grid>
        {(() => {
          if (solution.state === '6' || solution.state === '7') {
            return (<Grid className={classes.children} item xs={12}>
                  <Typography variant='h6' style={{ color: '#858585' }}>
                    {judgeState[parseInt(solution.state, 10)].name}
                  </Typography>
                  <Paper elevation={0} xs={12}
                    style={{ backgroundColor: '#F8F8F8', padding: '10px', fontSize: 'large' }}>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {solution.judgeError || '이 정보를 조회할 수 있는 조건이 만족되지 않았습니다.'}
                    </pre>
                  </Paper>
                  </Grid>);
          }
          return null;
        })()
        }
      </Grid>) : (
        <div>Loading...</div>
    );
};

export default SolutionDetailApp;