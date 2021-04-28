import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { getMode } from '../../utils';
import 'codemirror/keymap/sublime';
import '../../css/reset_solutionform.css';

const CodeEditor = ({ defaultValue, language, updateCode }) => {
  const onWriteCode = () => {
    const cmInst = document.querySelector('.CodeMirror').CodeMirror;
    const cs = cmInst.lineCount();
    if (cs > 10) {
      cmInst.setSize(null, cs * 35);
    } else cmInst.setSize(null, 500);
    updateCode(cmInst.getValue());
  };

  useEffect(() => {
    document.querySelector('.CodeMirror').CodeMirror.setSize(null, 500);
    document.querySelector('.CodeMirror').style.lineHeight = '2em';
    document.querySelector('.CodeMirror').style.fontSize = '17px';
  }, []);

  return <CodeMirror value={defaultValue}
        width='100%'
        options={{
          keyMap: 'sublime',
          mode: language === 'undefined' ? getMode(language) : 'python',
          scrollbarStyle: 'null',
        }} onChange={() => { onWriteCode(); }}/>;
};

export default CodeEditor;