import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

const initCode = 'write your code!';

const getMode = (language) => {
  if (language.includes('python')) return 'python';
  if (language.includes('c++')) return 'c++';
  if (language.includes('c')) return 'c';
  if (language.includes('c#')) return 'c#';
  return 'python';
};

const CodeEditor = ({ language, updateCode }) => (
  <CodeMirror value={initCode}
      height='300px'
      className='codemirror_'
      options={{
        keyMap: 'sublime',
        mode: getMode(language),
      }}
      onChange={() => { updateCode(document.querySelector('.CodeMirror').CodeMirror.getValue()); }}
  />
);

export default CodeEditor;