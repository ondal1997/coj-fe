import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CodeViewer from './CodeViewer';
import SolutionInform from './SolutionInform';
import 'codemirror/keymap/sublime';
import { fetchAndJson } from '../OurLink';
import judgeState from '../SolutionList/judgeState';

const StyledContainer = withStyles({
  root: {
    border: '1px solid #E0E0E0',
    margin: '0 0',
    padding: '0 0',
  },
})(Container);

const SolutionDetailApp = (props) => {
  const { solutionKey } = props.match.params;
  const [solution, setSolution] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchSolutions = async () => {
    const solutionInfo = await fetchAndJson(`/api/solutions/${solutionKey}`);
    setSolution(solutionInfo);
    setIsLoaded(true);
    console.log(solutionInfo);

    // const result = await fetchAndJson(`/api/solutions/${solutionKey}`);

    // switch (result.status) {
    //   case 200:
    //     break;
    //   case 401:
    //   case 403: // 로그아웃 된 상태
    //   case 404:
    //   case 500:
    //     setError({ status: result.status });
    //     return;
    //   default: // 알 수 없는 에러
    //     setError({ status: -1 });
    //     return;
    // }

    // setIsLoaded(true);
    // setSolution(solution);
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return isLoaded
    ? (<Grid container direction='column' spacing={3} style={{ padding: '0 15%' }}>
        <Grid container item direction='row' justify='flex-end'>
          <Grid item>
            <Button color='primary' variant='outlined' size='large'
              onClick={() => { props.history.push(`/problem/${solution.problemKey}`); }}>
            문제로 이동
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h3'>
            제출 정보
          </Typography>
          <SolutionInform solution={solution}/>
        </Grid>
        <Grid item>
        <Typography variant='h3'>
            제출 코드
          </Typography>
          <StyledContainer>
            <CodeViewer code={solution.sourceCode} />
          </StyledContainer>
        </Grid>
        {(() => {
          if (solution.state === '6' || solution.state === '7') {
            return (<Grid item>
                  <Typography variant='h6' style={{ color: '#858585' }}>
                    {judgeState[parseInt(solution.state, 10)].name}
                  </Typography>
                  <Paper elevation={0}
                    style={{ backgroundColor: '#F8F8F8', padding: '10px', fontSize: 'large' }}>
                    <pre>
                      {solution.judgeError}
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