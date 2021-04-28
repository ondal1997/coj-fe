import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';

const CodeViewer = ({ code }) => (
  <CodeMirror value={code}
    width='100%'
    options={{ mode: 'python',
      keyMap: 'sublime',
      readOnly: true }}/>
);

export default CodeViewer;