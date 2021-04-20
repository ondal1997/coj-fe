import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Chip,
  Divider,
  TextField,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { OurLink, ourFetchAndJson } from '../OurLink';
import { insertNextline } from './utils';
import './reset.css';

const serverAddress = 'http://192.168.0.100:3000';

const pColor = '#F8F8F8';

const StyledGrid = withStyles({
  root: {
    padding: '1% 20%',
    backgroundColor: 'white',
  },
})(Grid);

const StyledItemTitle = styled.span`
  font-weight: 700;
  font-size: 23px;
`;

const StyledChallengeResult = styled.span`
  color: white;
  font-weight: 700;
  background-color: ${(props) => (props.code === 1 ? '#0057FF' : '#E94D00')};
  font-size: larger;
`;

const StyledChipContainer = withStyles({
  root: {
    padding: '0',
    '& ul': {
      listStyle: 'none',
      padding: '0',
      margin: '0 0',
    },
    '& ul > li': {
      listStyle: 'none',
      display: 'inline',
    },
  },
})(Container);

const StyledChip = withStyles({
  root: {
    fontSize: 'medium',
    backgroundColor: '#4995F2',
    '&:focus': {
      backgroundColor: '#4995F2',
    },
  },
})(Chip);

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

const Problem = (props) => {
  const { problemKey } = props;

  const [problem, setProblem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwners, setIsOwners] = useState(true);
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProblem = async () => {
    console.log(problemKey);
    try {
      const fetchedProblem = await ourFetchAndJson(
        `${serverAddress}/api/problems/${problemKey}`,
      );
      // fetchedProblem이 없으면, 삭제되었거나 없는 문제입니다. 안내메시지
      if (!fetchedProblem) {
        console.log('문제 history');
        console.log(props.history);
        alert('삭제되었거나 없는 문제입니다.');
        props.history.push('/problems');
        // props.history.go(1);
      } else {
        // 현재 사용자가 누군지 정보를..
        // ownerId와 현재 사용자 아이디가 같으면
        // setIsOwners
        setProblem(fetchedProblem);
        setIsLoaded(true);
        insertNextline();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsOwners(true); // 접속자의 아이디와 제출자의 아이디의 동일 여부에 따라
    fetchProblem();
  }, []);

  return isLoaded ? (
    <StyledGrid container direction="column" spacing={3}>
      <Grid item>
        <Grid container justify='flex-end'>
          {isOwners
            ? <>
                <Grid item>
                  <OurLink to={`/update/${problemKey}`}>수정</OurLink>
                  <a onClick={handleClickOpen}>삭제</a>
                </Grid>
              <Dialog
                open={open}
                onClose={handleClose}
              >
                <DialogTitle>
                  <strong>문제 삭제</strong>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    문제를 정말 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleClose();
                    (async () => {
                      await ourFetchAndJson(`${serverAddress}/api/problems/${problemKey}`, {
                        method: 'DELETE',
                      });
                      console.log('삭제');
                      props.history.push('/problems');
                    })();
                    // console.log('삭제');
                    // props.history.push('/problems');
                    // 뒤로가기 할 때 없는 문제임을 처리해야함.
                  }} color="primary">
                    삭제
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    취소
                  </Button>
                </DialogActions>
              </Dialog>
            </>
            : null
          }
        </Grid>
      </Grid>
<Grid container item justify='space-between' alignItems='center' spacing={3}>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Grid container alignItems="center" direction="row" spacing={1}>
                <Grid item>
                  <Typography style={{ fontSize: '50px' }}>
                    {`${problemKey}. ${problem.title}`}
                  </Typography>
                </Grid>
                {problem.challengeCode !== 0
                && (problem.challengeCode === 1
                  ? (
                    <Grid item>
                      <StyledChallengeResult code={1}>성공</StyledChallengeResult>
                    </Grid>
                  ) : (
                    <Grid item>
                      <StyledChallengeResult code={-1}>실패</StyledChallengeResult>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
              <strong>{problem.ownerId}</strong>
              </Grid>
              <Grid item>
              <span>·</span>
              </Grid>
              <Grid item>
              <span>
                {new Date(problem.uploadTime).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              </Grid>
            </Grid>
            <Grid item>
              <StyledChipContainer>
                  <ul>
                    <Grid container direction='row' spacing={1}>
                    {problem.categories.map((category, index) => (
                      <Grid item key={index + 1}>
                        <li>
                          <StyledChip label={category} color="primary" />
                        </li>
                      </Grid>
                    ))}
                    </Grid>
                  </ul>
              </StyledChipContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
          <Grid container direction="row" justify="flex-end" spacing={1}>
            <Grid item>
              <OurLink to={`/solutions/${problemKey}/${problem.title}/1`}>
                <Button color='primary' variant='outlined' size='large'>
                  제출 현황
                </Button>
              </OurLink>
            </Grid>
            <Grid item>
              {/* <OurLink to={`/solutionForm/${problemKey}/${problem.title}`}> */}
                <Button color='primary' variant='outlined' size='large'
                onClick = {() => {
                  window.location.href = `http://codersit.co.kr/bbs/login.php?url=%2Foj/solutionForm/${problemKey}/${problem.title}`;
                }
                }>
                  문제 풀기
                </Button>
              {/* </OurLink> */}
            </Grid>
          </Grid>
        </Grid>
      <Grid container item direction="column">
        <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">시간 제한</TableCell>
                  <TableCell align="center">메모리 제한</TableCell>
                  <TableCell align="center">AC</TableCell>
                  <TableCell align="center">제출</TableCell>
                  <TableCell align="center">정답률</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    {`${problem.timeLimit / 1000}초`}
                  </TableCell>
                  <TableCell align="center">{`${problem.memoryLimit}MB`}</TableCell>
                  <TableCell align="center">
                    {problem.solvedCount}
                  </TableCell>
                  <TableCell align="center">
                    {problem.submitCount}
                  </TableCell>
                  <TableCell align="center">
                    {problem.submitCount === 0
                      ? '-'
                      : `${(
                        (problem.solvedCount / problem.submitCount)
                          * 100).toFixed(2)}%`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>

    <Grid item container direction="column" spacing={3}>
      <Grid container item direction="column" spacing={2}>
        <Grid item>
          <StyledItemTitle>문제 설명</StyledItemTitle>
          <Paper
            className="ck-content"
            elevation={0}
            style={{ backgroundColor: pColor, padding: '10px', fontSize: 'large' }}
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />
        </Grid>
        {
          problem.inputDescription && (
            <Grid item>
              <StyledItemTitle>입력 형식</StyledItemTitle>
              <Paper
                className="ck-content"
                elevation={0}
                style={{ backgroundColor: pColor, padding: '10px', fontSize: 'large' }}
                dangerouslySetInnerHTML={{ __html: problem.inputDescription }}
              />
            </Grid>
          )
        }
        {
          problem.outputDescription && (
            <Grid item>
              <StyledItemTitle>출력 형식</StyledItemTitle>
              <Paper
                className="ck-content"
                elevation={0}
                style={{ backgroundColor: pColor, padding: '10px', fontSize: 'large' }}
                dangerouslySetInnerHTML={{ __html: problem.outputDescription }}
              />
            </Grid>
          )
        }
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid container item direction="column" spacing={2}>
        {problem.examples.map((example, index) => (
          <Grid key={index + 1} container item direction="row" justify="space-between">
            <Grid item container sm={6} spacing={1} direction="column">
              <Grid item container alignItems='center' spacing={2}>
                <Grid item>
                  <StyledItemTitle>예제 입력 {index + 1}</StyledItemTitle>
                </Grid>
                <CopyToClipboard text={example.input}>
                  <Button variant='outlined' color='primary' onClick={() => { enqueueSnackbar('복사되었습니다!', { variant: 'info', autoHideDuraion: 3000 }); }}>copy</Button>
                </CopyToClipboard>
              </Grid>
              <Grid item>
                <StyledTextField
                  variant="outlined"
                  multiline
                  value={example.input}
                  InputProps={{
                    readOnly: true,
                  }}
                />
               </Grid>
            </Grid>
            <Grid item container sm={6} spacing={1} direction='column'>
            <Grid item container alignItems='center' spacing={2}>
                <Grid item>
                  <StyledItemTitle>예제 출력 {index + 1}</StyledItemTitle>
                </Grid>
                <CopyToClipboard text={example.output}>
                  <Button variant='outlined' color='primary' onClick={() => { enqueueSnackbar('복사되었습니다!', { variant: 'info', autoHideDuraion: 3000 }); }}>copy</Button>
                </CopyToClipboard>
              </Grid>
              <Grid item>
                <StyledTextField
                  variant="outlined"
                  multiline
                  value={example.output}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
    </StyledGrid>
  ) : (
    <div>Loading...</div>
  );
};

export default Problem;
