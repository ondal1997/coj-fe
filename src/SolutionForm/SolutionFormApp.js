import React, { useEffect, useState } from 'react';
import { Button, Container,
  FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ourHref, ourFetchAndJson } from '../OurLink';
import CodeEditor from './CodeEditor';

const StyledForm = withStyles({
  root: {
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

const StyledRadio = withStyles({
  colorPrimary: {
  },
})(Radio);

const serverAddress = 'http://192.168.0.100:3000';

const fetchLanguages = async () => {
  try {
    const json = await ourFetchAndJson(`${serverAddress}/api/availableLanguages`);
    return json;
  } catch (error) {
    console.error(error);
  }
  return {};
};

const Form = (props) => {
  const { problemKey, problemTitle } = props.match.params;
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
      <h3 style={{ marginLeft: '2%' }}>{`${problemKey}번 ${problemTitle}`}</h3>
      <div style={{ marginLeft: '2%' }}>
      {isLoaded ? (<>
  <FormLabel component="legend">언어 선택</FormLabel>
  <RadioGroup aria-label="language" name="language"
            onChange={(event) => { setSelectedLanguage(event.target.value); }}>
  {languages.map((language) => (
            <FormControlLabel key={language} value={language} label={language}
            control={<StyledRadio color="default" />} />
  ))}
  </RadioGroup>
   </>)
        : (<div>Loading...</div>)
      }
      </div>
      <div>
      <CodeEditor language={selectedLanguage} updateCode={setSourceCode} />
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