const getMode = (language) => {
  if (language.includes('python')) return 'python';
  if (language.includes('c++')) return 'c++';
  if (language.includes('c')) return 'c';
  if (language.includes('c#')) return 'c#';
  return 'python';
};

module.exports = { getMode };