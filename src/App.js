import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import ProblemForm from './components/pages/ProblemForm';
import SolutionForm from './components/pages/SolutionForm';
import Problem from './components/pages/Problem';
import Solution from './components/pages/Solution';
import Error from './components/atoms/Error';
import ProblemList from './components/pages/ProblemList';
import SolutionList from './components/pages/SolutionList';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4995F2',
    },
    secondary: {
      main: '#F8F8F8',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider content={(key, message) => (<Button id={key} variant='contained' color='primary' size='large'>{message}</Button>)}>
      <Router basename="/oj">
        <Switch>
          <Route path={['/', '/problems']} exact component={ProblemList} />
          <Route path="/new" exact component={ProblemForm} />
          <Route path="/edit/:problemKey" exact component={ProblemForm} />
          <Route path="/problems/:problemKey" exact component={Problem} />

          <Route path="/submit/:problemKey" exact component={SolutionForm} />
          <Route path="/solutions" exact component={SolutionList} />
          <Route path="/solutions/:solutionKey" exact component={Solution} />
          <Route render={({ location }) => (
            <Error error={{ status: 404 }} path={location.pathname} />
          )} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
