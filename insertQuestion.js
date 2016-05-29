let inserQuestion = question => {
  let newQuestion = document.createElement('li');
  newQuestion.innerHTML = question;

  let questions = document.getElementsByTagName('ul')[0];
  return question.appendChild(newQuestion);
};
