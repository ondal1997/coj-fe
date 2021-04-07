import React, { useEffect, useState } from 'react';
import { Button, Grid, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ourHref, ourFetchAndJson } from '../OurLink';
import CodeEditor from './CodeEditor';

const StyledGrid = withStyles({
  root: {
    backgroundColor: 'white',
    margin: '0 auto',
    padding: '5% 15%',
  },
  maxWidthLg: {
    width: '100%',
  },
})(Grid);

const StyledButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
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
    <StyledGrid container direction='column' spacing={3}>
      <Grid container item direction='column' spacing={1}>
        <Grid container item>
        <h3 style={{ margin: '0 0' }}>{`${problemKey}번 ${problemTitle}`}</h3>
        </Grid>
        {isLoaded ? (<>
          <Grid container item>
            <FormLabel component="legend">언어 선택</FormLabel>
          </Grid>
          <Grid container item>
            <RadioGroup aria-label="language" name="language"
                      onChange={(event) => { setSelectedLanguage(event.target.value); }}>
            {languages.map((language) => (
                      <FormControlLabel key={language} value={language} label={language}
                      control={<StyledRadio color="default" />} />
            ))}
            </RadioGroup>
          </Grid>
        </>)
          : (<Grid container item>Loading...</Grid>)
        }
      </Grid>
      <Grid container item>
        <CodeEditor language={selectedLanguage} updateCode={setSourceCode} />
      </Grid>
      <Grid container item direction='row-reverse'>
        <StyledButton variant='contained'
            size='medium' onClick={async () => {
              if (!selectedLanguage) {
                alert('언어를 선택해주세요');
                return;
              }
              await ourFetchAndJson(`${serverAddress}/api/solutions`, {
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
              ourHref(`/solutions/${problemKey}/${problemTitle}/1`, history);
            }}>
            풀이 제출하기
            </StyledButton>
        </Grid>
    </StyledGrid>
  );
};

export default Form;