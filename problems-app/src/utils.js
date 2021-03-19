const isValid = (...param) => { // name, value // 유효성 검사
  let res = true;

  if (param[0] === '' || param[1] === '') {
    alert('누락된 필드를 확인해주세요.');
    return false;
  }

  if (param[0] === 'timeLimit') {
    const regExp = new RegExp('[2-4][0-9][0-9][0-9]|5000');
    res = regExp.test(param[1]);
    if (!res) alert('2000 - 5000 의 값만 입력 가능합니다.');
  } else if (param[0] === 'memoryLimit') {
    const regExp = new RegExp('[1][0-9][0-9]|500');
    res = regExp.test(param[1]);
    if (!res) alert('100 - 500 의 값만 입력 가능합니다.');
  }
  return res;
};

module.exports = { isValid };