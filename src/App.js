import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
// import ProblemListApp from './ProblemList/ProblemListApp';
// import SolutionListAppWrapper from './SolutionList/SolutionListAppWrapper';
import ProblemForm from './pages/ProblemForm';
import SolutionForm from './pages/SolutionForm';
import ProblemDetailApp from './ProblemDetail/ProblemDetailApp';
import SolutionDetailApp from './SolutionDetail/SolutionDetailApp';
import Error from './Error/Error';
import ProblemList from './pages/ProblemList';
import SolutionList from './pages/SolutionList';

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
          <Route path="/problems/:problemKey" exact component={ProblemDetailApp} />

          <Route path="/submit/:problemKey" exact component={SolutionForm} />
          <Route path="/solutions" exact component={SolutionList} />
          <Route path="/solutions/:solutionKey" exact component={SolutionDetailApp} />
          <Route render={({ location }) => (
            <Error error={{ status: 404 }} path={location.pathname} />
          )} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
