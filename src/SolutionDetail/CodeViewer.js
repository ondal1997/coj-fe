import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';

const CodeEditor = ({ code }) => (
  <CodeMirror value={code}
    width='100%'
    options={{ mode: 'python',
      keyMap: 'sublime',
      readOnly: true }}/>
);

export default CodeEditor;