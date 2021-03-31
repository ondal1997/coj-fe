import React, { useEffect } from 'react';
import { Container, withStyles } from '@material-ui/core';
import CodeMirror from '@uiw/react-codemirror';
import { getMode } from './utils';
import 'codemirror/keymap/sublime';

const StyledContainer = withStyles({
  root: {
    marginTop: '2%',
    position: 'relative',
  },
})(Container);

const CodeEditor = ({ language, updateCode }) => {
  const onWriteCode = () => {
    const cs = document.querySelector('.CodeMirror').CodeMirror.lineCount();
    if (cs > 10) {
      document.querySelector('.CodeMirror').CodeMirror.setSize(null, cs * 35);
    } else document.querySelector('.CodeMirror').CodeMirror.setSize(null, 400);
    updateCode(document.querySelector('.CodeMirror').CodeMirror.getValue());
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