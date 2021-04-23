import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import _handleFetchRes from '../../Error/utils';
import { fetchAndJson } from '../../OurLink';
import ProblemTable from './problemTable';

const ProblemsPage = (props) => {
  const urlSearchParams = new URLSearchParams(props.location.search);

  const query = urlSearchParams.get('query') || '';
  console.log(query);

  const limit = 20;
  console.log(limit);

  const unparsedPage = urlSearchParams.get('page');
  const page = /^[1-9]\d*$/.test(unparsedPage) ? Number.parseInt(unparsedPage, 10) : 1;
  console.log(page);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [problems, setProblems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  console.log(isLoaded);
  console.log(totalCount);

  const [mutable] = useState({
    lastFetch: null,
  });

  useEffect(() => {
    setIsLoaded(false);
    console.log(
      new URLSearchParams({
        query,
        pos: (page - 1) * limit,
        count: limit,
      }).toString(),
    );
    const promise = fetchAndJson(
      `/api/problems?${new URLSearchParams({
        title: query,
        pos: (page - 1) * limit,
        count: limit,
      }).toString()}`,
    );
    mutable.lastFetch = promise;
    promise.then((result) => {
      if (mutable.lastFetch !== promise) {
        return;
      }

      _handleFetchRes(result.status, setError, () => {
        setProblems(result.problems);
        setTotalCount(result.totalCount);
        setIsLoaded(true);
        // window.scrollTo(0, 0);
      });
    });
  }, [query, page]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <TextField
        placeholder="검색"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        value={query}
        onChange={(event) => {
          urlSearchParams.set('query', event.target.value);
          urlSearchParams.set('page', 1);
          props.history.push(`?${urlSearchParams.toString()}`);
        }}
      ></TextField>

      {(() => {
        if (!isLoaded) {
          return (
            <p>
              <CircularProgress />
            </p>
          );
        }

        if (totalCount === 0) {
          return <p>해당하는 문제가 존재하지 않습니다.</p>;
        }

        return (
          <>
            <p>
              총 <strong>{totalCount}</strong>개의 문제를 발견했습니다.
            </p>

            <ProblemTable
              problems={problems}
              urlSearchParams={urlSearchParams}
              history={props.history}
            />

            <Pagination
              shape="rounded"
              variant="outlined"
              color="primary"
              size="large"
              siblingCount={2}
              boundaryCount={2}
              count={Math.ceil(totalCount / limit)}
              page={page}
              onChange={(event, p) => {
                urlSearchParams.set('page', p);
                props.history.push(`?${urlSearchParams.toString()}`);
              }}
            />
          </>
        );
      })()}
    </div>
  );
};

export default ProblemsPage;
