document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#seacrh-form');
  const searchInput = document.querySelector('.seacrh-input');
  const resultTitle = document.querySelectorAll('.result-item__title');
  const resultText = document.querySelectorAll('.result-item__text');
  const returnBtn = document.querySelector('#back');

  //blocks
  const resultBlock = document.querySelector('#result');
  const tabsBlock = document.querySelector('.tabs');
  const notFoundBlock = document.querySelector('.not-found');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //cleaning text
    stripTags(resultTitle);
    stripTags(resultText);

    //search
    if (searchInput.value.trim() !== '') {
      handleSearch(searchInput.value.trim());
    }

    //cleaning input
    searchInput.value = '';
  });

  returnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resultBlock.classList.add('hide');
    tabsBlock.classList.remove('hide');

    //cleaning text
    stripTags(resultTitle);
    stripTags(resultText);
  });

  const handleSearch = (value) => {
    const requestText = value.toLowerCase();
    const isNotFound = filteringByValue(resultTitle, requestText);

    //hidden blocks
    tabsBlock.classList.add('hide');
    resultBlock.classList.remove('hide');
    notFoundBlock.classList.add('hide');

    if (!isNotFound) {
      filteringByValue(resultTitle, requestText);
    } else {
      handleSearchByText(requestText);
    }
  };

  const handleSearchByText = (requestText) => {
    const isNotFound = filteringByValue(resultText, requestText);

    if (!isNotFound) {
      filteringByValue(resultText, requestText);
    } else {
      tabsBlock.classList.add('hide');
      resultBlock.classList.remove('hide');
      notFoundBlock.classList.remove('hide');
    }
  };

  const filteringByValue = (result, value) => {
    let itemsNotFound = 0;
    const allItems = result.length;

    result.forEach((item) => {
      const itemText = item.textContent.toLowerCase();

      if (itemText.includes(value)) {
        enteredText(value, item);
        item.parentNode.classList.remove('hide');
      } else {
        itemsNotFound++;
        item.parentNode.classList.add('hide');
      }
    });

    if (itemsNotFound === allItems) {
      return true;
    }
  };

  const enteredText = (text, item) => {
    const regExp = new RegExp('(' + text + ')', 'gi');
    return (item.innerHTML = item.innerHTML.replace(regExp, '<span class="selection">$1</span>'));
  };

  const stripTags = (html) => {
    html.forEach((str) => {
      return (str.innerHTML = str.innerHTML.replace(/<(.|\n)*?>/g, ''));
    });
  };
});
