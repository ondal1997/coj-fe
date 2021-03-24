import React from 'react';
import Body from './components/Content/SolutionList/Body';

const SolutionListApp = (props) => { // solution 번호 전달
  console.log(props);
  return (<div>
    <Body problemNo={props.match.params.problemNo}/>
  </div>);
};

export default SolutionListApp;