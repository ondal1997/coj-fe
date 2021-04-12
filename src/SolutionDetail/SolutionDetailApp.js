import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CodeViewer from './CodeViewer';
import SolutionInform from './SolutionInform';
import 'codemirror/keymap/sublime';
import { ourHref, ourFetchAndJson } from '../OurLink';

const StyledContainer = withStyles({
  root: {
    border: '1px solid #E0E0E0',
    margin: '0 0',
    padding: '0 0',
  },
})(Container);

const serverAddress = 'http://192.168.0.100:3000';

const SolutionDetailApp = (props) => {
  const { solutionKey } = props.match.params;
  const [solution, setSolution] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchSolutions = async () => {
    const solutionInfo = await ourFetchAndJson(`${serverAddress}/api/solutions/${solutionKey}`);
    setSolution(solutionInfo);
    setIsLoaded(true);
    // 이렇게 연속으로 setState할 때 rerendering 문제 다시 잘 생각해보기
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return isLoaded
    ? (<Grid container direction='column' spacing={2} style={{ padding: '10% 15%' }}>
        <Grid container item direction='row' justify='flex-end'>
          <Grid item>
            <Button color='primary' variant='outlined' size='large'
              onClick={() => { ourHref(`/problem/${solution.problemKey}`, props.history); }}>
            문제로 이동
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <SolutionInform solution={solution}/>
        </Grid>
        <Grid item>
          <Paper elevation={0}
            style={{ backgroundColor: '#F8F8F8', padding: '10px', fontSize: 'large' }}>
            <pre>
              {solution.judgeError}
            </pre>
          </Paper>
        </Grid>
        <Grid item>
          <StyledContainer>
            <CodeViewer code={solution.sourceCode} />
          </StyledContainer>
        </Grid>
      </Grid>) : (
        <div>Loading...</div>
    );
};

export default SolutionDetailApp;