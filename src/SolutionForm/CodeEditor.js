import React, { useEffect } from 'react';
import { Container, withStyles } from '@material-ui/core';
import CodeMirror from '@uiw/react-codemirror';
import { getMode } from './utils';
import 'codemirror/keymap/sublime';
import './reset.css';

const StyledContainer = withStyles({
  root: {
    margin: '2%',
    position: 'relative',
    border: '1px solid #E0E0E0',
    padding: '0 0',
  },
})(Container);

const CodeEditor = ({ language, updateCode }) => {
  const onWriteCode = () => {
    const cmInst = document.querySelector('.CodeMirror').CodeMirror;
    const cs = cmInst.lineCount();
    if (cs > 10) {
      cmInst.setSize(null, cs * 35);
    } else cmInst.setSize(null, 400);
    updateCode(cmInst.getValue());
  };

  useEffect(() => {
    document.querySelector('.CodeMirror').CodeMirror.setSize(null, 400);
    document.querySelector('.CodeMirror').style.lineHeight = '2em';
    document.querySelector('.CodeMirror').style.fontSize = '17px';
  }, []);

  return <StyledContainer>
    <CodeMirror value=''
        width='100%'
        options={{
          keyMap: 'sublime',
          mode: getMode(language),
          scrollbarStyle: 'null',
        }} onChange={() => { onWriteCode(); }}/>
  </StyledContainer>;
};

export default CodeEditor;