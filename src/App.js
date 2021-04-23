import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import ProblemListApp from './ProblemList/ProblemListApp';
import SolutionListAppWrapper from './SolutionList/SolutionListAppWrapper';
import ProblemCreateForm from './pages/ProblemCreateForm';
import SolutionFormApp from './templates/SolutionForm';
import ProblemDetailApp from './ProblemDetail/ProblemDetailApp';
import SolutionDetailApp from './SolutionDetail/SolutionDetailApp';
// import ProblemUpdateApp from './ProblemUpdate/ProblemFormApp';
import ProblemUpdateForm from './pages/ProblemUpdateForm';
import Error from './Error/Error';

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
          <Route path="/" exact component={ProblemListApp} />
          <Route path="/new" exact component={ProblemCreateForm} />
          <Route path="/update/:problemKey" exact component={ProblemUpdateForm} />
          <Route path="/problems" exact component={ProblemListApp} />
          <Route path="/problem/:problemKey" exact component={ProblemDetailApp} />

          <Route path="/solutionForm/:problemKey" exact component={SolutionFormApp} />
          <Route path="/solutions/:problemNo/:pageNum" exact component={SolutionListAppWrapper} />
          <Route path="/solution/:solutionKey" exact component={SolutionDetailApp} />

          <Route path="/allSolutions/:pageNum" exact component={SolutionListAppWrapper} />
          <Route render={({ location }) => (
            <Error error={{ status: 404 }} path={location.pathname} />
          )} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
