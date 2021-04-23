import React from 'react';
import Problem from './Problem';

const ProblemDetailApp = (props) => (<Problem history={props.history}
  problemKey={props.match.params.problemKey} />);

export default ProblemDetailApp;