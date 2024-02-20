(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 3,
  };

  /* Код компонента пишите ниже */

  /** @param {MouseEvent} e */
  function itemClick(e) {
    const className = 'accordeon-item--open';
    const item = e.target.parentElement;
    const isOpened = item.classList.contains(className);

    if (isOpened) {
      item.classList.remove(className);
      tabsOpened -= 1;
    } else {
      if (history.length >= settings.tabsLimit) {
        Array.from(items)[history[0]].classList.remove(className);
        tabsOpened -= 1;
        history.shift();
      } else {
        tabsOpened += 1;
      }

      history.push(getItemIndex(item));
      console.log(history);

      item.classList.add(className);
    }
  }

  /** @param {HTMLLIElement} item */
  function getItemIndex(item) {
    return Array.from(items).indexOf(item);
  }

  const accordeon = document.querySelector('.accordeon');
  const items = accordeon.querySelectorAll('.accordeon-item');
  const history = [];

  let tabsOpened = 0;

  items.forEach(item => {
    item.addEventListener('mousedown', (e) => itemClick(e));
  });

})();
