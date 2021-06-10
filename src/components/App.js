import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { Button, ButtonGroup, IconButton, Tooltip } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import {
  AccountBoxRounded,
  AccountCircleOutlined,
  ListAltOutlined,
  PermIdentity,
} from '@material-ui/icons';
import ProblemForm from './pages/ProblemForm';
import SolutionForm from './pages/SolutionForm';
import Problem from './pages/Problem';
import Solution from './pages/Solution';
import ProblemList from './pages/ProblemList';
import SolutionList from './pages/SolutionList';
import User from './pages/User';
import { ErrorProvider } from '../contexts/error';
import AuthenticationContext, {
  AuthenticationProvider,
} from '../contexts/authentication';
import Error from './pages/Error';
import PageTemplate from './templates/PageTemplate';
import Rejudge from './pages/Rejudge';

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

const Header = () => {
  const [userId] = useContext(AuthenticationContext);
  const history = useHistory();

  return (
    <PageTemplate>
      <div style={{ textAlign: 'right' }}>
        <ButtonGroup variant="text">
          <Tooltip title="마이페이지">
            <IconButton
              onClick={() => {
                if (userId) {
                  history.push(`/users/${userId}`);
                } else {
                  window.location.href = 'https://codersit.co.kr/bbs/login.php?url=%2Foj';
                }
              }}
            >
              <AccountBoxRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title="문제 리스트">
            <IconButton
              onClick={() => {
                history.push('/');
              }}
            >
              <ListAltOutlined />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </div>
    </PageTemplate>
  );
};

const App = () => (
  <Router basename="/oj">
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        content={(key, message) => (
          <Button id={key} variant="contained" color="primary" size="large">
            {message}
          </Button>
        )}
      >
        <ErrorProvider>
          <AuthenticationProvider>
            <Header />
            <Switch>
              <Route path={['/', '/problems']} exact component={ProblemList} />
              <Route path="/new" exact component={ProblemForm} />
              <Route path="/edit/:problemKey" exact component={ProblemForm} />
              <Route path="/problems/:problemKey" exact component={Problem} />
              <Route path="/rejudge" exact component={Rejudge} />

              <Route
                path="/submit/:problemKey"
                exact
                component={SolutionForm}
              />
              <Route path="/solutions" exact component={SolutionList} />
              <Route
                path="/solutions/:solutionKey"
                exact
                component={Solution}
              />
              <Route path="/users/:id" exact component={User} />
              <Route render={() => <Error error={{ status: 404 }} />} />
            </Switch>
          </AuthenticationProvider>
        </ErrorProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Router>
);

export default App;
