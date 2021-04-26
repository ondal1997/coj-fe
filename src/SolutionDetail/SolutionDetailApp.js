import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
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
    [theme.breakpoints.down('sm')]: {
      margin: '0 0',
      padding: '0 1%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0',
      padding: '0 15%',
    },
  },
  children: {
    [theme.breakpoints.down('sm')]: {
      margin: '1% 0',
    },
    [theme.breakpoints.up('md')]: {
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
    ? (<Grid className={classes.root} container direction='column'>
        <Grid className={classes.children} item xs={12}>
          <Typography variant='h3'>
            제출 정보
          </Typography>
          <SolutionInform solution={solution}/>
        </Grid>
        {
          solution.sourceCode && (
            <Grid className={classes.children} item xs={12}>
          <Typography variant='h3'>
            제출 코드
          </Typography>
          <Grid className='CodeViewer' item
            style={{ border: '1px solid #E0E0E0' }}>
            <CodeViewer
            code={solution.sourceCode} />
          </Grid>
        </Grid>
          )
        }
        {(() => {
          if (solution.state === '6' || solution.state === '7') {
            if (solution.judgeError) {
              return (<Grid className={classes.children} item xs={12}>
                  <Typography variant='h6' style={{ color: '#858585' }}>
                    {judgeState[parseInt(solution.state, 10)].name}
                  </Typography>
                  <Paper elevation={0} xs={12}
                    style={{ backgroundColor: '#F8F8F8', padding: '10px', fontSize: 'large' }}>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {solution.judgeError}
                    </pre>
                  </Paper>
                  </Grid>);
            }
          }
          return null;
        })()
        }
      </Grid>) : (
        <div>Loading...</div>
    );
};

export default SolutionDetailApp;