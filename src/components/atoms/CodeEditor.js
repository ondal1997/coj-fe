import React, { useState } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/lib/codemirror';
import '../../css/reset_solutionform.css';
import { FormControlLabel, Switch } from '@material-ui/core';
import { getMode } from '../../utils';

const themeFromst = window.localStorage.getItem('theme');

const CodeEditor = ({ defaultValue, language, updateCode }) => {
  const [theme, setTheme] = useState(themeFromst);
  console.log(theme);

  const handleChange = (newCode) => {
    // document.querySelector('.CodeMirror').CodeMirror.execCommand('goLineEnd');
    updateCode(newCode);
  };

  return (
    <>
      테마
      <FormControlLabel
          control={
            <Switch
              checked={theme === 'true'}
              onChange={() => {
                setTheme((them) => {
                  window.localStorage.setItem('theme', theme === 'true' ? 'false' : 'true');
                  return them === 'true' ? 'false' : 'true';
                });
              }}
              color="primary"
            />}
            label={theme === 'true' ? 'ON' : 'OFF'}
      />
      <CodeMirror value={defaultValue}
        height={500}
        options={{
          mode: language ? getMode(language) : 'python',
          lineNumbers: true,
        }}
        onChange={handleChange}
        />
    </>
  );
};

export default CodeEditor;