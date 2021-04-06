import React, { useRef } from 'react';
import styled from 'styled-components';
import { Container, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledContainer = withStyles({
  root: {
    margin: '0 auto',
    padding: '0.5% 0%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .area-container': {
      padding: '0 0',
      width: '500px',
    },
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

// const StyledDeleteButton = withStyles({
//   root: {
//     color: 'gray',
//     padding: '0 0',
//     left: '96.5%',
//     fontSize: 'medium',
//     '&:hover': {
//       color: 'black',
//       backgroundColor: 'white',
//     },
//   },
// })(Button);

const StyledTextField = withStyles({
  root: {
    width: '100%',
    marginTop: '1%',
    '& label.Mui-focused': {
      color: '#4995F2',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4995F2',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#4995F2',
      },
    },
  },
})(TextField);

const StyledLabel = styled.label`
  background-color: #000000;
  padding: 1.5% 1%;
  fontSize: medium;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 5px;
  &:hover {
    background-color: #CE2727;
  }
`;

const Testcases = ({ testcases, updateTestcases }) => {
  const textRef = useRef(null);

  const onFileUpload = (event) => {
    const { files } = event.target;
    if (files.length % 2 !== 0) {
      textRef.current.innerHTML = '입력과 출력 파일을 같이 업로드해주세요.';
      return;
    }

    for (let i = 1; i < files.length; i += 2) {
      const inNum = files[i - 1].name.split('.')[0];
      const outNum = files[i].name.split('.')[0];
      if (inNum !== outNum) {
        textRef.current.innerHTML = '입력과 출력 파일을 같이 업로드해주세요.';
        return;
      }
    }

    const newTestcases = [{ input: '', output: '' }];
    const testcaseLen = newTestcases.length - 1;

    let idx = 0;
    let loadedCount = 0;

    textRef.current.innerHTML = '업로드 중...';

    [...files].reverse().forEach((file) => {
      const reader = new FileReader();
      reader.onload = function () {
        if (newTestcases[testcaseLen + idx].input !== ''
        && newTestcases[testcaseLen + idx].output !== '') {
          idx += 1;
          newTestcases[testcaseLen + idx] = { input: '', output: '' };
        }
        if (file.name.split('.')[1] === 'in') {
          newTestcases[testcaseLen + idx].input = reader.result;
        } else {
          newTestcases[testcaseLen + idx].output = reader.result;
        }
        loadedCount += 1;
        if (loadedCount === files.length) {
          updateTestcases(newTestcases);
          textRef.current.innerHTML = '';
        }
      };
      reader.readAsText(file);
    });
  };

  return <>
 {testcases.map((testcase, number) => <>
  <StyledContainer key={number + 1} fullWidth>
       <div className='area-container'>
        <div>
          테스트케이스 입력 {number + 1}
        </div>
          <StyledTextField variant='outlined' row={5}
          maxRow={Infinity} multiline
          value={testcase.input}
          InputProps={{
            readOnly: true,
          }}
          />
        </div>
        <div className='area-container'>
          <div>
          테스트케이스 출력 {number + 1}
          </div>
          <StyledTextField variant='outlined' row={5}
          maxRow={Infinity} multiline
          value={testcase.output}
          InputProps={{
            readOnly: true,
          }}
          />
        </div>
      </StyledContainer>
      {/* <StyledDeleteButton onClick={() => onClickDeleteItem(number)}>✖</StyledDeleteButton> */}
      </>)}
      <div style={{ textAlign: 'right', margin: '3% 0' }}>
        <span style={{ marginRight: '1%', color: '#828282' }} ref={textRef}>
        테스트케이스를 업로드 해주세요.
        </span>
        <StyledLabel for="upload">테스트케이스 업로드</StyledLabel>
        <input id="upload" type="file" accept="text/plain" onChange={onFileUpload} multiple
        style={{ display: 'none' }}/>
      </div>
  </>;
};

export default Testcases;