import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';

const CodeEditor = ({ code }) => {
  useEffect(() => {
    document.querySelector('.CodeMirror').style.lineHeight = '2em';
    document.querySelector('.CodeMirror').style.fontSize = '17px';
  }, []);

  return (<CodeMirror value={code}
   options={{ mode: 'python',
     keyMap: 'sublime',
     scrollbarStyle: 'null',
     readOnly: true }}/>
  );
};

export default CodeEditor;