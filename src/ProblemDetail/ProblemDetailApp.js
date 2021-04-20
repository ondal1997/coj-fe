import React from 'react';
import styled from 'styled-components';
import Problem from './Problem';

const StyledProblemDetailApp = styled.div`
  width: 100%;
`;

const ProblemDetailApp = (props) => (<StyledProblemDetailApp>
    <Problem history={props.history} problemKey={props.match.params.problemKey} />
    </StyledProblemDetailApp>);

export default ProblemDetailApp;