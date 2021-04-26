const isProblemInputValid = (...param) => { // name, value // 유효성 검사
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

module.exports = { isProblemInputValid };