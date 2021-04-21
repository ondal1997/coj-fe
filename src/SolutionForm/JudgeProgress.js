import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

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
    margin: '1% 0',
  },
}));

const JudgeProgress = ({ progress }) => {
  const classes = useStyles();

  return (<Grid className={classes.root}
          container direction='column' justify='center'>
        <Grid item>
          <Typography>채점 중입니다...{`${Math.ceil(progress)}%`}</Typography>
        </Grid>
        <Grid item>
          <LinearProgress variant="determinate" value={progress}/>
        </Grid>
    </Grid>);
};

export default JudgeProgress;
