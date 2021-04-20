/**
 * fetch 응답에 대한 처리 함수
 * @param status 상태코드
 * @param updateError error state 변경
 * @param callback Http status code: 200시 수행할 함수
 */
const _handleFetchRes = (status, updateError, callback) => {
  switch (status) {
    case 200:
      callback();
      break;
    case 401:
    case 403: // 로그아웃 된 상태
    case 404:
    case 500:
      updateError({ status: status });
      return;
    default: // 알 수 없는 에러
      updateError({ status: -1 });
      return;
  }
};

export default _handleFetchRes;