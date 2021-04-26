import React from 'react';
import SolutionListApp from './SolutionListApp';

const SolutionListAppWrapper = (props) => { // solution 번호 전달
  console.log(props);
  return (<div>
    <SolutionListApp
    history={props.history}
    location={props.location}
    />
  </div>);
};

export default SolutionListAppWrapper;