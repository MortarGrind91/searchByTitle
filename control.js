document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#seacrh-form');
  const searchInput = document.querySelector('.seacrh-input');
  const resultItem = document.querySelectorAll('.result-item__title');
  const btnBack = document.querySelector('#back');
  const resultBlock = document.querySelector('#result');
  const tabsBlock = document.querySelector('.tabs');
  const notFoundBlock = document.querySelector('.not-found');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFilteredFaq(searchInput.value);

    //clean input value
    searchInput.value = '';
  });

  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    resultBlock.classList.add('hide');
    tabsBlock.classList.remove('hide');
  });

  const textSelection = (text, item) => {
    const regExp = new RegExp('(' + text + ')', 'gi');
    return (item.innerHTML = item.innerHTML.replace(regExp, '<u>$1</u>'));
  };

  const handleFilteredFaq = (value) => {
    let count = 0;

    resultItem.forEach((item, key) => {
      const itemText = item.textContent.toLowerCase();
      const requestText = value.toLowerCase();

      resultBlock.classList.remove('hide');
      //   notFoundBlock.classList.add('hide');
      resultBlock.classList.add('show');

      if (itemText.includes(requestText)) {
        textSelection(requestText, item);

        tabsBlock.classList.add('hide');
        // notFoundBlock.classList.add('hide');
        item.parentNode.classList.remove('hide');
      } else {
        count++;
        item.parentNode.classList.add('hide');
      }
    });

    filterNotFound(count, resultItem.length);
  };

  const filterNotFound = (failsCount, resultCount) => {
    if (failsCount === resultCount) {
      console.log('fail');
    }
  };
});
