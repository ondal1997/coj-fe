import React from 'react';
import CodeMirror from 'react-codemirror';
import { getMode } from '../../utils';
import 'codemirror/keymap/sublime';
import '../../css/reset_solutionform.css';

const CodeEditor = ({ defaultValue, language, updateCode }) => {
  const handleChange = (newCode) => {
    // document.querySelector('.CodeMirror').CodeMirror.execCommand('goLineEnd');
    updateCode(newCode);
  };

  return (
      <CodeMirror value={defaultValue}
        options={{
          mode: language ? getMode(language) : 'python',
          lineNumbers: true,
          extraKeys: { Enter: false },
        }} onChange={handleChange}
        />
  );
};

export default CodeEditor;