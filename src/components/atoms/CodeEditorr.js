import React, { useState } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import '../../css/reset_solutionform.css';
import { getMode } from '../../utils';

const CodeEditor = ({ defaultValue, language, updateCode }) => {
  const handleChange = (newCode) => {
    updateCode(newCode);
  };

  return (
    <>
      <CodeMirror value={defaultValue}
        height={500}
        options={{
          mode: language ? getMode(language) : '',
          lineNumbers: true,
        }}
        onChange={handleChange}
        />
    </>
  );
};

export default CodeEditor;
