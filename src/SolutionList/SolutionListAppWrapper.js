import React from 'react';
import SolutionListApp from './SolutionListApp';

const SolutionListAppWrapper = (props) => { // solution 번호 전달
  console.log(props);
  return (<div>
    <SolutionListApp problemNo={props.match.params.problemNo}/>
  </div>);
};

export default SolutionListAppWrapper;