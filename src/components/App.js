import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import ProblemForm from './pages/ProblemForm';
import SolutionForm from './pages/SolutionForm';
import Problem from './pages/Problem';
import Solution from './pages/Solution';
import ProblemList from './pages/ProblemList';
import SolutionList from './pages/SolutionList';
import { ErrorProvider } from '../contexts/error';
import { AuthenticationProvider } from '../contexts/authentication';
import Error from './pages/Error';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4995F2',
    },
    secondary: {
      main: '#CE2727',
    },
  },
});

const App = () => (
  <Router basename="/oj">
    <ThemeProvider theme={theme}>
      <SnackbarProvider content={(key, message) => (<Button id={key} variant='contained' color='primary' size='large'>{message}</Button>)}>
        <ErrorProvider>
          <AuthenticationProvider>
            <Switch>
              <Route path={['/', '/problems']} exact component={ProblemList} />
              <Route path="/new" exact component={ProblemForm} />
              <Route path="/edit/:problemKey" exact component={ProblemForm} />
              <Route path="/problems/:problemKey" exact component={Problem} />

              <Route path="/submit/:problemKey" exact component={SolutionForm} />
              <Route path="/solutions" exact component={SolutionList} />
              <Route path="/solutions/:solutionKey" exact component={Solution} />
              <Route render={() => <Error error={{ status: 404 }} />} />
            </Switch>
          </AuthenticationProvider>
        </ErrorProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Router>
);

export default App;
