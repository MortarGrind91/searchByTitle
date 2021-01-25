document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#seacrh-form');
  const searchInput = document.querySelector('.seacrh-input');
  const returnBtn = document.querySelector('#back');
  const resultTitle = document.querySelectorAll('.result-item__title');
  const resultText = document.querySelectorAll('.result-item__text');

  //blocks
  const resultBlock = document.querySelector('#result');
  const tabsBlock = document.querySelector('.tabs');
  const notFoundBlock = document.querySelector('.not-found');

  const questionForm = document.querySelector('#question-form');
  const questionFormEmail = document.querySelector('.question-form__email');
  const questionFormName = document.querySelector('.question-form__name');
  const questionFormText = document.querySelector('.question-form__text');

  const API_FEEDBACK_SERVICE = 'https://services.allo.ua/nr/feedback_service/create';

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    stripTags(resultTitle);
    stripTags(resultText);

    if (searchInput.value.trim() !== '') {
      handleSearch(searchInput.value.trim());
    }

    searchInput.value = '';
  });

  returnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resultBlock.classList.add('hide');
    tabsBlock.classList.remove('hide');

    stripTags(resultTitle);
    stripTags(resultText);
  });

  const handleSearch = (value) => {
    const requestText = value.toLowerCase();
    const arrOfTextItems = [];

    tabsBlock.classList.add('hide');
    notFoundBlock.classList.add('hide');
    resultBlock.classList.remove('hide');

    resultTitle.forEach((item) => {
      const itemText = item.textContent.toLowerCase();

      if (itemText.includes(requestText)) {
        highlightEnteredText(requestText, item);
        item.parentNode.classList.remove('hide');
      } else {
        arrOfTextItems.push(getSiblings(item));
      }
    });

    arrOfTextItems.length && searchByText(requestText, arrOfTextItems);
  };

  const searchByText = (requestText, elem) => {
    const allItems = resultText.length;
    let itemsNotFound = 0;

    elem.forEach((item) => {
      const itemText = item.textContent.toLowerCase();

      if (itemText.includes(requestText)) {
        highlightEnteredText(requestText, item);
        item.parentNode.classList.remove('hide');
      } else {
        itemsNotFound++;
        item.parentNode.classList.add('hide');
      }
    });

    if (itemsNotFound === allItems) {
      tabsBlock.classList.add('hide');
      resultBlock.classList.remove('hide');
      notFoundBlock.classList.remove('hide');
    }
  };

  const highlightEnteredText = (text, item) => {
    const regExp = new RegExp('(' + text + ')', 'gi');
    item.innerHTML = item.innerHTML.replace(regExp, '<span class="selection">$1</span>');
  };

  const stripTags = (html) => {
    html.forEach((str) => {
      str.innerHTML = str.innerHTML.replace(/<(.|\n)*?>/g, '');
    });
  };

  const getSiblings = (elem) => {
    return [...elem.parentNode.children].filter((item) => item !== elem)[0];
  };

  //sending form
  questionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = questionFormEmail.value;
    const name = questionFormName.value;
    const text = questionFormText.value;

    sendForm({ email, name, text });
  });

  const sendForm = async ({ email, name, text }) => {
    const data = {
      method: 'POST',
      body: JSON.stringify({ client_email: email, client_name: name, client_text: text }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(API_FEEDBACK_SERVICE, data);

    if (response.ok) {
      console.log('send');
    } else {
      console.log('fail');
    }
  };
});
