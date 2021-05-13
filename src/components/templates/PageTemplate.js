import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      margin: '0 0',
      padding: '0 0',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1080px',
      margin: '0 auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: '1280px',
      margin: '0 auto',
    },
  },
}));

const PageTemplate = ({ content, children }) => {
  const classes = useStyles();

  return (<Grid className={classes.root}>{content}{children}</Grid>);
};

export default PageTemplate;