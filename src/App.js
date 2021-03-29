import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import ProblemListApp from './ProblemList/ProblemListApp';
import SolutionListApp from './SolutionList/SolutionListApp';
import SolutionListAppWrapper from './SolutionList/SolutionListAppWrapper';
import ProblemFormApp from './ProblemForm/ProblemFormApp';
import SolutionFormApp from './SolutionForm/SolutionFormApp';
import ProblemDetailApp from './ProblemDetail/ProblemDetailApp';
import Nav from './Nav';

const StyledApp = styled.div`
  max-height: 500px;
`;

const App = () => (
  <>
  <StyledApp>
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={ProblemListApp} />
        <Route path="/solutions" exact component={SolutionListApp} />
        <Route path="/solutions/:problemNo" component={SolutionListAppWrapper} />
        <Route path="/problems" component={ProblemListApp} />
        <Route path="/problemsForm" component={ProblemFormApp} />
        <Route path="/solutionForm/:problemKey" component={SolutionFormApp} />
        <Route path="/problemDetail/:problemKey" component={ProblemDetailApp} />
      </Switch>
    </Router>
  </StyledApp>
  </>
);

export default App;