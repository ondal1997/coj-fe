import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0057FF',
    },
    secondary: {
      main: '#E94D00',
    },
  },
});

const JudgeProgress = ({ progress, judgeState }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column" justify="center">
      <ThemeProvider theme={theme}>
        <Grid item>
          <Typography color={judgeState > 2 ? 'secondary' : 'primary'} variant="h4" align="center">{`${Math.ceil(
            progress,
          )}%`}</Typography>
        </Grid>
        <Grid item>
          <LinearProgress
            color={judgeState > 2 ? 'secondary' : 'primary'}
            variant="determinate"
            value={progress}
          />
          <LinearProgress
            color={judgeState > 2 ? 'secondary' : 'primary'}
            variant="determinate"
            value={progress}
          />
          <LinearProgress
            color={judgeState > 2 ? 'secondary' : 'primary'}
            variant="determinate"
            value={progress}
          />
          <LinearProgress
            color={judgeState > 2 ? 'secondary' : 'primary'}
            variant="determinate"
            value={progress}
          />
          <LinearProgress
            color={judgeState > 2 ? 'secondary' : 'primary'}
            variant="determinate"
            value={progress}
          />
          <LinearProgress
            color={judgeState > 2 ? 'secondary' : 'primary'}
            variant="determinate"
            value={progress}
          />
        </Grid>
      </ThemeProvider>
    </Grid>
  );
};

export default JudgeProgress;
