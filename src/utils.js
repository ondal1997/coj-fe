/**
 * 문제 제출 시 입력 폼 유효성 검사
 * @param  {...any} param name, value
 * @returns 유효성 검사 결과
 */
const isProblemInputValid = (...param) => {
  let res = true;

  if (param[0] === '' || param[1] === '') {
    alert('누락된 필드를 확인해주세요.');
    return false;
  }

  if (param[0] === 'timeLimit') {
    res = param[1] >= 200 && param[1] <= 5000;
    if (!res) alert('200 - 5000 의 값만 입력 가능합니다.');
  } else if (param[0] === 'memoryLimit') {
    res = param[1] >= 128 && param[1] <= 512;
    if (!res) alert('128 - 512 의 값만 입력 가능합니다.');
  }
  return res;
};

/**
 * code editor의 언어 설정을 위한 함수
 * @param {*} language
 * @returns
 */
const getMode = (language) => {
  if (language.includes('python')) return 'python';
  if (language.includes('c++')) return 'c++';
  if (language.includes('c')) return 'c';
  if (language.includes('c#')) return 'c#';
  return 'python';
};

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

module.exports = { isProblemInputValid, getMode, _handleFetchRes };