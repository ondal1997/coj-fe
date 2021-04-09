import React from 'react';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

const JudgeProgress = ({ progress }) => (
      <Grid container direction='column' sm={5} justify='center'>
        <Grid item>
          <Typography>채점 중입니다...{`${Math.ceil(progress)}%`}</Typography>
        </Grid>
        <Grid item>
          <LinearProgress variant="determinate" value={progress}/>
        </Grid>
    </Grid>);

export default JudgeProgress;
