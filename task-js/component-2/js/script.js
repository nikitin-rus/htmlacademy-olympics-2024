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
   * Настройки слайдера, параметры получаются из командной строки
   * pagination - boolean, отображает пагинацию
   * loop - boolean, зацикливает слайдер
   *
   * Для тестирования работы своего скрипта при разных значениях параметров временно
   * переопределяйте значение переменных, хранящих эти параметр.
   * Либо можете дописыват гет-параметры с нужным значением в конец адресной строки,
   * например: ?pagination=1&loop=0
   */
  const settings = {
    pagination: !!getUrlValue('pagination'),
    loop: !!getUrlValue('loop'),
  };

  /* Код компонента пишите ниже */

  /** @param {MouseEvent} e */
  function btnClick(e) {
    const isSlideRight = e.target.classList.contains('slider-toggle--next');

    const index = Array.from(items).findIndex(item => {
      return item.classList.contains('slider-item--current');
    });

    let targetIndex = isSlideRight ? index + 1 : index - 1;

    if (targetIndex === -1) {
      targetIndex = items.length - 1;
    } else if (targetIndex === items.length) {
      targetIndex = 0;
    }

    dispatchPageSwitchEvent(e.target, index + 1, targetIndex + 1);
  }

  /** @param {MouseEvent} e */
  function pagItemClick(e) {
    const index = Array.from(pagItems).findIndex(pagItem => {
      return pagItem.hasAttribute('disabled');
    });

    const pageTo = +e.target.textContent;

    dispatchPageSwitchEvent(e.target, index + 1, pageTo);
  }

  /** @param {CustomEvent} e */
  function sliderPageSwitch(e) {
    const className = 'slider-item--current';
    const { pageFrom, pageTo } = e.detail;

    items[pageFrom - 1].classList.remove(className);
    items[pageTo - 1].classList.add(className);

    pagItems[pageFrom - 1].removeAttribute('disabled');
    pagItems[pageTo - 1].setAttribute('disabled', '');

    if (!settings.loop) {
      if (pageTo === 1) {
        btns[0].setAttribute('disabled', '');
      } else {
        btns[0].removeAttribute('disabled');
      }

      if (pageTo === items.length) {
        btns[1].setAttribute('disabled', '');
      } else {
        btns[1].removeAttribute('disabled');
      }
    }
  }

  /**
   * @param {HTMLElement} target 
   * @param {number} pageFrom 
   * @param {number} pageTo 
   */
  function dispatchPageSwitchEvent(target, pageFrom, pageTo) {
    target.dispatchEvent(new CustomEvent('page-switch', {
      detail: { pageFrom: pageFrom, pageTo: pageTo },
      bubbles: true,
    }));
  }

  const slider = document.querySelector('#slider');
  const items = document.querySelectorAll('.slider-item');
  const btns = document.querySelectorAll('.slider-toggles button');
  const pagItems = document.querySelectorAll('.slider-pagination-item');

  btns[0].setAttribute('disabled', '');
  pagItems[0].setAttribute('disabled', '');

  if (settings.pagination) {
    document.querySelector('.slider-pagination').classList.add('slider-pagination--shown');
  }

  if (settings.loop) {
    btns[0].removeAttribute('disabled');
  }

  slider.addEventListener('page-switch', (e) => sliderPageSwitch(e))

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => btnClick(e));
  });

  pagItems.forEach(pagItem => {
    pagItem.addEventListener('click', (e) => pagItemClick(e));
  });
})();
