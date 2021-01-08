document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#seacrh-form');
  const searchInput = document.querySelector('.seacrh-input');
  const resultTitles = document.querySelectorAll('.result-item__title');
  const returnBtn = document.querySelector('#back');

  //blocks
  const resultBlock = document.querySelector('#result');
  const tabsBlock = document.querySelector('.tabs');
  const notFoundBlock = document.querySelector('.not-found');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //cleaning text
    cleaningText(resultTitles);

    //search
    if (searchInput.value.trim() !== '') {
      handleSearch(searchInput.value.trim());
    }

    //clear input
    searchInput.value = '';
  });

  returnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resultBlock.classList.add('hide');
    tabsBlock.classList.remove('hide');

    //cleaning text
    cleaningText(resultTitles);
  });

  const handleSearch = (value) => {
    let itemsNotFound = 0;
    const allItems = resultTitles.length;

    resultTitles.forEach((title) => {
      const titleText = title.textContent.toLowerCase();
      const requestText = value.toLowerCase();

      resultBlock.classList.remove('hide');

      if (titleText.includes(requestText)) {
        enteredText(requestText, title);

        //hidden blocks
        tabsBlock.classList.add('hide');
        notFoundBlock.classList.add('hide');
        title.parentNode.classList.remove('hide');
      } else {
        itemsNotFound++;
        title.parentNode.classList.add('hide');
      }
    });

    searchNotFound(itemsNotFound, allItems);
  };

  const enteredText = (text, item) => {
    const regExp = new RegExp('(' + text + ')', 'gi');
    return (item.innerHTML = item.innerHTML.replace(regExp, '<span class="selection">$1</span>'));
  };

  const cleaningText = (html) => {
    html.forEach((str) => {
      return (str.innerHTML = str.innerHTML.replace(/<(.|\n)*?>/g, ''));
    });
  };

  const searchNotFound = (itemsNotFound, allItems) => {
    if (itemsNotFound === allItems) {
      tabsBlock.classList.add('hide');
      resultBlock.classList.remove('hide');
      notFoundBlock.classList.remove('hide');
    }
  };
});
