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
    const isNotFound = filteringByRequestText(resultTitle, requestText);

    tabsBlock.classList.add('hide');
    notFoundBlock.classList.add('hide');
    resultBlock.classList.remove('hide');

    if (isNotFound) {
      handleSearchByText(requestText);
    }
  };

  const handleSearchByText = (requestText) => {
    const isNotFound = filteringByRequestText(resultText, requestText);

    if (isNotFound) {
      tabsBlock.classList.add('hide');
      resultBlock.classList.remove('hide');
      notFoundBlock.classList.remove('hide');
    }
  };

  const filteringByRequestText = (result, value) => {
    let itemsNotFound = 0;
    const allItems = result.length;

    result.forEach((item) => {
      const itemText = item.textContent.toLowerCase();

      if (itemText.includes(value)) {
        highlightEnteredText(value, item);
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

  const highlightEnteredText = (text, item) => {
    const regExp = new RegExp('(' + text + ')', 'gi');
    item.innerHTML = item.innerHTML.replace(regExp, '<span class="selection">$1</span>');
  };

  const stripTags = (html) => {
    html.forEach((str) => {
      str.innerHTML = str.innerHTML.replace(/<(.|\n)*?>/g, '');
    });
  };
});
