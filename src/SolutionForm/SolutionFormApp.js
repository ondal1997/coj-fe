import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ourHref } from '../OurLink';
import CodeEditor from './CodeEditor';

const StyledForm = withStyles({
  root: {
    minHeight: '700px',
    backgroundColor: 'white',
    borderRadius: '15px',
    margin: '0 auto',
    padding: '2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  maxWidthLg: {
    width: '100%',
  },
})(Container);

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    left: '87%',
    margin: '1%',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
    '& a': {
      fontSize: '20px',
    },
  },
})(Button);

const StyledTextField = withStyles({
  root: {
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

const serverAddress = 'http://192.168.0.100:3000';

const fetchLanguages = async () => {
  const res = await fetch(`${serverAddress}/api/availableLanguages`);
  const json = await res.json();
  return json;
};

const Form = (props) => {
  const { problemKey } = props.match.params;
  const { history } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [languages, setLanguages] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  useEffect(() => {
    (async () => {
      const fetchedLanguages = await fetchLanguages();

      setLanguages(fetchedLanguages);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <StyledForm maxWidth='lg'>
      <h3>{problemKey}</h3>
      <div>
      {isLoaded ? (
      <StyledTextField
          select
          label="언어 선택"
          value={selectedLanguage}
          onChange={(event) => {
            setSelectedLanguage(event.target.value);
          }}
          helperText="작성하신 코드의 언어를 선택하세요"
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </StyledTextField>)
        : (<div>Loading...</div>)
      }
      </div>
      <div>
      <CodeEditor language={selectedLanguage} updateCode={setSourceCode}/>
      </div>
      <div>
      <StyledButton variant='contained'
        size='medium' onClick={async () => {
          if (!selectedLanguage) {
            alert('언어를 선택해주세요');
            return;
          }
          await fetch(`${serverAddress}/api/solutions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              problemKey,
              language: selectedLanguage,
              sourceCode,
            }),
          });
          alert('제출 완료!');
          ourHref(`/solutions/${problemKey}`, history);
        }}>
        <a>풀이 제출하기</a></StyledButton>
      </div>
    </StyledForm>
  );
};

export default Form;