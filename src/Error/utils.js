/**
 * fetch 응답에 대한 error 컴포넌트를 렌더링하기 위한 함수
 * @param status 상태코드
 * @param updateError error state 변경
 * @param callback Http status code: 200시 수행할 함수
 */
const _handleFetchRes = (status, updateError, callback) => {
  switch (status) {
    case 200:
      callback();
      break;
    case 401: // 허용되지 않은 권한
    case 403: // 로그아웃
    case 404: // not found
    case 500:
      updateError({ status: status });
      return;
    default: // 알 수 없는 에러
      updateError({ status: -1 });
      return;
  }
};

export default _handleFetchRes;