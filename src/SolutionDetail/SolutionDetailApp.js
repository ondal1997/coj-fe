import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import { ourFetchAndJson } from '../OurLink';

const serverAddress = 'http://192.168.0.100:3000';

const SolutionDetailApp = (props) => {
  const { solutionKey } = props.match.params;
  const [sourceCode, setSourceCode] = useState('');

  const fetchSolutions = async () => {
    const solution = await ourFetchAndJson(`${serverAddress}/api/solutions/${solutionKey}`);
    console.log(solution);
    setSourceCode(solution.sourceCode);
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (<>
    <div>제출 번호 {solutionKey}</div>
    <div>
    <CodeMirror value={sourceCode} options={{ readOnly: true }}/>
    </div>
    </>);
};

export default SolutionDetailApp;