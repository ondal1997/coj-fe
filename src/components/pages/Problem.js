import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Divider,
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
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import TextField from '../atoms/TextField';
import BasicChip from '../atoms/BasicChip';
import { OurLink, pureFetchAndJson } from '../../OurLink';
import Error from '../atoms/Error';
import { _handleFetchRes } from '../../utils';
import '../../css/reset_problemdetail.css';
import AuthenticationContext from '../../contexts/authentication';
import ErrorContext from '../../contexts/error';
import PageTemplate from '../templates/PageTemplate';

const pColor = '#F8F8F8';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      margin: '0 0',
      padding: '0 0',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
    },
  },
  children: {
    [theme.breakpoints.down('md')]: {
      margin: '2% 0',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '1% 0',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '1% 0',
    },
  },
  chip: {
    [theme.breakpoints.down('md')]: {
      marginRight: '1%',
      marginTop: '0.3%',
    },
    [theme.breakpoints.up('md')]: {
      marginRight: '0.5%',
    },
    [theme.breakpoints.up('xl')]: {
      marginRight: '0.5%',
      marginTop: '0.5%',
    },
  },
  title: {
    wordBreak: 'keep-all',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '40px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '50px',
    },
  },
}));

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

const Problem = (props) => {
  const classes = useStyles();
  const { problemKey } = props.match.params;

  const [userId, setUserId] = useContext(AuthenticationContext);
  const [error, setError] = useContext(ErrorContext);

  const [problem, setProblem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwners, setIsOwners] = useState(false);
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProblem = async () => {
    let result;
    try {
      result = await pureFetchAndJson(`/api/problems/${problemKey}`);
    } catch {
      setError({ message: 'Failed to connect with server' });
      return;
    }
    if (result.status !== 200) {
      setError({ status: result.status });
      return;
    }

    if (userId === result.problem.ownerId) {
      setIsOwners(true);
    }
    setProblem(result.problem);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  return <PageTemplate content={isLoaded ? (
    <Grid className={classes.root} container direction="column">
      <Grid className={classes.children} item>
        <Grid container justify='flex-end'>
          {isOwners
            ? <>
                <Grid item>
                  <OurLink to={`/edit/${problemKey}`}>수정</OurLink>
                  &nbsp;
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
                      let result;
                      try {
                        result = await pureFetchAndJson(`/api/problems/${problemKey}`, {
                          method: 'DELETE',
                        });
                      } catch {
                        setError({ message: 'Failed to connect with server' });
                        return;
                      }
                      if (result.status !== 200) {
                        setError({ status: result.status });
                        return;
                      }
                      props.history.push('/problems');
                    })();
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
      <Grid className={classes.children} container item justify='space-between' alignItems='center'>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={0}>
            <Grid item>
              <Grid container alignItems="center" direction="row" spacing={1}>
                <Grid item>
                  <Typography className={classes.title}>
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
            <Grid className={classes.children} item container direction="row">
              {
                problem.categories.map((category, index) => (
                  <Grid className={classes.chip} item>
                    <BasicChip
                      key={index}
                      label={category}
                      color='primary'
                      handleClick={() => {
                        props.history.push(`/problems?query=${category}`);
                      }} />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.children} item>
          <Grid container direction="row" justify="flex-end" spacing={1}>
            <Grid item>
              <OurLink to={`/solutions?problemKey=${problemKey}&highlight=${userId}`}>
                <Button color='primary' variant='outlined' size='large'>
                  제출 현황
                </Button>
              </OurLink>
            </Grid>
            <Grid item>
              <Button color='primary' variant='outlined' size='large'
                onClick = {() => {
                  if (!userId) {
                    window.location.href = `https://codersit.co.kr/bbs/login.php?url=%2Foj/submit/${problemKey}`;
                    return;
                  }
                  props.history.push(`/submit/${problemKey}`);
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
            <Table style={{ whiteSpace: 'nowrap' }}>
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
      <Grid item container direction="column">{
          problem.description && (
            <Grid className={classes.children} item>
             <StyledItemTitle>문제 설명</StyledItemTitle>
              <Paper
                className={`${classes.children} ck-content`}
                elevation={0}
                style={{ backgroundColor: pColor, padding: '10px', fontSize: 'large' }}
                dangerouslySetInnerHTML={{ __html: problem.description }}
              />
            </Grid>
          )
        }
        {
          problem.inputDescription && (
            <Grid className={classes.children} item>
              <StyledItemTitle>입력 형식</StyledItemTitle>
              <Paper
                className={`${classes.children} ck-content`}
                elevation={0}
                style={{ backgroundColor: pColor, padding: '10px', fontSize: 'large' }}
                dangerouslySetInnerHTML={{ __html: problem.inputDescription }}
              />
            </Grid>
          )
        }
        {
          problem.outputDescription && (
            <Grid className={classes.children} item>
              <StyledItemTitle>출력 형식</StyledItemTitle>
              <Paper
                className={`${classes.children} ck-content`}
                elevation={0}
                style={{ backgroundColor: pColor, padding: '10px', fontSize: 'large' }}
                dangerouslySetInnerHTML={{ __html: problem.outputDescription }}
              />
            </Grid>
          )
        }
      </Grid>
      <Divider className={classes.children}/>
      <Grid container item direction="column">
        {problem.examples.map((example, index) => (
          <Grid key={index + 1} container item direction="row" justify="space-between">
            <Grid className={classes.children} item container lg={5} direction="column">
              <Grid item container alignItems='center'>
                <Grid item>
                  <StyledItemTitle>예제 입력 {index + 1}</StyledItemTitle>
                </Grid>
                <CopyToClipboard text={example.input}>
                  <Button color='primary' onClick={() => { enqueueSnackbar('복사되었습니다!', { variant: 'info', autoHideDuraion: 3000 }); }}>copy</Button>
                </CopyToClipboard>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  value={example.input}
                  InputProps={{
                    readOnly: true,
                  }}
                />
               </Grid>
            </Grid>
            <Grid className={classes.children} item container lg={5} direction='column'>
              <Grid item container alignItems='center'>
                  <Grid item>
                    <StyledItemTitle>예제 출력 {index + 1}</StyledItemTitle>
                  </Grid>
                  <CopyToClipboard text={example.output}>
                    <Button color='primary' onClick={() => { enqueueSnackbar('복사되었습니다!', { variant: 'info', autoHideDuraion: 3000 }); }}>copy</Button>
                  </CopyToClipboard>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
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
  ) : (
    <Grid style={{ height: '100vh' }} container direction='row' justify='center' alignItems='center'>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )}/>;
};

export default Problem;
