const insertNextline = () => {
  const texts = document.querySelectorAll('.texts');
  texts.forEach((text) => {
    text.innerHTML = text.innerHTML.replace(/(\n|\r\n)/g, '<br>');
  });
};

module.exports = { insertNextline };