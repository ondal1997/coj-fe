import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';

const serverAddress = 'http://192.168.0.100:3000';

const SolutionDetailApp = (props) => {
  const { solutionKey } = props.match.params;
  const [sourceCode, setSourceCode] = useState('');

  const fetchSolutions = () => {
    fetch(`${serverAddress}/api/solutions/${solutionKey}`)
      .then((res) => res.json())
      .then((fetchedCode) => {
        setSourceCode(fetchedCode.sourceCode);
      });
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